import { profile } from '../src/data/profile.ts';
import { publications } from '../src/data/publications.ts';
import { projects } from '../src/data/projects.ts';
import { awards } from '../src/data/awards.ts';
import { patents } from '../src/data/patents.ts';
import { news } from '../src/data/news.ts';
import { datasets } from '../src/data/datasets.ts';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const citations = JSON.parse(readFileSync(new URL('../src/data/generated/citations.json', import.meta.url), 'utf8'));

const errors = [];
const invalidPlaceholders = new Set(['', 'To be verified', '待核验', 'Unknown']);
const forbiddenKeys = new Set(['brid', 'certificateNumber', 'certificate_number', 'privatePath', 'serverPath', 'internalUrl']);
const publicationGroups = new Set(['First-author Publications', 'Co-authored Publications', 'Chinese Publications']);
const projectStatuses = new Set(['Ongoing|在研', 'Completed|已结题']);
const awardCategories = new Set(['Graduate Division|研究生组', 'National Competition|全国性赛事', 'International Competition|国际赛事']);
const doiPattern = /^10\.\d{4,9}\/\S+$/i;

function requireBilingual(value, label) {
  if (!value || typeof value.en !== 'string' || !value.en.trim() || typeof value.zh !== 'string' || !value.zh.trim()) errors.push(`${label} 缺少中英文内容`);
}

function uniqueIds(items, label) {
  const ids = new Set();
  for (const item of items) {
    if (!item.id || ids.has(item.id)) errors.push(`${label} ID 无效或重复：${item.id}`);
    ids.add(item.id);
  }
}

function checkUrl(value, label) {
  try {
    const url = new URL(value);
    if (!['https:', 'mailto:'].includes(url.protocol)) errors.push(`${label} 使用不允许的协议`);
  } catch {
    errors.push(`${label} URL 无效：${value}`);
  }
}

function inspectKeys(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, index) => inspectKeys(item, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) errors.push(`${path}.${key} 为禁止字段`);
    inspectKeys(child, `${path}.${key}`);
  }
}

uniqueIds(publications, 'publications');
uniqueIds(projects, 'projects');
uniqueIds(awards, 'awards');
uniqueIds(patents, 'patents');
uniqueIds(datasets, 'datasets');

