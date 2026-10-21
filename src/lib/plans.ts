import "server-only"

import snapshot from "../../data/plans.snapshot.json"

/**
 * Plan prices and AI action counts (tbl-034). The site writes no plan number
 * by hand: they come from the platform's public endpoint, so the site and the
 * product never drift apart. Plan names, descriptions and features stay in the
 * site's own copy; only the numbers come from here.
 *
 * The endpoint is read with ISR (every 5 minutes). Every field is checked on
 * its own: one that is missing or malformed is left out (undefined) and its
 * line is not shown, so the site never shows a wrong number. If the call fails
 * or the answer is not a plans list, the last checked snapshot
 * (data/plans.snapshot.json) is used and a warning is logged.
 */
export const PLANS_ENDPOINT = process.env.PLANS_ENDPOINT || "https://ai.uxellent.com/api/public/plans"
export const PLANS_REVALIDATE = 300

export const PLAN_IDS = ["free", "start", "business", "pro"] as const
export type PlanId = (typeof PLAN_IDS)[number]

export type Plan = {
  readonly id: PlanId
  readonly priceIlsMonth?: number
  /** the monthly price on yearly billing */
  readonly priceIlsYear?: number
  readonly priceUsdMonth?: number
  readonly priceUsdYear?: number
  readonly aiActionsMonth?: number
  /** null: no daily cap */
  readonly aiActionsDay?: number | null
  /** null: no trial */
  readonly trialDays?: number | null
}
export type Plans = Partial<Record<PlanId, Plan>>

const amount = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined)
const count = (v: unknown) => (typeof v === "number" && Number.isInteger(v) && v > 0 ? v : undefined)
const countOrNull = (v: unknown) => (v === null ? null : count(v))

/** The endpoint's answer (or the snapshot) as plans; null when it is not a plans list at all. */
export function parsePlans(data: unknown): Plans | null {
  const list = (data as { plans?: unknown } | null)?.plans
  if (!Array.isArray(list)) return null
  const plans: Plans = {}
  for (const raw of list) {
    const p = (raw ?? {}) as Record<string, unknown>
    const id = PLAN_IDS.find((x) => x === p.id)
    if (!id || plans[id]) continue
    plans[id] = {
      id,
      priceIlsMonth: amount(p.price_ils_month),
      priceIlsYear: amount(p.price_ils_year),
      priceUsdMonth: amount(p.price_usd_month),
      priceUsdYear: amount(p.price_usd_year),
      aiActionsMonth: count(p.ai_actions_month),
      aiActionsDay: countOrNull(p.ai_actions_day),
      trialDays: countOrNull(p.trial_days),
    }
  }
  return Object.keys(plans).length ? plans : null
}

const SNAPSHOT = parsePlans(snapshot)
if (!SNAPSHOT) throw new Error("data/plans.snapshot.json is not a valid plans list")

export async function getPlans(): Promise<Plans> {
  try {
    const res = await fetch(PLANS_ENDPOINT, { next: { revalidate: PLANS_REVALIDATE }, signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const plans = parsePlans(await res.json())
    if (!plans) throw new Error("not a plans list")
    return plans
  } catch (err) {
    console.warn(`[plans] ${PLANS_ENDPOINT} failed (${err instanceof Error ? err.message : String(err)}); using data/plans.snapshot.json`)
    return SNAPSHOT!
  }
}
