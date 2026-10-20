import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { JsonLd, itemListSchema, webPageSchema } from "@/components/JsonLd"
import { growthGuides } from "@/lib/growth-guides/topics"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/guides.en.css"

export const metadata: Metadata = {
  title: "Growth Guides | SEO, Leads, Traffic & AI Search",
  description:
    "Explore Uxellent growth guides on SEO, AI search, traffic, leads, and customer acquisition for growing businesses.",
  alternates: {
    canonical: "/en/growth-guides",
    languages: heEnAlternateLanguages("/growth-guides", "/en/growth-guides"),
  },
  openGraph: {
    title: "Growth Guides | Learn How to Get Leads, Traffic & Growth",
    description:
      "Explore Growth Guides from Uxellent on how to get leads, traffic, customers, and long-term business growth through SEO and AI search.",
    url: "/en/growth-guides",
    type: "website",
  },
}

// Growth guides index (uxb-019 template with the guides only, tbl-024).
export default function GrowthGuidesIndexPage() {
  const pageUrl = "https://uxellent.com/en/growth-guides"

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Growth Guides",
          description:
            "Explore Growth Guides from Uxellent on how to get leads, traffic, customers, and long-term business growth through SEO and AI search.",
          url: pageUrl,
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "Growth Guides",
          url: pageUrl,
          items: growthGuides.map((guide) => ({
            name: guide.title,
            url: `https://uxellent.com/en/growth-guides/${guide.slug}`,
          })),
        })}
      />
      <HomePage lang="en" page="guides" />
    </>
  )
}
