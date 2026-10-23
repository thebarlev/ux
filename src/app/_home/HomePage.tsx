import { articleCards, guideCards, type Card } from "./blog-data"
import { crumbHtml, crumbLd, fill, markCurrent, type Crumb } from "./chrome"
import { heebo } from "./font"
import { HomeBehaviors } from "./HomeBehaviors"
import { A11Y_COPY } from "./home.config"
import { fillGates, fillPlans, fillPlanText, hasYearly, offersLd } from "./plan-fill"
import { getPlans } from "@/lib/plans"
import { MAILING_LIVE } from "@/lib/flags"
import { HOME_FAQ_EN, HOME_HTML_EN } from "./markup.en"
import { HOME_FAQ_HE, HOME_HTML_HE } from "./markup.he"
import { PRICING_FAQ_EN, PRICING_HTML_EN } from "./pricing-markup.en"
import { PRICING_FAQ_HE, PRICING_HTML_HE } from "./pricing-markup.he"
import { CONTACT_HTML_EN } from "./contact-markup.en"
import { CONTACT_HTML_HE } from "./contact-markup.he"
import { FAQ_FAQ_EN, FAQ_HTML_EN } from "./faq-markup.en"
import { FAQ_FAQ_HE, FAQ_HTML_HE } from "./faq-markup.he"
import { TEXT_HTML_EN } from "./text-markup.en"
import { TEXT_HTML_HE } from "./text-markup.he"
import { BLOG_HTML_EN, BLOG_PARTS_EN } from "./blog-markup.en"
import { BLOG_HTML_HE, BLOG_PARTS_HE } from "./blog-markup.he"
import { FEATURES_HTML_EN } from "./features-markup.en"
import { FEATURES_HTML_HE } from "./features-markup.he"
import { WHO_HTML_EN } from "./who-markup.en"
import { WHO_HTML_HE } from "./who-markup.he"
import { NF_HTML_EN } from "./nf-markup.en"
import { NF_HTML_HE } from "./nf-markup.he"
import { LEGAL_HTML_EN } from "./legal-markup.en"
import { LEGAL_HTML_HE } from "./legal-markup.he"

const SOURCE = {
  home: {
    he: { html: HOME_HTML_HE, faq: HOME_FAQ_HE },
    en: { html: HOME_HTML_EN, faq: HOME_FAQ_EN },
  },
  pricing: {
    he: { html: PRICING_HTML_HE, faq: PRICING_FAQ_HE },
    en: { html: PRICING_HTML_EN, faq: PRICING_FAQ_EN },
  },
  contact: {
    he: { html: CONTACT_HTML_HE, faq: [] },
    en: { html: CONTACT_HTML_EN, faq: [] },
  },
  faq: {
    he: { html: FAQ_HTML_HE, faq: FAQ_FAQ_HE },
    en: { html: FAQ_HTML_EN, faq: FAQ_FAQ_EN },
  },
  text: {
    he: { html: TEXT_HTML_HE, faq: [] },
    en: { html: TEXT_HTML_EN, faq: [] },
  },
  blog: {
    he: { html: BLOG_HTML_HE, faq: [] },
    en: { html: BLOG_HTML_EN, faq: [] },
  },
  features: {
    he: { html: FEATURES_HTML_HE, faq: [] },
    en: { html: FEATURES_HTML_EN, faq: [] },
  },
  who: {
    he: { html: WHO_HTML_HE, faq: [] },
    en: { html: WHO_HTML_EN, faq: [] },
  },
  nf: {
    he: { html: NF_HTML_HE, faq: [] },
    en: { html: NF_HTML_EN, faq: [] },
  },
  // the six legal pages (one markup per page, chosen by `legalPage`)
  legal: {
    he: { html: "", faq: [] },
    en: { html: "", faq: [] },
  },
} as const

export type LegalPage = keyof typeof LEGAL_HTML_HE
const LEGAL_HTML = { he: LEGAL_HTML_HE, en: LEGAL_HTML_EN } as const
// a legal page's breadcrumb: its own title (the sheet's h1)
const LEGAL_LABEL: Record<"he" | "en", Record<LegalPage, string>> = {
  he: { terms: "תנאי שימוש", privacy: "מדיניות פרטיות", cookies: "מדיניות עוגיות", accessibility: "הצהרת נגישות", cancel: "ביטול עסקה והחזרים", "acceptable-use": "שימוש מותר והסרת תוכן" },
  en: { terms: "Terms of use", privacy: "Privacy policy", cookies: "Cookie policy", accessibility: "Accessibility statement", cancel: "Cancellation and refunds", "acceptable-use": "Acceptable use and content removal" },
}

const PARTS = { he: BLOG_PARTS_HE, en: BLOG_PARTS_EN } as const

const ROOT = { home: "uxh", pricing: "uxp", contact: "uxc", faq: "uxf", text: "uxt", blog: "uxb", features: "uxw", who: "uxo", nf: "uxz", legal: "uxl" } as const

// Each inner page: its address in both languages and its breadcrumb label.
const PAGES = {
  features: { he: "/features", en: "/en/features", label: { he: "מה מקבלים", en: "What you get" } },
  who: { he: "/for-who", en: "/en/for-who", label: { he: "למי זה מתאים", en: "Who it’s for" } },
  pricing: { he: "/pricing", en: "/en/pricing", label: { he: "מחירים", en: "Pricing" } },
  contact: { he: "/contact", en: "/en/contact", label: { he: "צור קשר", en: "Contact" } },
  faq: { he: "/faq", en: "/en/faq", label: { he: "שאלות נפוצות", en: "FAQ" } },
  blog: { he: "/blog", en: "/en/blog", label: { he: "מאמרים", en: "Blog" } },
} as const

