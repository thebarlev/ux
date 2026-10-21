/**
 * Navigation helpers shared by every page (tbl-024): the current page in the
 * header, mobile menu and footer, the breadcrumbs and their structured data.
 */

export type Lang = "he" | "en"
/** One breadcrumb after "Home"; the last one is the current page. */
export type Crumb = { label: string; href?: string }

export const SITE = "https://uxellent.com"
const HOME = { he: { label: "דף הבית", href: "/" }, en: { label: "Home", href: "/en" } } as const
const CRUMB_LABEL = { he: "פירורי לחם", en: "Breadcrumb" } as const
// the chevron points along the reading direction
const CHEVRON = {
  he: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  en: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
} as const

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

/**
 * Marks the links to the current page (aria-current="page") in the header nav,
 * the mobile menu and the footer columns; `section` (an article's Blog, a
 * guide's Growth guides) gets aria-current="true". Both look the same.
 */
export function markCurrent(html: string, current?: string, section?: string) {
  const mark = (h: string, path: string, value: string) =>
    h.replace(new RegExp(`<a( class="(?:m|l)")? href="${path.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}">`, "g"), `<a$1 href="${path}" aria-current="${value}">`)
  let out = html
  if (current) out = mark(out, current, "page")
  if (section && section !== current) out = mark(out, section, "true")
  return out
}

/** "Home › … › current page": links, except the current page (plain text, aria-current). */
export function crumbHtml(lang: Lang, items: readonly Crumb[]) {
  const all: Crumb[] = [HOME[lang], ...items]
  const parts = all.map((c, i) =>
    i === all.length - 1 ? `<span aria-current="page">${esc(c.label)}</span>` : c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`,
  )
  return `<nav class="crumb" aria-label="${CRUMB_LABEL[lang]}">${parts.join(CHEVRON[lang])}</nav>`
}

/** BreadcrumbList structured data, matching what crumbHtml shows. */
export function crumbLd(lang: Lang, items: readonly Crumb[], currentPath: string) {
  const all: Crumb[] = [HOME[lang], ...items]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // a crumb shown as plain text (an article's topic) points to the page above it
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: SITE + (i === all.length - 1 ? currentPath : (c.href ?? all.slice(0, i).reverse().find((x) => x.href)?.href ?? currentPath)),
    })),
  }
}

/** Fills {{TOKENS}} in a generated card template. */
export function fill(tpl: string, values: Record<string, string>) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k: string) => values[k] ?? "")
}

export { esc }
