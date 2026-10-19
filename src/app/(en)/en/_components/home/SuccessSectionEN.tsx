import { H2, H3 } from "@/components/ui/Heading"

export function SuccessSectionEN() {
  return (
    <section aria-label="Success" className="py-[var(--space-section)] bg-[#F4F1EC]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="space-y-3">
          <H2 className="text-left sm:text-center">
            Success Isn&apos;t Built by Chance
          </H2>
          <H3 className="text-left sm:text-center">
            It&apos;s built from right decisions, solid foundation, and smart management over time.
          </H3>
        </div>
      </div>
    </section>
  )
}
