/**
 * dij (owner, 26.11 23:12) · #2996: the Israeli price includes VAT, and base + VAT add up exactly to what
 * is charged, computed on the platform in agorot. The platform's public pricing endpoint gives the split
 * (ilsVat) per plan and period. This file only reads it; the site never computes VAT.
 *
 * Pure (no fetch, no "server-only") so the tests can load it.
 */
export type VatSplit = { readonly net: number; readonly vat: number }
export type PlanVat = { readonly month?: VatSplit; readonly yearPerMonth?: VatSplit }
/** by the site's plan ids */
export type VatSplits = Partial<Record<"start" | "business" | "pro", PlanVat>>

// the platform's plan codes ⟵ the site's ids (same closed list as the pricing buttons, AV-938)
const SITE_ID: Record<string, "start" | "business" | "pro"> = { basic: "start", plus: "business", pro: "pro" }

const obj = (v: unknown) => (v !== null && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {})
const amount = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined)

function split(v: unknown): VatSplit | undefined {
  const o = obj(v)
  const net = amount(o.net), vat = amount(o.vat)
  return net === undefined || vat === undefined ? undefined : { net, vat }
}

/** The endpoint's answer (or the snapshot of it) as splits per site plan; {} when there is none. */
export function parseVatSplits(data: unknown): VatSplits {
  const root = obj(data)
  const out: VatSplits = {}
  if (root.currency !== "ILS" || !Array.isArray(root.plans)) return out
  for (const raw of root.plans) {
    const p = obj(raw)
    const id = typeof p.code === "string" ? SITE_ID[p.code] : undefined
    if (!id || out[id]) continue
    const v = obj(p.ilsVat)
    const month = split(v.monthly), yearPerMonth = split(v.yearlyPerMonth)
    if (month || yearPerMonth) out[id] = { month, yearPerMonth }
  }
  return out
}

/** A split is shown only when it adds up, to the agora, to the price the page already shows. */
export const addsUpTo = (s: VatSplit | undefined, price: number | undefined): s is VatSplit =>
  s !== undefined && price !== undefined && Math.round(s.net * 100) + Math.round(s.vat * 100) === Math.round(price * 100)

/** Two decimals, always (agorot): "₪9.10", never "₪9.1". */
export const agorot = (n: number) => n.toFixed(2)
