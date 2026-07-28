"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { trackLead } from "@/lib/analytics/meta-pixel"

import {
  SERVICE,
  SERVICE_CAPABILITIES,
  SERVICE_MAX_YEARS,
  WHATSAPP_NUMBER,
  type ServiceKey,
} from "./newHome.constants"
import styles from "./ServiceSection.module.css"

/** Line icons, one per discipline. Stroke follows the surrounding colour. */
const ICONS: Record<ServiceKey, React.ReactNode> = {
  research: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  design: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="16.5" cy="10.5" r="1" />
    </>
  ),
  dev: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
    </>
  ),
  market: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 3h4v4" />
    </>
  ),
}

function Icon({ name }: { name: ServiceKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  )
}

const COUNT_MS = 800

/** True when the visitor asked the system for reduced motion. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

/**
 * "השירות שלנו" — the four disciplines as a self-running selector. It cycles on
 * its own at a calm pace, previews on hover or keyboard focus, and locks to one
 * discipline once the visitor clicks. Reduced motion gets the finished state
 * with no cycling, no sweep and no count-up.
 */
export function ServiceSection() {
  const items = SERVICE_CAPABILITIES
  const [active, setActive] = useState(0)
  /** Set once the visitor picks a discipline — stops the auto-advance for good. */
  const [locked, setLocked] = useState(false)
  /** Set while hovering or focusing — pauses the auto-advance temporarily. */
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  const current = items[active]
  const pct = Math.round((current.years / SERVICE_MAX_YEARS) * 100)

  /* -------------------------------------------------------- auto-advance -- */

  useEffect(() => {
    if (reduced || locked || paused) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % items.length),
      SERVICE.autoAdvanceMs,
    )
    return () => window.clearInterval(id)
  }, [reduced, locked, paused, items.length])

  /* ------------------------------------------------------------ count-up -- */

  const [shown, setShown] = useState(items[0].years)

  useEffect(() => {
    if (reduced) {
      setShown(current.years)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min(1, (ts - start) / COUNT_MS)
      setShown(Math.round(p * current.years))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    // rAF is throttled to a standstill in a backgrounded tab, which would leave
    // the number frozen part-way. This makes the final value unconditional.
    const settle = window.setTimeout(
      () => setShown(current.years),
      COUNT_MS + 150,
    )
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
    }
  }, [current.years, reduced])

  /* ------------------------------------------------- keyboard navigation -- */

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const focusTab = useCallback((i: number) => {
    tabRefs.current[i]?.focus()
  }, [])

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    // Right/left are swapped in this RTL list: "next" is the key pointing start-ward.
    const forward = event.key === "ArrowDown" || event.key === "ArrowLeft"
    const back = event.key === "ArrowUp" || event.key === "ArrowRight"
    let next: number | null = null

    if (forward) next = (index + 1) % items.length
    else if (back) next = (index - 1 + items.length) % items.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = items.length - 1

    if (next === null) return
    event.preventDefault()
    setActive(next)
    focusTab(next)
  }

  return (
    <section
      id="service"
      aria-labelledby="service-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.kicker}>{SERVICE.kicker}</span>
          <h2 id="service-heading" className={styles.heading}>
            {SERVICE.headingLead}
            <em>{SERVICE.headingAccent}</em>
            {SERVICE.headingTail}
          </h2>
          <p className={styles.sub}>{SERVICE.sub}</p>
        </div>

        <div className={styles.grid}>
          <div
            className={styles.list}
            role="tablist"
            aria-orientation="vertical"
            aria-label={SERVICE.kicker}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`service-tab-${item.key}`}
                aria-selected={i === active}
                aria-controls="service-panel"
                tabIndex={i === active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                className={`${styles.cap} ${i === active ? styles.capOn : ""}`}
                style={
                  {
                    "--w": `${Math.round((item.years / SERVICE_MAX_YEARS) * 100)}%`,
                  } as React.CSSProperties
                }
                onClick={() => {
                  setActive(i)
                  setLocked(true)
                }}
                onMouseEnter={() => {
                  setPaused(true)
                  setActive(i)
                }}
                onFocus={() => {
                  setPaused(true)
                  setActive(i)
                }}
                onBlur={() => setPaused(false)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span className={styles.capIcon}>
                  <Icon name={item.key} />
                </span>
                <span className={styles.capText}>
                  <b className={styles.capName}>{item.name}</b>
                  <span className={styles.mini} aria-hidden="true">
                    <i />
                  </span>
                </span>
                <span className={styles.capYears}>
                  {item.years} {SERVICE.yearsSuffix}
                </span>
              </button>
            ))}
          </div>

          <div
            className={styles.detail}
            role="tabpanel"
            id="service-panel"
            aria-labelledby={`service-tab-${current.key}`}
            tabIndex={0}
          >
            <div key={current.key} className={reduced ? undefined : styles.fade}>
              <div className={styles.detailTop}>
                <span className={styles.detailIcon}>
                  <Icon name={current.key} />
                </span>
                <div className={styles.detailName}>{current.name}</div>
              </div>

              <p className={styles.detailYears}>
                <span className={styles.detailNum}>{shown}</span>
                <span className={styles.detailYearsLabel}>
                  {SERVICE.yearsLabel}
                </span>
              </p>

              <div className={styles.detailBar} aria-hidden="true">
                <i style={{ "--bar": `${pct}%` } as React.CSSProperties} />
              </div>

              <p className={styles.detailDesc}>{current.desc}</p>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaText}>{SERVICE.ctaText}</div>
          <a
            className={styles.waButton}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SERVICE.ctaButton}
            onClick={() => trackLead({ source: "whatsapp", contentName: "service_section_cta" })}
          >
            <svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true" focusable="false">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.773L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.854l-.486-.29-5.01 1.194 1.234-4.874-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.199-2.357-1.162-2.722-1.295-.365-.133-.631-.199-.897.199-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.975-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.323-.778-.651-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.323s1.428 3.854 1.627 4.12c.2.266 2.81 4.29 6.808 6.018.951.41 1.693.655 2.272.839.955.303 1.824.26 2.511.158.766-.114 2.357-.964 2.69-1.895.332-.93.332-1.728.232-1.895-.1-.166-.365-.266-.763-.465z" />
            </svg>
            {SERVICE.ctaButton}
          </a>
        </div>
      </div>
    </section>
  )
}
