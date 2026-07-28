"use client"

import { useRef, useState } from "react"

import {
  KIT_LINK,
  SERVICE_PANES,
  SERVICES_HEAD,
} from "./homeSections.constants"
import { withLtr } from "./Ltr"
import { dispatchPreselect } from "./preselectInterest"
import styles from "./ServicesSection.module.css"

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

/**
 * The four services, as a classic tablist over a single white stage.
 *
 * Every pane stays rendered — inactive ones carry the `hidden` attribute — so
 * all four services are in the HTML that crawlers receive (brief §1).
 */
export function ServicesSection() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /**
   * Arrow keys move between tabs, Home/End jump to the ends. The list is laid
   * out RTL, so ArrowLeft advances and ArrowRight goes back — matching what the
   * user sees rather than the logical order.
   */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = SERVICE_PANES.length - 1
    let next: number | null = null

    if (event.key === "ArrowLeft") next = active === last ? 0 : active + 1
    else if (event.key === "ArrowRight") next = active === 0 ? last : active - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last

    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <span className={styles.kicker}>{SERVICES_HEAD.kicker}</span>
        <h2 id="services-heading" className={styles.heading}>
          {SERVICES_HEAD.heading}
        </h2>
        <p className={styles.sub}>{SERVICES_HEAD.sub}</p>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label={SERVICES_HEAD.tablistLabel}
          onKeyDown={onKeyDown}
        >
          {SERVICE_PANES.map((pane, index) => (
            <button
              key={pane.id}
              type="button"
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              className={styles.tab}
              role="tab"
              id={`${pane.id}-tab`}
              aria-selected={index === active}
              aria-controls={pane.id}
              // Roving tabindex: one stop for the whole tablist, then arrows.
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
            >
              <span className={styles.num}>{pane.num}</span>
              {pane.tabLabel}
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          {SERVICE_PANES.map((pane, index) => (
            <div
              key={pane.id}
              className={styles.pane}
              id={pane.id}
              role="tabpanel"
              aria-labelledby={`${pane.id}-tab`}
              hidden={index !== active}
            >
              <span className={styles.ghost} aria-hidden="true">
                {pane.num}
              </span>
              <h3 className={styles.paneHeading}>{pane.heading}</h3>
              <p className={styles.desc}>{withLtr(pane.description, "ROAS")}</p>
              <p className={styles.fit}>
                <b>{SERVICES_HEAD.fitLabel}</b>
                {pane.fit}
              </p>
              <div className={styles.actions}>
                <a
                  className={styles.cta}
                  href="#contact"
                  onClick={() => dispatchPreselect(pane.ctaPreselect)}
                >
                  {pane.ctaLabel}
                </a>
                {/* The workbook download lives on tab 01 only. It preselects
                    the kit option, which makes email required in the form and
                    routes a successful submit to the thank-you page. */}
                {index === 0 && (
                  <a
                    className={styles.dlLink}
                    href="#contact"
                    onClick={() => dispatchPreselect(KIT_LINK.preselect)}
                  >
                    <DownloadIcon />
                    {KIT_LINK.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
