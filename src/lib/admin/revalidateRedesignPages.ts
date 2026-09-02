import "server-only"
import { revalidatePath } from "next/cache"

const HE_PAGES = ["/", "/pricing", "/products", "/how-it-works", "/included", "/why-us", "/blog"]
const ARTICLE_SLUGS = ["seo-ai-engine", "fast-slow-web", "wordpress-vs-other", "automatio-make"]

const ALL_REDESIGN_PATHS = [
  ...HE_PAGES,
  ...HE_PAGES.map((p) => (p === "/" ? "/en" : `/en${p}`)),
  ...ARTICLE_SLUGS.map((slug) => `/blog/${slug}`),
  ...ARTICLE_SLUGS.map((slug) => `/en/blog/${slug}`),
]

/** nav/footer copy shows on every redesign page, so a single dictionary
 *  write revalidates the whole fixed set rather than trying to trace which
 *  pages a given path actually touches. */
export function revalidateRedesignPages(): void {
  for (const path of ALL_REDESIGN_PATHS) revalidatePath(path)
}
