import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/terms.en"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.en.css"

export const metadata: Metadata = {
  title: "Terms of Use | Uxellent",
  description: "Read the Uxellent terms of use covering your rights, responsibilities, and the rules for using our website and services.",
  alternates: {
    canonical: "/en/terms",
    languages: heEnAlternateLanguages("/terms", "/en/terms"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function TermsPageEn() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Terms of Use | Uxellent",
          description: "Uxellent Terms of Use - Last updated February 2026",
          url: "https://uxellent.com/en/terms",
          dateModified: "2026-02-16",
        })}
      />
      <HomePage lang="en" page="text" legal={LEGAL} paths={{ he: "/terms", en: "/en/terms" }} />
    </>
  )
}
