import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/accessibility.he"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.he.css"

export const metadata: Metadata = {
  title: "נגישות האתר | Uxellent",
  description: "הצהרת הנגישות של Uxellent מפרטת את התאמות הנגישות באתר, בערוצים הדיגיטליים ובשירות הלקוחות.",
  alternates: {
    canonical: "/accessibility",
    languages: heEnAlternateLanguages("/accessibility", "/en/accessibility"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "נגישות | Uxellent",
          description: "Uxellent מחויבת לנגישות. האתר עומד בתקן ת\"י 5568 ו-WCAG 2.1 ברמת AA.",
          url: "https://uxellent.com/accessibility",
          dateModified: "2025-02-01",
        })}
      />
      <HomePage lang="he" page="text" legal={LEGAL} paths={{ he: "/accessibility", en: "/en/accessibility" }} />
    </>
  )
}
