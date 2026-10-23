import { PLAN_IDS, type Plan, type PlanId, type Plans } from "@/lib/plans"

/**
 * Fills the plan placeholders the sheets generator left in the markup
 * (scripts/home-sheets/build.py, plan_tokens) from the plans data (tbl-034).
 * A line whose number is missing is left out; nothing shows "undefined" or NaN.
 * Hebrew shows shekels, English shows dollars, each from its own field.
 */
type Lang = "he" | "en"

// 040: Starter is מתחילים, Pro is צומח / Growth (the ids stay)
const NAME: Record<Lang, Record<PlanId, string>> = {
  he: { free: "חינם", start: "מתחילים", business: "עסקי", pro: "צומח" },
  en: { free: "Free", start: "Starter", business: "Business", pro: "Growth" },
}

const num = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 })

/** The monthly price, and the yearly one (per month) when there is one; null without a monthly price. */
function prices(p: Plan | undefined, lang: Lang) {
  const m = lang === "he" ? p?.priceIlsMonth : p?.priceUsdMonth
  const y = lang === "he" ? p?.priceIlsYear : p?.priceUsdYear
  return m === undefined ? null : { m, y }
}

/**
 * 042: yearly billing shows only when every paid plan has a yearly price.
 * Until Itzik approves it the yearly prices are null, and the switch, the
 * saving badge and question, the yearly line and the terms' saving sentence
 * all stay off.
 */
export function hasYearly(plans: Plans, lang: Lang) {
  const paid = PLAN_IDS.map((id) => prices(plans[id], lang)).filter((pr) => pr && pr.m > 0)
  return paid.length > 0 && paid.every((pr) => pr!.y !== undefined)
}

const CUR = { he: "₪", en: "$" } as const

function priceHtml(p: Plan | undefined, lang: Lang, yearly: boolean) {
  const pr = prices(p, lang)
  if (!pr) return ""
  const b = yearly && pr.y !== undefined ? `<b data-m="${num(pr.m)}" data-y="${num(pr.y)}">${num(pr.y)}</b>` : `<b>${num(pr.m)}</b>`
  return `<div class="pl-price"><span class="cur">${CUR[lang]}</span>${b}<span class="per">${lang === "he" ? "לחודש" : "/month"}</span></div>`
}

function yearHtml(p: Plan | undefined, lang: Lang, yearly: boolean) {
  const pr = prices(p, lang)
  if (!pr || !yearly || pr.y === undefined) return ""
  const c = CUR[lang]
  const m = lang === "he" ? `${c}${num(pr.m)} בחיוב חודשי` : `${c}${num(pr.m)} billed monthly`
  const y = lang === "he" ? `${c}${num(pr.y * 12)} בחיוב שנתי` : `${c}${num(pr.y * 12)} billed yearly`
  return `<span class="pl-yr" data-m="${m}" data-y="${y}">${y}</span>`
}

/**
 * The AI actions line (tbl-035). With trial_days and ai_actions_day (the free
 * plan): a daily cap for the first days, then the monthly quota, for good; it
 * is a plan, not a trial that ends. Otherwise the monthly quota alone, and a
 * paid plan says nothing about a daily cap.
 */
function actHtml(p: Plan | undefined, lang: Lang) {
  const n = p?.aiActionsMonth
  const days = p?.trialDays
  const d = p?.aiActionsDay
  if (n === undefined || days === undefined || (days !== null && d === undefined)) return ""
  if (days !== null && d !== null && d !== undefined) {
    const [what, then] =
      lang === "he"
        ? [`פעולות AI ביום ב-${num(days)} הימים הראשונים,`, `ואחריהם ${num(n)} פעולות AI בחודש.`]
        : [`AI actions a day for your first ${num(days)} days,`, `then ${num(n)} AI actions a month.`]
    return `<div class="pl-act"><b>${num(d)}</b><span>${what}<small>${then}</small></span></div>`
  }
  return `<div class="pl-act"><b>${num(n)}</b><span>${lang === "he" ? "פעולות AI בחודש" : "AI actions a month"}</span></div>`
}

const CHECK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
const li = (text: string) => `<li>${CHECK}<span>${text}</span></li>`

/**
 * 042: the card's leads and email lines, from the plan's fields, in the place
 * the generator left (after the editor line, the same in every card). The lead
 * form is live today; the mailing list and email lines show only when
 * MAILING_LIVE is on, in full or not at all.
 */
function leadsHtml(p: Plan | undefined, lang: Lang, mailing: boolean) {
  const he = lang === "he"
  let out = p?.leadForm ? li(he ? "טופס שמייצר לידים" : "Lead form") : ""
  if (!mailing) return out
  if (p?.mailingList) out += li(he ? "רשימת תפוצה מהאתר" : "Mailing list from your site")
  if (p?.emailAutomations) {
    const n = p.emailsMonth
    const count = typeof n === "number" ? (he ? ` · ${num(n)} מיילים בחודש` : ` · ${num(n)} emails a month`) : ""
    out += li((he ? "דיוור ואוטומציות" : "Email and automations") + count)
  }
  return out
}

