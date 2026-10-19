export type Campaign = {
  slug: string
  heroTitle: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
}

export const campaigns: readonly Campaign[] = [
  {
    slug: "seo-services",
    heroTitle: "Professional SEO Services for Growing Businesses",
    heroSubtitle:
      "We handle your SEO from strategy to execution - so you can focus on running your business. Monthly reporting, no fluff.",
    metaTitle: "SEO Services & SEO Optimisation | Uxellent",
    metaDescription:
      "SEO optimisation for website growth, keyword search engine optimization, and search engine optimizations built for leads.",
  },
  {
    slug: "digital-marketing",
    heroTitle: "Full-Service Digital Marketing Agency",
    heroSubtitle:
      "From SEO to paid ads and AI-powered visibility - we build strategies that turn clicks into customers. Transparent pricing, proven results.",
    metaTitle: "Online Marketing Agency Services | Uxellent",
    metaDescription:
      "Digital marketing services from an online marketing agency focused on SEO, PPC, content, and measurable growth.",
  },
  {
    slug: "ai-seo",
    heroTitle: "Show Up in ChatGPT, Google AI & More",
    heroSubtitle:
      "We don’t do “SEO”. We make your business show up where customers actually look - Google, ChatGPT, and AI search.",
    metaTitle: "SEO Agency for AI Search | Uxellent",
    metaDescription:
      "SEO agency support for AI search, engine optimization, and seo optimisation that helps your business appear in ChatGPT and Google AI.",
  },
] as const

export const campaignSlugs = campaigns.map((c) => c.slug)

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug)
}
