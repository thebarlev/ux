import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { JsonLd, itemListSchema, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { growthGuidesHe } from "./growthGuides.data"

import "@/app/_home/guides.he.css"

export const metadata: Metadata = {
  title: "מדריכי צמיחה | SEO, לידים ותנועה לעסקים",
  description:
    "מדריכי צמיחה של Uxellent על SEO, לידים, קידום אונליין ותנועה אורגנית לעסקים שרוצים יותר לקוחות.",
  alternates: {
    canonical: "/growth-guides",
    languages: heEnAlternateLanguages("/growth-guides", "/en/growth-guides"),
  },
  openGraph: {
    title: "מדריכי צמיחה של Uxellent | Uxellent",
    description:
      "מדריכי צמיחה קצרים ומדויקים של Uxellent על SEO, תנועה, לידים, קידום אונליין וצמיחה דיגיטלית לעסקים.",
    url: "/growth-guides",
    type: "website",
  },
}

// Growth guides index (uxb-019 template with the guides only, tbl-024).
export default function GrowthGuidesIndexPage() {
  const pageUrl = "https://uxellent.com/growth-guides"

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "מדריכי צמיחה של Uxellent",
          description:
            "מדריכי צמיחה קצרים ומדויקים של Uxellent על SEO, תנועה, לידים, קידום אונליין וצמיחה דיגיטלית לעסקים.",
          url: pageUrl,
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "מדריכי צמיחה של Uxellent",
          url: pageUrl,
          items: growthGuidesHe.map((guide) => ({
            name: guide.keyword,
            url: `https://uxellent.com/growth-guides/${guide.slug}`,
          })),
        })}
      />
      <HomePage lang="he" page="guides" />
    </>
  )
}
