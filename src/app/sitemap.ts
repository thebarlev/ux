import type { MetadataRoute } from "next"
import { allArticles } from "contentlayer/generated"

import { LOCALES, localePath } from "@/lib/i18n/locales"
import { SITE_PAGES } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"

const BASE_URL = "https://uxellent.com"

// 051: every page in every language it exists in (src/lib/i18n/locales.ts), each
// with its hreflang alternates (every language of that page, itself included,
// and x-default on English). The 404 is not here.
const abs = (paths: Record<string, string>) => Object.fromEntries(Object.entries(paths).map(([k, v]) => [k, BASE_URL + v]))
const articleLocale = (a: (typeof allArticles)[number]) => ((a.locale as string | undefined) === "en" ? "en" : "he")

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = SITE_PAGES.flatMap((base) => {
    const paths = Object.fromEntries(LOCALES.map((l) => [l.code, localePath(base, l.code)]))
    const languages = localeAlternates(abs(paths))
    return LOCALES.map((l) => ({
      url: BASE_URL + paths[l.code],
      lastModified: now,
      changeFrequency: base === "/" || base === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: base === "/" ? 1 : 0.8,
      alternates: languages ? { languages } : undefined,
    }))
  })
  const articles: MetadataRoute.Sitemap = allArticles.map((a) => {
    const base = `/blog/${a.slug}`
    const paths = Object.fromEntries(
      allArticles.filter((b) => b.slug === a.slug).map((b) => [articleLocale(b), localePath(base, articleLocale(b))]),
    )
    const languages = localeAlternates(abs(paths))
    return {
      url: BASE_URL + localePath(base, articleLocale(a)),
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: languages ? { languages } : undefined,
    }
  })
  return [...pages, ...articles]
}
