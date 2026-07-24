export type GrowthGuideTopic = {
  title: string
  slug: string
  description: string
  related: readonly string[]
}

export const growthGuides = [
  {
    title: "How to Get Traffic to Your Website",
    slug: "how-to-get-traffic-to-my-website",
    description: "Proven strategies to increase website traffic organically and with AI.",
    related: [
      "how-to-rank-on-google-fast",
      "how-to-improve-website-seo",
      "how-to-get-customers-online",
    ],
  },
  {
    title: "How to Improve Website SEO",
    slug: "how-to-improve-website-seo",
    description: "Practical ways to improve rankings, relevance, and on-page SEO quality.",
    related: [
      "how-to-rank-on-google-fast",
      "how-to-get-traffic-to-my-website",
      "how-to-grow-small-business-online",
    ],
  },
  {
    title: "How to Get Leads",
    slug: "how-to-get-leads",
    description: "Lead-generation strategies that turn search demand and page clarity into pipeline.",
    related: [
      "how-to-promote-my-business-online",
      "how-to-get-clients-without-ads",
      "how-to-get-customers-online",
    ],
  },
  {
    title: "How to Promote My Business Online",
    slug: "how-to-promote-my-business-online",
    description: "A focused online promotion framework for building visibility that converts.",
    related: [
      "how-to-grow-small-business-online",
      "how-to-get-leads",
      "how-to-get-clients-without-ads",
    ],
  },
  {
    title: "How to Get Customers Online",
    slug: "how-to-get-customers-online",
    description: "Customer-acquisition tactics that improve conversion, trust, and digital demand capture.",
    related: [
      "how-to-get-leads",
      "how-to-get-traffic-to-my-website",
      "how-to-grow-small-business-online",
    ],
  },
  {
    title: "How to Rank on Google Fast",
    slug: "how-to-rank-on-google-fast",
    description: "Fast-win SEO opportunities for improving rankings without shortcut tactics.",
    related: [
      "how-to-improve-website-seo",
      "how-to-get-traffic-to-my-website",
      "how-to-get-clients-without-ads",
    ],
  },
  {
    title: "How to Grow Small Business Online",
    slug: "how-to-grow-small-business-online",
    description: "A practical online growth model for small businesses that need compounding demand.",
    related: [
      "how-to-promote-my-business-online",
      "how-to-get-customers-online",
      "how-to-improve-website-seo",
    ],
  },
  {
    title: "How to Get Clients Without Ads",
    slug: "how-to-get-clients-without-ads",
    description: "Organic client-acquisition strategies that reduce dependence on paid campaigns.",
    related: [
      "how-to-get-traffic-to-my-website",
      "how-to-get-leads",
      "how-to-rank-on-google-fast",
    ],
  },
] as const satisfies readonly GrowthGuideTopic[]

export type GrowthGuideSlug = (typeof growthGuides)[number]["slug"]

export const growthGuideTopicsBySlug = new Map<string, GrowthGuideTopic>(
  growthGuides.map((guide) => [guide.slug, guide])
)

export const growthGuideFooterLinks = [
  {
    href: "/en/growth-guides/how-to-get-traffic-to-my-website",
    label: "How to Get Traffic to Your Website",
  },
  {
    href: "/en/growth-guides/how-to-improve-website-seo",
    label: "How to Improve Website SEO",
  },
  {
    href: "/en/growth-guides/how-to-get-leads",
    label: "How to Get Leads",
  },
  {
    href: "/en/growth-guides",
    label: "More Guides →",
  },
] as const

export const growthGuideFooterLinksHe = [
  {
    href: "/growth-guides/how-to-get-traffic-to-my-website",
    label: "איך להביא תנועה לאתר",
  },
  {
    href: "/growth-guides/how-to-improve-website-seo",
    label: "איך לשפר SEO לאתר",
  },
  {
    href: "/growth-guides/how-to-get-leads",
    label: "איך לקבל לידים",
  },
  {
    href: "/growth-guides",
    label: "עוד מדריכים →",
  },
] as const

export function getGrowthGuideTopic(slug: string) {
  return growthGuideTopicsBySlug.get(slug)
}
