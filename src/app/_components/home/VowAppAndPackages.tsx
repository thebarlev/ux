import Image from "next/image"

import { CheckIcon } from "./CheckIcon"
import { PACKAGE_CARDS } from "./home.constants"
import { H3 } from "@/components/ui/Heading"

function PackageCard(props: {
  kicker: string
  headline: string
  buttonLabel: string
  bullets: readonly string[]
}) {
  return (
    <article className="rounded-[118px] border border-[color:var(--vow-border)] bg-red-500 p-6">
      <p className="text-right text-[1px] font-semibold leading-[32px] text-[color:var(--vow-accent)]">
        {props.kicker}
      </p>

      <H3 className="mt-2 max-w-full w-[var(--h3-width)] text-black">
        {props.headline}
      </H3>

      <button
        type="button"
        className="vow-btn-primary mt-4 w-full max-w-[323px]"
      >
        {props.buttonLabel}
      </button>

      <div className="mt-5 h-px w-full max-w-[331px] bg-[color:var(--vow-border)]" />

      <ul className="mt-4 space-y-2 text-right text-[18px] font-normal leading-[40px] text-black sm:text-[20px] sm:leading-[56px]">
        {props.bullets.map((b) => (
          <li key={b} className="flex items-start justify-end gap-3">
            <span>{b}</span>
            <CheckIcon />
          </li>
        ))}
      </ul>
    </article>
  )
}

export function VowAppAndPackages() {
  return (
    <section aria-label="חתימה דיגיטלית וחבילות" className="py-[var(--space-section)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[22px] border border-[color:var(--vow-border)] bg-red-500">
          {/* Background layer that continues hero feel */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[color:var(--vow-bg)]"
          />

          <div className="relative grid gap-10 p-6 lg:grid-cols-[420px_1fr] lg:items-center lg:p-10">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto w-full max-w-[420px]">
                <Image
                  src="/vowapp.webp"
                  alt="Uxellent digital invoicing app interface for business document management"
                  width={840}
                  height={1100}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="grid gap-6 md:grid-cols-2">
                {PACKAGE_CARDS.map((p) => (
                  <PackageCard
                    key={p.headline}
                    kicker={p.kicker}
                    headline={p.headline}
                    buttonLabel={p.buttonLabel}
                    bullets={p.bullets}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

