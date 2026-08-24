import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { HOW_HERO, HOW_STEPS, HOW_CLOSER } from "@/app/_content/redesign/how-it-works"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/how-it-works" },
  title: "איך זה עובד | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: HOW_HERO.lede,
  openGraph: {
    title: "איך זה עובד | Uxellent",
    description: HOW_HERO.lede,
    url: "https://uxellent.com/how-it-works",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function HowItWorksPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={HOW_HERO.eyebrow} title={HOW_HERO.title} lede={HOW_HERO.lede} stats={HOW_HERO.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {HOW_STEPS.map((step) => (
              <FeatureBlock key={step.title} feature={step} />
            ))}
          </div>
        </section>
        <PCloseCta title={HOW_CLOSER.title} lede={HOW_CLOSER.lede} cta={HOW_CLOSER.cta} />
      </main>
    </RedesignShell>
  )
}
