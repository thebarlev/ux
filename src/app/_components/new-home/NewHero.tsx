import Image from "next/image"

import { HERO, NEW_HOME_LOGOS } from "./newHome.constants"

/**
 * Light hero for the alternative home page.
 * Reuses the existing hero asset (/D-hero.webp) and keeps the cream background
 * and the image-left / text-right composition of the live hero. The logo strip
 * comes from NEW_HOME_LOGOS, this page's own list.
 */
export function NewHero() {
  const copy = HERO

  return (
    <section className="w-full bg-[#F4F1EC]" dir="rtl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 pt-0 pb-[var(--space-section)] md:py-[var(--space-section)]">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_1fr] md:items-center">
          {/* IMAGE */}
          <div className="order-1 md:order-2 flex justify-end md:items-center">
            <div className="relative w-screen h-[300px] -mx-4 sm:-mx-6 md:mx-0 md:w-full md:h-[min(500px,52vh)]">
              <Image
                src="/D-hero.webp"
                alt="ליווי מלא מרעיון ועד מוצר חי, עיצוב אפיון פיתוח ושיווק במקום אחד"
                fill
                priority
                fetchPriority="high"
                quality={60}
                className="object-contain object-center md:object-right"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* TEXT
              One column, one shared right edge. `items-start` is correct here:
              in a column flex container under dir="rtl" the cross-axis start is
              the right side, so every child hugs the same line. Using
              `items-end` would push them left and break the alignment. */}
          <div className="order-2 md:order-1 flex flex-col items-start text-right md:py-2">
            <h1 className="w-full max-w-[520px] text-right font-semibold text-black">
              <span className="block text-[34px] leading-[1.12] tracking-[-0.4px] sm:text-[38px] md:text-[42px] lg:text-[48px] xl:text-[52px] xl:leading-[1.08]">
                {copy.title}
              </span>
            </h1>

            <p className="mt-4 w-full max-w-[520px] text-right text-[19px] font-normal leading-[30px] text-[color:var(--vow-muted)] md:mt-5 md:text-[20px] md:leading-[32px]">
              {copy.subtitle}
            </p>

            <a
              href="#contact"
              className="btn-primary mt-6 w-full self-stretch sm:w-[200px] sm:self-start md:mt-7"
            >
              {copy.cta}
            </a>
          </div>
        </div>

        {/* CLIENT LOGOS */}
        <div className="mt-10 md:mt-14">
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
      </div>
    </section>
  )
}
