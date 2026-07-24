import type { Metadata } from "next"

import { SEO_AI_PRICING_EN } from "@/app/en/_config/seoAiPricingEn"
import { PriceSection } from "@/app/_components/home/PriceSection"

export const metadata: Metadata = {
  title: "SEO Business Pricing & AI SEO Plans | Uxellent",
  description:
    "Compare Uxellent SEO business pricing for AI visibility, engine optimization, and monthly growth support.",
  alternates: {
    canonical: "/en/seo-ai/pricing",
  },
  openGraph: {
    title: "Pricing Plans | Uxellent",
    description:
      "Compare Uxellent SEO & AI visibility plans - Starter, Pro, and Expert. Choose the plan that fits your business stage and start growing today.",
    url: "/en/seo-ai/pricing",
    type: "website",
  },
}

export default function SeoAiPricingPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <PriceSection
        id="price"
        title="Plans & pricing"
        subtitle="Choose the plan that fits your business stage. Upgrade anytime."
        plans={SEO_AI_PRICING_EN}
        variant="seo-ai"
        locale="en"
      />
    </div>
  )
}
