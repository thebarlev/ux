import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/privacy.he"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.he.css"

export const metadata: Metadata = {
  title: "מדיניות פרטיות | Uxellent",
  description: "מדיניות הפרטיות של Uxellent מסבירה כיצד אנו אוספים, שומרים ומשתמשים במידע אישי באתר ובשירותים הדיגיטליים.",
  alternates: {
    canonical: "/privacy",
    languages: heEnAlternateLanguages("/privacy", "/en/privacy"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "מדיניות פרטיות | Uxellent",
          description: "מדיניות הפרטיות של Uxellent - כיצד אנו שומרים על המידע האישי שלך",
          url: "https://uxellent.com/privacy",
          dateModified: "2026-02-01",
        })}
      />
      <HomePage lang="he" page="text" legal={LEGAL} paths={{ he: "/privacy", en: "/en/privacy" }} />
    </>
  )
}
