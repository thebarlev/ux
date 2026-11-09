import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allArticles } from "contentlayer/generated"

import { ArticleMdx } from "@/app/_home/article/ArticleMdx"
import { ArticlePage } from "@/app/_home/article/ArticlePage"
import { articleTopic, findArticle, isGuide, readTime, relatedCards } from "@/app/_home/blog-data"
import type { Lang } from "@/app/_home/chrome"
import { JsonLd, articleSchema } from "@/components/JsonLd"
import { extractH2Headings } from "@/lib/redesign/extractHeadings"
import { LOCALES, localePath } from "@/lib/i18n/locales"
import { localeAlternates } from "@/lib/seo/hreflang"

/**
 * /blog/<slug> and /en/blog/<slug> (tbl-028): every card on the blog index,
 * articles and growth guides alike, on the article template, with Article and
 * BreadcrumbList structured data.
 */

const SITE = "https://uxellent.com"
const path = (slug: string, lang: Lang) => `${lang === "en" ? "/en" : ""}/blog/${slug}`

export const articleParams = (lang: Lang) =>
  allArticles.filter((a) => ((a.locale as string | undefined) === "en") === (lang === "en")).map((a) => ({ slug: a.slug }))

export function articleMetadata(slug: string, lang: Lang): Metadata {
  const post = findArticle(slug, lang)
  if (!post) return {}
  const title = (post.metaTitle as string | undefined) ?? post.title
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description: post.description ?? undefined,
    alternates: {
      canonical: path(slug, lang),
      languages: localeAlternates(Object.fromEntries(LOCALES.filter((l) => findArticle(slug, l.code as Lang)).map((l) => [l.code, localePath(`/blog/${slug}`, l.code)]))),
    },
    openGraph: { title, description: post.description ?? undefined, url: SITE + path(slug, lang), type: "article", locale: lang === "en" ? "en_US" : "he_IL" },
  }
}

export function BlogArticle({ slug, lang }: { slug: string; lang: Lang }) {
  const post = findArticle(slug, lang)
  if (!post) notFound()
  const topic = articleTopic(slug, lang)
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description ?? undefined,
          url: SITE + path(slug, lang),
          inLanguage: lang === "en" ? "en" : "he",
          datePublished: post.date,
          articleSection: topic,
        })}
      />
      <ArticlePage
        lang={lang}
        kind={isGuide(slug) ? "guide" : "blog"}
        slug={slug}
        title={post.title}
        sub={post.description ?? undefined}
        readTime={readTime(slug, lang)}
        tags={[topic]}
        topic={topic}
        toc={extractH2Headings(post.body.raw)}
        related={relatedCards(slug, lang)}
      >
        <ArticleMdx code={post.body.code} />
      </ArticlePage>
    </>
  )
}
