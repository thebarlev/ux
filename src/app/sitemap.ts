import type { MetadataRoute } from "next"
import { allArticles } from "contentlayer/generated"

import { growthGuides } from "@/lib/growth-guides/topics"

const BASE_URL = "https://uxellent.com"

const staticRoutes = [
  // Hebrew
  "",
  "/invoice",
  "/pricing",
  "/privacy",
  "/terms",
  "/contact",
  "/accessibility",
  "/account-deletion",
  "/about",
  "/blog",
  "/growth-guides",
  "/design",
  "/develop",
  "/develop-ai",
  "/portfolio",
  "/marketing/ppc",
  "/seo-ai",
  "/idea-to-product",
  "/en/idea-to-product",
  "/roi",
  // English
  "/en",
  "/en/invoice",
  "/en/pricing",
  "/en/privacy",
  "/en/terms",
  "/en/contact",
  "/en/accessibility",
  "/en/account-deletion",
  "/en/about",
  "/en/blog",
  "/en/design",
  "/en/develop",
  "/en/develop-ai",
  "/en/account-ai",
  "/en/portfolio",
  "/en/marketing/ppc",
  "/en/seo-ai",
  "/en/growth-guides",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/en" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/en" ? 0.95 : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = allArticles.map((article) => {
    const slug = article.slug ?? ""
    const isEn = (article.locale as string | undefined) === "en"
    const path = isEn ? `/en/blog/${slug}` : `/blog/${slug}`
    return {
      url: `${BASE_URL}${path}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  })

  const growthGuideEntries: MetadataRoute.Sitemap = growthGuides.flatMap((guide) => [
    {
      url: `${BASE_URL}/en/growth-guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/growth-guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ])

  return [...staticEntries, ...blogEntries, ...growthGuideEntries]
}