/** The yearly saving, when it is the same (rounded) on every paid plan; otherwise none. */
function savePct(plans: Plans, lang: Lang) {
  const pcts = PLAN_IDS.map((id) => prices(plans[id], lang)).filter((pr) => pr && pr.m > 0 && pr.y !== undefined).map((pr) => Math.round((1 - pr!.y! / pr!.m) * 100))
  return pcts.length && pcts.every((x) => x === pcts[0]) && pcts[0] > 0 ? pcts[0] : null
}

// tbl-036: when the saving differs between plans, it is named without a number
function saveAnswer(plans: Plans, lang: Lang) {
  const p = savePct(plans, lang)
  if (p === null) return lang === "he" ? "חיסכון בחיוב שנתי, לעומת חיוב חודשי. הסכום של כל חבילה מופיע בכרטיס שלה." : "A saving with yearly billing, compared with monthly billing. Each plan's amount is on its card."
  return lang === "he" ? `${p}% על כל החבילות בתשלום, לעומת חיוב חודשי.` : `${p}% on every paid plan, compared with monthly billing.`
}

function saveTerms(plans: Plans, lang: Lang) {
  const p = savePct(plans, lang)
  if (p === null) return lang === "he" ? "נמוך יותר" : "is lower"
  return lang === "he" ? `נמוך ב-${p} אחוז` : `is ${p} percent lower`
}

/**
 * A part the generator marked <!--name-->…<!--/name--> shows only when `on`:
 * "yearly" (yearly billing, from the data) and "mailing" (MAILING_LIVE).
 */
export function gate(html: string, name: string, on: boolean) {
  const re = new RegExp(`<!--${name}-->([\\s\\S]*?)<!--/${name}-->`, "g")
  return html.replace(re, (_, inner: string) => (on ? inner : ""))
}

/** The home carousel's "N of M" labels, after a gated card. */
function renumberSlides(html: string, lang: Lang) {
  const total = (html.match(/aria-roledescription="slide"/g) ?? []).length
  let i = 0
  return html.replace(/aria-roledescription="slide" aria-label="\d+ (מתוך|of) \d+"/g, () => {
    i += 1
    return `aria-roledescription="slide" aria-label="${i} ${lang === "he" ? "מתוך" : "of"} ${total}"`
  })
}

/** The page's gated parts, for any page (also those without plan placeholders). */
export function fillGates(html: string, lang: Lang, opts: { yearly: boolean; mailing: boolean }) {
  let out = gate(gate(html, "yearly", opts.yearly), "mailing", opts.mailing)
  // with no yearly billing, the plan buttons ask for monthly
  if (!opts.yearly) out = out.replace(/billing=yearly/g, "billing=monthly")
  if (out.includes('aria-roledescription="slide"')) out = renumberSlides(out, lang)
  return out
}

export function fillPlans(html: string, lang: Lang, plans: Plans, mailing: boolean) {
  const yearly = hasYearly(plans, lang)
  const save = savePct(plans, lang)
  const from = PLAN_IDS.map((id) => prices(plans[id], lang)?.m).filter((m): m is number => m !== undefined)
  let out = html
    .replace(/\{\{PLAN_PRICE:(\w+)\}\}/g, (_, id: PlanId) => priceHtml(plans[id], lang, yearly))
    .replace(/\{\{PLAN_YEAR:(\w+)\}\}/g, (_, id: PlanId) => yearHtml(plans[id], lang, yearly))
    .replace(/\{\{PLAN_ACT:(\w+)\}\}/g, (_, id: PlanId) => actHtml(plans[id], lang))
    .replace(/\{\{PLAN_LEADS:(\w+)\}\}/g, (_, id: PlanId) => leadsHtml(plans[id], lang, mailing))
    .replace("{{PLAN_SAVE_BADGE}}", save === null ? (lang === "he" ? "<em>חיסכון</em>" : "<em>Save</em>") : lang === "he" ? `<em>${save}%-</em>` : `<em>Save ${save}%</em>`)
    .replace(/\{\{PLAN_SAVE_TERMS\}\}/g, saveTerms(plans, lang))
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
  const yearly = hasYearly(plans, lang)
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
          // 042: a yearly price only once yearly billing is on
          ...(yearly && pr.y !== undefined ? [{ "@type": "UnitPriceSpecification", price: pr.y * 12, priceCurrency: currency, billingDuration: "P1Y" }] : []),
        ],
      },
    ]
  })
  return offers.length
    ? { "@context": "https://schema.org", "@type": "Product", name: "UXellent", inLanguage: lang, url, offers }
    : null
}
