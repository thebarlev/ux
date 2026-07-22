"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { HERO, NEW_HOME_LOGOS } from "./newHome.constants"
import styles from "./NewHero.module.css"

/**
 * Hero for /new-home, first chapter of the "Uxellent Studio" design language
 * (see NewHero.module.css). Two portfolio-grade directions over one locked
 * copy, sharing one realistic product mockup:
 *   1  Light editorial — copy right, mockup left on the cream, floating stats.
 *   2  Dark premium     — the same composition inside a deep panel with a glow.
 *
 * A floating review-only switcher and ?hero=1|2 pick the direction. All bespoke
 * styling lives in the CSS module (build-safe, no dynamic Tailwind), so the dark
 * surfaces and mockup fills can never be purged.
 */

type HeroVariant = 1 | 2

export function NewHero() {
  const [variant, setVariant] = useState<HeroVariant>(1)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("hero")
    if (p === "2") setVariant(2)
    else if (p === "1") setVariant(1)
  }, [])

  function select(v: HeroVariant) {
    setVariant(v)
    const url = new URL(window.location.href)
    url.searchParams.set("hero", String(v))
    window.history.replaceState(null, "", url.toString())
  }

  return (
    <section className={styles.hero} dir="rtl" aria-label="Uxellent">
      <div className={styles.wrap}>
        {variant === 1 ? <HeroLight /> : <HeroDark />}
        <LogoStrip />
      </div>
      <HeroSwitcher value={variant} onChange={select} />
    </section>
  )
}

/* --------------------------------------------------------------- light ---- */

