import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { FeatureBlock } from "@/app/_components/redesign/FeatureBlock"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getHowItWorksContent } from "@/app/_content/redesign/how-it-works"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getHowItWorksContent("he")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/how-it-works", languages: heEnAlternateLanguages("/how-it-works", "/en/how-it-works") },
    title: "איך זה עובד | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
    description: hero.lede,
    openGraph: {
      title: "איך זה עובד | Uxellent",
      description: hero.lede,
      url: "https://uxellent.com/how-it-works",
      siteName: "Uxellent",
      locale: "he_IL",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function HowItWorksPage() {
  const { hero, steps, closer } = await getHowItWorksContent("he")
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            {steps.map((step) => (
              <FeatureBlock key={step.title} feature={step} />
            ))}
          </div>
        </section>
        <PCloseCta title={closer.title} lede={closer.lede} />
      </main>
    </RedesignShell>
  )
}
