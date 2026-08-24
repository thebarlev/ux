/** Pulls "## Heading" lines out of raw MDX for the article-page sidebar TOC.
 *  IDs are positional (h2-1, h2-2, ...) so they stay in sync with the `id`
 *  the ArticleMdxContent h2 renderer assigns to the same heading, in order. */
export function extractH2Headings(raw: string): { id: string; text: string }[] {
  const lines = raw.split("\n")
  const headings: { id: string; text: string }[] = []
  let i = 0
  for (const line of lines) {
    const match = /^##\s+(.+)$/.exec(line.trim())
    if (match) {
      i += 1
      headings.push({ id: `h2-${i}`, text: match[1].replace(/[*_`]/g, "").trim() })
    }
  }
  return headings
}
