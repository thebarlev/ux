import type { Metadata } from "next"

import { ProductPageTemplate } from "@/app/_components/products/ProductPageTemplate"
import { accountAiConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...accountAiConfig.metadata,
  alternates: {
    canonical: "/account-ai",
  },
}

export default function AccountAiPage() {
  return <ProductPageTemplate config={accountAiConfig} />
}

