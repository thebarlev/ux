/**
 * Plan numbers from the platform's one price source (AV-297 §6, migration
 * 0316): GET ai.uxellent.com/api/public/pricing. Pure (no I/O, no
 * server-only) so it runs under `node --test`.
 *
 * The endpoint owns prices (ILS, USD) and the AI quota. It does not know
 * what the marketing cards list, so the remaining per-plan facts (backup
 * days, lead form, email) stay in the site's own data/plan-features.json.
 *
 * Every field is checked on its own: a missing or malformed one is left out
 * (undefined) and its line is not shown, so the site never shows a wrong
 * number.
 */

export const PLAN_IDS = ["free", "start", "business", "pro"] as const
export type PlanId = (typeof PLAN_IDS)[number]

/** The platform's plan codes ⟵ the site's ids (the site's ids stay, they are in URLs and analytics). */
export const PLATFORM_CODE: Readonly<Record<string, PlanId>> = { free: "free", basic: "start", plus: "business", pro: "pro" }

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
  /** tbl-042: leads and email, per plan */
  readonly leadForm?: boolean
  readonly mailingList?: boolean
  readonly emailAutomations?: boolean
  /** null: no monthly email count to show */
  readonly emailsMonth?: number | null
  /** 046: days of daily backup and restore; null: no backup line */
  readonly backupDays?: number | null
}
export type Plans = Partial<Record<PlanId, Plan>>

const amount = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined)
const count = (v: unknown) => (typeof v === "number" && Number.isInteger(v) && v > 0 ? v : undefined)
const countOrNull = (v: unknown) => (v === null ? null : count(v))
const flag = (v: unknown) => (typeof v === "boolean" ? v : undefined)
const obj = (v: unknown) => (v !== null && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {})

/**
 * dhh (owner, 26.11): two price lists only, Israeli in shekels and
 * international in dollars, never chosen by the site's language. What a
 * visitor on the international list is shown is a switch in the platform's
 * admin (one switch for the site, the portal and the payment screen):
 *   "ils"     everyone sees shekels (dollar list built, off) — until the owner
 *             picks; the currency every customer is actually billed in today
 *   "usd"     dollars
 *   "usd+ils" dollars, plus a line that billing is in shekels
 * The endpoint carries it as `international.display`; anything else ⟵ "ils".
 */
export const INTL_DISPLAYS = ["ils", "usd", "usd+ils"] as const
export type IntlDisplay = (typeof INTL_DISPLAYS)[number]

export function parseIntlDisplay(data: unknown): IntlDisplay {
  const d = obj(obj(data).international).display
  return INTL_DISPLAYS.find((x) => x === d) ?? "ils"
}

/**
 * The endpoint's answer (or the snapshot of it) plus the site's features, as
 * plans. null when it is not an ILS plans list at all.
 */
export function parsePricing(data: unknown, features: unknown): Plans | null {
  const root = obj(data)
  if (root.currency !== "ILS" || !Array.isArray(root.plans)) return null
  const feat = obj(features)
  const plans: Plans = {}
  for (const raw of root.plans) {
    const p = obj(raw)
    const id = typeof p.code === "string" ? PLATFORM_CODE[p.code] : undefined
    if (!id || plans[id]) continue
    const usd = obj(p.usd)
    const f = obj(feat[id])
    plans[id] = {
      id,
      priceIlsMonth: amount(p.monthly),
      priceIlsYear: amount(p.yearlyPerMonth),
      priceUsdMonth: amount(usd.monthly),
      priceUsdYear: amount(usd.yearlyPerMonth),
      aiActionsMonth: count(p.aiActionsPerMonth),
      aiActionsDay: countOrNull(f.ai_actions_day),
      trialDays: countOrNull(f.trial_days),
      leadForm: flag(f.lead_form),
      mailingList: flag(f.mailing_list),
      emailAutomations: flag(f.email_automations),
      emailsMonth: countOrNull(f.emails_month),
      backupDays: countOrNull(f.backup_days),
    }
  }
  return Object.keys(plans).length ? plans : null
}
