"use client"

import { useState } from "react"
import styles from "./redesign.module.css"
import { buildPlatformUrl } from "./promptUtils"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

/** The dark closer's chat prompt on the 6 inner pages (products, how-it-works,
 *  included, blog index, article, why-us) — same sanitize/URL-building rules
 *  as the home hero composer (see promptUtils.ts), just without the home
 *  composer's character counter. English pages send English text via ?p= —
 *  the platform side is being adapted for that, not something to gate on here. */
export function CloseComposer({ locale = "he" }: { locale?: Locale }) {
  const [value, setValue] = useState("")
  const t = getDictionary(locale).closeComposer

  function go() {
    window.location.href = buildPlatformUrl(value)
  }

  return (
    <div className={styles.closeComposer}>
      <textarea
        rows={1}
        maxLength={120}
        placeholder={t.placeholder}
        aria-label={t.ariaLabel}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            go()
          }
        }}
      />
      <div className={styles.ccFoot}>
        <span className={styles.ccHint}>{t.hint}</span>
        <button type="button" className={styles.ccSend} aria-label={t.sendAriaLabel} onClick={go}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
