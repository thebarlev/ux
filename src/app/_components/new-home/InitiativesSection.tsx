"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import {
  AUDITOR_APP_URL,
  AUDITOR_PANE,
  DAN_REVIEW,
  GOOGLE_REVIEWS_URL,
  INITIATIVE_TABS,
  INITIATIVES_HEAD,
  INVOICE_APP_URL,
  INVOICE_PANE,
} from "./homeSections.constants"
import styles from "./InitiativesSection.module.css"
import { withLtr } from "./Ltr"

/**
 * #products — the two in-house initiatives, on the same tab pattern as
 * ServicesSection but on the dark band. Tab 01 (the Auditor scan) is the
 * default, because the Facebook scan campaign now points at #products rather
 * than the retired #scan anchor (brief §1).
 *
 * Both CTAs hand off to the app rather than the lead form, each carrying its
 * own utm_campaign, so neither preselects an interest any more.
 *
 * Both panes stay in the DOM; the inactive one is `hidden`.
 */
export function InitiativesSection() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // RTL layout: ArrowLeft advances, ArrowRight goes back. See ServicesSection.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = INITIATIVE_TABS.length - 1
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

  const panelProps = (index: number) => ({
    id: INITIATIVE_TABS[index].id,
    role: "tabpanel" as const,
    "aria-labelledby": `${INITIATIVE_TABS[index].id}-tab`,
    hidden: index !== active,
    className: styles.pane,
  })

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <span className={styles.kicker}>{INITIATIVES_HEAD.kicker}</span>
        <h2 id="products-heading" className={styles.heading}>
          {INITIATIVES_HEAD.heading}
        </h2>
        <p className={styles.sub}>{INITIATIVES_HEAD.sub}</p>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label={INITIATIVES_HEAD.tablistLabel}
          onKeyDown={onKeyDown}
        >
          {INITIATIVE_TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              className={styles.tab}
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={index === active}
              aria-controls={tab.id}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
            >
              <span className={styles.num}>{tab.num}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          {/* ---------------------------------------------- 01 · Auditor --- */}
          <div {...panelProps(0)}>
            <div className={styles.grid}>
              <div className={styles.main}>
                <h3 className={styles.paneHeading}>{AUDITOR_PANE.heading}</h3>
                <p className={styles.desc}>{AUDITOR_PANE.description}</p>
                <div className={styles.caps}>
                  {AUDITOR_PANE.capabilities.map((cap) => (
                    <div key={cap.bold} className={styles.cap}>
                      <span className={styles.check} aria-hidden="true">
                        ✓
                      </span>
                      <span>
                        <b>{cap.bold}</b>
                        {cap.rest}
                      </span>
                    </div>
                  ))}
                </div>
                <a className={styles.cta} href={AUDITOR_APP_URL}>
                  {AUDITOR_PANE.ctaLabel}
                </a>
              </div>

              <div className={styles.review}>
                <Image
                  className={styles.avatar}
                  src={DAN_REVIEW.avatarSrc}
                  alt={DAN_REVIEW.name}
                  width={72}
                  height={72}
                />
                <div className={styles.stars} aria-label={DAN_REVIEW.starsLabel}>
                  ★★★★★
                </div>
                <p className={styles.reviewQuote}>{DAN_REVIEW.quote}</p>
                <p className={styles.reviewName}>{DAN_REVIEW.name}</p>
                <p className={styles.reviewCta}>
                  <a href={GOOGLE_REVIEWS_URL}>{DAN_REVIEW.ctaLabel}</a>
                  <br />
                  {DAN_REVIEW.ctaTail}
                </p>
              </div>
            </div>
          </div>

          {/* -------------------------------------------- 02 · invoicing --- */}
          <div {...panelProps(1)}>
            <div className={styles.center}>
              <span className={styles.badge}>{INVOICE_PANE.badge}</span>
              <h3 className={styles.paneHeading}>{INVOICE_PANE.heading}</h3>
              <p className={styles.desc}>{INVOICE_PANE.description}</p>
              <div className={styles.caps}>
                {INVOICE_PANE.capabilities.map((cap) => (
                  <div key={cap} className={styles.cap}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    <span>{withLtr(cap, "SHA-256")}</span>
                  </div>
                ))}
              </div>
              <a className={styles.cta} href={INVOICE_APP_URL}>
                {INVOICE_PANE.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
