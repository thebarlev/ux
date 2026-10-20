"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { isValidElement } from "react"
import { useMDXComponent } from "next-contentlayer2/hooks"

import { slugifyHeading } from "@/lib/redesign/headingSlug"

// an h2's id comes from its own text, the same way extractH2Headings builds the contents list
const textOf = (n: ReactNode): string =>
  typeof n === "string" || typeof n === "number"
    ? String(n)
    : Array.isArray(n)
      ? n.map(textOf).join("")
      : isValidElement<{ children?: ReactNode }>(n)
        ? textOf(n.props.children)
        : ""

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} id={slugifyHeading(textOf(props.children).replace(/[*_`]/g, ""))} />,
}

/** An article's MDX body for the article template (tbl-024b). The visuals are
 *  imported by the MDX itself from ./visuals. */
export function ArticleMdx({ code }: { code: string }) {
  const Body = useMDXComponent(code)
  return <Body components={components} />
}
