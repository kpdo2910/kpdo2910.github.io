import { DEFAULT_LOCALE, LOCALES, UI } from './ui.js';

export function useTranslations(locale) {
  return UI[locale] ?? UI[DEFAULT_LOCALE];
}

// '/blog/' -> '/blog/' for English, '/ja/blog/' for Japanese.
export function localizePath(path, locale) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? normalized : `/${locale}${normalized}`;
}

// The default language lives at the site root, so its `[...locale]` param is empty.
export function localeParam(locale) {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

export function localeStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }));
}

// 'en' -> "English" / "英語" / "tiếng Anh", for sentences written in `locale`.
export function languageName(code, locale) {
  const name = new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? code;
  return locale === 'vi' ? name.charAt(0).toLocaleLowerCase('vi') + name.slice(1) : name;
}

// Data fields are either one string for every language or an object keyed by language.
export function localized(value, locale) {
  if (value == null || typeof value === 'string') return value;
  return value[locale] ?? value[DEFAULT_LOCALE];
}
