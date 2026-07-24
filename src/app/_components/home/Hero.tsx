import Image from "next/image"
import { H2 } from "@/components/ui/Heading"

const HERO_TITLE = "פיתוח אתרים, מערכות AI ושיווק שמייצר תוצאות!"
const HERO_SUBHEADING =
  "פיתוח ועיצוב אתרים מבוססי AI, מערכות, אוטומציות ו-seo optimisation שמייצר ROI אמיתי"

export function Hero() {
  return (
    <section className="w-full bg-[#F4F1EC]" dir="rtl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 pt-0 pb-[var(--space-section)] md:py-[var(--space-section)]">

        <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_1fr] md:items-center">

          {/* IMAGE - height cap on md+ matches ServiceHero (centered vs text without oversized column) */}
          <div className="order-1 md:order-2 flex justify-end md:items-center">

            <div className="relative w-screen h-[320px] -mx-4 sm:-mx-6 md:mx-0 md:w-full md:h-[min(500px,52vh)]">

              {/* Mobile */}
              <Image
                src="/D-hero.webp"
                alt="בניית אתרים ושיווק דיגיטלי מבוסס AI לעסקים"
                fill
                priority
                fetchPriority="high"
                quality={60}
                className="object-contain object-center md:hidden"
                sizes="(max-width: 767px) 100vw, 50vw"
              />

              {/* Desktop */}
              <Image
                src="/D-hero.webp"
                alt="פיתוח אתרים ומערכות AI לצמיחת עסקים בדיגיטל"
                fill
                priority
                fetchPriority="high"
                quality={60}
                className="object-contain object-right hidden md:block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

            </div>
          </div>

          {/* TEXT */}
          <div className="order-2 md:order-1 flex flex-col items-end text-right md:py-2">

            <h1 className="text-black w-full font-semibold leading-[1.05] text-right">

              <span className="block w-full tracking-[-1px] text-[64px] leading-[0.9] md:text-[70px] md:leading-[0.98] lg:text-[100px] xl:text-[106px] xl:leading-[104px] xl:tracking-[-1.56px]">
                {HERO_TITLE}
              </span>

            </h1>

            <H2 className="mt-4 w-full text-right font-normal md:mt-8">
              {HERO_SUBHEADING}
            </H2>

          </div>

        </div>

      </div>
    </section>
  )
}