"use client"

import { Frank_Ruhl_Libre } from "next/font/google"
import { useCallback, useEffect, useRef, useState } from "react"

import {
  CHART_BAR_HEIGHTS,
  CHART_MONTHS,
  HERO,
  HERO_THEMES,
  MIO_WHEEL_LABELS,
  THEME_TOTAL,
  type AuditorTheme,
  type HeroTheme,
  type InvoicesTheme,
  type MeatBeatTheme,
  type MioshyTheme,
} from "./newHome.constants"
import { NewHomeHeader } from "./NewHomeHeader"
import styles from "./NewHero.module.css"

/**
 * Full-bleed dark hero for /new-home. Fixed copy column plus a product-mockup
 * carousel of themes, each with its own palette, layout and panel:
 *   1  "חשבוניות ירוקות" — green invoices dashboard + phone.
 *   2  "Auditor"          — violet + amber deep-scan panel with a radar sweep.
 *   3  "Mioshy"           — plum/magenta/lime spin wheel that stops, then a
 *                           cream question popup rises.
 * The remaining dot is a dimmed placeholder. The active dot fills a progress bar
 * and auto-advances at a calm pace, pauses on hover/touch, is clickable, and
 * honours prefers-reduced-motion (no auto-advance, static skins). Each theme
 * entry replays its intro and pops confetti from its external tag, so the switch
 * is felt immediately. All mockup motion is CSS transform/opacity.
 */

