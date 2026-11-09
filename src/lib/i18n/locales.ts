/**
 * 051: the one list of the site's languages. Everything that knows about
 * languages reads it: the language switch (header and footer), hreflang and the
 * sitemap, the first-visit redirect (proxy) and the language prompt. Hebrew is
 * at the root ("/pricing"), every other language under its own prefix
 * ("/en/pricing", later "/fr/pricing"). A new language is one more entry here
 * (and its pages). Pure data and helpers: safe in the proxy (edge), the server
 * and the browser.
 */
export type LocaleInfo = {
  readonly code: string
  /** the language's name in the language itself */
  readonly name: string
  /** the short label (header, up to 1060px) */
  readonly short: string
  readonly dir: "rtl" | "ltr"
  /** "" for the root language, else "/<code>" */
  readonly prefix: string
}

export const LOCALES: readonly LocaleInfo[] = [
  { code: "he", name: "עברית", short: "עב", dir: "rtl", prefix: "" },
  { code: "en", name: "English", short: "EN", dir: "ltr", prefix: "/en" },
]

/** The root language (no prefix) and the one for everyone else: x-default, and
 *  the first visit when none of the browser's languages is on the site. */
export const ROOT_LOCALE = "he"
export const DEFAULT_LOCALE = "en"

/** Countries whose language the language prompt may offer (039, 050). */
export const COUNTRY_LOCALE: Readonly<Record<string, string>> = { IL: "he" }

export const localeByCode = (code: string | null | undefined) => LOCALES.find((l) => l.code === code)

/** The language of a path: the locale whose prefix it starts with, else the root one. */
export function localeOf(pathname: string): LocaleInfo {
  return (
    LOCALES.find((l) => l.prefix && (pathname === l.prefix || pathname.startsWith(l.prefix + "/"))) ??
    (localeByCode(ROOT_LOCALE) as LocaleInfo)
  )
}

/** A path without its language prefix ("/en/pricing" → "/pricing", "/en" → "/"). */
export function basePath(pathname: string): string {
  const { prefix } = localeOf(pathname)
  return prefix ? pathname.slice(prefix.length) || "/" : pathname
}

/** The same page in another language ("/pricing", "en" → "/en/pricing"). */
export function localePath(base: string, code: string): string {
  const l = localeByCode(code)
  if (!l || !l.prefix) return base
  return base === "/" ? l.prefix : l.prefix + base
}

/** A page's address in every language, for pages that exist in all of them. */
export function allLocalePaths(base: string): Record<string, string> {
  return Object.fromEntries(LOCALES.map((l) => [l.code, localePath(base, l.code)]))
}
