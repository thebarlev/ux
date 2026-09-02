import type { Metadata } from "next"
import { Fragment } from "react"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PricingPlans } from "@/app/_components/redesign/PricingPlans"
import { BrandMark } from "@/app/_components/redesign/BrandMark"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getPricingContent } from "@/app/_content/redesign/pricing"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const { hero } = getPricingContent("he")

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/pricing", languages: heEnAlternateLanguages("/pricing", "/en/pricing") },
  title: "מחירים | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: hero.lede,
  openGraph: {
    title: "מחירים | Uxellent",
    description: hero.lede,
    url: "https://uxellent.com/pricing",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function PricingPage() {
  const { hero, notes } = getPricingContent("he")
  return (
    <RedesignShell>
      <main id="main" className={styles.pricingMain}>
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
        <section className={`${styles.band} ${styles.bandPaper2}`} id="pricing">
          <div className={styles.wrap}>
            <PricingPlans />

            <div className={styles.prNote}>
              {notes.map((note, i) => (
                <Fragment key={note.title}>
                  {i > 0 ? (
                    <div className={styles.pnSep}>
                      <BrandMark className={styles.pnSepSvg} />
                    </div>
                  ) : null}
                  <div>
                    <b>{note.title}</b>
                    <p>{note.body}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      </main>
    </RedesignShell>
  )
}
