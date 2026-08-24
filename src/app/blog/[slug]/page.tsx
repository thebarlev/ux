import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allArticles } from "contentlayer/generated"
import { RedesignShell } from "@/app/_components/redesign/RedesignShell"
import { ArticleMdxContent } from "@/app/_components/redesign/ArticleMdxContent"
import { PCloseCta } from "@/app/_components/redesign/PCloseCta"
import styles from "@/app/_components/redesign/redesign.module.css"
import { JsonLd, articleSchema, breadcrumbListSchema } from "@/components/JsonLd"
import { extractH2Headings } from "@/lib/redesign/extractHeadings"
import { BLOG_FEATURED, BLOG_ROWS, ARTICLE_CLOSER, type BlogCard } from "@/app/_content/redesign/blog"

const ORDER: BlogCard[] = [BLOG_FEATURED, ...BLOG_ROWS]

function findPost(slug: string) {
  return allArticles.find(
    (a) => a.slug === slug && ((a.locale as string | undefined) !== "en" || !(a.locale as string | undefined)),
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return { title: "בלוג | Uxellent" }
  return {
    metadataBase: new URL("https://uxellent.com"),
    title: post.title,
    description: post.description ?? "מאמר של Uxellent על SEO, פיתוח אתרים, אוטומציות וצמיחה דיגיטלית לעסקים.",
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description ?? "מאמר בבלוג של Uxellent.",
      url: `https://uxellent.com/blog/${post.slug}`,
      type: "article",
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const card = ORDER.find((c) => c.slug === slug)
  const headings = extractH2Headings(post.body.raw)
  const shareUrl = `https://uxellent.com/blog/${post.slug}`

  const orderIndex = ORDER.findIndex((c) => c.slug === slug)
  const related =
    orderIndex === -1
      ? ORDER.slice(0, 2)
      : [ORDER[(orderIndex + 1) % ORDER.length], ORDER[(orderIndex + 2) % ORDER.length]]

  return (
    <RedesignShell>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description ?? undefined,
          url: shareUrl,
          inLanguage: "he-IL",
          datePublished: post.date,
        })}
      />
      <JsonLd
        data={breadcrumbListSchema([
          { name: "מאמרים", url: "https://uxellent.com/blog" },
          { name: post.title, url: shareUrl },
        ])}
      />
      <main id="main">
        <section className={`${styles.phero} ${styles.ahero}`}>
          <div className={styles.wrap}>
            <span className={styles.crumb}>
              <Link href="/blog">מאמרים</Link> ← {card?.categoryLabel ?? "מאמר"}
            </span>
            <h1>{post.title}</h1>
            {post.description ? <p className={styles.lede}>{post.description}</p> : null}
            <div className={styles.tags}>
              <span className={styles.tagRt}>קריאה של {post.readingTimeMinutes} דק׳</span>
              {(post.tags as string[] | undefined)?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <article className={styles.band}>
          <div className={`${styles.wrap} ${styles.artWrap}`}>
            {headings.length > 0 ? (
              <aside className={styles.toc} aria-label="תוכן העמוד">
                <p className={styles.tocTt}>בעמוד הזה</p>
                {headings.map((h) => (
                  <a key={h.id} href={`#${h.id}`}>
                    {h.text}
                  </a>
                ))}
              </aside>
            ) : null}
            <ArticleMdxContent code={post.body.code} />
          </div>
        </article>

        <section className={styles.band} style={{ paddingBlockStart: 0 }}>
          <div className={styles.wrap}>
            <div className={styles.moreH}>
              <h2>עוד מדריכים</h2>
              <Link href="/blog">לכל המאמרים ←</Link>
            </div>
            <div className={styles.mgrid}>
              {related.map((r) => (
                <Link key={r.slug} className={styles.mcard} href={`/blog/${r.slug}`}>
                  <span className={styles.mcardThumb}>
                    <Image src={r.image} alt="" width={64} height={64} />
                  </span>
                  <span>
                    <span className={styles.mcardCat}>{r.categoryLabel}</span>
                    <b>{r.title}</b>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PCloseCta title={ARTICLE_CLOSER.title} lede={ARTICLE_CLOSER.lede} cta={ARTICLE_CLOSER.cta} />
      </main>
    </RedesignShell>
  )
}
