import type { Metadata } from "next"

import { HomePage } from "@/app/_home/HomePage"
import { legalMetadata } from "@/app/_home/legalPages"

import "@/app/_home/legal.en.css"

export const metadata: Metadata = legalMetadata("cookies", "en")

// Legal page (uxb-025 on the text-page template, tbl-028).
export default function Page() {
  return <HomePage lang="en" page="legal" legalPage="cookies" />
}
