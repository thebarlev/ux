import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { InnerHero } from "@/app/_components/redesign/InnerHero"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { getBlogContent } from "@/app/_content/redesign/blog"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export async function generateMetadata(): Promise<Metadata> {
  const blog = await getBlogContent("en")
  return {
    metadataBase: new URL("https://uxellent.com"),
    alternates: { canonical: "/en/blog", languages: heEnAlternateLanguages("/blog", "/en/blog") },
    title: "Growth Guides | Uxellent",
    description: blog.hero.lede,
    openGraph: {
      title: "Growth Guides | Uxellent",
      description: blog.hero.lede,
      url: "https://uxellent.com/en/blog",
      siteName: "Uxellent",
      locale: "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)

export default async function BlogIndexPageEn() {
  const { hero, featured, rows, closer, featuredNo, metaTags, readMore } = await getBlogContent("en")
  return (
    <RedesignShell locale="en">
      <main id="main">
        <InnerHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} stats={hero.stats} />
        <section className={styles.band}>
          <div className={styles.wrap}>
            <Link className={styles.afeat} href={`/en/blog/${featured.slug}`}>
              <div>
                <span className={styles.fno}>{featuredNo} · {featured.categoryLabel}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className={styles.ameta}>
                  <i>{featured.readingTime}</i>
                  <span className={styles.ametaDot} />
                  <i>{metaTags}</i>
                </span>
                <span className={styles.afeatGo}>{readMore} &gt;</span>
              </div>
              <div className={styles.afeatIm}>
                <Image src={featured.image} alt="" width={520} height={520} />
              </div>
            </Link>

            <div className={styles.alist}>
              {rows.map((row, i) => (
                <Link key={row.slug} className={styles.arow} href={`/en/blog/${row.slug}`}>
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
        <PCloseCta title={closer.title} lede={closer.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
