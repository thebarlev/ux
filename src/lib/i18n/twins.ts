/** 050: the Hebrew pages that have an English twin at /en + the same path, the
 *  only ones a first visit may be sent to English from. Pure data, safe in the
 *  proxy (edge). The site pages are the sitemap's list; an article counts only
 *  when it is written in both languages (content/articles/<slug>.mdx and
 *  <slug>-en.mdx). A Hebrew page missing here is simply never redirected. */
export const TWIN_PAGES: readonly string[] = [
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

export const TWIN_ARTICLES: readonly string[] = [
  "automation",
  "guide-clients",
  "guide-leads",
  "guide-no-ads",
  "guide-promote",
  "guide-rank-fast",
  "guide-seo",
  "guide-small-business",
  "guide-traffic",
  "seo-ai-engine",
  "slow-site",
  "wordpress-vs",
]

export function hasEnglishTwin(pathname: string): boolean {
  if (TWIN_PAGES.includes(pathname)) return true
  const m = /^\/blog\/([a-z0-9-]+)$/.exec(pathname)
  return !!m && TWIN_ARTICLES.includes(m[1])
}
