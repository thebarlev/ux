import Image from "next/image"

import { HERO, NEW_HOME_LOGOS } from "./newHome.constants"
import styles from "./NewHero.module.css"

/**
 * Single dark ("premium") hero — first chapter of the "Uxellent Studio" design
 * language (NewHero.module.css). A deep navy panel on the cream, wide copy
 * column with two CTAs, and a living product dashboard that breathes in a slow,
 * elegant loop (rolling KPIs, a self-drawing chart, climbing bars, an activity
 * feed that advances). All motion is CSS on transform/opacity and is gated
 * behind prefers-reduced-motion, which resolves to a calm static dashboard.
 *
 * No client JS: the component is static markup, the browser does the rest.
 */

export function NewHero() {
  return (
    <section className={styles.hero} dir="rtl" aria-label="Uxellent">
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <span aria-hidden="true" className={styles.glow} />
          <span aria-hidden="true" className={styles.grid} />

          <div className={styles.panelInner}>
            <div className={styles.copy}>
              <div className={`${styles.chips} ${styles.reveal}`}>
                {HERO.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>

              <h1 className={`${styles.h1} ${styles.reveal} ${styles.revealD1}`}>{HERO.title}</h1>
              <p className={`${styles.sub} ${styles.reveal} ${styles.revealD2}`}>{HERO.subtitle}</p>

              <div className={`${styles.ctas} ${styles.reveal} ${styles.revealD3}`}>
                <a href={HERO.ctaPrimary.href} className={styles.ctaPrimary}>
                  {HERO.ctaPrimary.label}
                </a>
                <a href={HERO.ctaSecondary.href} className={styles.ctaGhost}>
                  {HERO.ctaSecondary.label}
                </a>
              </div>
            </div>

            <div className={`${styles.stage} ${styles.reveal} ${styles.revealD2}`}>
              <LiveDashboard />
            </div>
          </div>
        </div>

        <LogoStrip />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- live dashboard - */

const KPIS = [
  { label: "נראות", values: ["82", "85", "88", "91"], trend: "+9%" },
  { label: "ביקורים", values: ["3.8k", "4.0k", "4.3k", "4.6k"], trend: "+12%" },
  { label: "המרות", values: ["4.9%", "5.2%", "5.5%", "5.8%"], trend: "+6%" },
]

const BARS = [34, 52, 40, 63, 48, 72, 58, 80, 66]

const FEED = [
  { icon: "user", text: "לקוח חדש נרשם", time: "עכשיו" },
  { icon: "doc", text: "דוח נוכחות הופק", time: "לפני דקה" },
  { icon: "check", text: "אפיון הושלם", time: "לפני 4 ד׳" },
  { icon: "rocket", text: "גרסה חדשה פורסמה", time: "לפני 9 ד׳" },
  { icon: "search", text: "בדיקת דומיין רצה", time: "לפני 15 ד׳" },
  { icon: "chart", text: "יעד חודשי הושג", time: "לפני 22 ד׳" },
]

function LiveDashboard() {
  // duplicate the first rows so the stepped feed loops seamlessly
  const feedRows = [...FEED, FEED[0], FEED[1], FEED[2]]
  const areaPath =
    "M0,118 C30,112 44,116 70,112 C98,108 108,120 134,116 C164,111 172,86 200,82 C228,78 236,96 264,90 C298,83 304,58 330,52 C352,47 360,50 376,44 L376,150 L0,150 Z"
  const linePath =
    "M0,118 C30,112 44,116 70,112 C98,108 108,120 134,116 C164,111 172,86 200,82 C228,78 236,96 264,90 C298,83 304,58 330,52 C352,47 360,50 376,44"

  return (
    <div className={styles.mock}>
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
          <span className={styles.titleWrap}>
            <span className={styles.livePulse} />
            <span className={styles.mockTitle}>לוח בקרה</span>
          </span>
          <span className={styles.liveBadge}>LIVE</span>
        </div>

        <div className={styles.kpis}>
          {KPIS.map((kpi, i) => (
            <div key={kpi.label} className={styles.kpi}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiValueWrap}>
                <div className={`${styles.kpiRoll} ${styles[`kpiRoll${i + 1}`]}`}>
                  {[...kpi.values, kpi.values[0]].map((v, j) => (
                    <span key={j} className={styles.kpiValue}>
                      {v}
                    </span>
                  ))}
                </div>
                <span className={styles.kpiTrend}>{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chartCard}>
          <svg className={styles.chart} viewBox="0 0 376 150" role="img" aria-label="מגמת ביצועים">
            <defs>
              <linearGradient id="nhArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5389bb" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#5389bb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line className={styles.gridline} x1="0" y1="42" x2="376" y2="42" />
            <line className={styles.gridline} x1="0" y1="84" x2="376" y2="84" />
            <path className={styles.area} d={areaPath} />
            <path className={styles.line} d={linePath} pathLength={1} />
            <circle className={styles.pointHalo} cx="330" cy="52" r="10" />
            <circle className={styles.point} cx="330" cy="52" r="4.5" />
          </svg>
          <span aria-hidden="true" className={styles.chartSweep} />
        </div>

        <div className={styles.bars} aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`${styles.bar} ${styles[`bar${i + 1}`]}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className={styles.feed}>
          <div className={styles.feedTrack}>
            {feedRows.map((row, i) => (
              <div key={i} className={styles.feedRow}>
                <span className={`${styles.feedIcon} ${styles[`feedIcon_${row.icon}`] ?? ""}`}>
                  <FeedGlyph name={row.icon} />
                </span>
                <span className={styles.feedText}>{row.text}</span>
                <span className={styles.feedTime}>{row.time}</span>
              </div>
            ))}
          </div>
          <span aria-hidden="true" className={styles.feedFade} />
        </div>
      </div>
    </div>
  )
}

function FeedGlyph({ name }: { name: string }) {
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
  switch (name) {
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      )
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h6" />
        </svg>
      )
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a12 12 0 0 1 8-8c2 0 3 1 3 3a12 12 0 0 1-8 8l-3 1-1-1 1-3Z" />
        </svg>
      )
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      )
  }
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
