import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { INCLUDED_HERO, INCLUDED_FEATURES, INCLUDED_NOT_INCLUDED, INCLUDED_CLOSER } from "@/app/_content/redesign/included"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/included" },
  title: "מה כלול | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: INCLUDED_HERO.lede,
  openGraph: {
    title: "מה כלול | Uxellent",
    description: INCLUDED_HERO.lede,
    url: "https://uxellent.com/included",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function IncludedPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={INCLUDED_HERO.eyebrow} title={INCLUDED_HERO.title} lede={INCLUDED_HERO.lede} />
        <section className={styles.band} style={{ paddingBlockStart: "clamp(30px,4vw,50px)" }}>
          <div className={styles.wrap}>
            {INCLUDED_FEATURES.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
            <div className={styles.notInc}>
              <b>ומה לא כלול, בכוונה:</b> {INCLUDED_NOT_INCLUDED}
            </div>
          </div>
        </section>
        <PCloseCta title={INCLUDED_CLOSER.title} lede={INCLUDED_CLOSER.lede} cta={INCLUDED_CLOSER.cta} />
      </main>
    </RedesignShell>
  )
}
