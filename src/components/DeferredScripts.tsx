"use client"

import { useEffect, useRef } from "react"

/**
 * The Meta Pixel is deliberately not loaded here.
 *
 * Everything in this file waits for the first interaction or for idle (up to a
 * 4s timeout), so a visitor who landed from an ad and bounced within a few
 * seconds never fired PageView — exactly the traffic campaigns are measured on.
 * The pixel bootstraps from the root layout instead; see
 * lib/analytics/meta-pixel.ts, which also carries the consent gate. The tags
 * below stay deferred.
 */

/**
 * Google tags load directly, with no container in front of them.
 *
 * GTM-WNGC226Q is unrecoverable: it was registered under itzik@uxellent.com,
 * which went away with the Workspace, and it is not visible from either
 * remaining account. Its public gtm.js was taken apart and held exactly two
 * tags — the GA4 and Google Ads IDs below — so loading them directly loses
 * nothing and puts both back under an account we can actually administer.
 *
 * The IDs are literals rather than env vars on purpose: a flag left unset in
 * one environment must not be able to silence measurement.
 */
const GA_MEASUREMENT_ID = "G-HEX0NQF4WM"
const GOOGLE_ADS_ID = "AW-17972291188"

/** Safe env access - process.env can be undefined in some bundling contexts. */
const env = typeof process !== "undefined" ? process.env : ({} as NodeJS.ProcessEnv)

const POSTHOG_KEY = env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

function injectScript(
  src: string,
  id?: string,
  onload?: () => void,
  onerror?: () => void,
) {
  if (id && document.getElementById(id)) return
  const s = document.createElement("script")
  s.src = src
  s.async = true
  if (id) s.id = id
  if (onload) s.onload = onload
  if (onerror) s.onerror = onerror
  document.head.appendChild(s)
}

function injectInline(code: string, id: string) {
  if (document.getElementById(id)) return
  const s = document.createElement("script")
  s.id = id
  s.textContent = code
  document.head.appendChild(s)
}

/**
 * One gtag.js load serves both GA4 and Google Ads — they share the library, so
 * this is a single request with two config calls. It also defines window.gtag,
 * which is what the lead form's generate_lead event calls.
 */
function loadGoogleTags() {
  const ga = JSON.stringify(GA_MEASUREMENT_ID)
  const ads = JSON.stringify(GOOGLE_ADS_ID)
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    "gtag-script",
  )
  injectInline(
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());gtag('config',${ga});gtag('config',${ads});`,
    "gtag-inline",
  )
}

function loadPostHog() {
  if (!POSTHOG_KEY) return
  const assetsHost = POSTHOG_HOST.replace(".i.posthog.com", "-assets.i.posthog.com")
  injectScript(`${assetsHost}/static/array.js`, "posthog-script", () => {
    if (typeof window !== "undefined" && (window as unknown as { posthog?: { init: (k: string, o: object) => void } }).posthog?.init) {
      ;(window as unknown as { posthog: { init: (k: string, o: object) => void } }).posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        disable_session_recording: true,
        disable_surveys: true,
        autocapture: false,
        capture_pageview: true,
        advanced_disable_feature_flags: true,
      })
    }
  })
}

/** Phase 1: GA4 + Google Ads. Phase 2: PostHog (heaviest, last). */
function runDeferredLoad() {
  loadGoogleTags()

  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(() => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => loadPostHog(), { timeout: 2000 })
      } else {
        setTimeout(loadPostHog, 500)
      }
    })
  } else {
    setTimeout(loadPostHog, 500)
  }
}

export function DeferredScripts() {
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return

    const load = () => {
      if (loadedRef.current) return
      loadedRef.current = true
      runDeferredLoad()
    }

    const triggers = ["click", "scroll", "keydown", "touchstart"] as const
    const handleInteraction = () => {
      load()
      triggers.forEach((t) => window.removeEventListener(t, handleInteraction))
    }

    triggers.forEach((t) =>
      window.addEventListener(t, handleInteraction, { once: true, passive: true }),
    )

    const scheduleIdle = () => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(load, { timeout: 4000 })
      } else {
        setTimeout(load, 3500)
      }
    }

    scheduleIdle()
  }, [])

  return null
}
