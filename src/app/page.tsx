import type { Metadata } from "next"
import { Suspense } from "react"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { ReceivedBanner } from "@/app/_components/redesign/ReceivedBanner"
import { HomeInteractive } from "@/app/_components/redesign/HomeInteractive"
import { HomeTalk } from "@/app/_components/redesign/HomeTalk"
import styles from "@/app/_components/redesign/redesign.module.css"
import {
  HOME_HERO,
  IL_LIST,
  USES,
  HOW_STEPS_HOME,
  HELP_LIST,
  GETS_LIST,
  HOME_FAQ,
} from "@/app/_content/redesign/home"
import { BoldText } from "@/app/_components/redesign/BoldText"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/" },
  title: "Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
  description: HOME_HERO.lede,
  openGraph: {
    title: "Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
    description: HOME_HERO.lede,
    url: "https://uxellent.com",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function HomePage() {
  return (
    <RedesignShell>
      <Suspense fallback={null}>
        <ReceivedBanner />
      </Suspense>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>{HOME_HERO.eyebrow}</span>
            <h1 className={`${styles.display} ${styles.heroH1Wrap2}`}>
              <span className={styles.l1}>{HOME_HERO.line1}</span>{" "}
              <span className={styles.em}>{HOME_HERO.emphasis}</span>
            </h1>
            <p className={styles.lede}>{HOME_HERO.lede}</p>

            <HomeInteractive />
          </div>
        </section>

        {/* Israeli-built AI section */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.ilGrid}>
              <div className={styles.ilMark} aria-hidden="true">
                <span className={`${styles.ring} ${styles.r1}`} />
                <span className={`${styles.ring} ${styles.r2}`} />
                <span className={styles.ilCore}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
                  </svg>
                </span>
                <span className={`${styles.ilChip} ${styles.c1}`}>עברית RTL</span>
                <span className={`${styles.ilChip} ${styles.c2}`}>מודלים מתקדמים</span>
                <span className={`${styles.ilChip} ${styles.c3}`}>פיתוח מקומי</span>
              </div>
              <div>
                <span className={styles.eyebrow}>פיתוח ישראלי</span>
                <h2 className={styles.sec}>נבנה כאן, לעברית, על מודלי ה-AI המתקדמים בעולם.</h2>
                <p className={styles.lede}>
                  רוב הכלים בשוק נבנו לאנגלית, והעברית הודבקה עליהם אחר כך. אצלנו הכיוון הפוך: המערכת תוכננה
                  מההתחלה לכתוב עברית נכונה, מימין לשמאל, ולהבין איך עסק ישראלי מדבר על עצמו.
                </p>
                <ul className={styles.ilList}>
                  {IL_LIST.map((item) => (
                    <li key={item}>
                      {CHECK}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className={styles.bandPaper2} id="build">
          <div className={styles.wrap}>
            <div className={styles.secTop}>
              <span className={styles.eyebrow}>מה בונים כאן</span>
              <h2 className={styles.sec}>מנוע אחד, כמה דלתות.</h2>
              <p className={styles.lede}>
                אתר תדמית, עמוד נחיתה וכרטיס דיגיטלי יוצאים מאותה מערכת. מה שמשתנה הוא אילו מקטעים נכנסים, לפי
                מה שאתם צריכים.
              </p>
            </div>
            <div className={styles.uses}>
              {USES.map((u) => (
                <div key={u.n} className={styles.use}>
                  <span className={styles.n}>{u.n}</span>
                  <h3>{u.title}</h3>
                  <p>{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.band} id="how">
          <div className={styles.wrap}>
            <div className={styles.howGrid}>
              <div className={styles.howHead}>
                <span className={styles.eyebrow}>התהליך</span>
                <h2 className={styles.sec}>
                  שלושה שלבים.
                  <br />
                  אין שלב רביעי.
                </h2>
                <p className={styles.lede}>בלי אפיון וסקיצות, בלי חודש של תכתובות.</p>
              </div>
              <ol className={styles.howSteps}>
                {HOW_STEPS_HOME.map((step) => (
                  <li key={step.n} className={styles.hs}>
                    <span className={styles.ghost} aria-hidden="true">{step.n}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Help / talk */}
        <section className={styles.band} id="help">
          <div className={styles.wrap}>
            <div className={styles.helpGrid}>
              <div>
                <span className={styles.eyebrow}>לא נשארים לבד</span>
                <h2 className={styles.sec}>מלווים אתכם עד שהאתר באוויר.</h2>
                <p className={styles.lede}>
                  המערכת בונה, ואתם מחליטים. בכל שלב אפשר לשאול, לבקש שינוי, או פשוט לומר שמשהו לא מרגיש נכון.
                </p>
                <ul className={styles.helpList}>
                  {HELP_LIST.map((item) => (
                    <li key={item.title}>
                      <span className={styles.hi}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a8 8 0 01-8 8H7l-4 3 1.2-4.4A8 8 0 1121 12z" />
                        </svg>
                      </span>
                      <span>
                        <b>{item.title}</b>
                        <p>{item.body}</p>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <HomeTalk />
            </div>
          </div>
        </section>

        {/* What's included (condensed) */}
        <section className={`${styles.band} ${styles.bandInk}`} id="included">
          <div className={styles.wrap}>
            <div className={styles.incGrid}>
              <div className={styles.incHead}>
                <span className={`${styles.eyebrow} ${styles.eyebrowAq}`}>מה כלול</span>
                <h2 className={styles.sec}>
                  רשימה מלאה.
                  <br />
                  מה שלא כתוב כאן, לא נכלל.
                </h2>
                <p className={styles.lede}>בלי כוכביות ובלי אותיות קטנות. זה החוזה בינינו.</p>
              </div>
              <ol className={styles.manifest}>
                {GETS_LIST.map((item) => (
                  <li key={item.title}>
                    <b>{item.title}</b>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.bandPaper2} id="faq">
          <div className={styles.wrap}>
            <div className={styles.faqGrid}>
              <div className={styles.faqHead}>
                <span className={styles.eyebrow}>תשובות</span>
                <h2 className={styles.sec}>שאלות שחשוב לשאול לפני, לא אחרי.</h2>
                <p className={styles.lede}>ומה שלא מופיע כאן? שואלים אותנו ישירות.</p>
              </div>
              <div className={styles.qa}>
                {HOME_FAQ.map((item) => (
                  <details key={item.q} className={styles.q}>
                    <summary>
                      {item.q}
                      <svg className={styles.pm} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <div className={styles.qa2}>
                      <BoldText text={item.a} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={styles.band}>
          <div className={`${styles.wrap} ${styles.closer}`}>
            <h2 className={`${styles.sec} ${styles.closerH2}`}>האתר שלכם מתחיל במשפט אחד.</h2>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.closerBtn}`} href="https://uxellent.site">
              התחילו לבנות
              <svg className={styles.arw} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.fine}>בלי כרטיס אשראי · אפשר להפסיק מתי שרוצים</p>
          </div>
        </section>
      </main>
    </RedesignShell>
  )
}
