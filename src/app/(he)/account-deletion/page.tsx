import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { LEGAL } from "@/app/_home/legal/account-deletion.he"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/text.he.css"

export const metadata: Metadata = {
  title: "מחיקת חשבון | Uxellent",
  description: "מידע על בקשת מחיקת חשבון בשירות Uxellent, כולל דרכי פנייה, זמני טיפול ושמירת מידע לפי דין.",
  alternates: {
    canonical: "/account-deletion",
    languages: heEnAlternateLanguages("/account-deletion", "/en/account-deletion"),
  },
}

// Text-page template (tbl-023); the text itself lives in src/app/_home/legal.
export default function AccountDeletionPage() {
  return (
    <HomePage lang="he" page="text" legal={LEGAL} paths={{ he: "/account-deletion", en: "/en/account-deletion" }} />
  )
}
