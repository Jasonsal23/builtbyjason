'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isLeft = project.align === 'left'

  return (
    <div
      className={`flex flex-col ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-10 lg:gap-16 items-center`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full lg:w-1/2 shrink-0"
      >
        <div className="relative bg-surface border border-border rounded-sm overflow-hidden aspect-[16/10] group hover:border-gold/30 transition-colors duration-300">
          {project.image ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full cursor-pointer"
              aria-label={`Visit ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm border border-gold/40 text-gold font-body text-sm px-4 py-2 rounded-sm">
                  Visit Site →
                </span>
              </div>
            </a>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-surface-light to-surface" />
              <div className="relative z-10 h-full flex items-center justify-center text-center p-8">
                <div>
                  <p className="font-body text-sm text-muted tracking-widest uppercase">
                    {project.imagePlaceholder}
                  </p>
                  <p className="font-body text-xs text-border mt-2">Drop screenshot here</p>
                </div>
              </div>
            </>
          )}
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/20 group-hover:border-gold/50 transition-colors duration-300 pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/20 group-hover:border-gold/50 transition-colors duration-300 pointer-events-none z-10" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full lg:w-1/2 flex flex-col gap-5"
      >
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-gold tracking-widest uppercase">
            Project {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-cream leading-tight">
          {project.title}
        </h3>
        <p className="font-body text-muted text-base leading-relaxed">{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-body text-cream/70">
                <span className="mt-1 shrink-0 w-4 h-4 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs tracking-wide px-3 py-1.5 border border-gold/30 text-gold rounded-sm bg-gold/5"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-body text-gold hover:text-gold-light transition-colors duration-200 mt-1 group/link"
          >
            View Live Site
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </motion.div>
    </div>
  )
}
