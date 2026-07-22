"use client"

import { useEffect, useState, type ReactNode } from "react"
import Image from "next/image"

import { HERO, NEW_HOME_LOGOS } from "./newHome.constants"

/**
 * Hero for the alternative home page, in three genuinely different design
 * directions that share one copy:
 *   1  "המוצר ביד"  — text right, a code-built phone mockup left, floating chips.
 *   2  "המסע"        — big type over a self-drawing process line with four stops.
 *   3  "כהה"         — a dark rounded block on the cream, glass cards, glow.
 *
 * A floating switcher (review-only, not part of the design) and a ?hero=1|2|3
 * URL param pick the variant. The client-only URL read keeps the page static
 * without a Suspense boundary; SSR shows variant 1 until hydration.
 *
 * All animation is CSS, gated behind prefers-reduced-motion. The shared logo
 * strip sits below the hero in every variant.
 */

type HeroVariant = 1 | 2 | 3

export function NewHero() {
  const [variant, setVariant] = useState<HeroVariant>(1)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("hero")
    if (p === "2") setVariant(2)
    else if (p === "3") setVariant(3)
    else if (p === "1") setVariant(1)
  }, [])

  function select(v: HeroVariant) {
    setVariant(v)
    const url = new URL(window.location.href)
    url.searchParams.set("hero", String(v))
    window.history.replaceState(null, "", url.toString())
  }

  return (
    <section className="w-full overflow-x-hidden bg-[#F4F1EC]" dir="rtl">
      <HeroStyles />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 py-[var(--space-section)]">
        {variant === 1 && <HeroProductInHand />}
        {variant === 2 && <HeroJourney />}
        {variant === 3 && <HeroDark />}

        <LogoStrip />
      </div>

      <HeroSwitcher value={variant} onChange={select} />
    </section>
  )
}

/* ------------------------------------------------------------------ shared - */

function Cta({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <a
        href="#contact"
        className="mt-7 inline-flex h-[52px] w-full items-center justify-center rounded-[10px] bg-white px-[30px] text-[18px] font-semibold text-black transition-colors hover:bg-[color:var(--vow-accent)] hover:text-white sm:w-[200px]"
      >
        {HERO.cta}
      </a>
    )
  }
  return (
    <a
      href="#contact"
      className="btn-primary mt-6 w-full self-stretch sm:w-[200px] sm:self-start md:mt-7"
    >
      {HERO.cta}
    </a>
  )
}

