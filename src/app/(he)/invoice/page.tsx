import type { Metadata } from "next"

import { ProductPageTemplate } from "@/app/_components/products/ProductPageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { invoiceConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...invoiceConfig.metadata,
  alternates: {
    canonical: "/invoice",
    languages: heEnAlternateLanguages("/invoice", "/en/invoice"),
  },
}

export default function InvoicePage() {
  return <ProductPageTemplate config={invoiceConfig} />
}

