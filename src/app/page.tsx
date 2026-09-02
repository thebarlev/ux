import type { Metadata } from "next"
import { Suspense } from "react"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { ReceivedBanner } from "@/app/_components/redesign/ReceivedBanner"
import { HomeInteractive } from "@/app/_components/redesign/HomeInteractive"
import { HomeHeroHeading } from "@/app/_components/redesign/HomeHeroHeading"
import { HomeTalk } from "@/app/_components/redesign/HomeTalk"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getHomeContent } from "@/app/_content/redesign/home"
import { BoldText } from "@/app/_components/redesign/BoldText"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent("he")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/", languages: heEnAlternateLanguages("/", "/en") },
    title: "Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
    description: home.hero.lede,
    openGraph: {
      title: "Uxellent | אתרי תדמית בעברית לבעלי מקצוע חופשי",
      description: home.hero.lede,
      url: "https://uxellent.com",
      siteName: "Uxellent",
      locale: "he_IL",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const HELP_ICONS = [
  <path key="chat" d="M21 12a8 8 0 01-8 8H7l-4 3 1.2-4.4A8 8 0 1121 12z" />,
  <path key="edit" d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />,
  <>
    <path key="check-ring" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
    <path key="check-mark" d="M9 12l2 2 4-4" />
  </>,
]

export default async function HomePage() {
  const { hero, il, build, how, help, included, faq, closer } = await getHomeContent("he")
  return (
    <RedesignShell>
      <Suspense fallback={null}>
        <ReceivedBanner />
      </Suspense>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <HomeHeroHeading line1={hero.line1} emphasis={hero.emphasis} />
            <p className={styles.lede}>{hero.lede}</p>

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
                <span className={`${styles.ilChip} ${styles.c1}`}>{il.chips[0]}</span>
                <span className={`${styles.ilChip} ${styles.c2}`}>{il.chips[1]}</span>
                <span className={`${styles.ilChip} ${styles.c3}`}>{il.chips[2]}</span>
              </div>
              <div>
                <span className={styles.eyebrow}>{il.eyebrow}</span>
                <h2 className={styles.sec}>{il.title}</h2>
                <p className={styles.lede}>{il.lede}</p>
                <ul className={styles.ilList}>
                  {il.list.map((item) => (
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
        <section className={`${styles.band} ${styles.bandPaper2}`} id="build">
          <div className={styles.wrap}>
            <div className={styles.secTop}>
              <span className={styles.eyebrow}>{build.eyebrow}</span>
              <h2 className={styles.sec}>{build.title}</h2>
              <p className={styles.lede}>{build.lede}</p>
            </div>
            <div className={styles.uses}>
              {build.uses.map((u) => (
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
                <span className={styles.eyebrow}>{how.eyebrow}</span>
                <h2 className={styles.sec}>
                  {how.title[0]}
                  <br />
                  {how.title[1]}
                </h2>
                <p className={styles.lede}>{how.lede}</p>
              </div>
              <ol className={styles.howSteps}>
                {how.steps.map((step) => (
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
                <span className={styles.eyebrow}>{help.eyebrow}</span>
                <h2 className={styles.sec}>{help.title}</h2>
                <p className={styles.lede}>{help.lede}</p>
                <ul className={styles.helpList}>
                  {help.list.map((item, i) => (
                    <li key={item.title}>
                      <span className={styles.hi}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          {HELP_ICONS[i]}
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
        <section className={`${styles.band} ${styles.bandInk} ${styles.bandInkWarm}`} id="included">
          <div className={styles.wrap}>
            <div className={styles.incGrid}>
              <div className={styles.incHead}>
                <span className={`${styles.eyebrow} ${styles.eyebrowAq}`}>{included.eyebrow}</span>
                <h2 className={styles.sec}>
                  {included.title[0]}
                  <br />
                  {included.title[1]}
                </h2>
                <p className={styles.lede}>{included.lede}</p>
              </div>
              <ol className={styles.manifest}>
                {included.list.map((item) => (
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
        <section className={`${styles.band} ${styles.bandPaper2}`} id="faq">
          <div className={styles.wrap}>
            <div className={styles.faqGrid}>
              <div className={styles.faqHead}>
                <span className={styles.eyebrow}>{faq.eyebrow}</span>
                <h2 className={styles.sec}>{faq.title}</h2>
                <p className={styles.lede}>{faq.lede}</p>
              </div>
              <div className={styles.qa}>
                {faq.items.map((item) => (
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
            <h2 className={`${styles.sec} ${styles.closerH2}`}>{closer.title}</h2>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.closerBtn}`} href="https://uxellent.site">
              {closer.cta}
              <svg className={styles.arw} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className={styles.fine}>{closer.fine}</p>
          </div>
        </section>
      </main>
    </RedesignShell>
  )
}
