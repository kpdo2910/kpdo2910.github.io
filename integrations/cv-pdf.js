// Prints the CV page (src/pages/[...locale]/cv.astro) to PDF with headless Chrome: dist/cv.pdf,
// dist/ja/cv.pdf and dist/vi/cv.pdf after `astro build`, and the same URLs on request under
// `astro dev`. It drives the Google Chrome that is already installed (GitHub's Ubuntu runners
// have it too), so no browser gets downloaded; CHROME_PATH can point to another Chrome or Chromium.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { SITE } from '../src/data/site.js';
import { LOCALES } from '../src/i18n/ui.js';
import { localizePath } from '../src/i18n/utils.js';

const PAGE = '/cv/';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Chrome draws the footer outside the page, without the web fonts, so it stays in Latin letters.
function pdfOptions(site) {
  const footer = `
    <div style="width: 100%; padding: 0 16mm; display: flex; justify-content: space-between;
      font: 7.5px Helvetica, Arial, sans-serif; color: #8a8178;">
      <span>${SITE.fullName} · ${new URL(site).host}</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`;
  return {
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', right: '16mm', bottom: '16mm', left: '16mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footer,
    // Real text with structure, so screen readers and CV parsers can read it.
    tagged: true,
    outline: true,
  };
}

function launchChrome() {
  const executablePath = process.env.CHROME_PATH;
  return chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });
}

async function printPage(browser, url, options) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    if (!response?.ok()) throw new Error(`${url} answered ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf(options);
  } finally {
    await page.close();
  }
}

// Serves the built site, so the CV page loads its CSS the way it does on GitHub Pages.
function serve(root) {
  const server = createServer(async (request, response) => {
    const { pathname } = new URL(request.url, 'http://localhost');
    const file = path.join(root, decodeURIComponent(pathname), pathname.endsWith('/') ? 'index.html' : '');
    if (!file.startsWith(root)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      response.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

export default function cvPdf() {
  let site;
  return {
    name: 'cv-pdf',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site;
      },

      // `astro dev`: print the PDF from the dev server each time it's requested.
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use(async (request, response, next) => {
          const pathname = request.url?.split('?')[0];
          const locale = LOCALES.find((code) => pathname === localizePath(SITE.cv, code));
          if (!SITE.cv || !locale) return next();
          let browser;
          try {
            browser = await launchChrome();
            const url = `http://${request.headers.host}${localizePath(PAGE, locale)}`;
            const pdf = await printPage(browser, url, pdfOptions(site));
            response.writeHead(200, { 'content-type': 'application/pdf' });
            response.end(pdf);
          } catch (error) {
            logger.error(`Could not print ${pathname}: ${error.message}`);
            response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
            response.end(error.message);
          } finally {
            await browser?.close();
          }
        });
      },

      'astro:build:done': async ({ dir, logger }) => {
        if (!SITE.cv) return;
        let browser;
        try {
          browser = await launchChrome();
        } catch (error) {
          const message = `Chrome was not found, so the CV PDFs were not made (set CHROME_PATH). ${error.message.split('\n')[0]}`;
          // A deploy without the PDFs would leave the "Download CV" button broken.
          if (process.env.CI) throw new Error(message);
          logger.warn(message);
          return;
        }
        const root = fileURLToPath(dir);
        const server = await serve(root);
        const origin = `http://127.0.0.1:${server.address().port}`;
        try {
          for (const locale of LOCALES) {
            const pdf = await printPage(browser, origin + localizePath(PAGE, locale), pdfOptions(site));
            const file = path.join(root, localizePath(SITE.cv, locale));
            await mkdir(path.dirname(file), { recursive: true });
            await writeFile(file, pdf);
            logger.info(`${localizePath(SITE.cv, locale)} (${Math.round(pdf.length / 1024)} kB)`);
          }
        } finally {
          await browser.close();
          server.close();
        }
      },
    },
  };
}
