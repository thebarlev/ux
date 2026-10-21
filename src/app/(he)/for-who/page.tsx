import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/who.he.css"

const TITLE = "למי זה מתאים | UXellent · בונה אתרים עם AI"
const DESCRIPTION = "אתר תדמית, דף נחיתה או תיק עבודות. ה-AI של UXellent בונה את סוג האתר שמתאים לעסק שלכם, עם התוכן והעיצוב שלו."

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/for-who", languages: heEnAlternateLanguages("/for-who", "/en/for-who") },
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://uxellent.com/for-who", siteName: "UXellent", locale: "he_IL", type: "website" },
  robots: { index: true, follow: true },
}

// Who it's for (uxb-024 v4, tbl-028).
export default function Page() {
  return <HomePage lang="he" page="who" />
}
