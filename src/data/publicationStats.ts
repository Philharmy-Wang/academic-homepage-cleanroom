import scholarSnapshot from './manual/google-scholar-snapshot.json';
import { publications } from './publications';
import type { BilingualText, Publication } from './types';

export const normalizeDoi = (doi: string | null) => doi?.trim().toLowerCase().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '') ?? null;
export const normalizeTitle = (title: string) => title.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
export const publicationKey = (publication: Publication) => normalizeDoi(publication.doi) ?? `title:${normalizeTitle(publication.title)}`;

export const deduplicatePublications = (items: Publication[]) => {
  const seen = new Set<string>();
  return items.filter((publication) => {
    const key = publicationKey(publication);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const getPublicationRole = (publication: Publication): BilingualText => {
  const selfIndex = publication.authors.findIndex((author) => author.self);
  if (selfIndex !== 0) return { en: 'Co-author', zh: '合作作者' };
  const hasCoFirstAuthor = publication.authors.some((author, index) => index > 0 && author.coFirst);
  return hasCoFirstAuthor
    ? { en: 'Co-first Author', zh: '共同第一作者' }
    : { en: 'Sole First Author', zh: '唯一第一作者' };
};

export const getScholarCitationCount = (publicationId: string) => {
  const counts = scholarSnapshot.works
    .filter((work) => work.publicationId === publicationId && typeof work.citations === 'number')
    .map((work) => work.citations as number);
  return counts.length ? Math.max(...counts) : null;
};

const verifiedPublications = deduplicatePublications(publications);

export const publicationStats = {
  scholarItemCount: scholarSnapshot.totalItems,
  verifiedPublicationCount: verifiedPublications.length,
  soleFirstAuthorCount: verifiedPublications.filter((publication) => getPublicationRole(publication).en === 'Sole First Author').length,
  casZone1Count: verifiedPublications.filter((publication) => publication.metrics.casZone === 1).length,
  casTopCount: verifiedPublications.filter((publication) => publication.metrics.casTop === true).length,
  casZone1TopCount: verifiedPublications.filter((publication) => publication.metrics.casZone === 1 && publication.metrics.casTop === true).length,
  scholarTotalCitations: scholarSnapshot.totalCitations,
  scholarHIndex: scholarSnapshot.hIndex,
  scholarI10Index: scholarSnapshot.i10Index,
  scholarSnapshot: scholarSnapshot.capturedAt,
} as const;

export { scholarSnapshot, verifiedPublications };
