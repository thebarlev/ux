import type { MetadataRoute } from "next"
import { allArticles } from "contentlayer/generated"

const BASE_URL = "https://uxellent.com"

// Every page in both languages (tbl-028); each entry names its twin (hreflang he / en / x-default).
// The 404 is not here.
const PAGES = [
  "",
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
] as const

const he = (p: string) => `${BASE_URL}${p || "/"}`
const en = (p: string) => `${BASE_URL}/en${p}`
const languages = (p: string, twin = true) => (twin ? { he: he(p), en: en(p), "x-default": he(p) } : undefined)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: MetadataRoute.Sitemap = PAGES.flatMap((p) =>
    [he(p), en(p)].map((url) => ({
      url,
      lastModified: now,
      changeFrequency: p === "" || p === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : 0.8,
      alternates: { languages: languages(p) },
    })),
  )
  const articles: MetadataRoute.Sitemap = allArticles.map((a) => {
    const isEn = (a.locale as string | undefined) === "en"
    const p = `/blog/${a.slug}`
    const twin = allArticles.some((b) => b.slug === a.slug && ((b.locale as string | undefined) === "en") !== isEn)
    return {
      url: isEn ? en(p) : he(p),
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languages(p, twin) },
    }
  })
  return [...pages, ...articles]
}
