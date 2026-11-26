import { PLAN_IDS, type IntlDisplay, type Plan, type PlanId, type Plans } from "@/lib/plans"

/**
 * Fills the plan placeholders the sheets generator left in the markup
 * (scripts/home-sheets/build.py, plan_tokens) from the plans data (tbl-034).
 * A line whose number is missing is left out; nothing shows "undefined" or NaN.
 *
 * dhh (owner, 26.11): two price lists, Israeli in shekels (VAT included) and
 * international in dollars (before VAT), never chosen by the page's language.
 * `lang` says how to write, `cur` says what to write; nothing here derives one
 * from the other. Every part that depends on the currency is rendered for each
 * currency on show, marked data-cur, and the one not shown first is `hidden`;
 * the client (HomeBehaviors, price list) picks per visitor. The server shows
 * shekels: the currency every customer is billed in today.
 */
type Lang = "he" | "en"
export type Cur = "ILS" | "USD"
export type PricingData = { readonly plans: Plans; readonly intl: IntlDisplay }

/** What the server renders first, before the visitor's list is known. */
export const DEFAULT_CUR: Cur = "ILS"
/** dhh: what the international list is billed in; dollars only once USD billing is live ("usd"). */
const payCur = (intl: IntlDisplay): Cur => (intl === "usd" ? "USD" : "ILS")

// 040: Starter is מתחילים; 044: the fourth plan is פרו / Pro (the ids stay)
const NAME: Record<Lang, Record<PlanId, string>> = {
  he: { free: "חינם", start: "מתחילים", business: "עסקי", pro: "פרו" },
  en: { free: "Free", start: "Starter", business: "Business", pro: "Pro" },
}

const num = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 })
const SIGN: Record<Cur, string> = { ILS: "₪", USD: "$" }
/** An amount as text. "$15" is isolated so it reads left to right inside Hebrew; "₪576" as today. */
const money = (cur: Cur, n: number) => (cur === "USD" ? `⁦$${num(n)}⁩` : `${SIGN[cur]}${num(n)}`)
/** The currencies on show: dollars only when the switch is not "ils". */
const curs = (intl: IntlDisplay): Cur[] => (intl === "ils" ? ["ILS"] : ["ILS", "USD"])
const hid = (cur: Cur) => (cur === DEFAULT_CUR ? "" : " hidden")
/** The same part once per currency on show, one of them visible. */
const each = (intl: IntlDisplay, part: (cur: Cur) => string) => curs(intl).map(part).join("")
const span = (cur: Cur, text: string) => `<span data-cur="${cur}"${hid(cur)}>${text}</span>`

/** The monthly price, and the yearly one (per month) when there is one; null without a monthly price. */
function prices(p: Plan | undefined, cur: Cur) {
  const m = cur === "ILS" ? p?.priceIlsMonth : p?.priceUsdMonth
  const y = cur === "ILS" ? p?.priceIlsYear : p?.priceUsdYear
  return m === undefined ? null : { m, y }
}

/**
 * 042: yearly billing shows only when every paid plan has a yearly price, in
 * every currency on show. Until Itzik approves it the yearly prices are null,
 * and the switch, the saving badge and question, the yearly line and the
 * terms' saving sentence all stay off.
 */
export function hasYearly(plans: Plans, intl: IntlDisplay = "ils") {
  return curs(intl).every((cur) => {
    const paid = PLAN_IDS.map((id) => prices(plans[id], cur)).filter((pr) => pr && pr.m > 0)
    return paid.length > 0 && paid.every((pr) => pr!.y !== undefined)
  })
}

