import "server-only"

import features from "../../data/plan-features.json"
import snapshot from "../../data/plans.snapshot.json"
import { parseIntlDisplay, parsePricing, type IntlDisplay, type Plans } from "./plans-parse"

export { INTL_DISPLAYS, PLAN_IDS, PLATFORM_CODE, parseIntlDisplay, parsePricing, type IntlDisplay, type Plan, type PlanId, type Plans } from "./plans-parse"

/**
 * Plan prices and AI action counts (tbl-034). The site writes no plan number
 * by hand: they come from the platform's one price source (AV-297 §6), so the
 * site and the product never drift apart. Plan names, descriptions and
 * features stay in the site's own copy (data/plan-features.json).
 *
 * The endpoint is read with ISR (every 5 minutes). If the call fails or the
 * answer is not a plans list, data/plans.snapshot.json is used and a warning
 * is logged. The snapshot is a byte copy of the endpoint, written by
 * scripts/update-plans-snapshot.mjs and checked at build time by
 * scripts/check-plans-snapshot.mjs, never edited by hand.
 */
export const PLANS_ENDPOINT = process.env.PLANS_ENDPOINT || "https://ai.uxellent.com/api/public/pricing"
export const PLANS_REVALIDATE = 300

export type Pricing = { readonly plans: Plans; readonly intl: IntlDisplay }

const SNAPSHOT_PLANS = parsePricing(snapshot, features)
if (!SNAPSHOT_PLANS) throw new Error("data/plans.snapshot.json is not a valid plans list")
const SNAPSHOT: Pricing = { plans: SNAPSHOT_PLANS, intl: parseIntlDisplay(snapshot) }

/** The plans and the international display switch (dhh), from one read. */
export async function getPricing(): Promise<Pricing> {
  try {
    const res = await fetch(PLANS_ENDPOINT, { next: { revalidate: PLANS_REVALIDATE }, signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: unknown = await res.json()
    const plans = parsePricing(data, features)
    if (!plans) throw new Error("not a plans list")
    return { plans, intl: parseIntlDisplay(data) }
  } catch (err) {
    console.warn(`[plans] ${PLANS_ENDPOINT} failed (${err instanceof Error ? err.message : String(err)}); using data/plans.snapshot.json`)
    return SNAPSHOT
  }
}

export async function getPlans(): Promise<Plans> {
  return (await getPricing()).plans
}
