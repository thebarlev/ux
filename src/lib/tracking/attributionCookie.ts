/**
 * Cross-domain attribution (analytics phase 1).
 *
 * The visitor's campaign source used to live only in sessionStorage on
 * uxellent.com, so it died at the hop to ai.uxellent.com. This keeps it in one
 * first-party cookie, `ux_attr`, scoped to `.uxellent.com`, which the app on
 * ai.uxellent.com can read (phase 2) without anything in the URL.
 *
 * What it may hold, and nothing else:
 * - the five UTM values, sanitized (length cap, no e-mail or phone-like values);
 * - the external referrer's host only (no path, no query);
 * - the landing path only (no query string: the query can carry free text);
 * - the page language and a timestamp.
 * No gclid / fbclid (advertising identifiers), no lead details, no business description.
 *
 * Written only with analytics consent, removed when that consent is withdrawn
 * (the wiring is in TrackingProvider). Pure: no imports, no DOM access here.
 */

export const ATTR_COOKIE = "ux_attr"
export const ATTR_VERSION = 1
export const ATTR_MAX_AGE = 90 * 24 * 60 * 60
const MAX_VALUE = 100

export type Touch = {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  /** external referrer host, e.g. "www.google.com" */
  ref?: string
  /** landing path, no query */
  lp?: string
  lang?: "he" | "en"
  /** ISO time of the touch */
  ts: string
}

export type AttrCookie = { v: number; ft: Touch; lt: Touch }

export type UtmInput = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

const EMAIL = /@/
const PHONE_LIKE = /\d[\d\s\-().]{6,}\d/

/** Trims, caps, and drops anything that could be personal data. */
export function sanitizeValue(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined
  const v = raw.trim().slice(0, MAX_VALUE)
  if (!v || EMAIL.test(v) || PHONE_LIKE.test(v)) return undefined
  return v
}

/** Host of an external referrer, or undefined for none / our own domains / garbage. */
export function externalReferrerHost(referrer: string | undefined | null, ownHosts: readonly string[] = ["uxellent.com"]): string | undefined {
  if (!referrer) return undefined
  let host: string
  try {
    host = new URL(referrer).hostname.toLowerCase()
  } catch {
    return undefined
  }
  if (!host) return undefined
  if (ownHosts.some((h) => host === h || host.endsWith(`.${h}`))) return undefined
  return host.slice(0, MAX_VALUE)
}

/** A new touch, or null when this page view carries no campaign and no external referrer. */
export function buildTouch(
  utm: UtmInput,
  referrer: string | undefined | null,
  landingPath: string,
  lang: "he" | "en",
  now: Date = new Date(),
): Touch | null {
  const t: Touch = { ts: now.toISOString() }
  const source = sanitizeValue(utm.utm_source)
  const medium = sanitizeValue(utm.utm_medium)
  const campaign = sanitizeValue(utm.utm_campaign)
  const term = sanitizeValue(utm.utm_term)
  const content = sanitizeValue(utm.utm_content)
  const ref = externalReferrerHost(referrer)
  if (!source && !medium && !campaign && !term && !content && !ref) return null
  if (source) t.source = source
  if (medium) t.medium = medium
  if (campaign) t.campaign = campaign
  if (term) t.term = term
  if (content) t.content = content
  if (ref) t.ref = ref
  const lp = landingPath.split(/[?#]/)[0]?.slice(0, MAX_VALUE)
  if (lp) t.lp = lp
  t.lang = lang
  return t
}

/**
 * First touch is kept forever (until the cookie expires); last touch follows
 * the newest campaign or external referrer. A direct visit (no touch) changes nothing.
 */
export function mergeTouch(existing: AttrCookie | null, touch: Touch | null): AttrCookie | null {
  if (!touch) return existing
  if (!existing) return { v: ATTR_VERSION, ft: touch, lt: touch }
  return { v: ATTR_VERSION, ft: existing.ft, lt: touch }
}

export function serializeAttr(a: AttrCookie): string {
  return encodeURIComponent(JSON.stringify(a))
}

export function parseAttr(raw: string | undefined | null): AttrCookie | null {
  if (!raw) return null
  try {
    const a = JSON.parse(decodeURIComponent(raw)) as AttrCookie
    if (!a || a.v !== ATTR_VERSION || typeof a.ft?.ts !== "string" || typeof a.lt?.ts !== "string") return null
    return a
  } catch {
    return null
  }
}

/** `.uxellent.com` on our hosts; undefined (host-only cookie) on localhost and previews. */
export function cookieDomainFor(hostname: string): string | undefined {
  const h = hostname.toLowerCase()
  return h === "uxellent.com" || h.endsWith(".uxellent.com") ? ".uxellent.com" : undefined
}
