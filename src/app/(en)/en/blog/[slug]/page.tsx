import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleMdx } from "@/app/_home/article/ArticleMdx"
import { ArticlePage } from "@/app/_home/article/ArticlePage"
import { INDEXED, articleCards, articleTopic, findArticle, readLabel } from "@/app/_home/blog-data"
import { JsonLd, articleSchema } from "@/components/JsonLd"
import { extractH2Headings } from "@/lib/redesign/extractHeadings"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import "@/app/_home/article.en.css"

const findPost = (slug: string) => findArticle(slug, "en")

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

// Article template (uxb-020, tbl-024b).
export default async function BlogArticlePageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const shareUrl = `https://uxellent.com/en/blog/${post.slug}`
  const cards = await articleCards("en")
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
          inLanguage: "en-US",
          datePublished: post.date,
        })}
      />
      <ArticlePage
        lang="en"
        kind="blog"
        slug={slug}
        title={post.title}
        sub={post.description ?? undefined}
        readTime={readLabel(post.readingTimeMinutes, "en")}
        tags={(post.tags as string[] | undefined) ?? []}
        topic={await articleTopic(slug, "en")}
        toc={extractH2Headings(post.body.raw)}
        related={related}
      >
        <ArticleMdx code={post.body.code} />
      </ArticlePage>
    </>
  )
}
