import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getIncludedContent } from "@/app/_content/redesign/included"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getIncludedContent("he")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/included", languages: heEnAlternateLanguages("/included", "/en/included") },
    title: "מה כלול | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
    description: hero.lede,
    openGraph: {
      title: "מה כלול | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/included",
      siteName: "Uxellent",
      locale: "he_IL",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function IncludedPage() {
  const { hero, features, notIncludedLabel, notIncluded, closer } = await getIncludedContent("he")
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
        <section className={styles.band} style={{ paddingBlockStart: "clamp(30px,4vw,50px)" }}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
            <div className={styles.notInc}>
              <b>{notIncludedLabel}</b> {notIncluded}
            </div>
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} />
      </main>
    </RedesignShell>
  )
}
