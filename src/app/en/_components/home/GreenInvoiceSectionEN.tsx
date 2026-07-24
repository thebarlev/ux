import Image from "next/image"
import { EnLink } from "@/app/en/_components/EnLink"
import { CheckIcon } from "@/app/_components/home/CheckIcon"
import { GREEN_INVOICE_BENEFITS_EN } from "./homeEn.constants"
import { H2 } from "@/components/ui/Heading"

export function GreenInvoiceSectionEN() {
  return (
    <section
      aria-label="Secure digital invoicing"
      className="py-[var(--space-section)] bg-[#F4F1EC]"
      dir="ltr"
    >
      <div className="grid bg-white lg:grid-cols-2 lg:items-center lg:gap-16">
        
        {/* TEXT SIDE */}
        <div className="order-2 mx-auto flex items-center justify-center lg:order-1">
          <div className="mx-auto w-full px-4 py-10 text-left sm:px-6 lg:px-8 lg:py-0">
            
            <p className="free-year-heading text-left text-[20px]">
              Results from day one
            </p>

            <H2 className="mt-0 text-left">
              We make sure Google and AI find your business - and rank it ahead of the competition.
            </H2>

            <EnLink
              href="/seo-ai"
              className="vow-btn-primary mt-8 mb-4 inline-block w-full max-w-[323px] rounded-xl px-10 py-4 text-center"
            >
              Learn more
            </EnLink>

            {/* BENEFITS LIST */}
            <ul
  dir="ltr"
  className="mt-6 list-none ps-0 flex flex-col gap-4 text-left text-base leading-8 text-black lg:text-lg"
>
  {GREEN_INVOICE_BENEFITS_EN.map((benefit) => (
    <li
      key={benefit}
      dir="ltr"
      className="flex w-full flex-row items-start justify-start gap-3 text-left  items-start"
    >
      <span dir="ltr" className="block flex-1 text-left">
        {benefit}
      </span>
      <span className="mt-1 inline-flex shrink-0 self-center">
        <CheckIcon className="h-5 w-5" />
      </span>

      
    </li>
  ))}
</ul>

          </div>
        </div>

        {/* IMAGE SIDE */}
        <div className="relative order-1 w-full min-h-[320px] overflow-hidden lg:order-2 lg:min-h-[640px]">
          
          <Image
            src="/manmobile.webp"
            alt="Uxellent secure digital invoicing app - mobile view for business document management"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover lg:hidden"
          />

          <Image
            src="/manvow.webp"
            alt="Uxellent secure digital invoicing app - desktop view for business document management"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="hidden object-cover lg:block"
          />

        </div>

      </div>
    </section>
  )
}