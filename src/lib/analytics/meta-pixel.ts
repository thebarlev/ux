/**
 * Meta Pixel — client-safe wrapper.
 *
 * Every export is a guarded no-op unless BOTH hold:
 *   1. NEXT_PUBLIC_META_PIXEL_ID is set
 *   2. the visitor has not explicitly rejected cookies
 *
 * Consent is opt-out: tags load by default and only an explicit "rejected"
 * in `vow_cookie_consent` (written by CookieBanner) blocks them. An undecided
 * visitor is treated as consenting.
 *
 * Analytics must never break a business flow, so nothing here throws — every
 * entry point swallows its own errors.
 */

const CONSENT_KEY = "vow_cookie_consent"

type FbqParams = Record<string, unknown>
type FbqOptions = { eventID?: string }

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string }
    _fbq?: unknown
  }
}

/** Pixel ID is inlined at build time by Next, so this is safe on both server and client. */
export function getPixelId(): string {
  return (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim()
}

/** Opt-out model: only an explicit rejection blocks tracking. */
export function hasConsent(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(CONSENT_KEY) !== "rejected"
  } catch {
    // Private mode / blocked storage: fall back to the opt-out default.
    return true
  }
}

export function isPixelEnabled(): boolean {
  return typeof window !== "undefined" && Boolean(getPixelId()) && hasConsent()
}

/**
 * Event ID for future Conversions API deduplication: when the same conversion
 * is later sent server-side with this ID, Meta collapses the pair into one.
 */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  } catch {
    // fall through
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * The standard Meta bootstrap snippet, rendered inline by the root layout so
 * PageView fires on arrival rather than waiting for hydration or idle time.
 * Kept here so the snippet and the helpers below share one definition.
 *
 * The consent check is inside the string on purpose: it has to run before the
 * network request, not after React mounts.
 */
export function metaPixelBootstrapScript(pixelId: string): string {
  const id = JSON.stringify(pixelId)
  const key = JSON.stringify(CONSENT_KEY)
  return (
    `try{if(localStorage.getItem(${key})==='rejected'){}else{` +
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
    `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;` +
    `n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;` +
    `t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}` +
    `(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');` +
    `fbq('init',${id});fbq('track','PageView');` +
    `}}catch(e){}`
  )
}

function callFbq(args: unknown[]): void {
  if (!isPixelEnabled()) return
  try {
    const fbq = window.fbq
    if (typeof fbq !== "function") return
    fbq(...args)
  } catch {
    // Analytics never breaks a flow.
  }
}

/** Standard Meta event (Purchase, CompleteRegistration, Lead, ...). */
export function track(event: string, params?: FbqParams, eventId?: string): void {
  const options: FbqOptions = { eventID: eventId || newEventId() }
  callFbq(params ? ["track", event, params, options] : ["track", event, {}, options])
}

/** Custom (non-standard) event, e.g. DocumentIssued. */
export function trackCustom(event: string, params?: FbqParams, eventId?: string): void {
  const options: FbqOptions = { eventID: eventId || newEventId() }
  callFbq(params ? ["trackCustom", event, params, options] : ["trackCustom", event, {}, options])
}

/**
 * Client-side navigations do not re-run the bootstrap snippet, so route changes
 * need an explicit PageView. The initial PageView comes from the snippet.
 */
export function trackPageView(): void {
  callFbq(["track", "PageView"])
}
