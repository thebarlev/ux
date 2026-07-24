import Image from "next/image"
import { H2 } from "@/components/ui/Heading"

type Bullet = {
  label: string
  description: string
}

type DailyExecutionBlockProps = {
  title: string
  subtitle: string
  bullets: readonly Bullet[]
  closingLine: string
  imageSrc: string
  imageAlt: string
}

export function DailyExecutionBlock({
  title,
  subtitle,
  bullets,
  closingLine,
  imageSrc,
  imageAlt,
}: DailyExecutionBlockProps) {
  return (
    <section
      className="py-[var(--space-section)] bg-[#F4F1EC]"
      aria-label={title}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-[1120px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active every day
              </div>

              <H2 className="mt-4 text-[28px] leading-[34px] sm:text-[32px] sm:leading-[38px] text-left">
                {title}
              </H2>
              <p className="mt-3 max-w-[460px] text-[20px] leading-relaxed text-gray-500 text-left">
                {subtitle}
              </p>

              <div className="mt-8 space-y-5">
                {bullets.map((bullet) => (
                  <div key={bullet.label} className="flex gap-3.5">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2v8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 text-[20px] ">{bullet.label}</p>
                      <p className="mt-0.5 text-[18px] leading-snug text-gray-500">{bullet.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-medium text-gray-900 text-[20px]">
                {closingLine}
              </p>
            </div>

            <div className="relative hidden min-h-[360px] lg:block">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
