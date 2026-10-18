/** Deterministic heading-id derivation shared by extractHeadings.ts (server,
 *  parses raw MDX text for the TOC) and ArticleMdxContent.tsx (client, assigns
 *  the same id to the rendered <h2>). Deriving from the heading's own text
 *  keeps the id stable across renders regardless of how many times a pass
 *  runs, unlike a running counter — the h2-N counter that used to live here
 *  could disagree between server and client renders and produce a hydration
 *  mismatch even though both counted from zero. */
export function slugifyHeading(text: string): string {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
  return slug || "section"
}

/** Returns a function that turns heading text into a unique id, appending
 *  -2, -3, ... to repeats of the same slug so identical headings don't
 *  collide. Call the factory once per render pass so counts start fresh. */
export function makeUniqueSlugger() {
  const seen = new Map<string, number>()
  return (text: string) => {
    const base = slugifyHeading(text)
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  }
}
