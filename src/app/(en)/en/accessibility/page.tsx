import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/accessibility.en"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.en.css"

export const metadata: Metadata = {
  title: "Accessibility Statement | Uxellent",
  description: "Read the Uxellent accessibility statement, including website accessibility standards, support options, and accessibility contact details.",
  alternates: {
    canonical: "/en/accessibility",
    languages: heEnAlternateLanguages("/accessibility", "/en/accessibility"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function AccessibilityPageEn() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Accessibility | Uxellent",
          description: "Uxellent is committed to accessibility. The site meets Israeli Standard 5568 and WCAG 2.1 Level AA.",
          url: "https://uxellent.com/en/accessibility",
          dateModified: "2025-02-01",
        })}
      />
      <HomePage lang="en" page="text" legal={LEGAL} paths={{ he: "/accessibility", en: "/en/accessibility" }} />
    </>
  )
}
