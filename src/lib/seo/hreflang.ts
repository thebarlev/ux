import { DEFAULT_LOCALE, ROOT_LOCALE, allLocalePaths } from "@/lib/i18n/locales"

/**
 * 051: hreflang alternates from the one language list (src/lib/i18n/locales.ts):
 * every language the page exists in, the page itself included, and x-default
 * on the English address (an international audience), or the Hebrew one when
 * there is no English page. A language the page does not exist in is left out.
 */
export function localeAlternates(paths: Readonly<Record<string, string>>) {
  const xDefault = paths[DEFAULT_LOCALE] ?? paths[ROOT_LOCALE]
  return Object.keys(paths).length > 1 && xDefault ? { ...paths, "x-default": xDefault } : undefined
}

/** A site page that exists in every language, by its base (Hebrew) path. */
export function pageAlternates(base: string) {
  return localeAlternates(allLocalePaths(base))
}
