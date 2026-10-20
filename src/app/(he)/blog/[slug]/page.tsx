import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleMdx } from "@/app/_home/article/ArticleMdx"
import { ArticlePage } from "@/app/_home/article/ArticlePage"
import { INDEXED, articleCards, articleTopic, findArticle, readLabel } from "@/app/_home/blog-data"
import { JsonLd, articleSchema } from "@/components/JsonLd"
import { extractH2Headings } from "@/lib/redesign/extractHeadings"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/article.he.css"

const findPost = (slug: string) => findArticle(slug, "he")

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return { title: "בלוג | Uxellent" }
  return {
    metadataBase: new URL("https://uxellent.com"),
    title: post.title,
    description: post.description ?? "מאמר של Uxellent על SEO, פיתוח אתרים, אוטומציות וצמיחה דיגיטלית לעסקים.",
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: heEnAlternateLanguages(`/blog/${post.slug}`, `/en/blog/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description ?? "מאמר בבלוג של Uxellent.",
      url: `https://uxellent.com/blog/${post.slug}`,
      type: "article",
    },
  }
}

// Article template (uxb-020, tbl-024b).
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const shareUrl = `https://uxellent.com/blog/${post.slug}`
  const cards = await articleCards("he")
  // the next two articles on the index (from the start, for an article that is not on it)
  const at = INDEXED.indexOf(slug as (typeof INDEXED)[number])
  const related = at === -1 ? cards.slice(0, 2) : [cards[(at + 1) % cards.length], cards[(at + 2) % cards.length]]

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description ?? undefined,
          url: shareUrl,
          inLanguage: "he-IL",
          datePublished: post.date,
        })}
      />
      <ArticlePage
        lang="he"
        kind="blog"
        slug={slug}
        title={post.title}
        sub={post.description ?? undefined}
        readTime={readLabel(post.readingTimeMinutes, "he")}
        tags={(post.tags as string[] | undefined) ?? []}
        topic={await articleTopic(slug, "he")}
        toc={extractH2Headings(post.body.raw)}
        related={related}
      >
        <ArticleMdx code={post.body.code} />
      </ArticlePage>
    </>
  )
}