function cardsHtml(tpl: string, cards: readonly Card[]) {
  return cards.map((c) => fill(tpl, { HREF: c.href, K: c.k, T: c.t, P: c.p ? `<p>${c.p}</p>` : "", M: c.m, N: c.n ?? "" })).join("")
}

function fillBlog(html: string, lang: "he" | "en") {
  const parts = PARTS[lang]
  const [first, ...rest] = articleCards(lang)
  const featured = fill(parts.featured, { HREF: first.href, K: first.k, T: first.t, P: first.p, M: first.m })
  return html
    .replace("{{FEATURED}}", featured)
    .replace("{{CARDS}}", cardsHtml(parts.card, rest))
    .replace("{{GUIDES}}", cardsHtml(parts.guide, guideCards(lang)))
}

/** A text page's own content (src/app/_home/legal), for the text-page template. */
export type LegalText = {
  readonly title: string
  readonly date: string
  readonly toc: readonly (readonly [string, string])[]
  readonly html: string
}

// Title with the last word in blue, the date, the contents (from the page's own
// headings) and the text, into the template; the language switch goes to the
// same page in the other language.
function fillText(html: string, legal: LegalText, paths: { he: string; en: string }) {
  const words = legal.title.split(" ")
  const last = words.pop()
  const title = (words.length ? words.join(" ") + " " : "") + `<span class="bl">${last}.</span>`
  const toc = legal.toc.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")
  return html
    .replace("{{TITLE}}", title)
    .replace("{{DATE}}", legal.date)
    .replace("{{TOC}}", toc)
    .replace("{{BODY}}", legal.html)
    .replace("{{HE_PATH}}", paths.he)
    .replace("{{EN_PATH}}", paths.en)
}

/**
 * A page built from the approved sheets: home (uxb-009 HE, uxb-010 EN),
 * pricing (uxb-011 HE, uxb-012 EN), contact (uxb-013 HE, uxb-014 EN), FAQ
 * (uxb-015 HE, uxb-016 EN), what you get (uxb-021 HE, uxb-022 EN) or a text page (template uxb-017 HE, uxb-018 EN,
 * filled with `legal`). The whole page, hero demo included, is
 * server-rendered HTML, so it shows before any JS runs; HomeBehaviors then adds
 * the motion and interactions.
 */
export async function HomePage({
  lang,
  page = "home",
  legal,
  legalPage,
  paths,
}: {
  lang: "he" | "en"
  page?: keyof typeof SOURCE
  legal?: LegalText
  /** page="legal": which of the six */
  legalPage?: LegalPage
  paths?: { he: string; en: string }
}) {
  const { faq } = SOURCE[page][lang]
  let html: string = SOURCE[page][lang].html
  let current: string | undefined
  let crumbs: Crumb[] = []
  if (page === "text") {
    if (!legal || !paths) throw new Error("text page needs its text and paths")
    html = fillText(html, legal, paths)
    current = paths[lang]
    crumbs = [{ label: legal.title }]
  } else if (page === "legal") {
    if (!legalPage) throw new Error("legal page needs legalPage")
    html = LEGAL_HTML[lang][legalPage]
    current = `${lang === "en" ? "/en" : ""}/${legalPage}`
    crumbs = [{ label: LEGAL_LABEL[lang][legalPage] }]
  } else if (page !== "home" && page !== "nf") {
    current = PAGES[page][lang]
    crumbs = [{ label: PAGES[page].label[lang] }]
    if (page === "blog") html = fillBlog(html, lang)
  }
  html = markCurrent(html, current).replace("{{CRUMB}}", current ? crumbHtml(lang, crumbs) : "")
  // tbl-034: plan prices and AI action counts, from the platform (src/lib/plans.ts);
  // 042: the yearly parts follow the data, the mailing parts MAILING_LIVE
  const gated = html.includes("<!--yearly-->")
  const plans = html.includes("{{PLAN_") || gated ? await getPlans() : null
  const yearly = plans ? hasYearly(plans, lang) : false
  if (plans) html = fillPlans(html, lang, plans, MAILING_LIVE)
  html = fillGates(html, lang, { yearly, mailing: MAILING_LIVE })
  const offers = plans && page === "pricing" ? offersLd(lang, plans) : null
  const rootId = `${ROOT[page]}-${lang}`
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    // the yearly saving question goes with the yearly billing it answers about
    mainEntity: faq.filter((f) => yearly || !f.a.includes("{{PLAN_SAVE_ANSWER}}")).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plans ? fillPlanText(f.a, lang, plans) : f.a },
    })),
  }
  return (
    <>
      <div
        id={rootId}
        className={`${rootId} ${heebo.variable}`}
        lang={lang}
        dir={lang === "he" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: html.replace("{{A11Y}}", A11Y_COPY[lang]) }}
      />
      {faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {offers && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} />}
      {current && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd(lang, crumbs, current)) }} />}
      <HomeBehaviors lang={lang} rootId={rootId} />
    </>
  )
}
