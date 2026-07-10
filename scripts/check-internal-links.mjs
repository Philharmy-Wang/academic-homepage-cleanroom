import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve('dist');
const base = '/academic-homepage-cleanroom';
if (!existsSync(root)) {
  console.error('链接检查失败：dist 不存在，请先运行 npm run build。');
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const errors = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const raw = match[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
    const pathname = decodeURI(raw.split(/[?#]/)[0]);
    if (!pathname.startsWith(base)) {
      errors.push(`${relative(root, file)}: 缺少 base path -> ${raw}`);
      continue;
    }
    const local = pathname.slice(base.length) || '/';
    const target = local.endsWith('/') ? join(root, local, 'index.html') : join(root, local);
    checked += 1;
    if (!existsSync(target)) errors.push(`${relative(root, file)}: 目标不存在 -> ${raw}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`内部链接检查通过：${htmlFiles.length} 个页面，${checked} 个内部链接或资源。`);
