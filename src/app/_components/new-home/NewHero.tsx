"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import {
  CHART_BAR_HEIGHTS,
  CHART_MONTHS,
  HERO,
  HERO_THEMES,
  NEW_HOME_LOGOS,
  THEME_TOTAL,
  type HeroTheme,
} from "./newHome.constants"
import { NewHomeHeader } from "./NewHomeHeader"
import styles from "./NewHero.module.css"

/**
 * Full-bleed dark hero for /new-home. Includes its own dark header, a fixed
 * copy column (wide enough for a three-line H1), a product-mockup carousel of
 * themes (only theme 1 "חשבוניות ירוקות" is live; dots 2–4 are dimmed
 * placeholders), and the white client logos at the bottom of the dark block.
 *
 * The carousel auto-advances at a calm pace with a progress-filling active dot,
 * pauses on hover/touch, is clickable, and honours prefers-reduced-motion
 * (no auto-advance, static mockup). All mockup motion is CSS transform/opacity.
 */

const CYCLE_MS = 6000

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

export function NewHero() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const themeCount = HERO_THEMES.length

  const advance = useCallback(() => {
    setActive((a) => (a + 1) % themeCount)
    setCycle((c) => c + 1)
  }, [themeCount])

  // Fallback timer for reduced-motion users: still rotate, just without the
  // progress-bar animation driving it. (No rotation when there is one theme.)
  const savedAdvance = useRef(advance)
  savedAdvance.current = advance
  useEffect(() => {
    if (!reduced || paused || themeCount < 2) return
    const id = window.setInterval(() => savedAdvance.current(), CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, themeCount])

  const theme = HERO_THEMES[active]

  return (
    <section className={styles.hero} dir="rtl" aria-label="Uxellent">
      <div className={styles.wrap}>
        <NewHomeHeader />

        <div className={styles.grid}>
          <div className={styles.copy}>
            <div className={styles.chips}>
              {HERO.chips.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
            </div>
            <h1 className={styles.h1}>{HERO.title}</h1>
            <p className={styles.sub}>{HERO.subtitle}</p>
            <div className={styles.ctas}>
              <a href={HERO.ctaPrimary.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                {HERO.ctaPrimary.label}
              </a>
              <a href={HERO.ctaSecondary.href} className={`${styles.btn} ${styles.btnGhost}`}>
                {HERO.ctaSecondary.label}
              </a>
            </div>
          </div>

          <div
            className={styles.stage}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            <Mockup theme={theme} />
          </div>
        </div>

        <ThemeDots
          active={active}
          cycle={cycle}
          paused={paused || reduced}
          reduced={reduced}
          label={theme.label}
          onSelect={(i) => {
            if (i < themeCount) {
              setActive(i)
              setCycle((c) => c + 1)
            }
          }}
          onProgressEnd={advance}
        />

        <LogoStrip />
      </div>
      <div aria-hidden="true" className={styles.seam} />
    </section>
  )
}

/* --------------------------------------------------------------- carousel -- */

function ThemeDots({
  active,
  cycle,
  paused,
  reduced,
  label,
  onSelect,
  onProgressEnd,
}: {
  active: number
  cycle: number
  paused: boolean
  reduced: boolean
  label: string
  onSelect: (i: number) => void
  onProgressEnd: () => void
}) {
  const themeCount = HERO_THEMES.length
  return (
    <div className={styles.themes}>
      <div className={styles.dots} role="tablist" aria-label="בחירת נושא">
        {Array.from({ length: THEME_TOTAL }).map((_, i) => {
          const real = i < themeCount
          const isActive = i === active
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={real ? `נושא ${i + 1}` : `נושא ${i + 1}, ייקבע בהמשך`}
              disabled={!real}
              onClick={() => onSelect(i)}
              className={`${styles.dot} ${isActive ? styles.dotOn : ""} ${
                !real ? styles.dotDim : ""
              }`}
            >
              {isActive && !reduced && (
                <span
                  key={`${active}-${cycle}`}
                  className={styles.dotProgress}
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={onProgressEnd}
                />
              )}
              {isActive && reduced && <span className={styles.dotProgressStatic} />}
            </button>
          )
        })}
      </div>
      <div className={styles.tlabel}>
        נושא {active + 1} מתוך {THEME_TOTAL}: <b>{label}</b>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- mockup -- */

function Mockup({ theme }: { theme: HeroTheme }) {
  return (
    <>
      <Board theme={theme} />
      <Phone theme={theme} />
    </>
  )
}

function Board({ theme }: { theme: HeroTheme }) {
  const { board } = theme
  const areaPath =
    "M0,96 C60,88 90,92 130,78 C180,60 210,74 260,58 C310,44 340,52 390,36 C440,22 480,26 520,14 L520,120 L0,120 Z"
  const linePath =
    "M0,96 C60,88 90,92 130,78 C180,60 210,74 260,58 C310,44 340,52 390,36 C440,22 480,26 520,14"

  return (
    <div className={styles.board}>
      <div className={styles.chrome}>
        <span className={styles.cdot} />
        <span className={styles.cdot} />
        <span className={styles.cdot} />
        <span className={styles.url}>{board.url}</span>
      </div>

      <div className={styles.boardHead}>
        <span className={styles.boardTitle}>
          <span className={styles.liveDot} />
          {board.title}
        </span>
        <span className={styles.headMeta}>
          <span className={styles.gov}>
            <CheckMini /> {board.chip}
          </span>
          <span className={styles.badge}>LIVE</span>
        </span>
      </div>

      <div className={styles.kpis}>
        {board.kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpi}>
            <div className={styles.kpiLbl}>{kpi.label}</div>
            <div className={styles.kpiVal}>
              {kpi.value}
              <span className={`${styles.delta} ${kpi.deltaNeg ? styles.deltaNeg : ""}`}>
                {kpi.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chart}>
        <svg viewBox="0 0 520 120" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="nhGrow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5389BB" stopOpacity="0.45" />
              <stop offset="1" stopColor="#5389BB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className={styles.growfill} d={areaPath} />
          <path className={styles.growline} d={linePath} pathLength={640} />
        </svg>
        <div className={styles.bars}>
          {CHART_BAR_HEIGHTS.map((h, i) => (
            <div key={i} className={styles.bcol}>
              <span
                className={`${styles.bar} ${styles[`bar${i + 1}`]}`}
                style={{ height: `${h}%` }}
              />
              <span className={styles.month}>{CHART_MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.feed}>
        {board.feed.map((row, i) => (
          <div key={row.text} className={`${styles.row} ${i === 0 ? styles.rowNew : ""}`}>
            <span className={styles.rowIc}>
              <FeedIcon name={row.icon} />
            </span>
            <span className={styles.rowT}>{row.text}</span>
            <span className={styles.when}>{row.when}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Phone({ theme }: { theme: HeroTheme }) {
  const { phone } = theme
  const confetti = [
    "-46px,-38px", "40px,-46px", "-60px,6px", "58px,-6px", "-30px,-64px", "26px,-70px",
    "52px,28px", "-52px,34px", "10px,-84px", "-8px,44px", "70px,-30px", "-72px,-24px",
  ]
  return (
    <div className={styles.phone}>
      <span className={styles.notch} />
      <div className={styles.pHead}>
        {phone.heading} <small>{phone.headingSmall}</small>
      </div>
      {phone.docs.map((doc) => (
        <div key={doc.name} className={styles.doc}>
          <div>
            <b>{doc.name}</b>
            <br />
            <small>{doc.kind}</small>
          </div>
          <div className={styles.sum}>{doc.sum}</div>
        </div>
      ))}

      <div className={styles.sheet}>
        <div className={styles.sForm}>
          <h4>{phone.form.title}</h4>
          {phone.form.fields.map((f) => (
            <div key={f} className={styles.field}>
              {f}
            </div>
          ))}
          <div className={styles.go}>{phone.form.cta}</div>
        </div>
        <div className={styles.sDone}>
          <div className={styles.confetti}>
            {confetti.map((c, i) => {
              const [dx, dy] = c.split(",")
              return (
                <i
                  key={i}
                  className={styles.confPiece}
                  style={{ ["--dx" as string]: dx, ["--dy" as string]: dy }}
                />
              )
            })}
          </div>
          <div className={styles.ok}>
            <CheckMini strong />
          </div>
          <b>{phone.done.title}</b>
          <small>
            {phone.done.gov}
            <br />
            {phone.done.note}
          </small>
        </div>
      </div>

      <div className={styles.fab} aria-hidden="true">
        +
      </div>
      <div className={styles.hint} aria-hidden="true">
        {phone.fabHint}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- icons --- */

function CheckMini({ strong = false }: { strong?: boolean }) {
  return (
    <svg
      width={strong ? 18 : 12}
      height={strong ? 18 : 12}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth={strong ? 3 : 2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeedIcon({ name }: { name: "check" | "doc" | "mail" }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }
  if (name === "doc")
    return (
      <svg {...common}>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5M10 13h6M10 17h6" />
      </svg>
    )
  if (name === "mail")
    return (
      <svg {...common}>
        <path d="M3 6h18v12H3z" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

/* --------------------------------------------------------------- logos ----- */

function LogoStrip() {
  return (
    <div className={styles.logosHero}>
      <h2 className="sr-only">לקוחות שעבדנו איתם</h2>
      {NEW_HOME_LOGOS.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={200}
          height={44}
          className={styles.logoWhite}
        />
      ))}
    </div>
  )
}
