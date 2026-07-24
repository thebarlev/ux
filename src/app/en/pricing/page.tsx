import type { Metadata } from "next"

import { AboutSection } from "@/app/_components/home/AboutSection"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { PriceSection } from "@/app/_components/home/PriceSection"

export const metadata: Metadata = {
  title: "Pricing | Uxellent",
  description: "Review Uxellent pricing for secure digital invoicing and business tools, including plan details and setup options.",
  alternates: {
    canonical: "/en/pricing",
    languages: heEnAlternateLanguages("/pricing", "/en/pricing"),
  },
}

export default function PricingPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
        <PriceSection />
        <AboutSection />
    </div>
  )
}
