import Image from "next/image"

import { H2 } from "@/components/ui/Heading"
import { PROJECTS } from "./newHome.constants"

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <H2 id="projects-heading" className="w-full text-right">
          דוגמאות אהובות שלנו
        </H2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-8 md:gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-[18px] bg-white transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9E4DC]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#EDE8E0_0%,#DFD8CD_100%)]"
                  >
                    <span className="text-[15px] font-semibold tracking-wide text-black/25">
                      תמונה בהמשך
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="text-right text-[24px] font-semibold leading-[30px] text-black md:text-[26px]">
                  {project.name}
                </h3>
                <p className="mt-3 flex-1 text-right text-[18px] leading-[28px] text-[color:var(--vow-muted)]">
                  {project.description}
                </p>
                <a
                  href={project.href}
                  className="vow-btn-primary mt-6 w-full"
                  aria-label={`${project.ctaLabel} - ${project.name}`}
                >
                  {project.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
