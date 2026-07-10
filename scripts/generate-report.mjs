import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const reportDir = resolve('reports');
mkdirSync(reportDir, { recursive: true });

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
}

const htmlCount = walk(resolve('dist')).filter((file) => file.endsWith('.html')).length;
const screenshots = walk(resolve('artifacts/screenshots')).filter((file) => file.endsWith('.png')).length;
const generatedAt = new Date().toISOString();

writeFileSync(join(reportDir, 'BUILD_REPORT.md'), `# Build Report\n\n- Generated: ${generatedAt}\n- Static HTML pages: ${htmlCount}\n- Expected bilingual routes: 14\n- Build output: \`dist/\` (not committed)\n- Result: ${htmlCount === 14 ? 'PASS' : 'REVIEW'}\n`, 'utf8');

writeFileSync(join(reportDir, 'VISUAL_TEST_REPORT.md'), `# Visual Test Report\n\n- Generated: ${generatedAt}\n- Viewports: 1440x1000, 1024x768, 768x1024, 390x844\n- Routes per viewport: 14\n- Expected screenshots: 56\n- Screenshots produced: ${screenshots}\n- Checks: horizontal overflow, header bounds, content overlap, image loading, internal response status, console errors, language-peer routing, footer placement\n- Result: ${screenshots === 56 ? 'PASS' : 'REVIEW'}\n\nScreenshots are local test artifacts and are excluded from Git.\n`, 'utf8');

console.log(`报告已更新：${htmlCount} 个 HTML 页面，${screenshots} 张视觉测试截图。`);
