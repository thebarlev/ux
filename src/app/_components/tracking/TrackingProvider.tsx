"use client"
import { useEffect, useMemo, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { installAppCtaTracking, recordAttribution, rewriteAppLinksForLanguage } from "@/lib/tracking/appCtaTracking"
import { getAttribution } from "@/lib/tracking/attribution"
import { pushDataLayer } from "@/lib/tracking/dataLayer"
import { inferPageContext } from "@/lib/tracking/pageContext"

export function TrackingProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const routeKey = useMemo(() => {
    const qs = searchParams?.toString() ?? ""
    return `${pathname ?? ""}?${qs}`
  }, [pathname, searchParams])

  const lastPushedKeyRef = useRef<string | null>(null)

  // One document-level listener for links into the app (cta_build_click, lang=en).
  useEffect(() => installAppCtaTracking(), [])

  useEffect(() => {
    if (!pathname) return
    if (lastPushedKeyRef.current === routeKey) return
    lastPushedKeyRef.current = routeKey

    const push = () => {
      const ctx = inferPageContext(pathname)
      const attribution = getAttribution()
      recordAttribution(pathname)
      rewriteAppLinksForLanguage()
      pushDataLayer("vow_page_view", {
        ...ctx,
        ...attribution,
        source: attribution.utm_source,
        medium: attribution.utm_medium,
        campaign: attribution.utm_campaign,
        term: attribution.utm_term,
        content: attribution.utm_content,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      })
    }

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(push, { timeout: 1500 })
    } else {
      setTimeout(push, 100)
    }
  }, [pathname, routeKey])

  return null
}