function HeroLight() {
  return (
    <div className={styles.grid}>
      <div className={`${styles.col} ${styles.copy}`}>
        <span className={`${styles.eyebrow} ${styles.reveal}`}>
          <span className={styles.eyebrowDot} />
          עיצוב · אפיון · פיתוח · שיווק
        </span>
        <h1 className={`${styles.h1} ${styles.reveal} ${styles.revealD1}`}>{HERO.title}</h1>
        <p className={`${styles.sub} ${styles.reveal} ${styles.revealD2}`}>{HERO.subtitle}</p>
        <a href="#contact" className={`${styles.cta} ${styles.reveal} ${styles.revealD3}`}>
          {HERO.cta}
        </a>
      </div>

      <div className={`${styles.col} ${styles.stage} ${styles.reveal} ${styles.revealD2}`}>
        <span aria-hidden="true" className={styles.stageGlow} />
        <ProductMockup tone="light" />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- dark ----- */

function HeroDark() {
  const glass = ["אפליקציות", "מערכות SaaS ב-AI", "מהרעיון ועד השיווק"]
  return (
    <div className={styles.panel}>
      <span aria-hidden="true" className={styles.glow} />
      <div className={`${styles.panelInner} ${styles.onDark}`}>
        <div className={`${styles.col} ${styles.copy}`}>
          <span className={`${styles.eyebrow} ${styles.eyebrowOnDark} ${styles.reveal}`}>
            <span className={styles.eyebrowDot} />
            עיצוב · אפיון · פיתוח · שיווק
          </span>
          <h1 className={`${styles.h1} ${styles.reveal} ${styles.revealD1}`}>{HERO.title}</h1>
          <p className={`${styles.sub} ${styles.reveal} ${styles.revealD2}`}>{HERO.subtitle}</p>
          <a
            href="#contact"
            className={`${styles.cta} ${styles.ctaOnDark} ${styles.reveal} ${styles.revealD3}`}
          >
            {HERO.cta}
          </a>

          <div className={`${styles.glassRow} ${styles.reveal} ${styles.revealD4}`}>
            {glass.map((label) => (
              <div key={label} className={styles.glass}>
                <span className={styles.glassDot} />
                <span className={styles.glassLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.col} ${styles.stage} ${styles.reveal} ${styles.revealD2}`}>
          <ProductMockup tone="dark" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- mockup ----- */

function ProductMockup({ tone }: { tone: "light" | "dark" }) {
  const areaPath =
    "M0,120 C34,112 46,106 68,108 C96,111 104,116 128,118 C160,121 168,84 196,78 C224,72 230,96 260,92 C296,87 300,58 326,52 C348,47 356,50 372,46 L372,160 L0,160 Z"
  const linePath =
    "M0,120 C34,112 46,106 68,108 C96,111 104,116 128,118 C160,121 168,84 196,78 C224,72 230,96 260,92 C296,87 300,58 326,52 C348,47 356,50 372,46"

  return (
    <div className={`${styles.mock} ${tone === "dark" ? styles.mockDark : ""}`}>
      <div className={styles.mockTop}>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.urlPill}>app.uxellent.com</span>
      </div>

      <div className={styles.mockBody}>
        <div className={styles.mockHead}>
          <span className={styles.mockTitle}>ניתוח נוכחות</span>
          <span className={styles.mockBadge}>עדכני</span>
        </div>

        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <div className={styles.kpiLabel}>נראות</div>
            <div className={styles.kpiValue}>87</div>
          </div>
          <div className={styles.kpi}>
            <div className={styles.kpiLabel}>ביקורים</div>
            <div className={styles.kpiValue}>4.2k</div>
          </div>
          <div className={styles.kpi}>
            <div className={styles.kpiLabel}>דומיין</div>
            <div className={styles.kpiValue}>
              A+ <span className={styles.kpiTrend}>↗</span>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <svg className={styles.chart} viewBox="0 0 372 160" role="img" aria-label="גרף מגמה">
            <defs>
              <linearGradient id="nhArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5389bb" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#5389bb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line className={styles.gridline} x1="0" y1="44" x2="372" y2="44" />
            <line className={styles.gridline} x1="0" y1="88" x2="372" y2="88" />
            <line className={styles.gridline} x1="0" y1="132" x2="372" y2="132" />
            <path className={styles.area} d={areaPath} />
            <path className={styles.line} d={linePath} pathLength={1} />
            <circle className={styles.pointHalo} cx="196" cy="78" r="9" />
            <circle className={styles.point} cx="196" cy="78" r="4.5" />
            <circle className={styles.pointHalo} cx="326" cy="52" r="9" />
            <circle className={styles.point} cx="326" cy="52" r="4.5" />
          </svg>
        </div>
      </div>

      {/* floating stat accents (light stage only reads well on cream) */}
      {tone === "light" && (
        <>
          <span className={`${styles.floatCard} ${styles.floatA}`}>
            <span className={`${styles.floatIcon} ${styles.floatTrendIcon}`}>↗</span>
            +38% תנועה
          </span>
          <span className={`${styles.floatCard} ${styles.floatB}`}>
            <span className={styles.floatIcon}>✓</span>
            אפיון הושלם
          </span>
        </>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- logos ----- */

function LogoStrip() {
  return (
    <div className={styles.logos}>
      <h2 className="sr-only">לקוחות שעבדנו איתם</h2>
      <div className={styles.logoGrid}>
        {NEW_HOME_LOGOS.map((logo) => (
          <div key={logo.src} className={styles.logoCell}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={220}
              height={50}
              className={styles.logoImg}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- switcher ---- */

function HeroSwitcher({
  value,
  onChange,
}: {
  value: HeroVariant
  onChange: (v: HeroVariant) => void
}) {
  const [open, setOpen] = useState(false)
  const labels: Record<HeroVariant, string> = { 1: "בהיר", 2: "כהה" }

  return (
    <div className={styles.switcher} data-preview-tool="hero-switcher">
      {open ? (
        <div className={styles.switchPanel}>
          <div className={styles.switchHead}>
            <span className={styles.switchTitle}>גרסת הירו</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת בורר הגרסאות"
              className={styles.switchClose}
            >
              ×
            </button>
          </div>
          <div className={styles.switchRow}>
            {([1, 2] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange(v)}
                aria-pressed={value === v}
                className={`${styles.switchBtn} ${value === v ? styles.switchBtnActive : ""}`}
              >
                {v}
              </button>
            ))}
          </div>
          <p className={styles.switchMeta}>
            {value} · {labels[value]}
          </p>
          <p className={styles.switchNote}>כלי סקירה בלבד. לא חלק מהעיצוב.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={styles.switchToggle}>
          גרסת הירו
        </button>
      )}
    </div>
  )
}
