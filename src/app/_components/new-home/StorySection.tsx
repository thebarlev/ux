import { H2 } from "@/components/ui/Heading"

import { STORY_PARAGRAPHS } from "./newHome.constants"

/**
 * The founder's story, in first person: the path that led to Uxellent and the
 * gap it exists to close.
 */
export function StorySection() {
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
            הסיפור מאחורי Uxellent
          </H2>
          {STORY_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-[980px] text-right text-[21px] leading-[34px] text-black md:mt-6 md:text-[24px] md:leading-[40px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
