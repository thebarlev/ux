import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { BLOG_HERO, BLOG_FEATURED, BLOG_ROWS, BLOG_CLOSER } from "@/app/_content/redesign/blog"

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/blog" },
  title: "מדריכי צמיחה | Uxellent",
  description: BLOG_HERO.lede,
  openGraph: {
    title: "מדריכי צמיחה | Uxellent",
    description: BLOG_HERO.lede,
    url: "https://uxellent.com/blog",
    siteName: "Uxellent",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)

export default function BlogIndexPage() {
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={BLOG_HERO.eyebrow} title={BLOG_HERO.title} lede={BLOG_HERO.lede} stats={BLOG_HERO.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            <Link className={styles.afeat} href={`/blog/${BLOG_FEATURED.slug}`}>
              <div>
                <span className={styles.fno}>01 · המאמר המרכזי · {BLOG_FEATURED.categoryLabel}</span>
                <h2>{BLOG_FEATURED.title}</h2>
                <p>{BLOG_FEATURED.excerpt}</p>
                <span className={styles.ameta}>
                  <i>קריאה של {BLOG_FEATURED.readingTime}</i>
                  <span className={styles.ametaDot} />
                  <i>AI · SEO · אורגני</i>
                </span>
                <span className={styles.afeatGo}>לקריאת המאמר ←</span>
              </div>
              <div className={styles.afeatIm}>
                <Image src={BLOG_FEATURED.image} alt="" width={520} height={520} />
              </div>
            </Link>

            <div className={styles.alist}>
              {BLOG_ROWS.map((row, i) => (
                <Link key={row.slug} className={styles.arow} href={`/blog/${row.slug}`}>
                  <span className={styles.arowNo}>{String(i + 2).padStart(2, "0")}</span>
                  <span>
                    <span className={styles.arowCat}>{row.categoryLabel}</span>
                    <h3>{row.title}</h3>
                    <p>{row.excerpt}</p>
                    <span className={styles.ameta}>
                      <i>קריאה של {row.readingTime}</i>
                    </span>
                  </span>
                  <span className={styles.arowSide}>
                    <span className={styles.arowThumb}>
                      <Image src={row.image} alt="" width={74} height={74} />
                    </span>
                    <span className={styles.arowArr}>{ARROW}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <PCloseCta title={BLOG_CLOSER.title} lede={BLOG_CLOSER.lede} cta={BLOG_CLOSER.cta} />
      </main>
    </RedesignShell>
  )
}
