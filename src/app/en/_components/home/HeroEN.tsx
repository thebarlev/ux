import Image from "next/image"
import { H2 } from "@/components/ui/Heading"

const HERO_TITLE_EN = "Websites, SEO and AI tools to grow your business"
const HERO_SUBHEADING_EN = "Not showing up in AI search? We fix that."

export function HeroEN() {
  return (
    <section className="w-full bg-[#F4F1EC]" dir="ltr">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4 pt-0 pb-[var(--space-section)] md:py-[var(--space-section)]">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[0.9fr_1.1fr] md:items-center">
          {/* TEXT */}
          <div className="order-2 md:order-1 flex flex-col items-start text-left md:py-2">
            <h1 className="text-black w-full font-semibold leading-[1.05] text-left">
              <span
                className="block w-full tracking-[-1px] text-[64px] leading-[0.9] md:text-[70px] md:leading-[0.98] lg:text-[100px] xl:text-[86px] xl:leading-[90px] xl:tracking-[-1.56px]"
                style={{ whiteSpace: "pre-line" }}
              >
                {HERO_TITLE_EN}
              </span>
            </h1>
            <H2 className="mt-4 w-full text-left font-normal md:mt-6">
              {HERO_SUBHEADING_EN}
            </H2>
          </div>
          {/* IMAGE - same md height cap as ServiceHero */}
          <div className="order-1 md:order-2 flex justify-end md:items-center md:justify-end md:px-4">
            <div className="relative w-screen h-[360px] -mx-4 sm:-mx-6 md:mx-0 md:w-full md:max-w-[110%] md:h-[min(500px,52vh)]">
              <Image
                src="/D-hero.webp"
                alt="Uxellent website development and AI SEO tools for business growth"
                fill
                priority
                fetchPriority="high"
                quality={60}
                className="object-contain object-right"
                sizes="(max-width: 767px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
