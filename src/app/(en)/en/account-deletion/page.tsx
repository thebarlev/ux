import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/account-deletion.en"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.en.css"

export const metadata: Metadata = {
  title: "Account Deletion | Uxellent",
  description: "Learn how to request account deletion from the Uxellent service, including support channels and data-retention notes.",
  alternates: {
    canonical: "/en/account-deletion",
    languages: heEnAlternateLanguages("/account-deletion", "/en/account-deletion"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function AccountDeletionPageEn() {
  return (
    <HomePage lang="en" page="text" legal={LEGAL} paths={{ he: "/account-deletion", en: "/en/account-deletion" }} />
  )
}
