import type { Metadata } from "next"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { PricingPlans } from "@/app/_components/redesign/PricingPlans"
import { VALUE_CARD_ICONS } from "@/app/_components/redesign/pricingIcons"
import styles from "@/app/_components/redesign/redesign.module.css"
import { PRICING_HERO, VALUE_CARDS, PRICING_EXTRA } from "@/app/_content/redesign/pricing"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/pricing" },
  title: "מחירים | Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: PRICING_HERO.lede,
  openGraph: {
    title: "מחירים | Uxellent",
    description: PRICING_HERO.lede,
    url: "https://uxellent.com/pricing",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function PricingPage() {
  return (
    <RedesignShell>
      <main id="main" className={styles.pricingMain}>
        <section className={`${styles.band} ${styles.bandPaper2}`} id="pricing">
          <div className={styles.wrap}>
            <div className={`${styles.secTop} ${styles.secTopMid} ${styles.pricingSecTop}`}>
              <span className={styles.eyebrow}>{PRICING_HERO.eyebrow}</span>
              <h2 className={styles.sec}>{PRICING_HERO.title}</h2>
              <p className={styles.lede}>{PRICING_HERO.lede}</p>
            </div>

            <PricingPlans />

            <h2 className={styles.valH}>מה מקבלים בכל חבילה, כולל בחינמית</h2>
            <p className={styles.valSub}>משלמים על ההיקף (עריכות, אחסון, דומיין), לא על הבסיס. הבסיס מלא מהיום הראשון.</p>
            <div className={styles.val}>
              {VALUE_CARDS.map((card, i) => (
                <div key={card.title} className={styles.vcard}>
                  <span className={styles.vi}>{VALUE_CARD_ICONS[i]}</span>
                  <b>{card.title}</b>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
            <p className={styles.valLine}>וכל הדרך פשוטה ובעברית: מתארים במשפט, רואים אתר, מקליקים ומפרסמים.</p>

            <p className={styles.prDom}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" />
              </svg>
              <span>
                <b>על הדומיין, בלי ערפול:</b> כתובת מהמערכת (yourname.uxellent.site) כלולה בחינם בכל החבילות
                וזה מספיק כדי להיות באוויר. רוצים דומיין משלכם? אתם רוכשים אותו אצל רשם דומיינים
                (כ-₪82 לשנה) ואנחנו מחברים אותו לאתר. <b>אנחנו לא רוכשים דומיין עבורכם.</b>
              </span>
            </p>

            <div className={styles.prExtra}>
              {PRICING_EXTRA.map((item) => (
                <div key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </RedesignShell>
  )
}
