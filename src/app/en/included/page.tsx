import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getIncludedContent } from "@/app/_content/redesign/included"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getIncludedContent("en")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/en/included", languages: heEnAlternateLanguages("/included", "/en/included") },
    title: "What's included | Uxellent | AI-built business websites in Hebrew",
    description: hero.lede,
    openGraph: {
      title: "What's included | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/en/included",
      siteName: "Uxellent",
      locale: "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function IncludedPageEn() {
  const { hero, features, notIncludedLabel, notIncluded, closer } = await getIncludedContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
        <section className={styles.band} style={{ paddingBlockStart: "clamp(30px,4vw,50px)" }}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} locale="en" />
            ))}
            <div className={styles.notInc}>
              <b>{notIncludedLabel}</b> {notIncluded}
            </div>
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
