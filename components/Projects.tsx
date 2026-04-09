import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ui/ProjectCard'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <SectionHeading
            label="Work"
            title="Selected Projects"
            subtitle="Real work for real businesses. Here's what I've built."
          />
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* More coming */}
        <div className="mt-24 text-center">
          <p className="font-body text-sm text-muted tracking-wide">
            More projects in progress — check back soon.
          </p>
        </div>
      </div>
    </section>
  )
}
