import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/terms.he"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.he.css"

export const metadata: Metadata = {
  title: "תנאי שימוש | Uxellent",
  description: "תנאי השימוש של Uxellent מסבירים את הכללים, הזכויות והאחריות בשימוש באתר, במערכת ובשירותים הדיגיטליים.",
  alternates: {
    canonical: "/terms",
    languages: heEnAlternateLanguages("/terms", "/en/terms"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "תנאי שימוש | Uxellent",
          description: "תנאי השימוש של Uxellent - עדכון אחרון פברואר 2026",
          url: "https://uxellent.com/terms",
          dateModified: "2026-02-16",
        })}
      />
      <HomePage lang="he" page="text" legal={LEGAL} paths={{ he: "/terms", en: "/en/terms" }} />
    </>
  )
}
