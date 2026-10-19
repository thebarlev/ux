"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { prefixEnPath } from "../_lib/prefixEnPath"

type UrlObject = { pathname?: string; query?: Record<string, string>; hash?: string }

function isUrlObject(href: unknown): href is UrlObject {
  return typeof href === "object" && href !== null && "pathname" in href
}

function prefixHref(href: ComponentProps<typeof Link>["href"]): string {
  if (typeof href === "string") {
    return prefixEnPath(href)
  }
  if (isUrlObject(href)) {
    const pathname = href.pathname ?? "/"
    const prefixed = prefixEnPath(pathname)
    const query = href.query
      ? "?" + new URLSearchParams(href.query as Record<string, string>).toString()
      : ""
    const hash = href.hash ?? ""
    return prefixed + query + hash
  }
  return typeof href === "object" && href && "pathname" in href
    ? prefixEnPath((href as UrlObject).pathname ?? "/")
    : "/en"
}

export function EnLink({ href, ...props }: ComponentProps<typeof Link>) {
  const prefixed = prefixHref(href)
  return <Link href={prefixed} {...props} />
}
