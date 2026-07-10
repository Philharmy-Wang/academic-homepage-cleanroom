import { expect, test } from '@playwright/test';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const routes = [
  '', 'research/', 'publications/', 'projects/', 'datasets/', 'awards/', 'cv/',
  'zh/', 'zh/research/', 'zh/publications/', 'zh/projects/', 'zh/datasets/', 'zh/awards/', 'zh/cv/',
];
const distRoot = resolve('dist');
const prefix = '/academic-homepage-cleanroom';
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
