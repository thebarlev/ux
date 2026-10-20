/**
 * Cookie consent (tbl-027). The visitor's choice lives in one necessary
 * cookie, `ux_consent`: version, date, and one flag per category, for 12
 * months. Opt-in: no measurement or marketing script may load until its
 * category is allowed here. Load them through `onConsent`, never directly.
 */

export const CONSENT_COOKIE = "ux_consent"
export const CONSENT_VERSION = 1
const MAX_AGE = 365 * 24 * 60 * 60
export const CONSENT_EVENT = "ux-consent"

export type ConsentCategory = "analytics" | "marketing"
export type Consent = { version: number; date: string; analytics: boolean; marketing: boolean }

/** `1|2026-10-20T10:00:00.000Z|a1|m0` */
export function parseConsent(raw: string | undefined | null): Consent | null {
  if (!raw) return null
  const [v, date, a, m] = decodeURIComponent(raw).split("|")
  if (Number(v) !== CONSENT_VERSION || !date || !/^a[01]$/.test(a ?? "") || !/^m[01]$/.test(m ?? "")) return null
  return { version: CONSENT_VERSION, date, analytics: a === "a1", marketing: m === "m1" }
}

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
  return parseConsent(hit?.slice(CONSENT_COOKIE.length + 1))
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const c: Consent = { version: CONSENT_VERSION, date: new Date().toISOString(), ...choice }
  const value = encodeURIComponent(`${c.version}|${c.date}|a${c.analytics ? 1 : 0}|m${c.marketing ? 1 : 0}`)
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }))
  return c
}

export const hasConsentFor = (category: ConsentCategory) => Boolean(readConsent()?.[category])

/** Runs `load` once the category is allowed: now, or when the visitor allows it later. */
export function onConsent(category: ConsentCategory, load: () => void) {
  if (typeof window === "undefined") return () => {}
  if (hasConsentFor(category)) {
    load()
    return () => {}
  }
  const listener = (e: Event) => {
    if ((e as CustomEvent<Consent>).detail?.[category]) {
      window.removeEventListener(CONSENT_EVENT, listener)
      load()
    }
  }
  window.addEventListener(CONSENT_EVENT, listener)
  return () => window.removeEventListener(CONSENT_EVENT, listener)
}

/** The same check, as a string for an inline script that must run before any request. */
export const MARKETING_CONSENT_CHECK = `/(?:^|; )${CONSENT_COOKIE}=1(?:%7C|\\|)[^;]*(?:%7C|\\|)m1(?:;|$)/.test(document.cookie)`
