import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getWhyUsContent } from "@/app/_content/redesign/whyUs"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getWhyUsContent("he")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/why-us", languages: heEnAlternateLanguages("/why-us", "/en/why-us") },
    title: "למה אנחנו | אתרי תדמית בעברית לבעלי מקצוע חופשי",
    description: hero.lede,
    openGraph: {
      title: "למה אנחנו | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/why-us",
      siteName: "Uxellent",
      locale: "he_IL",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function WhyUsPage() {
  const { hero, features, closer } = await getWhyUsContent("he")
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={`${styles.band} ${styles.whyUsWarm}`}>
          <div className={styles.wrap}>
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} />
      </main>
    </RedesignShell>
  )
}
