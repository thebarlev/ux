import type { Metadata } from "next"

import { BlogArticle, articleMetadata, articleParams } from "@/app/_home/article/blogRoute"

import "@/app/_home/article.he.css"

export const dynamicParams = false
export const generateStaticParams = () => articleParams("he")

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return articleMetadata((await params).slug, "he")
}

// An article or a growth guide on the article template (uxb-020 v4, tbl-028).
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogArticle slug={(await params).slug} lang="he" />
}
