"use client"

import { useEffect, useRef } from "react"

const GTM_ID = "GTM-WNGC226Q"
const FB_PIXEL_ID = "4291258411191239"

/** Safe env access - process.env can be undefined in some bundling contexts. */
const env = typeof process !== "undefined" ? process.env : ({} as NodeJS.ProcessEnv)

/**
 * Only load standalone gtag.js when GTM does NOT manage GA (e.g. GTM container has no GA4 tag).
 * Set NEXT_PUBLIC_GA_STANDALONE=true to force standalone GA. Default: GTM handles GA/Ads.
 */
const GA_MEASUREMENT_ID =
  env.NEXT_PUBLIC_GA_STANDALONE === "true" ? env.NEXT_PUBLIC_GA_MEASUREMENT_ID : undefined

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

let gtmLoadFailed = false

function loadGTM() {
  if (gtmLoadFailed) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
  injectScript(
    `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
    "gtm-script",
    undefined,
    () => {
      gtmLoadFailed = true
    },
  )
}

/** Standalone GA - only when GTM does not manage GA. Avoids ~100KB duplicate. */
function loadGA() {
  if (!GA_MEASUREMENT_ID) return
  const id = JSON.stringify(GA_MEASUREMENT_ID)
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    "ga-script",
  )
  injectInline(
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${id});`,
    "ga-inline",
  )
}

function loadFBPixel() {
  const id = JSON.stringify(FB_PIXEL_ID)
  injectInline(
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${id});fbq('track','PageView');`,
    "fb-pixel",
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

/** Phase 1: GTM (orchestrates GA/Ads). Phase 2: FB. Phase 3: PostHog (heaviest, last). */
function runDeferredLoad() {
  loadGTM()
  loadGA()

  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(() => {
      loadFBPixel()
      requestAnimationFrame(() => {
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(() => loadPostHog(), { timeout: 2000 })
        } else {
          setTimeout(loadPostHog, 500)
        }
      })
    })
  } else {
    setTimeout(() => {
      loadFBPixel()
      setTimeout(loadPostHog, 500)
    }, 0)
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
