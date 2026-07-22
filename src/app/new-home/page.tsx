import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { Testimonials } from "@/app/_components/home/Testimonials"
import { NewHero } from "@/app/_components/new-home/NewHero"
import { StorySection } from "@/app/_components/new-home/StorySection"
import { ProjectsSection } from "@/app/_components/new-home/ProjectsSection"
import { ContactSection } from "@/app/_components/new-home/ContactSection"

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
        <ProjectsSection />
        <StorySection />
        <Testimonials locale="he" />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
