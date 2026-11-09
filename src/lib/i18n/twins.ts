import { LOCALES, localePath } from "@/lib/i18n/locales"

/** 050, 051: which pages exist in which languages, as base paths (the Hebrew
 *  address, without a language prefix). Pure data, safe in the proxy (edge).
 *  The site pages exist in every language of LOCALES; an article only in the
 *  languages it is written in (content/articles/<slug>.mdx is Hebrew,
 *  <slug>-en.mdx English). A page missing here is never redirected and gets no
 *  hreflang pair. */
export const SITE_PAGES: readonly string[] = [
  "/",
  "/features",
  "/for-who",
  "/pricing",
  "/faq",
  "/contact",
  "/blog",
  "/terms",
  "/privacy",
  "/cookies",
  "/accessibility",
  "/cancel",
  "/acceptable-use",
  "/account-deletion",
]

const ALL = LOCALES.map((l) => l.code)
const HE_EN = ["he", "en"]
export const ARTICLE_LOCALES: Readonly<Record<string, readonly string[]>> = {
  automation: HE_EN,
  "guide-clients": HE_EN,
  "guide-leads": HE_EN,
  "guide-no-ads": HE_EN,
  "guide-promote": HE_EN,
  "guide-rank-fast": HE_EN,
  "guide-seo": HE_EN,
  "guide-small-business": HE_EN,
  "guide-traffic": HE_EN,
  "seo-ai-engine": HE_EN,
  "slow-site": HE_EN,
  "wordpress-vs": HE_EN,
}

/** The languages a page (by base path) exists in; [] for a page not listed. */
export function localesOf(base: string): readonly string[] {
  if (SITE_PAGES.includes(base)) return ALL
  const m = /^\/blog\/([a-z0-9-]+)$/.exec(base)
  return (m && ARTICLE_LOCALES[m[1]]) || []
}

/** The page's address in each language it exists in. */
export function twinPaths(base: string): Record<string, string> {
  return Object.fromEntries(localesOf(base).filter((c) => LOCALES.some((l) => l.code === c)).map((c) => [c, localePath(base, c)]))
}
