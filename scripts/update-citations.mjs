import { readFileSync, writeFileSync } from 'node:fs';
import { publications } from '../src/data/publications.ts';

const outputUrl = new URL('../src/data/generated/citations.json', import.meta.url);
const contact = 'wgb1018@gmail.com';
const source = 'OpenAlex';
const now = new Date().toISOString();
const requestFields = 'id,display_name,doi,cited_by_count,counts_by_year,authorships,publication_year';
const existing = JSON.parse(readFileSync(outputUrl, 'utf8'));

function normalizeTitle(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function titleSimilarity(left, right) {
  const a = new Set(normalizeTitle(left).split(' ').filter(Boolean));
  const b = new Set(normalizeTitle(right).split(' ').filter(Boolean));
  const union = new Set([...a, ...b]);
  if (!union.size) return 0;
  return [...a].filter((token) => b.has(token)).length / union.size;
}

function hasSiteAuthor(work) {
  return (work.authorships ?? []).some((authorship) => {
    const name = normalizeTitle(authorship.author?.display_name ?? '');
    return name === 'guanbo wang' || name === 'wang guanbo' || name === '王冠博';
  });
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchJson(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': `academic-homepage-cleanroom/0.0.1 (mailto:${contact})` },
        signal: AbortSignal.timeout(15_000),
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await wait(500 * attempt);
    }
  }
  throw lastError;
}

async function findWork(publication) {
  if (publication.doi) {
    const doiUrl = new URL(`https://api.openalex.org/works/https://doi.org/${publication.doi.toLowerCase()}`);
    doiUrl.searchParams.set('mailto', contact);
    doiUrl.searchParams.set('select', requestFields);
    const work = await fetchJson(doiUrl);
    if (work) {
      const similarity = titleSimilarity(publication.title, work.display_name ?? '');
      const resolvedDoi = String(work.doi ?? '').replace(/^https:\/\/doi\.org\//i, '').toLowerCase();
      if (resolvedDoi !== publication.doi.toLowerCase()) throw new Error(`DOI mismatch (${resolvedDoi || 'missing'})`);
      if (similarity < 0.9 && !hasSiteAuthor(work)) throw new Error(`DOI title mismatch (${similarity.toFixed(2)})`);
      return { work, matchedBy: 'doi' };
    }
  }

  const searchUrl = new URL('https://api.openalex.org/works');
  searchUrl.searchParams.set('search', publication.title);
  searchUrl.searchParams.set('per-page', '5');
  searchUrl.searchParams.set('mailto', contact);
  searchUrl.searchParams.set('select', requestFields);
  const response = await fetchJson(searchUrl);
  const candidate = (response?.results ?? [])
    .map((work) => ({ work, similarity: titleSimilarity(publication.title, work.display_name ?? '') }))
    .filter(({ work, similarity }) => similarity >= 0.96 && hasSiteAuthor(work))
    .sort((a, b) => b.similarity - a.similarity)[0];
  return candidate ? { work: candidate.work, matchedBy: 'strict-title' } : null;
}

function orderedYearCounts(counts) {
  return Object.fromEntries(Object.entries(counts)
    .filter(([year, count]) => /^\d{4}$/.test(year) && Number.isInteger(count) && count >= 0)
    .sort(([left], [right]) => left.localeCompare(right)));
}

function entryCore(work, publication, matchedBy) {
  const countsByYear = orderedYearCounts(Object.fromEntries((work.counts_by_year ?? []).map((item) => [String(item.year), item.cited_by_count])));
  return {
    publicationId: publication.id,
    title: work.display_name,
    doi: publication.doi,
    openAlexId: work.id,
    matchedBy,
    totalCitations: Number.isInteger(work.cited_by_count) ? work.cited_by_count : 0,
    countsByYear,
    source,
  };
}

function comparableEntry(entry) {
  if (!entry) return null;
  const { updatedAt: _updatedAt, ...core } = entry;
  return core;
}

const nextWorks = {};
const failures = [];
let matched = 0;

for (const publication of [...publications].sort((a, b) => a.id.localeCompare(b.id))) {
  try {
    const match = await findWork(publication);
    if (!match) {
      if (existing.works?.[publication.id]) nextWorks[publication.id] = existing.works[publication.id];
      failures.push(`${publication.id}: no strict match`);
    } else {
      const core = entryCore(match.work, publication, match.matchedBy);
      const previous = existing.works?.[publication.id];
      nextWorks[publication.id] = JSON.stringify(comparableEntry(previous)) === JSON.stringify(core)
        ? previous
        : { ...core, updatedAt: now };
      matched += 1;
    }
  } catch (error) {
    if (existing.works?.[publication.id]) nextWorks[publication.id] = existing.works[publication.id];
    failures.push(`${publication.id}: ${error instanceof Error ? error.message : String(error)}`);
  }
  await wait(160);
}

const aggregateCounts = {};
let totalCitations = 0;
for (const entry of Object.values(nextWorks)) {
  totalCitations += entry.totalCitations;
  for (const [year, count] of Object.entries(entry.countsByYear)) aggregateCounts[year] = (aggregateCounts[year] ?? 0) + count;
}

const corePayload = {
  aggregate: { totalCitations, countsByYear: orderedYearCounts(aggregateCounts) },
  works: Object.fromEntries(Object.entries(nextWorks).sort(([left], [right]) => left.localeCompare(right))),
};
const existingCore = { aggregate: existing.aggregate, works: existing.works };

if (JSON.stringify(existingCore) === JSON.stringify(corePayload)) {
  console.log(`Citation data unchanged. Matched ${matched}/${publications.length}; retained ${Object.keys(nextWorks).length} records.`);
  if (failures.length) console.warn(`Fallback retained previous data for unresolved works:\n- ${failures.join('\n- ')}`);
} else {
  const payload = {
    schemaVersion: 1,
    source,
    updatedAt: now,
    status: failures.length ? 'partial' : 'ok',
    ...corePayload,
  };
  writeFileSync(outputUrl, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Citation data updated. Matched ${matched}/${publications.length}; retained ${Object.keys(nextWorks).length} records.`);
  if (failures.length) console.warn(`Partial update; unresolved works:\n- ${failures.join('\n- ')}`);
}
