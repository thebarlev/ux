import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { legalMetadata } from "@/app/_home/legalPages"

import "@/app/_home/legal.he.css"

export const metadata: Metadata = legalMetadata("cookies", "he")

// Legal page (uxb-025 on the text-page template, tbl-028).
export default function Page() {
  return <HomePage lang="he" page="legal" legalPage="cookies" />
}
