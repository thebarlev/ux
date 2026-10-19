import type { Metadata } from "next"

import { ProductPageTemplate } from "@/app/_components/products/ProductPageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { accountAiConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...accountAiConfig.metadata,
  alternates: {
    canonical: "/account-ai",
    languages: heEnAlternateLanguages("/account-ai", "/en/account-ai"),
  },
}

export default function AccountAiPage() {
  return <ProductPageTemplate config={accountAiConfig} />
}

