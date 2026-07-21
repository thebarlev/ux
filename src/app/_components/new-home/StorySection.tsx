import { H2 } from "@/components/ui/Heading"

/**
 * The heart of the page: why one team beats a chain of separate vendors.
 * Copy is passed in so the variant switcher can swap it without touching layout.
 */
export function StorySection({ text }: { text: string }) {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="border-r-[3px] border-[color:var(--vow-accent)] pr-5 md:pr-8">
          <H2 id="story-heading" className="w-full text-right">
            למה צוות אחד עושה את ההבדל
          </H2>
          <p className="mt-4 max-w-[980px] text-right text-[21px] leading-[34px] text-black md:mt-6 md:text-[24px] md:leading-[40px]">
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
