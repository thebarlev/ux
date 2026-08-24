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
 *  so they keep their existing look pending a follow-up restyle pass. */
function useArticleComponents() {
  const counter = React.useRef(0)
  counter.current = 0

  return React.useMemo(
    () => ({
      a: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
      h2: (props: React.ComponentPropsWithoutRef<"h2">) => {
        counter.current += 1
        return <h2 {...props} id={`h2-${counter.current}`} />
      },
      p: (props: React.ComponentPropsWithoutRef<"p">) => <p {...props} />,
      ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
      ol: (props: React.ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
      li: (props: React.ComponentPropsWithoutRef<"li">) => <li {...props} />,
      Link,
    }),
    [],
  )
}

export function ArticleMdxContent({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  const components = useArticleComponents()
  return (
    <div className={styles.prose}>
      <Component components={components} />
    </div>
  )
}
