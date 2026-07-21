"use client"

import { useState } from "react"

import { NewHero } from "./NewHero"
import { AboutUsSection } from "./AboutUsSection"
import { StorySection } from "./StorySection"
import { HERO_A, HERO_B, STORY_A, STORY_B } from "./newHome.constants"

type Variant = "a" | "b"

/**
 * Wraps the hero and the story section so both copy variants can be compared
 * live. The floating switcher is a review-only control and is not part of the
 * design; it should be removed before this page goes anywhere near production.
 */
export function VariantContent() {
  const [hero, setHero] = useState<Variant>("a")
  const [story, setStory] = useState<Variant>("a")

  return (
    <>
      <VariantSwitcher
        hero={hero}
        story={story}
        onHeroChange={setHero}
        onStoryChange={setStory}
      />

      <NewHero copy={hero === "a" ? HERO_A : HERO_B} />
      <AboutUsSection />
      <StorySection text={story === "a" ? STORY_A : STORY_B} />
    </>
  )
}

function VariantSwitcher({
  hero,
  story,
  onHeroChange,
  onStoryChange,
}: {
  hero: Variant
  story: Variant
  onHeroChange: (v: Variant) => void
  onStoryChange: (v: Variant) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      dir="rtl"
      className="fixed bottom-4 left-4 z-[60] print:hidden"
      data-preview-tool="variant-switcher"
    >
      {open ? (
        <div className="w-[260px] rounded-[14px] border border-black/10 bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-black">בחירת גרסת תוכן</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת בורר הגרסאות"
              className="rounded-md px-2 text-[18px] leading-none text-[color:var(--vow-muted)] hover:bg-black/5"
            >
              ×
            </button>
          </div>

          <VariantRow
            label="הירו"
            value={hero}
            onChange={onHeroChange}
            aName="מאושר"
            bName="חלופי"
          />
          <VariantRow
            label="סיפור השירות"
            value={story}
            onChange={onStoryChange}
            aName="מאושר"
            bName="חלופי"
          />

          <p className="mt-3 text-[13px] leading-[18px] text-[color:var(--vow-muted)]">
            כלי סקירה בלבד. לא חלק מהעיצוב.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-[15px] font-semibold text-black shadow-[0_4px_16px_rgba(0,0,0,0.14)]"
        >
          גרסאות תוכן
        </button>
      )}
    </div>
  )
}

function VariantRow({
  label,
  value,
  onChange,
  aName,
  bName,
}: {
  label: string
  value: Variant
  onChange: (v: Variant) => void
  aName: string
  bName: string
}) {
  return (
    <div className="mt-3">
      <p className="text-right text-[14px] text-[color:var(--vow-muted)]">{label}</p>
      <div className="mt-1 flex gap-2">
        {(["a", "b"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={[
              "flex-1 rounded-[8px] border px-2 py-2 text-[14px] font-semibold transition-colors",
              value === v
                ? "border-[color:var(--vow-accent)] bg-[color:var(--vow-accent)] text-white"
                : "border-black/15 bg-white text-black hover:bg-black/5",
            ].join(" ")}
          >
            {v === "a" ? aName : bName}
          </button>
        ))}
      </div>
    </div>
  )
}