function priceHtml(p: Plan | undefined, lang: Lang, cur: Cur, yearly: boolean) {
  const pr = prices(p, cur)
  if (!pr) return ""
  const b = yearly && pr.y !== undefined ? `<b data-m="${num(pr.m)}" data-y="${num(pr.y)}">${num(pr.y)}</b>` : `<b>${num(pr.m)}</b>`
  // dhh: "$15 לחודש" in Hebrew, the sign before the number; ₪ stays as it is today
  const ltr = cur === "USD" && lang === "he"
  const per = `<span class="per"${ltr ? ' dir="rtl"' : ""}>${lang === "he" ? "לחודש" : "/month"}</span>`
  return `<div class="pl-price" data-cur="${cur}"${ltr ? ' dir="ltr"' : ""}${hid(cur)}><span class="cur">${SIGN[cur]}</span>${b}${per}</div>`
}

function yearHtml(p: Plan | undefined, lang: Lang, cur: Cur, yearly: boolean) {
  const pr = prices(p, cur)
  if (!pr || !yearly || pr.y === undefined) return ""
  const m = lang === "he" ? `${money(cur, pr.m)} בחיוב חודשי` : `${money(cur, pr.m)} billed monthly`
  const y = lang === "he" ? `${money(cur, pr.y * 12)} בחיוב שנתי` : `${money(cur, pr.y * 12)} billed yearly`
  return `<span class="pl-yr" data-cur="${cur}" data-m="${m}" data-y="${y}"${hid(cur)}>${y}</span>`
}

/**
 * The tax line under a paid plan's price (dhg rule 1: next to every price).
 * Dollars add the billing currency, from the switch (dhh: from the data, never
 * written twice). ‼️ Every wording here except the two shekel lines of today is
 * a draft until the owner approves it.
 */
const NOTE: Record<Lang, Record<Cur, string>> = {
  he: { ILS: "כולל מע״מ", USD: "לפני מע״מ ומסים" },
  en: { ILS: "Incl. VAT", USD: "Plus applicable taxes" },
}
const BILLED: Record<Lang, Record<Cur, string>> = {
  he: { ILS: "החיוב בשקלים", USD: "החיוב בדולרים" },
  en: { ILS: "Billed in ILS", USD: "Billed in USD" },
}
function noteHtml(lang: Lang, cur: Cur, intl: IntlDisplay) {
  const text = cur === "USD" ? `${NOTE[lang].USD} · ${BILLED[lang][payCur(intl)]}` : NOTE[lang].ILS
  return `<span class="pl-note" data-cur="${cur}"${hid(cur)}>${text}</span>`
}

/** The pricing page's terms line, first sentence (today: "המחירים כוללים מע״מ." / "Prices in US dollars."). */
const TERMS: Record<Lang, Record<Cur, string>> = {
  he: { ILS: "המחירים כוללים מע״מ.", USD: "המחירים בדולרים, לפני מע״מ ומסים." },
  en: { ILS: "Prices in Israeli shekels, including VAT.", USD: "Prices in US dollars, before taxes." },
}

/** The VAT / currency question's answer, per page. The Hebrew shekel answers are today's, word for word. */
type AnswerPage = "pricing" | "faq"
const ANSWER: Record<Lang, Record<AnswerPage, Record<Cur, string>>> = {
  he: {
    pricing: { ILS: "כן. כל המחירים בעמוד כוללים מע״מ.", USD: "לא. המחירים בדולרים הם לפני מע״מ ומסים, שנקבעים לפי מדינת החיוב." },
    faq: { ILS: "כן. כל המחירים כוללים מע״מ.", USD: "לא. המחירים בדולרים הם לפני מע״מ ומסים, שנקבעים לפי מדינת החיוב." },
  },
  en: {
    pricing: { ILS: "Israeli shekels. Every price on this page includes VAT.", USD: "US dollars, before taxes. Taxes depend on your billing country." },
    faq: { ILS: "Israeli shekels, including VAT.", USD: "US dollars, before taxes. Taxes depend on your billing country." },
  },
}

/**
 * dhh: the visitor's choice of price list, on the pricing page, only when the
 * dollar list is on show. The page's language never picks it; the client
 * starts from the visitor's country (display only) and keeps a manual choice.
 * ‼️ A new control in the approved design, in the existing billing switch's
 * style: needs the owner's design approval.
 */
