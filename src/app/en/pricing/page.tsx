import type { Metadata } from "next"
import { Fragment } from "react"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PricingPlans } from "@/app/_components/redesign/PricingPlans"
import { BrandMark } from "@/app/_components/redesign/BrandMark"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getPricingContent } from "@/app/_content/redesign/pricing"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const { hero } = getPricingContent("en")

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/en/pricing", languages: heEnAlternateLanguages("/pricing", "/en/pricing") },
  title: "Pricing | Uxellent | AI-built business websites in Hebrew",
  description: hero.lede,
  openGraph: {
    title: "Pricing | Uxellent",
    description: hero.lede,
    url: "https://uxellent.com/en/pricing",
    siteName: "Uxellent",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function PricingPageEn() {
  const { hero, notes } = getPricingContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main" className={styles.pricingMain}>
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
        <section className={`${styles.band} ${styles.bandPaper2}`} id="pricing">
          <div className={styles.wrap}>
            <PricingPlans locale="en" />

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
