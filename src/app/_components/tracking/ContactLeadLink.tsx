"use client"

import Link from "next/link"
import type { ReactNode } from "react"

import { trackLead } from "@/lib/analytics/meta-pixel"

type ContactLeadLinkProps = {
  href: string
  contentName: string
  className?: string
  "aria-label"?: string
  children: ReactNode
}

/**
 * A "contact us" link that reports a Lead before navigating.
 *
 * Exists so SiteFooter can stay a server component: only this link becomes
 * client-side, rather than the whole shared footer. Behaviour is identical to
 * the plain <Link> it replaces — the event is added alongside the navigation,
 * never in place of it, and trackLead is a no-op when the pixel is absent or
 * consent was refused.
 */
export function ContactLeadLink({
  href,
  contentName,
  className,
  children,
  ...rest
}: ContactLeadLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={rest["aria-label"]}
      onClick={() => trackLead({ source: "contact", contentName })}
    >
      {children}
    </Link>
  )
}
