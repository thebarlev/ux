import Image from "next/image"
import { TESTIMONIALS, TESTIMONIALS_EN } from "./home.constants"

export function Testimonials({ locale = "he" }: { locale?: "he" | "en" }) {
  const items = locale === "en" ? TESTIMONIALS_EN : TESTIMONIALS
  return (
    <section aria-label={locale === "en" ? "Testimonials" : "המלצות"} className="py-3 bg-[#F4F1EC]">
      <div className="mx-auto max-w-[1440px] px-1 sm:px-6 lg:px-4 ">
        <div className="grid gap-6 md:gap-[5.5rem] md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => {
            const src = encodeURI(t.imageSrc)
            return (
              <article
                key={t.imageSrc}
                className="rounded-[18px]  px-4 md:px-6 py-8 md:py-6  bg-white mx-auto w-[95%] md:w-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative size-[86px] overflow-hidden rounded-full bg-[color:var(--vow-bg)]">
                    <Image
                      src={src}
                      alt={t.imageAlt}
                      fill
                      sizes="86px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 md:mt-4 w-[95%] max-w-full text-center text-[20px] font-bold leading-[32px] text-[color:var(--vow-muted)] py-1 md:py-2">
                    {t.title}
                  </p>
                  <p className="mt-1 md:mt-2 w-[99%] max-w-full text-center text-[20px] font-regular leading-[30px] text-black">
                    {t.text}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}