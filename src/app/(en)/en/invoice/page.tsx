import type { Metadata } from "next"

import { EnProductPageTemplate } from "../_components/EnProductPageTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { invoiceConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...invoiceConfig.metadata,
  alternates: {
    canonical: "/en/invoice",
    languages: heEnAlternateLanguages("/invoice", "/en/invoice"),
  },
}

export default function InvoicePageEn() {
  return <EnProductPageTemplate config={invoiceConfig} />
}
