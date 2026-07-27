"use client"

import { useEffect, useRef } from "react"

/**
 * Tags are loaded straight from here, not through Google Tag Manager.
 * The old GTM container (GTM-WNGC226Q) only ever held these two tags, and it
 * sat under a Workspace identity we no longer control, so it was dropped.
 * Add a new tag here rather than reintroducing a container.
 */
const GA_MEASUREMENT_ID = "G-HEXONQF4WM"
const GOOGLE_ADS_ID = "AW-17972291188"
const FB_PIXEL_ID = "1724775985079479"

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
 * One gtag.js load serves both GA4 and Google Ads - they share the library,
 * so this is a single request with two config calls.
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

/** Phase 1: GA4 + Google Ads. Phase 2: FB. Phase 3: PostHog (heaviest, last). */
function runDeferredLoad() {
  loadGoogleTags()

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
