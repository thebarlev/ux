import Image from "next/image"
import { CLIENT_LOGOS } from "./home.constants"

export function LogoRow() {
  return (
    <section
      aria-label="לוגואים"
      className="bg-white py-[var(--space-section)]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 py-2 sm:grid-cols-3 md:grid-cols-6 md:gap-x-10 md:gap-y-8">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.src} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={50}
                className="h-auto w-auto max-h-[36px] object-contain brightness-0 sm:max-h-[44px] md:max-h-[50px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