// The Mioshy popup question is set in Frank Ruhl Libre italic. Loaded here (a
// new-home file) so the shared layout stays untouched; only weight 700 exists,
// the italic slant is applied in CSS.
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew"],
  weight: "700",
  display: "swap",
  variable: "--nh-font-frank",
})

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

  // Reduced-motion users have no progress bar to drive the timer, so rotate on
  // an interval instead (only when there is more than one theme).
  const savedAdvance = useRef(advance)
  savedAdvance.current = advance
  useEffect(() => {
    if (!reduced || paused || themeCount < 2) return
    const id = window.setInterval(() => savedAdvance.current(), CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, themeCount])

  const theme = HERO_THEMES[active]
  const stageLow = theme.kind === "auditor" || theme.kind === "mioshy"

  return (
    <section
      className={`${styles.hero} ${frankRuhl.variable}`}
      dir="rtl"
      aria-label="Uxellent"
    >
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
            className={`${styles.stage} ${stageLow ? styles.stageEnd : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            {/* keyed by active → each theme entry re-mounts and replays its intro */}
            <div key={active} className={styles.mockEnter}>
              <FloatTag text={theme.floatTag} kind={theme.kind} />
              {theme.kind === "invoices" && <InvoiceMock theme={theme} />}
              {theme.kind === "auditor" && <ScanMock theme={theme} />}
              {theme.kind === "mioshy" && <WheelMock theme={theme} />}
              {theme.kind === "meatbeat" && <MeatBeatMock theme={theme} />}
            </div>
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
      </div>
      <div aria-hidden="true" className={styles.seam} />
    </section>
  )
}

/* -------------------------------------------------------------- float tag -- */

function FloatTag({ text, kind }: { text: string; kind: HeroTheme["kind"] }) {
  // 10 confetti pieces that pop once on theme entry (element is remounted per theme)
  const conf = [
    "-34px,-26px", "28px,-32px", "-46px,2px", "44px,-4px", "-20px,-44px",
    "16px,-48px", "38px,18px", "-40px,22px", "6px,-56px", "-6px,30px",
  ]
  const variant =
    kind === "mioshy" ? styles.floatTagMio : kind === "meatbeat" ? styles.floatTagMeat : ""
  return (
    <div className={`${styles.floatTag} ${variant}`}>
      <span aria-hidden="true" className={styles.tagConf}>
        {conf.map((c, i) => {
          const [dx, dy] = c.split(",")
          return (
            <i
              key={i}
              className={styles.tagConfPiece}
              style={{ ["--dx" as string]: dx, ["--dy" as string]: dy }}
            />
          )
        })}
      </span>
      {text}
    </div>
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

/* -------------------------------------------------- theme 1: invoices ------ */

function InvoiceMock({ theme }: { theme: InvoicesTheme }) {
  return (
    <>
      <Board theme={theme} />
      <Phone theme={theme} />
    </>
  )
}

function Board({ theme }: { theme: InvoicesTheme }) {
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

function Phone({ theme }: { theme: InvoicesTheme }) {
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

/* --------------------------------------------------- theme 2: auditor ------ */

function ScanMock({ theme }: { theme: AuditorTheme }) {
  const { scan } = theme
  // duplicate the checks so the vertical wheel loops seamlessly
  const wheel = [...scan.checks, ...scan.checks]

  return (
    <div className={styles.scan}>
      <span aria-hidden="true" className={styles.radar} />

      <div className={styles.scanHead}>
        <span className={styles.scanDot} />
        {scan.title}
        <span className={styles.scanStatus}>✦ {scan.status}</span>
      </div>

      <div className={styles.scores}>
        {scan.gauges.map((g) => (
          <Gauge key={g.label} gauge={g} />
        ))}
        <div className={styles.checks}>
          <div className={styles.checksTrack}>
            {wheel.map((c, i) => (
              <div key={i} className={styles.chk}>
                <span className={`${styles.st} ${c.status === "warn" ? styles.stWarn : styles.stOk}`}>
                  {c.status === "warn" ? "!" : "✓"}
                </span>
                <div className={styles.chkT}>
                  <b>{c.title}</b>
                  <small>{c.sub}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.proj}>
        <div className={styles.projHead}>{scan.proj.title}</div>
        <div className={styles.projGrid}>
          {scan.proj.bars.map((b) => (
            <div key={b.label} className={styles.pcol}>
              <span className={styles.pbar} style={{ ["--h" as string]: `${b.h}%` }} />
              <b>{b.value}</b>
              <small>{b.label}</small>
            </div>
          ))}
        </div>
        <div className={styles.projHook}>{scan.proj.hook}</div>
      </div>
    </div>
  )
}

function Gauge({ gauge }: { gauge: AuditorTheme["scan"]["gauges"][number] }) {
  return (
    <div className={styles.gauge}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className={styles.gBg} cx="60" cy="60" r="52" />
        <circle
          className={`${styles.gFg} ${gauge.tone === "amber" ? styles.gFgA : styles.gFgV}`}
          cx="60"
          cy="60"
          r="52"
          style={{ ["--goff" as string]: gauge.offset }}
        />
      </svg>
      <div className={styles.gMid}>
        <div className={styles.gNum}>{gauge.value}</div>
        <div className={styles.gCap}>{gauge.label}</div>
      </div>
    </div>
  )
}

/* --------------------------------------------------- theme 3: Mioshy wheel - */

// 12-slice geometry (matches Mioshy's Wheel.tsx: r 150, slices from top).
const r4 = (n: number) => Math.round(n * 10000) / 10000
const toXY = (deg: number, rad: number): [number, number] => {
  const a = (deg * Math.PI) / 180
  return [150 + rad * Math.cos(a), 150 + rad * Math.sin(a)]
}
// Fixed radial label anchors + upright rotations, straight from the reference.
const WHEEL_LABEL_POS = [
  { x: 179.8, y: 38.9, rot: -75 },
  { x: 231.3, y: 68.7, rot: -45 },
  { x: 261.1, y: 120.2, rot: -15 },
  { x: 261.1, y: 179.8, rot: 15 },
  { x: 231.3, y: 231.3, rot: 45 },
  { x: 179.8, y: 261.1, rot: 75 },
  { x: 120.2, y: 261.1, rot: -75 },
  { x: 68.7, y: 231.3, rot: -45 },
  { x: 38.9, y: 179.8, rot: -15 },
  { x: 38.9, y: 120.2, rot: 15 },
  { x: 68.7, y: 68.7, rot: 45 },
  { x: 120.2, y: 38.9, rot: 75 },
]
const POINTER_D =
  "M58 29C58 45.0163 29 80.5 29 80.5C29 80.5 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29Z"

function WheelMock({ theme }: { theme: MioshyTheme }) {
  const { popup } = theme
  const wedges = Array.from({ length: 12 }, (_, i) => {
    const [x0, y0] = toXY(-90 + i * 30, 150)
    const [x1, y1] = toXY(-60 + i * 30, 150)
    return {
      d: `M 150 150 L ${r4(x0)} ${r4(y0)} A 150 150 0 0 1 ${r4(x1)} ${r4(y1)} Z`,
      fill: i % 2 === 0 ? "#620085" : "#D2006F",
    }
  })
  const dividers = Array.from({ length: 12 }, (_, i) => toXY(-90 + i * 30, 151))
  const dots = Array.from({ length: 24 }, (_, i) => toXY(-90 + i * 15, 156.8))

  return (
    <div className={styles.mio}>
      <div className={styles.mioWrap}>
        <span aria-hidden="true" className={styles.mioRing} />
        <span aria-hidden="true" className={styles.mioPointer}>
          <svg viewBox="0 0 58 81" fill="none" width="100%" height="100%">
            <path d={POINTER_D} fill="#fff" />
          </svg>
        </span>

        <div className={styles.mioWheel}>
          <div className={styles.wheelRot}>
            <svg viewBox="0 0 300 300" style={{ overflow: "visible" }} aria-label="גלגל">
              {wedges.map((w, i) => (
                <path key={`w${i}`} d={w.d} fill={w.fill} />
              ))}
              {dividers.map(([x, y], i) => (
                <line
                  key={`d${i}`}
                  x1="150"
                  y1="150"
                  x2={r4(x)}
                  y2={r4(y)}
                  stroke="#C7FF0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
              <g className={styles.mioLabels} fill="#fff" fontSize="16" fontWeight={800} textAnchor="middle" dominantBaseline="middle">
                {WHEEL_LABEL_POS.map((p, i) => (
                  <text key={`l${i}`} x={p.x} y={p.y} transform={`rotate(${p.rot} ${p.x} ${p.y})`}>
                    {MIO_WHEEL_LABELS[i % 2]}
                  </text>
                ))}
              </g>
              <g fill="#C7FF0F">
                {dots.map(([x, y], i) => (
                  <circle key={`c${i}`} cx={r4(x)} cy={r4(y)} r="3" />
                ))}
              </g>
              <circle cx="150" cy="150" r="40" fill="#3B0638" stroke="#3B0638" strokeWidth="3" />
            </svg>
          </div>
          <span aria-hidden="true" className={styles.mioGloss} />
        </div>

        <div className={styles.mioPop}>
          <div className={styles.mioPopHead}>
            <span className={styles.mioBadge}>✦ {popup.badge}</span>
            <span className={styles.mioLive}>{popup.live}</span>
          </div>
          <p className={styles.mioQ}>{popup.question}</p>
          <div className={styles.mioCta}>⟳ {popup.cta}</div>
          <p className={styles.mioNote}>{popup.note}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------- theme 4: MeatBeat ------- */

function MeatBeatMock({ theme }: { theme: MeatBeatTheme }) {
  const { board } = theme
  // Same transparent glass board as the invoices theme, recoloured warm. The
  // line/bar chart reuses the shared activity series (invoices-style, 1:1).
  const areaPath =
    "M0,96 C60,88 90,92 130,78 C180,60 210,74 260,58 C310,44 340,52 390,36 C440,22 480,26 520,14 L520,120 L0,120 Z"
  const linePath =
    "M0,96 C60,88 90,92 130,78 C180,60 210,74 260,58 C310,44 340,52 390,36 C440,22 480,26 520,14"

  return (
    <div className={`${styles.board} ${styles.mbBoard}`}>
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
        <span className={styles.badge}>LIVE</span>
      </div>

      <div className={styles.kpis}>
        {board.kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpi}>
            <div className={styles.kpiLbl}>{kpi.label}</div>
            <div className={styles.kpiVal}>
              {kpi.value}
              <span className={styles.delta}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chart}>
        <div className={styles.mbChartH}>{board.chartTitle}</div>
        <svg viewBox="0 0 520 120" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="nhGrowMeat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E8863C" stopOpacity="0.42" />
              <stop offset="1" stopColor="#E8863C" stopOpacity="0" />
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
            <span className={styles.rowEmoji} aria-hidden="true">
              {row.emoji}
            </span>
            <span className={styles.rowT}>{row.text}</span>
            <span className={styles.when}>{row.when}</span>
          </div>
        ))}
      </div>

      <div className={styles.mbDl}>
        <span className={styles.mbDlLbl}>{board.downloadLabel}</span>
        {board.stores.map((store) => (
          <div key={store.kind} className={styles.store}>
            <StoreIcon kind={store.kind} />
            <span className={styles.storeT}>
              <small>{store.small}</small>
              <b>{store.name}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoreIcon({ kind }: { kind: "apple" | "google" }) {
  if (kind === "apple")
    return (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="#fff" aria-hidden="true">
        <path d="M16.37 1.43c0 1.14-.42 2.2-1.11 2.98-.79.88-2.06 1.56-3.11 1.48-.14-1.06.42-2.18 1.06-2.88.76-.86 2.11-1.51 3.16-1.58zM20.5 17.02c-.6 1.38-.89 1.99-1.66 3.2-1.08 1.7-2.6 3.82-4.48 3.83-1.68.02-2.11-1.09-4.38-1.08-2.27.01-2.75 1.1-4.43 1.09-1.88-.02-3.32-1.93-4.4-3.63C-1.36 15.9-.6 9.3 3.6 8.68c1.36-.2 2.44.73 3.28.73.84 0 2.3-.9 3.88-.77.66.03 2.51.27 3.7 2.02-3.25 2.12-2.73 6.13.04 7.36z" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true">
      <path fill="#00D3FF" d="M3.6 2.2v19.6l10.3-9.8z" />
      <path fill="#00F076" d="M3.6 2.2l14 8.1-3.7 3.5z" />
      <path fill="#FFCE00" d="M20.6 12l-3-1.7-3.7 3.5 3.7 3.5z" />
      <path fill="#FF3A44" d="M3.6 21.8l10.3-9.8 3.7 3.5z" />
    </svg>
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

