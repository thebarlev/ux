export type FunnelPlan = "basic" | "pro" | "expert"

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function pushEvent(
  eventName: string,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: eventName,
    ...payload,
  })
}

export function inferFunnelPlan(input?: string | null): FunnelPlan | null {
  if (!input) return null

  const value = input.toLowerCase()

  if (
    value.includes("a_basic") ||
    value.includes("basic") ||
    value.includes("starter")
  ) {
    return "basic"
  }

  if (value.includes("a_pro") || value.includes("pro")) {
    return "pro"
  }

  if (
    value.includes("a_premium") ||
    value.includes("a_expert") ||
    value.includes("premium") ||
    value.includes("expert")
  ) {
    return "expert"
  }

  return null
}
