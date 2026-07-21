import { H2 } from "@/components/ui/Heading"
import { ABOUT_TEXT } from "./newHome.constants"

export function AboutUsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="rounded-[18px] bg-white px-6 py-10 md:px-14 md:py-14">
          <H2 id="about-heading" className="w-full text-right">
            מי אנחנו
          </H2>
          <p className="mt-4 max-w-[900px] text-right text-[20px] leading-[32px] text-black md:mt-6 md:text-[22px] md:leading-[36px]">
            {ABOUT_TEXT}
          </p>
        </div>
      </div>
    </section>
  )
}