for (const publication of publications) {
  if (!Number.isInteger(publication.year) || publication.year < 1900 || publication.year > 2100) errors.push(`${publication.id} 年份无效`);
  if (!publication.authors.length) errors.push(`${publication.id} 作者为空`);
  if (!publication.authors.some((author) => author.self)) errors.push(`${publication.id} 缺少 self 作者`);
  if (invalidPlaceholders.has(publication.title) || invalidPlaceholders.has(publication.venue)) errors.push(`${publication.id} 含未核验的公开占位符`);
  if (!publicationGroups.has(publication.group)) errors.push(`${publication.id} 分组无效：${publication.group}`);
  if (publication.doi && !doiPattern.test(publication.doi)) errors.push(`${publication.id} DOI 格式无效：${publication.doi}`);
  requireBilingual(publication.role, `${publication.id}.role`);
  requireBilingual(publication.contribution, `${publication.id}.contribution`);
  for (const link of publication.links) checkUrl(link.url, `${publication.id}.${link.label}`);
  for (const [label, url] of Object.entries({ publisherUrl: publication.publisherUrl, pdfUrl: publication.pdfUrl, codeUrl: publication.codeUrl, datasetUrl: publication.datasetUrl, projectUrl: publication.projectUrl, scholarUrl: publication.scholarUrl })) if (url) checkUrl(url, `${publication.id}.${label}`);
  for (const metric of publication.metrics) {
    if (invalidPlaceholders.has(metric.value)) errors.push(`${publication.id} 指标 ${metric.label} 未核验`);
    if (metric.verifiedYear !== undefined && (!Number.isInteger(metric.verifiedYear) || metric.verifiedYear < 1900 || metric.verifiedYear > 2100)) errors.push(`${publication.id} 指标 ${metric.label} 年份无效`);
    if (metric.verifiedYear !== undefined && !metric.source?.trim()) errors.push(`${publication.id} 指标 ${metric.label} 缺少来源`);
  }
  if (publication.figure) {
    requireBilingual(publication.figure.alt, `${publication.id}.figure.alt`);
    if (!Number.isInteger(publication.figure.width) || publication.figure.width <= 0 || !Number.isInteger(publication.figure.height) || publication.figure.height <= 0) errors.push(`${publication.id} figure 尺寸无效`);
    if (!publication.figure.sourceNote.trim()) errors.push(`${publication.id} figure 缺少内部来源说明`);
    const figurePath = resolve('public', publication.figure.src.replace(/^\//, ''));
    if (!existsSync(figurePath)) errors.push(`${publication.id} figure 文件不存在：${publication.figure.src}`);
  }
}

const selectedCount = publications.filter((item) => item.selected).length;
if (selectedCount < 4 || selectedCount > 5) errors.push(`selected 论文数量应为 4–5，当前为 ${selectedCount}`);

for (const project of projects) {
  requireBilingual(project.title, `${project.id}.title`);
  requireBilingual(project.project, `${project.id}.project`);
  requireBilingual(project.role, `${project.id}.role`);
  if (project.period && typeof project.period !== 'string') requireBilingual(project.period, `${project.id}.period`);
  if (project.status && !projectStatuses.has(`${project.status.en}|${project.status.zh}`)) errors.push(`${project.id} 状态无效：${project.status.en}/${project.status.zh}`);
}
for (const award of awards) {
  requireBilingual(award.title, `${award.id}.title`);
  if (!/^\d{4}(?:[–/-]\d{4})?$/.test(award.year)) errors.push(`${award.id} 年份格式无效：${award.year}`);
  if (award.category && !awardCategories.has(`${award.category.en}|${award.category.zh}`)) errors.push(`${award.id} 赛事类别无效：${award.category.en}/${award.category.zh}`);
}
for (const item of datasets) { requireBilingual(item.title, `${item.id}.title`); requireBilingual(item.status, `${item.id}.status`); }
for (const item of news) requireBilingual(item.title, `news.${item.date}`);

checkUrl(profile.github, 'profile.github');
checkUrl(profile.scholar, 'profile.scholar');
checkUrl(`mailto:${profile.email}`, 'profile.email');
if (profile.name.zh !== 'Guanbo Wang') errors.push('中文页面姓名必须为 Guanbo Wang');
for (const publication of publications) if (!publication.authors.some((author) => author.self && ['Guanbo Wang', 'Wang Guanbo'].includes(author.name))) errors.push(`${publication.id} 本人作者名不符合公开显示规则`);

if (citations.source !== 'OpenAlex') errors.push('citation 数据源必须为 OpenAlex');
if (!['ok', 'partial', 'unavailable'].includes(citations.status)) errors.push(`citation 状态无效：${citations.status}`);
const publicationIds = new Set(publications.map((publication) => publication.id));
for (const [id, entry] of Object.entries(citations.works ?? {})) {
  if (!publicationIds.has(id)) errors.push(`citation 存在未知 publicationId：${id}`);
  if (!Number.isInteger(entry.totalCitations) || entry.totalCitations < 0) errors.push(`${id} citation totalCitations 无效`);
  if (!/^https:\/\/openalex\.org\/W\d+$/.test(entry.openAlexId)) errors.push(`${id} OpenAlex ID 无效：${entry.openAlexId}`);
  for (const [year, count] of Object.entries(entry.countsByYear ?? {})) if (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > 2100 || !Number.isInteger(count) || count < 0) errors.push(`${id} citation countsByYear 无效：${year}=${count}`);
}

inspectKeys({ profile, publications, projects, awards, patents, news, datasets, citations });

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`数据验证通过：${publications.length} 篇论文，${selectedCount} 篇代表作，${projects.length} 个项目，${awards.length} 项荣誉，${patents.length} 项专利，${datasets.length} 类资源。`);