const LIST_LABEL: Record<Lang, { group: string; il: string; intl: string }> = {
  he: { group: "מחירון", il: "ישראל (₪)", intl: "בינלאומי ($)" },
  en: { group: "Price list", il: "Israel (₪)", intl: "International ($)" },
}
function listSwitchHtml(lang: Lang, intl: IntlDisplay) {
  if (intl === "ils") return ""
  const t = LIST_LABEL[lang]
  return (
    `<div class="bill plist" role="radiogroup" aria-label="${t.group}" data-intl="${intl}">` +
    `<button type="button" role="radio" aria-checked="true" data-list="il" class="on">${t.il}</button>` +
    `<button type="button" role="radio" aria-checked="false" data-list="intl">${t.intl}</button></div>`
  )
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
 * 044: the card's lead form and email lines, from the plan's fields, in the
 * places the generator left (pricing list of 04.11). Both are sold today, so
 * neither depends on MAILING_LIVE; a mailing list line and an email count are
 * not part of this list.
 */
/** 046: daily backup and restore, on the plans that have it (paid plans, 30 days) */
function backupHtml(p: Plan | undefined, lang: Lang) {
  const d = p?.backupDays
  return d ? li(lang === "he" ? `גיבוי יומי ושחזור, ${d} יום אחורה` : `Daily backup and restore, ${d} days back`) : ""
}

function leadsHtml(p: Plan | undefined, lang: Lang) {
  return p?.leadForm ? li(lang === "he" ? "טופס שמייצר לידים" : "Lead form") : ""
}

function mailHtml(p: Plan | undefined, lang: Lang) {
  return p?.emailAutomations ? li(lang === "he" ? "ניהול רשומים, דיוור ואוטומציות שנבנות בעזרת AI" : "Subscriber management, email and AI-built automations") : ""
}

/** The yearly saving, when it is the same (rounded) on every paid plan in every currency on show; otherwise none. */
function savePct(plans: Plans, intl: IntlDisplay = "ils") {
  const pcts = curs(intl).flatMap((cur) =>
    PLAN_IDS.map((id) => prices(plans[id], cur)).filter((pr) => pr && pr.m > 0 && pr.y !== undefined).map((pr) => Math.round((1 - pr!.y! / pr!.m) * 100)),
  )
  return pcts.length && pcts.every((x) => x === pcts[0]) && pcts[0] > 0 ? pcts[0] : null
}

// tbl-036: when the saving differs between plans, it is named without a number
function saveAnswer(plans: Plans, lang: Lang, intl: IntlDisplay) {
  const p = savePct(plans, intl)
  if (p === null) return lang === "he" ? "חיסכון בחיוב שנתי, לעומת חיוב חודשי. הסכום של כל חבילה מופיע בכרטיס שלה." : "A saving with yearly billing, compared with monthly billing. Each plan's amount is on its card."
  return lang === "he" ? `${p}% על כל החבילות בתשלום, לעומת חיוב חודשי.` : `${p}% on every paid plan, compared with monthly billing.`
}

function saveTerms(plans: Plans, lang: Lang, intl: IntlDisplay) {
  const p = savePct(plans, intl)
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
  if (out.includes('aria-roledescription="slide"')) out = renumberSlides(out, lang)
  return out
}

export function fillPlans(html: string, lang: Lang, { plans, intl }: PricingData) {
  const yearly = hasYearly(plans, intl)
  const save = savePct(plans, intl)
  let out = html
    .replace("{{PLAN_LIST_SWITCH}}", listSwitchHtml(lang, intl))
    .replace(/\{\{PLAN_PRICE:(\w+)\}\}/g, (_, id: PlanId) => each(intl, (cur) => priceHtml(plans[id], lang, cur, yearly)))
    .replace(/\{\{PLAN_NOTE:(\w+)\}\}/g, () => each(intl, (cur) => noteHtml(lang, cur, intl)))
    .replace(/\{\{PLAN_YEAR:(\w+)\}\}/g, (_, id: PlanId) => each(intl, (cur) => yearHtml(plans[id], lang, cur, yearly)))
    .replace(/\{\{PLAN_ACT:(\w+)\}\}/g, (_, id: PlanId) => actHtml(plans[id], lang))
    .replace(/\{\{PLAN_BACKUP:(\w+)\}\}/g, (_, id: PlanId) => backupHtml(plans[id], lang))
    .replace(/\{\{PLAN_LEADS:(\w+)\}\}/g, (_, id: PlanId) => leadsHtml(plans[id], lang))
    .replace(/\{\{PLAN_MAIL:(\w+)\}\}/g, (_, id: PlanId) => mailHtml(plans[id], lang))
    .replace("{{PLAN_SAVE_BADGE}}", save === null ? (lang === "he" ? "<em>חיסכון</em>" : "<em>Save</em>") : lang === "he" ? `<em>${save}%-</em>` : `<em>Save ${save}%</em>`)
    .replace(/\{\{PLAN_SAVE_TERMS\}\}/g, saveTerms(plans, lang, intl))
    .replace(/\{\{PLAN_SAVE_ANSWER\}\}/g, saveAnswer(plans, lang, intl))
    .replace(/\{\{PLAN_CUR_TERMS\}\}/g, () => each(intl, (cur) => span(cur, TERMS[lang][cur])))
    .replace(/\{\{PLAN_CUR_ANSWER:(pricing|faq)\}\}/g, (_, page: AnswerPage) => each(intl, (cur) => span(cur, ANSWER[lang][page][cur])))
  const from = (cur: Cur) => PLAN_IDS.map((id) => prices(plans[id], cur)?.m).filter((m): m is number => m !== undefined)
  if (from(DEFAULT_CUR).length) {
    const fromText = (cur: Cur) => {
      const min = Math.min(...from(cur))
      return lang === "he" ? `מ-${money(cur, min)} לחודש` : `From ${money(cur, min)} a month`
    }
    out = out.replace("{{PLAN_FROM}}", each(intl, (cur) => (from(cur).length ? span(cur, fromText(cur)) : "")))
  } else {
    // the comparison table's price row goes when there is no price to show
    out = out.replace(/<tr>(?:(?!<tr>)[\s\S])*?\{\{PLAN_FROM\}\}[\s\S]*?<\/tr>/, "")
  }
  return out
}

/** FAQPage text (JSON-LD): plain text, in the currency the server shows first. */
export const fillPlanText = (text: string, lang: Lang, { plans, intl }: PricingData) =>
  text
    .replace(/\{\{PLAN_SAVE_ANSWER\}\}/g, saveAnswer(plans, lang, intl))
    .replace(/\{\{PLAN_CUR_ANSWER:(pricing|faq)\}\}/g, (_, page: AnswerPage) => ANSWER[lang][page][DEFAULT_CUR])

/**
 * schema.org offers for the pricing page, from the same data: shekels always,
 * dollars too when the dollar list is on show (dhh). Never by page language.
 */
export function offersLd(lang: Lang, { plans, intl }: PricingData) {
  const yearly = hasYearly(plans, intl)
  const url = lang === "he" ? "https://uxellent.com/pricing" : "https://uxellent.com/en/pricing"
  const offers = curs(intl).flatMap((cur) =>
    PLAN_IDS.flatMap((id) => {
      const pr = prices(plans[id], cur)
      if (!pr) return []
      return [
        {
          "@type": "Offer",
          name: NAME[lang][id],
          url,
          price: pr.m,
          priceCurrency: cur,
          priceSpecification: [
            { "@type": "UnitPriceSpecification", price: pr.m, priceCurrency: cur, billingDuration: "P1M" },
            // 042: a yearly price only once yearly billing is on
            ...(yearly && pr.y !== undefined ? [{ "@type": "UnitPriceSpecification", price: pr.y * 12, priceCurrency: cur, billingDuration: "P1Y" }] : []),
          ],
        },
      ]
    }),
  )
  return offers.length
    ? { "@context": "https://schema.org", "@type": "Product", name: "UXellent", inLanguage: lang, url, offers }
    : null
}
