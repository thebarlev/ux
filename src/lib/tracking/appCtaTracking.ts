import { CONSENT_EVENT, type Consent, hasConsentFor } from "@/lib/consent"

import { getAttribution } from "./attribution"
import {
  ATTR_COOKIE,
  ATTR_MAX_AGE,
  buildTouch,
  cookieDomainFor,
  mergeTouch,
  parseAttr,
  serializeAttr,
} from "./attributionCookie"
import { isDuplicateClick, parseAppUrl, planFromAppUrl, withEnglishLang } from "./appCtaLink"
import { capturePostHog, getPageLanguage, sendGa4Event } from "./ga4"

// ── ux_attr cookie ──────────────────────────────────────────────────────────

function readCookie(name: string): string | undefined {
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))
  return hit?.slice(name.length + 1)
}

function cookieSuffix(): string {
  const domain = cookieDomainFor(location.hostname)
  const secure = location.protocol === "https:" ? "; Secure" : ""
  return `; Path=/${domain ? `; Domain=${domain}` : ""}; SameSite=Lax${secure}`
}

/** Records this page view's campaign / external referrer, analytics consent only. */
export function recordAttribution(pathname: string) {
  if (typeof window === "undefined" || !hasConsentFor("analytics")) return
  const touch = buildTouch(getAttribution(), document.referrer, pathname, getPageLanguage())
  const existing = parseAttr(readCookie(ATTR_COOKIE))
  const next = mergeTouch(existing, touch)
  if (!next || next === existing) return
  document.cookie = `${ATTR_COOKIE}=${serializeAttr(next)}; Max-Age=${ATTR_MAX_AGE}${cookieSuffix()}`
}

function clearAttribution() {
  document.cookie = `${ATTR_COOKIE}=; Max-Age=0${cookieSuffix()}`
}

// ── links into the app ─────────────────────────────────────────────────────

const APP_LINKS = 'a[href^="https://ai.uxellent.com"]'

/** English pages: every link into the app carries lang=en (hover, copy and new-tab included). */
export function rewriteAppLinksForLanguage(root: ParentNode = document) {
  const lang = getPageLanguage()
  if (lang !== "en") return
  root.querySelectorAll<HTMLAnchorElement>(APP_LINKS).forEach((a) => {
    const next = withEnglishLang(a.href, lang)
    if (next) a.href = next
  })
}

function ctaLocation(a: Element): string {
  const tagged = a.closest("[data-cta-location]")?.getAttribute("data-cta-location")
  if (tagged) return tagged.slice(0, 40)
  const area = a.closest("header, footer, nav, section[id], [id^='sheet'], section")
  if (!area) return "page"
  return (area.id || area.tagName.toLowerCase()).slice(0, 40)
}

let last: { href: string; at: number } | null = null

function onAppLinkClick(e: MouseEvent) {
  if (e.type === "auxclick" && e.button !== 1) return
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
  if (!a || !parseAppUrl(a.href)) return

  const lang = getPageLanguage()
  const fixed = withEnglishLang(a.href, lang)
  if (fixed) a.href = fixed // before the browser reads it for navigation

  const now = Date.now()
  if (isDuplicateClick(last, a.href, now)) return
  last = { href: a.href, at: now }

  const url = parseAppUrl(a.href)!
  const params = {
    cta_location: ctaLocation(a),
    page_language: lang,
    page_path: location.pathname,
    plan: planFromAppUrl(url),
  }
  sendGa4Event("cta_build_click", params)
  capturePostHog("cta_build_click", params)
}

/**
 * Installs the one document-level listener (idempotent) and the consent hooks
 * for the attribution cookie. Returns the cleanup.
 */
export function installAppCtaTracking(): () => void {
  if (typeof window === "undefined") return () => {}
  const onConsentChange = (e: Event) => {
    const c = (e as CustomEvent<Consent>).detail
    if (!c) return
    if (c.analytics) recordAttribution(location.pathname)
    else clearAttribution()
  }
  document.addEventListener("click", onAppLinkClick, true)
  document.addEventListener("auxclick", onAppLinkClick, true)
  window.addEventListener(CONSENT_EVENT, onConsentChange)
  return () => {
    document.removeEventListener("click", onAppLinkClick, true)
    document.removeEventListener("auxclick", onAppLinkClick, true)
    window.removeEventListener(CONSENT_EVENT, onConsentChange)
  }
}
