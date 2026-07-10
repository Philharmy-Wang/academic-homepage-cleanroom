import { profile } from '../src/data/profile.ts';
import { publications } from '../src/data/publications.ts';
import { projects } from '../src/data/projects.ts';
import { awards } from '../src/data/awards.ts';
import { patents } from '../src/data/patents.ts';
import { news } from '../src/data/news.ts';
import { datasets } from '../src/data/datasets.ts';

const errors = [];
const invalidPlaceholders = new Set(['', 'To be verified', '待核验', 'Unknown']);
const forbiddenKeys = new Set(['brid', 'certificateNumber', 'certificate_number', 'privatePath', 'serverPath', 'internalUrl']);

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
  requireBilingual(publication.role, `${publication.id}.role`);
  requireBilingual(publication.contribution, `${publication.id}.contribution`);
  for (const link of publication.links) checkUrl(link.url, `${publication.id}.${link.label}`);
  for (const metric of publication.metrics) if (invalidPlaceholders.has(metric.value)) errors.push(`${publication.id} 指标 ${metric.label} 未核验`);
}

const selectedCount = publications.filter((item) => item.selected).length;
if (selectedCount < 4 || selectedCount > 5) errors.push(`selected 论文数量应为 4–5，当前为 ${selectedCount}`);

for (const project of projects) { requireBilingual(project.title, `${project.id}.title`); requireBilingual(project.project, `${project.id}.project`); requireBilingual(project.role, `${project.id}.role`); }
for (const award of awards) { requireBilingual(award.title, `${award.id}.title`); if (!/^\d{4}(?:[–/-]\d{4})?$/.test(award.year)) errors.push(`${award.id} 年份格式无效：${award.year}`); }
for (const item of datasets) { requireBilingual(item.title, `${item.id}.title`); requireBilingual(item.status, `${item.id}.status`); }
for (const item of news) requireBilingual(item.title, `news.${item.date}`);

checkUrl(profile.github, 'profile.github');
checkUrl(profile.scholar, 'profile.scholar');
checkUrl(`mailto:${profile.email}`, 'profile.email');
inspectKeys({ profile, publications, projects, awards, patents, news, datasets });

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`数据验证通过：${publications.length} 篇论文，${selectedCount} 篇代表作，${projects.length} 个项目，${awards.length} 项荣誉，${patents.length} 项专利，${datasets.length} 类资源。`);
