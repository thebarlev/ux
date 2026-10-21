"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { heebo } from "@/app/_home/font"
import { counterpartPath, isEnglishPath } from "@/lib/i18n/counterpartPath"
import { setLangPrefCookie } from "@/lib/i18n/langPrefCookie"
import { LANG_DONE_EVENT, langToOffer } from "@/lib/i18n/langPrompt"

import "./language-prompt.css"

/** Round flags, drawn (not emoji, which Windows shows as letters). */
function FlagUS() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <clipPath id="fl-us">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#fl-us)">
        <rect width="32" height="32" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 32) / 13} width="32" height={32 / 13} fill="#b22234" />
        ))}
        <rect width="15" height={(7 * 32) / 13} fill="#3c3b6e" />
        {[
          [3, 3], [7.5, 3], [12, 3], [5.2, 6.4], [9.7, 6.4], [3, 9.8], [7.5, 9.8], [12, 9.8], [5.2, 13.2], [9.7, 13.2],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#fff" />
        ))}
      </g>
    </svg>
  )
}

function FlagIL() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <clipPath id="fl-il">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#fl-il)">
        <rect width="32" height="32" fill="#fff" />
        <rect y="5" width="32" height="3.6" fill="#0038b8" />
        <rect y="23.4" width="32" height="3.6" fill="#0038b8" />
        <path d="M16 10.2l5.2 9h-10.4zM16 21.8l-5.2-9h10.4z" fill="none" stroke="#0038b8" strokeWidth="1.3" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/** The same page in the other language: the page's own switch link when it
 *  has one (article slugs differ between languages), else the path mapping. */
function hrefFor(lang: "he" | "en", pathname: string): string {
  const own = document.querySelector<HTMLAnchorElement>(`nav.lang a[hreflang="${lang}"]`)
  return own?.getAttribute("href") || counterpartPath(pathname)
}

/** 039: the language prompt. A visitor outside Israel on a Hebrew page, or in
 *  Israel on an English page, with no lang_pref, gets a modal choice before
 *  the cookie banner (which waits for LANG_DONE_EVENT). Choosing saves
 *  lang_pref and opens the same page in that language; Esc or the backdrop
 *  keeps the current one and saves it. Built on the client only, so the page
 *  HTML, and what crawlers get, never changes; the proxy gives bots no geo
 *  hint. Also records lang_pref when the footer switch is clicked. */
export function LanguageBanner() {
  const pathname = usePathname() ?? "/"
  const current = isEnglishPath(pathname) ? "en" : "he"
  const [offer, setOffer] = useState<"he" | "en" | null>(null)
  const box = useRef<HTMLDivElement>(null)

  // the sheet pages' language switch is plain markup (nav.lang a[hreflang])
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("nav.lang a[hreflang]")
      const target = a?.getAttribute("hreflang")
      if (target === "he" || target === "en") setLangPrefCookie(target)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    // cookies and the geo hint exist only in the browser, so the prompt is
    // decided after hydration and the server HTML stays the same
    setOffer(langToOffer(pathname))
  }, [pathname])

  useEffect(() => {
    if (!offer) return
    const root = box.current
    const opener = document.activeElement as HTMLElement | null
    root?.querySelector<HTMLElement>(".uxl-p")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        choose(current)
      } else if (e.key === "Tab" && root) {
        const f = [...root.querySelectorAll<HTMLElement>("button")]
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (!root.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      if (opener && document.contains(opener)) opener.focus()
    }
    // choose only reads current and pathname, both fixed while it is open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer])

  function choose(lang: "he" | "en") {
    setLangPrefCookie(lang)
    if (lang !== current) {
      window.location.assign(hrefFor(lang, pathname))
      return
    }
    setOffer(null)
    document.dispatchEvent(new Event(LANG_DONE_EVENT))
  }

  if (!offer) return null

  // the language offered is the main button (blue); the current one is second
  const buttons = offer === "en" ? (["en", "he"] as const) : (["he", "en"] as const)
  return (
    <div
      className={`uxl ${heebo.variable}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) choose(current)
      }}
    >
      <div ref={box} className="uxl-box" role="dialog" aria-modal="true" aria-labelledby="uxl-t" dir="ltr">
        <b id="uxl-t" className="uxl-t">
          <span lang="en">Choose your language</span> · <span lang="he" dir="rtl">בחרו שפה</span>
        </b>
        <div className="uxl-btns">
          {buttons.map((lang) => (
            <button
              key={lang}
              type="button"
              lang={lang}
              dir={lang === "he" ? "rtl" : "ltr"}
              className={`uxl-b${lang === offer ? " uxl-p" : ""}`}
              onClick={() => choose(lang)}
            >
              <span className="uxl-f">{lang === "en" ? <FlagUS /> : <FlagIL />}</span>
              {lang === "en" ? "English" : "עברית"}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
