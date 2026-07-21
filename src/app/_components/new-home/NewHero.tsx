import Image from "next/image"

import { HERO, NEW_HOME_LOGOS } from "./newHome.constants"

/**
 * Typographic hero: the sentence carries the page on its own, on the cream
 * background, with no image. The final visual is settled in the design-direction
 * round, so nothing is put in the image's place here.
 *
 * The headline is capped at max-w so the long sentence breaks over a few lines
 * instead of running edge to edge on wide screens. The logo strip below comes
 * from NEW_HOME_LOGOS, this page's own list.
 */
export function NewHero() {
  const copy = HERO

  return (
    <section className="w-full bg-[#F4F1EC]" dir="rtl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 py-[var(--space-section)]">
        {/* One column, one shared right edge. `items-start` is correct here: in a
            column flex container under dir="rtl" the cross-axis start is the
            right side, so every child hugs the same line. `items-end` would push
            them left and break the alignment. */}
        <div className="flex flex-col items-start text-right">
          <h1 className="w-full max-w-[900px] text-right font-semibold text-black">
            <span className="block text-[30px] leading-[1.25] tracking-[-0.3px] sm:text-[34px] md:text-[42px] md:leading-[1.2] lg:text-[52px] lg:leading-[1.15]">
              {copy.title}
            </span>
          </h1>

          <p className="mt-4 w-full max-w-[640px] text-right text-[19px] font-normal leading-[30px] text-[color:var(--vow-muted)] md:mt-5 md:text-[20px] md:leading-[32px]">
            {copy.subtitle}
          </p>

          <a
            href="#contact"
            className="btn-primary mt-6 w-full self-stretch sm:w-[200px] sm:self-start md:mt-7"
          >
            {copy.cta}
          </a>
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
