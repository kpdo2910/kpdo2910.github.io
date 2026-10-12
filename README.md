# kpdo2910.github.io

Personal site and blog of Kim Phong: <https://phongdk.is-a.dev>

Built with [Astro](https://astro.build) in plain JavaScript, no UI framework. English, Japanese and Vietnamese; light and dark theme.

## Develop

Needs Node.js 24 (`nvm use` reads `.nvmrc`) and Google Chrome, which prints the CV to PDF (or point `CHROME_PATH` at another Chrome or Chromium).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

## Where things live

| What | File |
| --- | --- |
| Interface text and page copy (en / ja / vi) | `src/i18n/ui.js` |
| Social links, CV, blog filter topics | `src/data/site.js` |
| Projects | `src/data/projects.js` |
| Work experience | `src/data/experience.js` |
| Languages, education, certificates (and the CV's frameworks, tools, spoken languages) | `src/data/about.js` |
| Blog posts | `src/content/blog/<en\|ja\|vi>/<slug>.md` |
| Colors and fonts | `src/styles/tokens.css` |

English pages are at `/`, the others at `/ja/` and `/vi/`.

## CV

The CV is built from the same data as the site. `/cv/` (and `/ja/cv/`, `/vi/cv/`) lays it out as an A4 page, and `integrations/cv-pdf.js` prints that page with headless Chrome to `cv.pdf`, `ja/cv.pdf` and `vi/cv.pdf`: during `npm run build`, and on request under `npm run dev`. The "Download CV" button on the About page links to the PDF in the reader's language. Nothing to commit: the PDFs are made fresh on every build.

## Writing a post

Create `src/content/blog/en/my-post.md`:

```md
---
title: "My post"
summary: "One sentence for the post list and RSS."
lead: "Optional intro shown in italics under the title."
date: 2026-10-11
tags: [flutter, tooling]
draft: false
---

The post, in Markdown.
```

A translation uses the same file name under `ja/` or `vi/`. Until it exists, that language shows the original with a short note. Posts with `draft: true` only appear in `npm run dev`.

The filter chips on the blog page come from `BLOG_TOPICS` in `src/data/site.js`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the site and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves. `public/CNAME` keeps the custom domain, and `public/.nojekyll` stops Pages from running Jekyll (which would drop the `_astro/` folder and all the CSS).
