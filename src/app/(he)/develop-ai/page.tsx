import type { Metadata } from "next"

import { ProductPageTemplate } from "@/app/_components/products/ProductPageTemplate"
import { twinPaths } from "@/lib/i18n/twins"
import { localeAlternates } from "@/lib/seo/hreflang"
import { developAiConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...developAiConfig.metadata,
  alternates: {
    canonical: "/develop-ai",
    languages: localeAlternates(twinPaths("/develop-ai")),
  },
}

export default function DevelopAiPage() {
  return <ProductPageTemplate config={developAiConfig} />
}

