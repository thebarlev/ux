import { pushEvent, type FunnelPlan } from "@/lib/tracking/events"

type TrackPurchaseParams = {
  transactionId: string
  orderValue: number
  planName: FunnelPlan
  currency?: string
}

function getPurchaseStorageKey(transactionId: string) {
  return `vow_purchase_tracked:${transactionId}`
}

export function trackPurchase({
  transactionId,
  orderValue,
  planName,
  currency = "USD",
}: TrackPurchaseParams) {
  if (typeof window === "undefined") return
  if (!transactionId) return

  const storageKey = getPurchaseStorageKey(transactionId)
  if (window.sessionStorage.getItem(storageKey) === "true") return

  pushEvent("purchase", {
    transaction_id: transactionId,
    value: orderValue,
    currency,
    plan: planName,
  })

  window.sessionStorage.setItem(storageKey, "true")
}
