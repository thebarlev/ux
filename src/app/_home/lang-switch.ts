import { LOCALES, localeByCode, localePath, type LocaleInfo } from "@/lib/i18n/locales"

/**
 * 051 (uxb-033): the language switch, one component for the header and the
 * footer, built from the one language list (src/lib/i18n/locales.ts). This is
 * the only place that looks at how many languages there are:
 * - two (state A): a direct link to the same page in the other language; a
 *   globe and the language's name, its short label up to 1060px, the globe
 *   alone up to 360px (the full name stays the link's accessible name);
 * - three or more (state B): a button (globe, the current language, a chevron)
 *   that opens a menu of every language, each in itself with its short label
 *   and a ✓ on the current one; under the button on desktop, a sheet from the
 *   bottom up to 1060px. HomeBehaviors runs it ([data-ls-menu]).
 * The footer lists every language. Every link carries data-ls, lang and
 * hreflang; LanguageBanner saves lang_pref from it before the page changes.
 * The generator leaves {{LANG_HEAD}} and {{LANG_FOOT}} in the markup.
 */

type Paths = Readonly<Record<string, string | undefined>>

const GLOBE =
  '<svg class="ls-g" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3z"/></svg>'
const CHEVRON =
  '<svg class="ls-c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
const CHECK =
  '<svg class="ls-k" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'

// the switch's own wording, in the page's language (a language without an entry uses English)
const COPY: Record<string, { menu: string; foot: string }> = {
  he: { menu: "בחירת שפה", foot: "שפה" },
  en: { menu: "Choose a language", foot: "Language" },
}
const copy = (lang: string) => COPY[lang] ?? COPY.en

/** Where a language's link goes: this page in that language, else that language's home. */
const hrefOf = (l: LocaleInfo, paths: Paths) => paths[l.code] ?? localePath("/", l.code)

// the link keeps the page's direction (globe first); only the language's own name runs in its direction
const attrs = (l: LocaleInfo) => `lang="${l.code}" hreflang="${l.code}" data-ls`
const names = (l: LocaleInfo) => `<span class="ls-l" dir="${l.dir}">${l.name}</span><span class="ls-s" dir="${l.dir}" aria-hidden="true">${l.short}</span>`

function head(current: LocaleInfo, paths: Paths) {
  const others = LOCALES.filter((l) => l.code !== current.code)
  if (others.length === 1) {
    const to = others[0]
    return `<a class="ls" href="${hrefOf(to, paths)}" ${attrs(to)} aria-label="${to.name}">${GLOBE}${names(to)}</a>`
  }
  const id = `ls-m-${current.code}`
  const items = LOCALES.map((l) => {
    const on = l.code === current.code
    return `<a role="menuitem" class="ls-i" href="${hrefOf(l, paths)}" ${attrs(l)}${on ? ' aria-current="true"' : ""}><span class="ls-n" dir="${l.dir}">${l.name}</span><small>${l.short}</small>${on ? CHECK : ""}</a>`
  }).join("")
  return (
    `<div class="ls-b" data-ls-menu>` +
    `<button type="button" class="ls" aria-haspopup="menu" aria-expanded="false" aria-controls="${id}" aria-label="${copy(current.code).menu}: ${current.name}">${GLOBE}${names(current)}${CHEVRON}</button>` +
    `<div class="ls-bg" hidden></div>` +
    `<div class="ls-m" id="${id}" role="menu" aria-label="${copy(current.code).menu}" hidden><b class="ls-t">${copy(current.code).menu}</b>${items}</div>` +
    `</div>`
  )
}

function foot(current: LocaleInfo, paths: Paths) {
  const links = LOCALES.map(
    (l) => `<a href="${hrefOf(l, paths)}" ${attrs(l)}${l.code === current.code ? ' aria-current="true"' : ""}><bdi dir="${l.dir}">${l.name}</bdi></a>`,
  ).join("")
  return `<nav class="lang" aria-label="${copy(current.code).foot}">${links}</nav>`
}

/** Fills the header and footer switches; `paths` is this page in each language it exists in. */
export function fillLangSwitch(html: string, lang: string, paths: Paths) {
  const current = localeByCode(lang)
  if (!current) throw new Error(`unknown language ${lang}`)
  return html.replace("{{LANG_HEAD}}", head(current, paths)).replace("{{LANG_FOOT}}", foot(current, paths))
}
