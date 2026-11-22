import { hasConsentFor } from "@/lib/consent"

/** The GA4 property. A literal on purpose, see DeferredScripts. */
export const GA_MEASUREMENT_ID = "G-HEX0NQF4WM"

type PostHogLike = { capture?: (event: string, props?: Record<string, unknown>, opts?: Record<string, unknown>) => void }

/**
 * A GA4 event, addressed to the GA4 ID only (never to Google Ads), and only
 * with analytics consent. gtag.js does not forward plain `dataLayer.push({event})`
 * objects to GA4 (that was GTM's job, and the container is gone), so events
 * that should reach GA4 go through here.
 */
export function sendGa4Event(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasConsentFor("analytics") || !window.gtag) return
  window.gtag("event", name, { ...params, send_to: GA_MEASUREMENT_ID, transport_type: "beacon" })
}

/** The same event to PostHog, if it is loaded (it loads only with analytics consent). */
export function capturePostHog(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasConsentFor("analytics")) return
  const ph = (window as unknown as { posthog?: PostHogLike }).posthog
  ph?.capture?.(name, props, { send_instantly: true, transport: "sendBeacon" })
}

/** Page language from <html lang> (set by the he / en root layouts), with the path as fallback. */
export function getPageLanguage(): "he" | "en" {
  if (typeof document === "undefined") return "he"
  const lang = document.documentElement.lang?.toLowerCase() ?? ""
  if (lang.startsWith("en")) return "en"
  if (lang.startsWith("he")) return "he"
  return typeof location !== "undefined" && /^\/en(\/|$)/.test(location.pathname) ? "en" : "he"
}
