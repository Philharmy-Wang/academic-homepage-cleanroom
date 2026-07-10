import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve('.');
const excludedDirs = new Set(['.git', 'node_modules', 'dist', '.astro', 'artifacts', 'test-results', 'playwright-report']);
const excludedFiles = new Set(['package-lock.json']);
const definitionFiles = new Set(['scripts/privacy-audit.mjs', 'scripts/validate-data.mjs']);
const policyFiles = new Set(['reports/CONTENT_AUDIT.md', 'reports/PRIVACY_AUDIT.md']);
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt', '.yml', '.yaml']);
const patterns = [
  ['BRID', /\bBRID\b/i],
  ['identity number', /身份证/],
  ['mobile number label', /手机号/],
  ['password assignment', /password\s*[:=]\s*["'][^"']+/i],
  ['token assignment', /(?:api[_-]?)?token\s*[:=]\s*["'][A-Za-z0-9._-]{8,}/i],
  ['secret assignment', /secret\s*[:=]\s*["'][A-Za-z0-9._-]{8,}/i],
  ['intranet label', /内网/],
  ['private IPv4 10/8', /\b10\.(?:\d{1,3}\.){2}\d{1,3}\b/],
  ['private IPv4 192.168/16', /\b192\.168\.(?:\d{1,3}\.)\d{1,3}\b/],
  ['private IPv4 172.16/16', /\b172\.16\.(?:\d{1,3}\.)\d{1,3}\b/],
  ['private workspace link', /Notion/i],
  ['cluster path', /\/lustre\//i],
  ['home path', /\/home\//i],
  ['Windows user path', /C:\\Users\\/i],
  ['certificate field', /certificate_(?:number|no)|certificateNumber/i],
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return excludedDirs.has(entry.name) ? [] : walk(join(directory, entry.name));
    return [join(directory, entry.name)];
  });
}

const findings = [];
for (const file of walk(root)) {
  const name = relative(root, file).replaceAll('\\', '/');
  if (excludedFiles.has(name) || !textExtensions.has(extname(file).toLowerCase()) || definitionFiles.has(name)) continue;
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const [label, pattern] of patterns) {
      if (pattern.test(line) && !(policyFiles.has(name) && line.includes('[policy-only]'))) findings.push(`${name}:${index + 1} ${label}`);
    }
  });
}

if (findings.length) {
  console.error(`隐私审计失败（${findings.length} 项）：\n${findings.join('\n')}`);
  process.exit(1);
}
console.log('隐私审计通过：未发现凭据、私有网络地址、私有路径或禁止公开的个人标识字段。');
