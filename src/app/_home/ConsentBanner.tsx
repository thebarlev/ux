"use client"

import { useEffect, useRef } from "react"

import { readConsent, saveConsent } from "@/lib/consent"

import { CONSENT_HTML_EN } from "./consent-markup.en"
import { CONSENT_HTML_HE } from "./consent-markup.he"
import type { Lang } from "./chrome"
import { heebo } from "./font"

import "./consent.he.css"
import "./consent.en.css"

const HTML = { he: CONSENT_HTML_HE, en: CONSENT_HTML_EN } as const

/**
 * Cookie banner and settings window (uxb-026 v2 HE, uxb-027 v2 EN, tbl-027),
 * on every page. Shown until the visitor chooses; the choice is stored in the
 * `ux_consent` cookie (src/lib/consent). "Cookie settings" in the footer
 * ([data-ck-open]) opens the window with the current choice. The banner is a
 * non-modal dialog; the window is modal: focus moves in, Tab stays inside, Esc
 * closes it and focus returns to what opened it. While the banner is shown,
 * the page gets room at the bottom so it never covers a form's send button.
 */
export function ConsentBanner({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const ck = root.querySelector<HTMLElement>("#ck")
    const m = root.querySelector<HTMLElement>("#ckm")
    if (!ck || !m) return
    const toggles = [...m.querySelectorAll<HTMLInputElement>(".tg")]
    const tg = (k: string) => toggles.find((t) => t.dataset.k === k)
    let opener: HTMLElement | null = null
    let ro: ResizeObserver | null = null

    const room = (px: number) => {
      document.body.style.paddingBottom = px ? `${px}px` : ""
      document.documentElement.style.scrollPaddingBottom = px ? `${px}px` : ""
    }
    const showBanner = () => {
      ck.hidden = false
      requestAnimationFrame(() => ck.classList.remove("off"))
      ro = new ResizeObserver(() => room(ck.offsetHeight + 16))
      ro.observe(ck)
    }
    const hideBanner = () => {
      ck.classList.add("off")
      ro?.disconnect()
      room(0)
      window.setTimeout(() => (ck.hidden = true), 350)
    }
    const fill = () => {
      const c = readConsent()
      const a = tg("an"), k = tg("mk")
      if (a) a.checked = Boolean(c?.analytics)
      if (k) k.checked = Boolean(c?.marketing)
    }
    const focusables = () => [...m.querySelectorAll<HTMLElement>("button,input,a[href]")].filter((e) => !e.hasAttribute("disabled"))
    const openM = (from: HTMLElement | null) => {
      opener = from
      fill()
      m.hidden = false
      m.querySelector<HTMLElement>(".ckm-x")?.focus()
    }
    const closeM = () => {
      if (m.hidden) return
      m.hidden = true
      const back = opener && document.contains(opener) && opener.offsetParent !== null ? opener : null
      ;(back ?? (ck.hidden ? null : ck.querySelector<HTMLElement>("[data-a]")))?.focus()
    }
    const choose = (analytics: boolean, marketing: boolean) => {
      saveConsent({ analytics, marketing })
      closeM()
      if (!ck.hidden) hideBanner()
    }

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const open = t.closest<HTMLElement>("[data-ck-open]")
      if (open) {
        e.preventDefault()
        openM(open)
        return
      }
      if (t === m) return closeM()
      const b = t.closest<HTMLElement>("[data-a]")
      if (!b || !root.contains(b)) return
      const a = b.dataset.a
      if (a === "all") choose(true, true)
      else if (a === "nec") choose(false, false)
      else if (a === "save") choose(Boolean(tg("an")?.checked), Boolean(tg("mk")?.checked))
      else if (a === "set") openM(b)
      else if (a === "close") closeM()
    }
    const onKey = (e: KeyboardEvent) => {
      if (m.hidden) return
      if (e.key === "Escape") {
        e.preventDefault()
        closeM()
      } else if (e.key === "Tab") {
        const f = focusables()
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    if (!readConsent()) showBanner()
    return () => {
      document.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKey)
      ro?.disconnect()
      room(0)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`uxk-${lang} ${heebo.variable}`}
      lang={lang}
      dir={lang === "he" ? "rtl" : "ltr"}
      dangerouslySetInnerHTML={{ __html: HTML[lang] }}
    />
  )
}
