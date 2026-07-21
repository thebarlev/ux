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
          המוצרים שבנינו
        </H2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-8 md:gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-[18px] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-right text-[24px] font-semibold leading-[30px] text-black">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
