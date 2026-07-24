import Image from "next/image"
import { CLIENT_LOGOS } from "./homeEn.constants"

export function LogoRowEN() {
  return (
    <section aria-label="Client logos" className="py-[var(--space-section)] bg-[#F4F1EC]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-3 gap-x-6 gap-y-6 py-2 sm:gap-x-8 sm:gap-y-6 md:grid-cols-6 md:gap-x-[80px] md:gap-y-8">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.src} className="flex min-w-0 items-center justify-center overflow-hidden px-1">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={50}
                className="h-auto w-auto max-w-full max-h-[36px] object-contain object-center brightness-0 sm:max-h-[44px] md:max-h-[50px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
