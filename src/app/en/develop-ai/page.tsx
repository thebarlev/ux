import type { Metadata } from "next"

import { EnProductPageTemplate } from "../_components/EnProductPageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { developAiConfigEn } from "../_config/developAiConfigEn"

export const metadata: Metadata = {
  ...developAiConfigEn.metadata,
  alternates: {
    canonical: "/en/develop-ai",
    languages: heEnAlternateLanguages("/develop-ai", "/en/develop-ai"),
  },
}

export default function DevelopAiPageEn() {
  return <EnProductPageTemplate config={developAiConfigEn} dir="ltr" />
}
