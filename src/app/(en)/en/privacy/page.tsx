import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/privacy.en"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.en.css"

export const metadata: Metadata = {
  title: "Privacy Policy | Uxellent",
  description: "Read Uxellent's privacy policy to understand how we collect, protect, and use personal information across our website and services.",
  alternates: {
    canonical: "/en/privacy",
    languages: heEnAlternateLanguages("/privacy", "/en/privacy"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function PrivacyPageEn() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Privacy Policy | Uxellent",
          description: "Uxellent's Privacy Policy - How We Protect Your Personal Information",
          url: "https://uxellent.com/en/privacy",
          dateModified: "2026-02-01",
        })}
      />
      <HomePage lang="en" page="text" legal={LEGAL} paths={{ he: "/privacy", en: "/en/privacy" }} />
    </>
  )
}
