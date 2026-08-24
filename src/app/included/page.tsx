import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { INCLUDED_HERO, INCLUDED_GROUPS, INCLUDED_NOT_INCLUDED, INCLUDED_CLOSER } from "@/app/_content/redesign/included"

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

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function IncludedPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={INCLUDED_HERO.eyebrow} title={INCLUDED_HERO.title} lede={INCLUDED_HERO.lede} />
        <section className={`${styles.band} ${styles.bandInk}`} style={{ paddingBlockStart: "clamp(30px,4vw,50px)" }}>
          <div className={styles.wrap}>
            {INCLUDED_GROUPS.map((group) => (
              <div key={group.no} className={styles.grp}>
                <div className={styles.grpH}>
                  <span className={styles.gno}>{group.no}</span>
                  <h2>{group.title}</h2>
                </div>
                <div className={styles.grpGrid}>
                  {group.items.map((item) => (
                    <div key={item.title} className={styles.gcard}>
                      <b>{CHECK}{item.title}</b>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
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
