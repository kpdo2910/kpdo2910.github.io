import rss from '@astrojs/rss';
import { SITE } from '../../data/site.js';
import { DEFAULT_LOCALE, LOCALE_META } from '../../i18n/ui.js';
import { localeStaticPaths, localizePath, useTranslations } from '../../i18n/utils.js';
import { getPosts } from '../../lib/posts.js';

// /feed.xml (the old Jekyll feed URL), /ja/feed.xml, /vi/feed.xml
export function getStaticPaths() {
  return localeStaticPaths();
}

export async function GET({ props, site }) {
  const { locale } = props;
  const t = useTranslations(locale);
  const posts = await getPosts(locale);

  return rss({
    title: locale === DEFAULT_LOCALE ? SITE.name : `${SITE.name} · ${LOCALE_META[locale].name}`,
    description: t.blog.intro,
    site,
    items: posts.map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.summary,
      pubDate: post.entry.data.date,
      link: localizePath(`/blog/${post.slug}/`, locale),
      categories: post.entry.data.tags,
    })),
    customData: `<language>${locale}</language>`,
  });
}
