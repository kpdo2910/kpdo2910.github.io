import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES } from '../i18n/ui.js';

// Entry ids look like 'ja/my-post': the language folder, then the slug.
function splitId(id) {
  const [lang, ...rest] = id.split('/');
  return { lang, slug: rest.join('/') };
}

// Posts for one language, newest first. A post without a translation in `locale`
// falls back to English (or whichever language it was written in) and is flagged
// so the page can say so. Drafts only show up in `astro dev`.
export async function getPosts(locale) {
  const entries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);

  const bySlug = new Map();
  for (const entry of entries) {
    const { lang, slug } = splitId(entry.id);
    if (!LOCALES.includes(lang) || !slug) {
      console.warn(`[blog] Skipping "${entry.id}": put posts in src/content/blog/<${LOCALES.join('|')}>/`);
      continue;
    }
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug).set(lang, entry);
  }

  return [...bySlug]
    .map(([slug, versions]) => {
      const entry = versions.get(locale) ?? versions.get(DEFAULT_LOCALE) ?? versions.values().next().value;
      const { lang } = splitId(entry.id);
      return { slug, entry, lang, isFallback: lang !== locale, translations: [...versions.keys()] };
    })
    .sort((a, b) => b.entry.data.date - a.entry.data.date);
}
