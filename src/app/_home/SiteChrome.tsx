import type { ReactNode } from "react"

import { CHROME_FOOT_EN, CHROME_HEAD_EN } from "./chrome-markup.en"
import { CHROME_FOOT_HE, CHROME_HEAD_HE } from "./chrome-markup.he"
import { crumbHtml, crumbLd, markCurrent, type Crumb, type Lang } from "./chrome"
import { heebo } from "./font"
import { HomeBehaviors } from "./HomeBehaviors"
import { fillLangSwitch } from "./lang-switch"

import "./chrome.he.css"
import "./chrome.en.css"

const SOURCE = { he: { head: CHROME_HEAD_HE, foot: CHROME_FOOT_HE }, en: { head: CHROME_HEAD_EN, foot: CHROME_FOOT_EN } } as const

/**
 * The site header, mobile menu, breadcrumbs and footer (navkit, tbl-024) around
 * a page that keeps its own content (why us, the campaign pages, 404). Same
 * markup and CSS as the sheet pages; the wrappers are display:contents so the
 * header stays sticky for the whole page. The page's content must carry
 * id="main" (the skip link's target).
 */
export function SiteChrome({
  lang,
  current,
  crumbs,
  paths,
  children,
}: {
  lang: Lang
  /** this page's address, marked in the header and footer and used for the breadcrumbs */
  current?: string
  /** after "Home"; none on pages without breadcrumbs (404) */
  crumbs?: readonly Crumb[]
  /** the language switch: this page in each language it exists in; a language
   *  missing here links to its home page (lang-switch.ts) */
  paths?: Readonly<Record<string, string>>
  children: ReactNode
}) {
  const root = `uxn-${lang}`
  const attrs = { className: `${root} ${heebo.variable}`, lang, dir: lang === "he" ? "rtl" : "ltr", style: { display: "contents" } } as const
  // the switch goes in after the current page is marked, so its links keep their own aria-current
  const head = fillLangSwitch(markCurrent(SOURCE[lang].head, current), lang, paths ?? {})
  const foot = fillLangSwitch(markCurrent(SOURCE[lang].foot, current), lang, paths ?? {})
  return (
    <>
      <div id={root} {...attrs} dangerouslySetInnerHTML={{ __html: head }} />
      {crumbs?.length && current ? (
        <>
          <div {...attrs}>
            <div className="wrap uxn-crumbs" dangerouslySetInnerHTML={{ __html: crumbHtml(lang, crumbs) }} />
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd(lang, crumbs, current)) }} />
        </>
      ) : null}
      {children}
      <div {...attrs} dangerouslySetInnerHTML={{ __html: foot }} />
      <HomeBehaviors lang={lang} rootId={root} />
    </>
  )
}
