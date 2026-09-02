import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { WHY_US_HERO, WHY_US_FEATURES, WHY_US_CLOSER } from "@/app/_content/redesign/whyUs"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/why-us" },
  title: "למה אנחנו | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: WHY_US_HERO.lede,
  openGraph: {
    title: "למה אנחנו | Uxellent",
    description: WHY_US_HERO.lede,
    url: "https://uxellent.com/why-us",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function WhyUsPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={WHY_US_HERO.eyebrow} title={WHY_US_HERO.title} lede={WHY_US_HERO.lede} stats={WHY_US_HERO.stats} />
        <section className={`${styles.band} ${styles.whyUsWarm}`}>
          <div className={styles.wrap}>
            {WHY_US_FEATURES.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>
        </section>
        <PCloseCta title={WHY_US_CLOSER.title} lede={WHY_US_CLOSER.lede} />
      </main>
    </RedesignShell>
  )
}
