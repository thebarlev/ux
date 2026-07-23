// src/app/page.tsx
import type { Metadata } from "next"

import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { FounderBand } from "@/app/_components/new-home/FounderBand"
import { NewHero } from "@/app/_components/new-home/NewHero"
import { ServiceSection } from "@/app/_components/new-home/ServiceSection"
import { StorySection } from "@/app/_components/new-home/StorySection"
import { TestimonialsPager } from "@/app/_components/new-home/TestimonialsPager"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  // The marketing site, not app.uxellent.com.
  metadataBase: new URL("https://uxellent.com"),
  alternates: {
    canonical: "/",
    // The Hebrew home has no visible language switch, but the English home
    // still exists and stays paired with it for search engines.
    languages: heEnAlternateLanguages("/", "/en"),
  },

  title: "Uxellent | מהאפיון והעיצוב ועד הפיתוח והשיווק",
  description:
    "צוות קטן, חד ומנוסה שבונה מוצרי SaaS ואפליקציות AI מקצה לקצה. מעל 25 שנות ניסיון באפיון, עיצוב, פיתוח ושיווק דיגיטלי.",

  keywords: [
    "פיתוח מוצרי SaaS",
    "פיתוח אפליקציות AI",
    "אפיון מוצר",
    "עיצוב חוויית משתמש",
    "פיתוח אתרים",
    "שיווק דיגיטלי",
    "קידום אתרים",
    "עיצוב ומיתוג לעסקים",
  ],

  openGraph: {
    title: "Uxellent | מהאפיון והעיצוב ועד הפיתוח והשיווק",
    description:
      "מבססים את הרעיון, בונים את המערכת, מביאים את הלקוחות. מעל 25 שנות ניסיון באפיון, עיצוב, פיתוח ושיווק דיגיטלי.",
    url: "https://uxellent.com",
    siteName: "Uxellent",
    images: [
      {
        url: "https://uxellent.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Uxellent — אפיון, עיצוב, פיתוח ושיווק מקצה לקצה",
      },
    ],
    locale: "he_IL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Uxellent | מהאפיון והעיצוב ועד הפיתוח והשיווק",
    description:
      "צוות קטן, חד ומנוסה שבונה מוצרי SaaS ואפליקציות AI מקצה לקצה.",
    images: ["https://uxellent.com/og-home.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Home page. The previous composition (Hero, VisionToExecution, Packages, FAQ,
 * …) was replaced wholesale by the approved design; it remains in git history
 * if it is ever needed back.
 *
 * Each section is self-contained, so reordering is a matter of moving one line.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <main id="main" role="main">
        {/* NewHero renders its own dedicated dark header (SiteHeader, which the
            inner pages use, is deliberately left untouched). */}
        <NewHero />
        <StorySection />
        <FounderBand />
        <TestimonialsPager />
        {/* Last section on the page: its WhatsApp call to action closes it. */}
        <ServiceSection />
      </main>
      {/* Ink tone so the footer continues the dark service section above it.
          Inner pages keep the default black footer. */}
      <SiteFooter tone="ink" />
    </div>
  )
}
