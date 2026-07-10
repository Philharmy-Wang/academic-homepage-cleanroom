import { expect, test } from '@playwright/test';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const routes = [
  '', 'research/', 'publications/', 'projects/', 'datasets/', 'awards/', 'cv/',
  'zh/', 'zh/research/', 'zh/publications/', 'zh/projects/', 'zh/datasets/', 'zh/awards/', 'zh/cv/',
];
const distRoot = resolve('dist');
const prefix = '/academic-homepage-cleanroom';
const developerCopy = [
  'Authors are stored as structured data', '作者信息采用结构化数据维护',
  'Direct links appear only', '仅在公开来源中已有有效链接时显示直接入口',
  '数据文件', '自动化更新说明',
];
const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8',
};

for (const route of routes) {
  test(`${route || 'home'} renders safely`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const failedResponses: string[] = [];
    await page.route('https://site.test/**', async (intercepted) => {
      const url = new URL(intercepted.request().url());
      if (!url.pathname.startsWith(prefix)) {
        await intercepted.fulfill({ status: 404, body: 'Not found' });
        return;
      }
      const requested = decodeURIComponent(url.pathname.slice(prefix.length)) || '/';
      const relativePath = normalize(requested).replace(/^([/\\])+/, '');
      let target = join(distRoot, relativePath);
      if (!target.startsWith(distRoot)) {
        await intercepted.fulfill({ status: 403, body: 'Forbidden' });
        return;
      }
      try {
        const info = await stat(target);
        if (requested.endsWith('/') || info.isDirectory()) target = join(target, 'index.html');
        await intercepted.fulfill({ status: 200, contentType: contentTypes[extname(target)] ?? 'application/octet-stream', body: await readFile(target) });
      } catch {
        await intercepted.fulfill({ status: 404, body: 'Not found' });
      }
    });
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('response', (response) => {
      if (response.url().startsWith('https://site.test') && response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
    });

    const response = await page.goto(route || './', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);

    const visibleIcons = await page.locator('.icon').evaluateAll((icons) => icons.map((icon) => icon.getBoundingClientRect()).filter((box) => box.width > 0 && box.height > 0));
    for (const icon of visibleIcons) {
      expect(icon.left).toBeGreaterThanOrEqual(-1);
      expect(icon.right).toBeLessThanOrEqual(testInfo.project.use.viewport!.width + 1);
      expect(icon.width).toBeLessThanOrEqual(64);
      expect(icon.height).toBeLessThanOrEqual(64);
    }

    const header = await page.locator('.site-header').boundingBox();
    expect(header).not.toBeNull();
    expect(header!.x).toBeGreaterThanOrEqual(-1);
    expect(header!.x + header!.width).toBeLessThanOrEqual(testInfo.project.use.viewport!.width + 1);

    const imageStates = await page.locator('img').evaluateAll((images) => images.map((image) => ({
      complete: (image as HTMLImageElement).complete,
      width: (image as HTMLImageElement).naturalWidth,
      height: (image as HTMLImageElement).naturalHeight,
      displayedRatio: (image as HTMLImageElement).getBoundingClientRect().width / (image as HTMLImageElement).getBoundingClientRect().height,
      naturalRatio: (image as HTMLImageElement).naturalWidth / (image as HTMLImageElement).naturalHeight,
    })));
    for (const image of imageStates) {
      expect(image.complete).toBe(true);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(Math.abs(image.displayedRatio - image.naturalRatio)).toBeLessThan(0.02);
    }

    const bodyText = await page.locator('body').innerText();
    for (const prohibited of developerCopy) expect(bodyText).not.toContain(prohibited);
    if (route.startsWith('zh/')) {
      expect(bodyText).not.toContain('王冠博');
      expect(await page.title()).not.toContain('王冠博');
      expect(await page.locator('meta[name="description"]').getAttribute('content')).not.toContain('王冠博');
    }

    if (route === '' || route === 'zh/') {
      const hero = page.locator('.hero');
      await expect(hero).toBeVisible();
      await expect(hero.locator('h1')).toHaveText('Guanbo Wang');
      await expect(hero.locator('.research-icon, .hero-scope-icon').first()).toBeVisible();
      const headingBox = await hero.locator('h1').boundingBox();
      const portraitBox = await hero.locator('.portrait-panel').boundingBox();
      expect(headingBox).not.toBeNull();
      expect(portraitBox).not.toBeNull();
      if (testInfo.project.use.viewport!.width > 720) expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(portraitBox!.x + 1);
      else expect(headingBox!.y + headingBox!.height).toBeLessThan(portraitBox!.y);
      await expect(page.locator('.research-card .research-icon')).toHaveCount(6);
    }

    if (route === 'research/' || route === 'zh/research/') await expect(page.locator('.research-card .research-icon')).toHaveCount(6);

    if (route === 'publications/' || route === 'zh/publications/') {
      const groups = page.locator('[data-publication-group]');
      await expect(groups).toHaveCount(4);
      await expect(page.getByText(route.startsWith('zh/') ? '其他论文' : 'Other Publications', { exact: true })).toHaveCount(0);
      const coauthored = page.locator('[data-publication-group="coauthored"]');
      await expect(coauthored.getByText('Multi-Scale Enhanced Contextual Transformer Network for Forest Fire Detection', { exact: true })).toBeVisible();
      await expect(page.locator('.publication-figure img')).toHaveCount(5);
      expect(await page.locator('.publication-card:not(.has-figure)').count()).toBeGreaterThan(0);
      await expect(page.locator('.publication-card:not(.has-figure)').first().locator('.publication-body')).toBeVisible();
      const trend = page.locator('.citation-plot, .citation-fallback');
      await expect(trend).toBeVisible();
      const trendBox = await trend.boundingBox();
      const trendSectionBox = await page.locator('.citation-trend').boundingBox();
      expect(trendBox).not.toBeNull();
      expect(trendSectionBox).not.toBeNull();
      expect(trendBox!.x).toBeGreaterThanOrEqual(trendSectionBox!.x - 1);
      expect(trendBox!.x + trendBox!.width).toBeLessThanOrEqual(trendSectionBox!.x + trendSectionBox!.width + 1);
    }

    if (route === 'projects/' || route === 'zh/projects/') {
      await expect(page.locator('#border-monitoring')).toContainText(route.startsWith('zh/') ? '已结题' : 'Completed');
      await expect(page.locator('#vehicular-edge')).toContainText('2020.11–2021.11');
      await expect(page.locator('#vehicular-edge')).toContainText(route.startsWith('zh/') ? '已结题' : 'Completed');
      await expect(page.locator('#nsfc-multilevel-wildfire')).toContainText(route.startsWith('zh/') ? '2025.08 起参与' : 'Participating since 2025.08');
    }

    if (route === 'awards/' || route === 'zh/awards/') {
      await expect(page.locator('#shuwei-2023')).toContainText(route.startsWith('zh/') ? '研究生组' : 'Graduate Division');
      await expect(page.locator('#huawei-math-2022')).toContainText(route.startsWith('zh/') ? '全国性赛事' : 'National Competition');
      await expect(page.locator('#mcm-2021')).toContainText(route.startsWith('zh/') ? '国际赛事' : 'International Competition');
    }

    const languageSwitch = page.locator('.language-switch');
    const href = await languageSwitch.getAttribute('href');
    const isChinese = route.startsWith('zh/');
    const unprefixed = isChinese ? route.replace(/^zh\//, '') : route;
    const expectedPeer = isChinese
      ? `/academic-homepage-cleanroom/${unprefixed}`
      : `/academic-homepage-cleanroom/zh/${unprefixed}`;
    expect(href).toBe(expectedPeer);

    if (testInfo.project.use.viewport!.width > 940) await expect(languageSwitch).toBeVisible();

    const buttons = page.locator('a.button');
    for (let index = 0; index < await buttons.count(); index += 1) {
      await expect(buttons.nth(index)).toBeVisible();
      const box = await buttons.nth(index).boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.height ?? 0).toBeGreaterThan(0);
    }

    if (testInfo.project.use.viewport!.width <= 940) {
      const menu = page.locator('.menu-toggle');
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('.site-nav')).toBeVisible();
      await expect(languageSwitch).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
    }

    const footerState = await page.locator('.site-footer').evaluate((footer) => ({
      bottom: footer.getBoundingClientRect().bottom + window.scrollY,
      documentHeight: document.documentElement.scrollHeight,
    }));
    expect(Math.abs(footerState.documentHeight - footerState.bottom)).toBeLessThanOrEqual(2);
    expect(consoleErrors).toEqual([]);
    expect(failedResponses).toEqual([]);

    const slug = route ? route.replaceAll('/', '-').replace(/-$/, '') : 'en-home';
    const screenshotDir = join(process.cwd(), 'artifacts', 'screenshots', testInfo.project.name);
    await mkdir(screenshotDir, { recursive: true });
    await page.screenshot({ path: join(screenshotDir, `${slug}.png`), fullPage: true });
  });
}
