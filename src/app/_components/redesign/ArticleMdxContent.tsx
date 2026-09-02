"use client"

import * as React from "react"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer2/hooks"
import styles from "./redesign.module.css"

/** Mirrors src/app/_components/blog/MdxContent.tsx's tag overrides, restyled
 *  to the 2026-08 template's .prose classes. Custom widgets imported directly
 *  in the MDX source (AiReadabilityPillars, ContentStructureTable, Callout,
 *  ChecklistTimeline from @/components/article-visuals) are NOT overridden
 *  here — MDX resolves those via their own import, not this components map,
 *  so they keep their existing look pending a follow-up restyle pass.
 *
 *  h2 ids come from `headings` — the same array extractHeadings.ts derives
 *  from the raw MDX for the TOC — indexed by a running count of h2 calls
 *  seen so far, wrapped modulo headings.length. A plain per-render counter
 *  would double-count under React's dev Strict Mode, which re-invokes this
 *  compiled MDX component's render an extra time without rolling back ref
 *  mutations from the first pass (that's what produced the h2-2/h2-1
 *  hydration mismatch this replaces). Wrapping on overflow makes a second
 *  pass line back up with the same headings array instead of drifting. */
function useArticleComponents(headings: { id: string; text: string }[]) {
  const count = React.useRef(0)

  return React.useMemo(
    () => ({
      a: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
      h2: (props: React.ComponentPropsWithoutRef<"h2">) => {
        const i = headings.length > 0 ? count.current % headings.length : 0
        count.current += 1
        return <h2 {...props} id={headings[i]?.id} />
      },
      p: (props: React.ComponentPropsWithoutRef<"p">) => <p {...props} />,
      ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
      ol: (props: React.ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
      li: (props: React.ComponentPropsWithoutRef<"li">) => <li {...props} />,
      Link,
    }),
    [headings],
  )
}

export function ArticleMdxContent({
  code,
  headings,
}: {
  code: string
  headings: { id: string; text: string }[]
}) {
  const Component = useMDXComponent(code)
  const components = useArticleComponents(headings)
  return (
    <div className={styles.prose}>
      <Component components={components} />
    </div>
  )
}
