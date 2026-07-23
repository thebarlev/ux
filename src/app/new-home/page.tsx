import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { NewHero } from "@/app/_components/new-home/NewHero"
import { ServiceSection } from "@/app/_components/new-home/ServiceSection"
import { StorySection } from "@/app/_components/new-home/StorySection"
import { TestimonialsPager } from "@/app/_components/new-home/TestimonialsPager"

/**
 * Alternative home page, for review only.
 * Not linked from anywhere and explicitly noindex until it is approved.
 */
export const metadata: Metadata = {
  title: "Uxellent | מהעיצוב והאפיון ועד הפיתוח והשיווק",
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
      <main id="main">
        {/* NewHero renders its own dedicated dark header (SiteHeader untouched). */}
        <NewHero />
        <StorySection />
        <TestimonialsPager />
        {/* Last section on the page: its WhatsApp call to action closes the page,
            in place of the removed contact form. Each section is self-contained,
            so reordering is a matter of moving one line. */}
        <ServiceSection />
      </main>
      <SiteFooter />
    </div>
  )
}
