import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cvPdf from './integrations/cv-pdf.js';

export default defineConfig({
  site: 'https://phongdk.is-a.dev',
  // Keep `npm run dev` looking like the real site.
  devToolbar: { enabled: false },
  // Fetch a page when its link is hovered, so the page transition starts right away.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Astro 7 defaults to 'jsx', which drops spaces between inline elements.
  compressHTML: true,
  // URLs from the old Jekyll site.
  redirects: {
    '/blog/2025/2025-05-09-flutter-deeplink': '/blog/',
    '/blog/2025': '/blog/',
    '/resume': '/about/',
    '/repositories': '/projects/',
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      // Colors come out as CSS variables; src/styles/prose.css picks the one for the active theme.
      defaultColor: false,
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja', vi: 'vi' } },
      // The /cv/ pages exist to be printed to cv.pdf; About is the page to find.
      filter: (page) => !page.includes('/404') && !page.endsWith('/cv/'),
    }),
    cvPdf(),
  ],
});
