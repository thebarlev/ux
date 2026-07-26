"use client"

import { useEffect, useRef, useState } from "react"

import { PROVEN_RESULTS, PROVEN_RESULTS_HEAD } from "./newHome.constants"
import type { ProvenResult } from "./newHome.constants"
import styles from "./ProvenResultsSection.module.css"

const COUNT_MS = 1500

/**
 * Runs a figure up from zero once the section is on screen. Reduced-motion
 * visitors get the final number immediately.
 */
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    // A zero duration lands on the target at the first frame, which is exactly
    // what reduced motion asks for: the number, without the run up to it.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : COUNT_MS

    let frame = 0
    let startedAt: number | null = null

    const tick = (now: number) => {
      if (startedAt === null) startedAt = now
      const progress = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration)
      // Ease out cubic: quick off the mark, settles gently on the final value.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active])

  return value
}

function ResultCard({ item, active }: { item: ProvenResult; active: boolean }) {
  const metric = item.metric
  const counted = useCountUp(metric.kind === "count" ? metric.to : 0, active)

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.subName}>{item.subtitle}</p>

      <ul className={styles.chips}>
        {item.chips.map((chip) => (
          <li key={chip} className={styles.chip}>
            {chip}
          </li>
        ))}
      </ul>

      <div className={styles.spacer} aria-hidden="true" />
      <div className={styles.rule} aria-hidden="true" />

      {metric.kind === "count" ? (
        // Screen readers get the settled figure once, instead of every frame
        // of the count.
        <p
          className={`${styles.metric} ${styles.metricLtr}`}
          dir="ltr"
          aria-label={`+${metric.to}%`}
        >
          <span aria-hidden="true" className={`${styles.sign} ${styles.signLead}`}>
            +
          </span>
          <span aria-hidden="true" className={styles.num}>
            {counted}
          </span>
          <span aria-hidden="true" className={styles.sign}>
            %
          </span>
        </p>
      ) : (
        <p className={`${styles.metric} ${styles.metricRtl}`} dir="rtl">
          <span className={`${styles.num} ${styles.metricWord}`}>
            {metric.text}
          </span>
          <span className={`${styles.sign} ${styles.signBig}`}>%</span>
        </p>
      )}

      <p className={styles.label}>{item.label}</p>
      <p className={styles.summary}>{item.summary}</p>
    </article>
  )
}

/**
 * "הצלחות מוכחות": three client results, the last section before the footer.
 * The two numeric figures count up the first time the band scrolls into view,
 * not on page load, so the movement is actually seen.
 */
export function ProvenResultsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="proven-results-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.kicker}>{PROVEN_RESULTS_HEAD.kicker}</span>
          <h2 id="proven-results-heading" className={styles.heading}>
            {PROVEN_RESULTS_HEAD.headingLead}
            <em>{PROVEN_RESULTS_HEAD.headingAccent}</em>
          </h2>
          <p className={styles.subtitle}>{PROVEN_RESULTS_HEAD.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {PROVEN_RESULTS.map((item) => (
            <ResultCard key={item.id} item={item} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
