import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getWhyUsContent } from "@/app/_content/redesign/whyUs"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getWhyUsContent("en")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/en/why-us", languages: heEnAlternateLanguages("/why-us", "/en/why-us") },
    title: "Why us | Uxellent | AI-built business websites in Hebrew",
    description: hero.lede,
    openGraph: {
      title: "Why us | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/en/why-us",
      siteName: "Uxellent",
      locale: "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function WhyUsPageEn() {
  const { hero, features, closer } = await getWhyUsContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={`${styles.band} ${styles.whyUsWarm}`}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} locale="en" />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
