import type { Metadata } from "next"

import { EnProductPageTemplate } from "../_components/EnProductPageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { accountAiConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...accountAiConfig.metadata,
  alternates: {
    canonical: "/en/account-ai",
    languages: heEnAlternateLanguages("/account-ai", "/en/account-ai"),
  },
}

export default function AccountAiPageEn() {
  return <EnProductPageTemplate config={accountAiConfig} />
}
