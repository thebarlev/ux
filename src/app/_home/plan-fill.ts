import { PLAN_IDS, type Plan, type PlanId, type Plans } from "@/lib/plans"

/**
 * Fills the plan placeholders the sheets generator left in the markup
 * (scripts/home-sheets/build.py, plan_tokens) from the plans data (tbl-034).
 * A line whose number is missing is left out; nothing shows "undefined" or NaN.
 * Hebrew shows shekels, English shows dollars, each from its own field.
 */
type Lang = "he" | "en"

const NAME: Record<Lang, Record<PlanId, string>> = {
  he: { free: "חינם", start: "התחלה", business: "עסקי", pro: "מקצועי" },
  en: { free: "Free", start: "Starter", business: "Business", pro: "Pro" },
}

const num = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 })

function prices(p: Plan | undefined, lang: Lang) {
  const m = lang === "he" ? p?.priceIlsMonth : p?.priceUsdMonth
  const y = lang === "he" ? p?.priceIlsYear : p?.priceUsdYear
  return m === undefined || y === undefined ? null : { m, y }
}

const CUR = { he: "₪", en: "$" } as const

function priceHtml(p: Plan | undefined, lang: Lang) {
  const pr = prices(p, lang)
  if (!pr) return ""
  return `<div class="pl-price"><span class="cur">${CUR[lang]}</span><b data-m="${num(pr.m)}" data-y="${num(pr.y)}">${num(pr.y)}</b><span class="per">${lang === "he" ? "לחודש" : "/month"}</span></div>`
}

function yearHtml(p: Plan | undefined, lang: Lang) {
  const pr = prices(p, lang)
  if (!pr) return ""
  const c = CUR[lang]
  const m = lang === "he" ? `${c}${num(pr.m)} בחיוב חודשי` : `${c}${num(pr.m)} billed monthly`
  const y = lang === "he" ? `${c}${num(pr.y * 12)} בחיוב שנתי` : `${c}${num(pr.y * 12)} billed yearly`
  return `<span class="pl-yr" data-m="${m}" data-y="${y}">${y}</span>`
}

function actHtml(p: Plan | undefined, lang: Lang) {
  const n = p?.aiActionsMonth
  const trial = p?.trialDays
  if (n === undefined || trial === undefined) return ""
  const what =
    trial === null
      ? lang === "he" ? "פעולות AI בחודש" : "AI actions a month"
      : lang === "he" ? `פעולות AI בתקופת ניסיון של ${num(trial)} יום` : `AI actions in a ${num(trial)}-day trial`
  const d = p?.aiActionsDay
  const day =
    d === undefined ? "" : d === null ? (lang === "he" ? "בלי הגבלה יומית" : "No daily cap") : lang === "he" ? `עד ${num(d)} ביום` : `Up to ${num(d)} a day`
  return `<div class="pl-act"><b>${num(n)}</b><span>${what}${day ? `<small>${day}</small>` : ""}</span></div>`
}

/** The yearly saving, when it is the same (rounded) on every paid plan; otherwise none. */
function savePct(plans: Plans, lang: Lang) {
  const pcts = PLAN_IDS.map((id) => prices(plans[id], lang)).filter((pr) => pr && pr.m > 0).map((pr) => Math.round((1 - pr!.y / pr!.m) * 100))
  return pcts.length && pcts.every((x) => x === pcts[0]) && pcts[0] > 0 ? pcts[0] : null
}

function saveAnswer(plans: Plans, lang: Lang) {
  const p = savePct(plans, lang)
  if (p === null) return lang === "he" ? "בחיוב שנתי המחיר החודשי נמוך יותר, לעומת חיוב חודשי." : "Yearly billing costs less per month than monthly billing."
  return lang === "he" ? `${p}% על כל החבילות בתשלום, לעומת חיוב חודשי.` : `${p}% on every paid plan, compared with monthly billing.`
}

export function fillPlans(html: string, lang: Lang, plans: Plans) {
  const save = savePct(plans, lang)
  const from = PLAN_IDS.map((id) => prices(plans[id], lang)?.m).filter((m): m is number => m !== undefined)
  let out = html
    .replace(/\{\{PLAN_PRICE:(\w+)\}\}/g, (_, id: PlanId) => priceHtml(plans[id], lang))
    .replace(/\{\{PLAN_YEAR:(\w+)\}\}/g, (_, id: PlanId) => yearHtml(plans[id], lang))
    .replace(/\{\{PLAN_ACT:(\w+)\}\}/g, (_, id: PlanId) => actHtml(plans[id], lang))
    .replace("{{PLAN_SAVE_BADGE}}", save === null ? "" : lang === "he" ? `<em>${save}%-</em>` : `<em>Save ${save}%</em>`)
    .replace(/\{\{PLAN_SAVE_ANSWER\}\}/g, saveAnswer(plans, lang))
  if (from.length) {
    const min = num(Math.min(...from))
    out = out.replace("{{PLAN_FROM}}", lang === "he" ? `מ-₪${min} לחודש` : `From $${min} a month`)
  } else {
    // the comparison table's price row goes when there is no price to show
    out = out.replace(/<tr>(?:(?!<tr>)[\s\S])*?\{\{PLAN_FROM\}\}[\s\S]*?<\/tr>/, "")
  }
  return out
}

export const fillPlanText = (text: string, lang: Lang, plans: Plans) => text.replace(/\{\{PLAN_SAVE_ANSWER\}\}/g, saveAnswer(plans, lang))

/** schema.org offers for the pricing page, from the same data. */
export function offersLd(lang: Lang, plans: Plans) {
  const currency = lang === "he" ? "ILS" : "USD"
  const url = lang === "he" ? "https://uxellent.com/pricing" : "https://uxellent.com/en/pricing"
  const offers = PLAN_IDS.flatMap((id) => {
    const pr = prices(plans[id], lang)
    if (!pr) return []
    return [
      {
        "@type": "Offer",
        name: NAME[lang][id],
        url,
        price: pr.m,
        priceCurrency: currency,
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: pr.m, priceCurrency: currency, billingDuration: "P1M" },
          { "@type": "UnitPriceSpecification", price: pr.y * 12, priceCurrency: currency, billingDuration: "P1Y" },
        ],
      },
    ]
  })
  return offers.length
    ? { "@context": "https://schema.org", "@type": "Product", name: "UXellent", inLanguage: lang, url, offers }
    : null
}
