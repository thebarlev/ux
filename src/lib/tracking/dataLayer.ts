import { getPageLanguage, sendGa4Event } from "./ga4"

export type PageLanguage = "he" | "en"
export type PageDir = "rtl" | "ltr"

export type TrackingService =
  | "web_development"
  | "automation"
  | "marketing"
  | "ai_accountant"
  | "other"

export type PageCategory =
  | "home"
  | "service"
  | "portfolio"
  | "pricing"
  | "blog"
  | "other"

export type BaseDataLayerPayload = {
  timestamp: string
  page_path: string
  page_title: string
  page_language: PageLanguage
  page_dir: PageDir
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

function getBasePayload(): BaseDataLayerPayload {
  const now = new Date().toISOString()

  if (typeof window === "undefined") {
    return {
      timestamp: now,
      page_path: "",
      page_title: "",
      page_language: "he",
      page_dir: "rtl",
    }
  }

  return {
    timestamp: now,
    page_path: window.location.pathname,
    page_title: typeof document !== "undefined" ? document.title : "",
    page_language: getPageLanguage(),
    page_dir: getPageLanguage() === "en" ? "ltr" : "rtl",
  }
}

export type DataLayerEventName =
  | "vow_page_view"
  | "vow_lead_submit"
  | "vow_lead_submit_success"
  | "vow_lead_submit_error"

export type DataLayerEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> =
  BaseDataLayerPayload & { event: DataLayerEventName } & TPayload

export function pushDataLayer(eventName: DataLayerEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return

  if (!window.dataLayer) window.dataLayer = []

  const base = getBasePayload()
  const event: DataLayerEvent = {
    event: eventName,
    ...base,
    ...payload,
  }

  window.dataLayer.push(event)

  // The dataLayer objects above were read by GTM, which is gone; gtag.js does
  // not forward them to GA4. Only the lead success is forwarded, as GA4's
  // recommended generate_lead, with no lead details and no attribution (GA4
  // has its own). vow_page_view is deliberately not forwarded: gtag's config
  // already sends page_view, so forwarding it would double every page view.
  if (eventName === "vow_lead_submit_success") {
    sendGa4Event("generate_lead", {
      form_id: typeof payload.form_location === "string" ? `lead_${payload.form_location}` : "lead_form",
      lead_source: typeof payload.lead_source === "string" ? payload.lead_source : undefined,
      page_language: base.page_language,
    })
  }
}

