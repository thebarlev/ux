import type { Metadata } from "next"

import { ProductPageTemplate } from "@/app/_components/products/ProductPageTemplate"
import { SiteChrome } from "@/app/_home/SiteChrome"
import { accountAiConfig } from "@/app/_components/products/products.config"

export const metadata: Metadata = {
  ...accountAiConfig.metadata,
  alternates: {
    canonical: "/account-ai",
  },
}

export default function AccountAiPage() {
  return (
    <SiteChrome lang="he" current="/account-ai" crumbs={[{ label: "רואה חשבון AI" }]}>
      <main id="main">
        <ProductPageTemplate config={accountAiConfig} />
      </main>
    </SiteChrome>
  )
}

