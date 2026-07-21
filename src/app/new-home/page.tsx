import type { Metadata } from "next"

import { SiteHeader } from "@/app/_components/home/SiteHeader"
import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { VariantContent } from "@/app/_components/new-home/VariantContent"
import { ProjectsSection } from "@/app/_components/new-home/ProjectsSection"
import { ContactSection } from "@/app/_components/new-home/ContactSection"

/**
 * Alternative home page, for review only.
 * Not linked from anywhere and explicitly noindex until it is approved.
 */
export const metadata: Metadata = {
  title: "Uxellent | מרעיון למוצר חי, במקום אחד",
  description:
    "צוות אחד שמלווה אתכם מהעיצוב והאפיון ועד הפיתוח והשיווק, עם יותר מ-25 שנות ניסיון.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <SiteHeader />
      <main id="main">
        <VariantContent />
        <ProjectsSection />
        <Testimonials locale="he" />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
