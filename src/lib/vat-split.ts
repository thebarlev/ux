import "server-only"

import snapshot from "../../data/vat-split.snapshot.json"
import { parseVatSplits, type VatSplits } from "./vat-split-parse"

/**
 * The base + VAT split of the Israeli prices, from the platform's public pricing endpoint (#2996).
 * Only the split is read here: the prices the site shows still come from src/lib/plans.ts, and a split
 * that does not add up to the price shown is never displayed (plan-fill.ts). ISR every 5 minutes; if the
 * call fails, the snapshot (data/vat-split.snapshot.json) is used and a warning is logged.
 */
export const PRICING_ENDPOINT = process.env.PRICING_ENDPOINT || "https://ai.uxellent.com/api/public/pricing"

const SNAPSHOT = parseVatSplits(snapshot)

export async function getVatSplits(): Promise<VatSplits> {
  try {
    const res = await fetch(PRICING_ENDPOINT, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const splits = parseVatSplits(await res.json())
    if (!Object.keys(splits).length) throw new Error("no ilsVat")
    return splits
  } catch (err) {
    console.warn(`[vat-split] ${PRICING_ENDPOINT} failed (${err instanceof Error ? err.message : String(err)}); using data/vat-split.snapshot.json`)
    return SNAPSHOT
  }
}