function LogoStrip() {
  return (
    <div className="mt-12 md:mt-16">
      <h2 className="sr-only">לקוחות שעבדנו איתם</h2>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 py-2 sm:gap-x-8 sm:gap-y-6 md:grid-cols-6 md:gap-x-[80px] md:gap-y-8">
        {NEW_HOME_LOGOS.map((logo) => (
          <div
            key={logo.src}
            className="flex min-w-0 items-center justify-center overflow-hidden px-1"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={220}
              height={50}
              className="h-auto w-auto max-w-full max-h-[32px] object-contain object-center brightness-0 sm:max-h-[40px] md:max-h-[50px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------- variant 1: המוצר ביד -- */

function HeroProductInHand() {
  const chips = ["עיצוב", "אפיון", "פיתוח", "שיווק"]

  return (
    <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:items-center md:gap-8">
      {/* TEXT — first child sits on the right under dir=rtl */}
      <div className="flex flex-col items-start text-right">
        <h1 className="w-full max-w-[560px] text-right font-semibold text-black">
          <span className="block text-[30px] leading-[1.25] tracking-[-0.3px] sm:text-[34px] md:text-[40px] md:leading-[1.2] lg:text-[46px] lg:leading-[1.18]">
            {HERO.title}
          </span>
        </h1>
        <p className="mt-4 w-full max-w-[520px] text-right text-[19px] leading-[30px] text-[color:var(--vow-muted)] md:mt-5 md:text-[20px] md:leading-[32px]">
          {HERO.subtitle}
        </p>
        <Cta />
      </div>

      {/* PHONE — below the text on mobile, to the left on desktop */}
      <div className="flex justify-center md:justify-start">
        <div className="relative mx-auto w-[280px] max-w-full">
          {/* floating chips */}
          <span className="nh-chip absolute right-[-6px] top-[6%] z-20 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold text-black shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
            {chips[0]}
          </span>
          <span className="nh-chip nh-chip-2 absolute left-[-8px] top-[26%] z-20 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold text-black shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
            {chips[1]}
          </span>
          <span className="nh-chip nh-chip-3 absolute bottom-[24%] right-[-10px] z-20 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold text-black shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
            {chips[2]}
          </span>
          <span className="nh-chip nh-chip-4 absolute bottom-[8%] left-[-6px] z-20 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold text-black shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
            {chips[3]}
          </span>

          {/* phone body */}
          <div className="relative mx-auto w-[200px] rotate-[-5deg] rounded-[34px] bg-[#101828] p-[9px] shadow-[0_22px_50px_rgba(16,24,40,0.28)] md:w-[240px]">
            <div className="relative overflow-hidden rounded-[26px] bg-[#F4F1EC] px-3.5 pb-4 pt-6">
              {/* notch */}
              <span className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/20" />

              {/* invoice card */}
              <div className="mt-2 rounded-[14px] bg-white p-3 shadow-[0_4px_14px_rgba(16,24,40,0.06)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[color:var(--vow-muted)]">
                    חשבונית 1042#
                  </span>
                  <span className="h-4 w-4 rounded-full bg-[color:var(--vow-accent)]" />
                </div>
                <div className="mt-2 text-right text-[19px] font-bold text-black">
                  ₪ 2,400
                </div>
                <div className="mt-2 h-1.5 w-3/4 rounded-full bg-black/10" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-black/10" />
              </div>

              {/* mini chart */}
              <div className="mt-3 rounded-[14px] bg-white p-3 shadow-[0_4px_14px_rgba(16,24,40,0.06)]">
                <div className="flex h-[52px] items-end justify-between gap-1.5">
                  {[40, 62, 34, 78, 54, 88].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-[3px] bg-[color:var(--vow-accent)]"
                      style={{ height: `${h}%`, opacity: 0.55 + i * 0.07 }}
                    />
                  ))}
                </div>
              </div>

              {/* chat bubble */}
              <div className="mt-3 flex justify-end">
                <div className="flex items-center gap-1 rounded-[14px] rounded-tr-[4px] bg-[color:var(--vow-accent)] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------- variant 2: המסע -- */

type Station = { label: string; icon: ReactNode }

function HeroJourney() {
  const stations: Station[] = [
    { label: "רעיון", icon: <IconIdea /> },
    { label: "אפיון ועיצוב", icon: <IconDesign /> },
    { label: "פיתוח", icon: <IconCode /> },
    { label: "שיווק והשקה", icon: <IconRocket /> },
  ]

  return (
    <div className="flex flex-col items-start text-right">
      <h1 className="w-full max-w-[1000px] text-right font-semibold text-black">
        <span className="block text-[32px] leading-[1.2] tracking-[-0.4px] sm:text-[40px] md:text-[52px] md:leading-[1.12] lg:text-[64px] lg:leading-[1.08]">
          {HERO.title}
        </span>
      </h1>
      <p className="mt-5 w-full max-w-[680px] text-right text-[19px] leading-[30px] text-[color:var(--vow-muted)] md:text-[21px] md:leading-[34px]">
        {HERO.subtitle}
      </p>
      <Cta />

      {/* PROCESS — vertical on mobile (right rail), horizontal on desktop */}
      <div className="mt-12 w-full md:mt-16">
        {/* mobile */}
        <ol className="relative md:hidden">
          <span className="nh-line-y absolute right-[19px] top-5 bottom-5 w-[2px] bg-[color:var(--vow-accent)]" />
          {stations.map((s, i) => (
            <li
              key={s.label}
              className={`nh-station nh-station-${i + 1} relative flex items-center gap-3 py-3`}
            >
              <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--vow-accent)] bg-white text-[color:var(--vow-accent)]">
                {s.icon}
              </span>
              <span className="text-[18px] font-semibold text-black">{s.label}</span>
            </li>
          ))}
        </ol>

        {/* desktop */}
        <ol className="relative hidden grid-cols-4 md:grid">
          <span className="nh-line-x absolute right-[12.5%] left-[12.5%] top-7 h-[2px] bg-[color:var(--vow-accent)]" />
          {stations.map((s, i) => (
            <li
              key={s.label}
              className={`nh-station nh-station-${i + 1} relative flex flex-col items-center gap-3 text-center`}
            >
              <span className="z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--vow-accent)] bg-white text-[color:var(--vow-accent)]">
                {s.icon}
              </span>
              <span className="text-[18px] font-semibold text-black">{s.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* -------------------------------------------------------- variant 3: כהה -- */

function HeroDark() {
  const cards = ["אפליקציות", "מערכות SaaS ב-AI", "מהרעיון ועד השיווק"]

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#0A1020] px-6 py-12 sm:rounded-[36px] sm:px-10 md:px-14 md:py-16">
      {/* brand glow behind the text */}
      <span
        aria-hidden="true"
        className="nh-glow pointer-events-none absolute -top-16 right-[-40px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(83,137,187,0.55)_0%,rgba(83,137,187,0)_70%)] blur-[10px]"
      />

      <div className="relative flex flex-col items-start text-right">
        <h1 className="w-full max-w-[820px] text-right font-semibold text-white">
          <span className="block text-[32px] leading-[1.2] tracking-[-0.3px] sm:text-[40px] md:text-[52px] md:leading-[1.14] lg:text-[58px]">
            {HERO.title}
          </span>
        </h1>
        <p className="mt-5 w-full max-w-[620px] text-right text-[19px] leading-[30px] text-white/70 md:text-[21px] md:leading-[34px]">
          {HERO.subtitle}
        </p>
        <Cta dark />

        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map((label) => (
            <div
              key={label}
              className="rounded-[16px] border border-white/12 bg-white/5 px-4 py-4 text-right backdrop-blur-sm"
            >
              <span className="mb-2 block h-2 w-2 rounded-full bg-[color:var(--vow-accent)]" />
              <span className="text-[16px] font-semibold text-white">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- switcher --- */

function HeroSwitcher({
  value,
  onChange,
}: {
  value: HeroVariant
  onChange: (v: HeroVariant) => void
}) {
  const [open, setOpen] = useState(false)
  const labels: Record<HeroVariant, string> = {
    1: "המוצר ביד",
    2: "המסע",
    3: "כהה",
  }

  return (
    <div
      dir="rtl"
      className="fixed bottom-4 left-4 z-[60] print:hidden"
      data-preview-tool="hero-switcher"
    >
      {open ? (
        <div className="w-[248px] rounded-[14px] border border-black/10 bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-black">גרסת הירו</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת בורר הגרסאות"
              className="rounded-md px-2 text-[18px] leading-none text-[color:var(--vow-muted)] hover:bg-black/5"
            >
              ×
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            {([1, 2, 3] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange(v)}
                aria-pressed={value === v}
                className={[
                  "flex-1 rounded-[8px] border px-2 py-2 text-[15px] font-semibold transition-colors",
                  value === v
                    ? "border-[color:var(--vow-accent)] bg-[color:var(--vow-accent)] text-white"
                    : "border-black/15 bg-white text-black hover:bg-black/5",
                ].join(" ")}
              >
                {v}
              </button>
            ))}
          </div>
          <p className="mt-2 text-right text-[13px] text-[color:var(--vow-muted)]">
            {value} · {labels[value]}
          </p>
          <p className="mt-2 text-right text-[13px] leading-[18px] text-[color:var(--vow-muted)]">
            כלי סקירה בלבד. לא חלק מהעיצוב.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-[15px] font-semibold text-black shadow-[0_4px_16px_rgba(0,0,0,0.14)]"
        >
          גרסת הירו
        </button>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------- icons --- */

function IconIdea() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.1V16h6v-.4c0-.8.4-1.5 1-2.1A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconDesign() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 3l5 5M14.5 4.5l5 5L8 21l-5 1 1-5L14.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 7l-5 5 5 5M16 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconRocket() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a12 12 0 0 1 8-8c2 0 3 1 3 3a12 12 0 0 1-8 8l-3 1-1-1 1-3ZM15 9h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------- animations - */

function HeroStyles() {
  const css = `
@keyframes nh-draw-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes nh-draw-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes nh-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes nh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@keyframes nh-glow-pulse { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: .8; transform: scale(1.06); } }

.nh-line-x { transform-origin: right center; }
.nh-line-y { transform-origin: center top; }

@media (prefers-reduced-motion: no-preference) {
  .nh-line-x { animation: nh-draw-x 1.1s cubic-bezier(.22,.61,.36,1) .25s both; }
  .nh-line-y { animation: nh-draw-y 1.1s cubic-bezier(.22,.61,.36,1) .25s both; }
  .nh-station { animation: nh-fade-up .55s ease-out both; }
  .nh-station-1 { animation-delay: .35s; }
  .nh-station-2 { animation-delay: .6s; }
  .nh-station-3 { animation-delay: .85s; }
  .nh-station-4 { animation-delay: 1.1s; }
  .nh-chip { animation: nh-float 4.5s ease-in-out infinite; }
  .nh-chip-2 { animation-duration: 5.2s; animation-delay: .5s; }
  .nh-chip-3 { animation-duration: 4.8s; animation-delay: .9s; }
  .nh-chip-4 { animation-duration: 5.6s; animation-delay: .3s; }
  .nh-glow { animation: nh-glow-pulse 7s ease-in-out infinite; }
}
`
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
