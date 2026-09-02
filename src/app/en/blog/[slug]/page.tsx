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
import { getBlogContent, formatReadingTime, type BlogCard } from "@/app/_content/redesign/blog"
import { getDictionary } from "@/content/i18n/dictionary"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const blog = getBlogContent("en")
const blogNavLabel = getDictionary("en").nav.blog
const ORDER: BlogCard[] = [blog.featured, ...blog.rows]

function findPost(slug: string) {
  return allArticles.find((a) => a.slug === slug && a.locale === "en")
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return { title: "Blog | Uxellent" }
  return {
    metadataBase: new URL("https://uxellent.com"),
    title: post.title,
    description: post.description ?? "A Uxellent article on SEO, web development, automation and digital growth for businesses.",
    alternates: {
      canonical: `/en/blog/${post.slug}`,
      languages: heEnAlternateLanguages(`/blog/${post.slug}`, `/en/blog/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description ?? "An article on the Uxellent blog.",
      url: `https://uxellent.com/en/blog/${post.slug}`,
      type: "article",
    },
  }
}

export default async function BlogArticlePageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const card = ORDER.find((c) => c.slug === slug)
  const headings = extractH2Headings(post.body.raw)
  const shareUrl = `https://uxellent.com/en/blog/${post.slug}`

  const orderIndex = ORDER.findIndex((c) => c.slug === slug)
  const related =
    orderIndex === -1
      ? ORDER.slice(0, 2)
      : [ORDER[(orderIndex + 1) % ORDER.length], ORDER[(orderIndex + 2) % ORDER.length]]

  return (
    <RedesignShell locale="en">
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description ?? undefined,
          url: shareUrl,
          inLanguage: "en-US",
          datePublished: post.date,
        })}
      />
      <JsonLd
        data={breadcrumbListSchema([
          { name: blogNavLabel, url: "https://uxellent.com/en/blog" },
          { name: post.title, url: shareUrl },
        ])}
      />
      <main id="main">
        <section className={`${styles.phero} ${styles.ahero}`}>
          <div className={styles.wrap}>
            <span className={styles.crumb}>
              <Link href="/en/blog">{blogNavLabel}</Link> {blog.crumbSeparator} {card?.categoryLabel ?? "Article"}
            </span>
            <h1>{post.title}</h1>
            {post.description ? <p className={styles.lede}>{post.description}</p> : null}
            <div className={styles.tags}>
              <span className={styles.tagRt}>{formatReadingTime(post.readingTimeMinutes, "en")}</span>
              {(post.tags as string[] | undefined)?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <article className={styles.band}>
          <div className={`${styles.wrap} ${styles.artWrap}`}>
            {headings.length > 0 ? (
              <aside className={styles.toc} aria-label={blog.tocLabel}>
                <p className={styles.tocTt}>{blog.tocLabel}</p>
                {headings.map((h) => (
                  <a key={h.id} href={`#${h.id}`}>
                    {h.text}
                  </a>
                ))}
              </aside>
            ) : null}
            <ArticleMdxContent code={post.body.code} headings={headings} />
          </div>
        </article>

        <section className={styles.band} style={{ paddingBlockStart: 0 }}>
          <div className={styles.wrap}>
            <div className={styles.moreH}>
              <h2>{blog.moreGuides}</h2>
              <Link href="/en/blog">{blog.allArticles} {blog.crumbSeparator}</Link>
            </div>
            <div className={styles.mgrid}>
              {related.map((r) => (
                <Link key={r.slug} className={styles.mcard} href={`/en/blog/${r.slug}`}>
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

        <PCloseCta title={blog.articleCloser.title} lede={blog.articleCloser.lede} locale="en" />
      </main>
    </RedesignShell>
  )
}
