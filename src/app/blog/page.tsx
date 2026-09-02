import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getBlogContent } from "@/app/_content/redesign/blog"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const blog = getBlogContent("he")

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  alternates: { canonical: "/blog", languages: heEnAlternateLanguages("/blog", "/en/blog") },
  title: "מדריכי צמיחה | Uxellent",
  description: blog.hero.lede,
  openGraph: {
    title: "מדריכי צמיחה | Uxellent",
    description: blog.hero.lede,
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
  const { hero, featured, rows, closer, featuredNo } = getBlogContent("he")
  return (
    <RedesignShell>
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            <Link className={styles.afeat} href={`/blog/${featured.slug}`}>
              <div>
                <span className={styles.fno}>{featuredNo} · {featured.categoryLabel}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className={styles.ameta}>
                  <i>{featured.readingTime}</i>
                  <span className={styles.ametaDot} />
                  <i>{blog.metaTags}</i>
                </span>
                <span className={styles.afeatGo}>{blog.readMore} &gt;</span>
              </div>
              <div className={styles.afeatIm}>
                <Image src={featured.image} alt="" width={520} height={520} />
              </div>
            </Link>

            <div className={styles.alist}>
              {rows.map((row, i) => (
                <Link key={row.slug} className={styles.arow} href={`/blog/${row.slug}`}>
                  <span className={styles.arowNo}>{String(i + 2).padStart(2, "0")}</span>
                  <span>
                    <span className={styles.arowCat}>{row.categoryLabel}</span>
                    <h3>{row.title}</h3>
                    <p>{row.excerpt}</p>
                    <span className={styles.ameta}>
                      <i>{row.readingTime}</i>
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
        <PCloseCta title={closer.title} lede={closer.lede} />
      </main>
    </RedesignShell>
  )
}
