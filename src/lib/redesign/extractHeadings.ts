import { makeUniqueSlugger } from "./headingSlug"

/** Pulls "## Heading" lines out of raw MDX for the article-page sidebar TOC.
 *  IDs are slugified from the heading text (see headingSlug.ts) so they stay
 *  in sync with the `id` the ArticleMdxContent h2 renderer assigns to the
 *  same heading, without either side depending on a render-count counter. */
export function extractH2Headings(raw: string): { id: string; text: string }[] {
  const lines = raw.split("\n")
  const headings: { id: string; text: string }[] = []
  const uniqueSlug = makeUniqueSlugger()
  for (const line of lines) {
    const match = /^##\s+(.+)$/.exec(line.trim())
    if (match) {
      const text = match[1].replace(/[*_`]/g, "").trim()
      headings.push({ id: uniqueSlug(text), text })
    }
  }
  return headings
}
