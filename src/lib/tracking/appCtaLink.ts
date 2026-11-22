/**
 * Links from the marketing site into the site builder (ai.uxellent.com).
 * Pure helpers; the click wiring lives in appCtaTracking.ts.
 */

export const APP_HOST = "ai.uxellent.com"

export function parseAppUrl(href: string | null | undefined): URL | null {
  if (!href) return null
  try {
    const url = new URL(href)
    return url.hostname.toLowerCase() === APP_HOST ? url : null
  } catch {
    return null
  }
}

/**
 * The app creates an English site only when it receives `lang=en`
 * (platform lib/auth/start-intent.ts). Returns the href to use on an English
 * page, or null when nothing needs to change.
 */
export function withEnglishLang(href: string, pageLang: "he" | "en"): string | null {
  if (pageLang !== "en") return null
  const url = parseAppUrl(href)
  if (!url || url.searchParams.get("lang") === "en") return null
  url.searchParams.set("lang", "en")
  return url.toString()
}

/**
 * `plan` from the link, for the event. The business description (`p`) and any
 * other parameter are deliberately never read.
 */
export function planFromAppUrl(url: URL): string | undefined {
  const plan = url.searchParams.get("plan")
  return plan && /^[a-z0-9_-]{1,32}$/i.test(plan) ? plan : undefined
}

/** One click → one event: the same href within this window is a double fire, not a second click. */
export const CTA_DEDUPE_MS = 1000

export function isDuplicateClick(
  last: { href: string; at: number } | null,
  href: string,
  now: number,
): boolean {
  return Boolean(last && last.href === href && now - last.at < CTA_DEDUPE_MS)
}
