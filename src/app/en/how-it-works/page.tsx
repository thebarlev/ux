import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getHowItWorksContent } from "@/app/_content/redesign/how-it-works"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const { hero } = getHowItWorksContent("en")

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/how-it-works", languages: heEnAlternateLanguages("/how-it-works", "/en/how-it-works") },
  title: "How it works | Uxellent | AI-built business websites in Hebrew",
  description: hero.lede,
  openGraph: {
    title: "How it works | Uxellent",
    description: hero.lede,
    url: "https://uxellent.com/en/how-it-works",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function HowItWorksPageEn() {
  const { hero, steps, closer } = getHowItWorksContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {steps.map((step) => (
              <FeatureBlock key={step.title} feature={step} locale="en" />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
