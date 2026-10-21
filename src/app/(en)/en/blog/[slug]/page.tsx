import type { Metadata } from "next"

import { BlogArticle, articleMetadata, articleParams } from "@/app/_home/article/blogRoute"

import "@/app/_home/article.en.css"

export const dynamicParams = false
export const generateStaticParams = () => articleParams("en")

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return articleMetadata((await params).slug, "en")
}

// An article or a growth guide on the article template (uxb-023, tbl-028).
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogArticle slug={(await params).slug} lang="en" />
}
