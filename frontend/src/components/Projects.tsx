import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Take the top 3 flagship projects
  const displayProjects = projects.slice(0, 3);

  return (
    <section id="work" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>(01)</span>
              <span>/</span>
              <span>SELECTED ARCHITECTURAL WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-display">
              Curated Projects.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-400 max-w-md leading-relaxed">
            Full-stack production platforms engineered with robust database schemas, distributed asynchronous workflows, and low-latency real-time protocols.
          </p>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-24 sm:space-y-36">
          {displayProjects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                {/* Meta Top Line */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] text-xs font-mono-tag text-neutral-400 tracking-widest uppercase">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">({indexStr})</span>
                    <span>/</span>
                    <span className="text-neutral-300">{project.title}</span>
                  </div>
                  <div>
                    <span>{project.category_display || project.category}</span>
                  </div>
                </div>

                {/* Case Study Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Visual Image Showcase (Spans 7 cols) */}
                  <div
                    className={`lg:col-span-7 cursor-pointer image-card overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 group-hover:border-white/30 transition-all duration-700 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                    onClick={() => setSelectedProject(project)}
                    data-cursor="VIEW CASE"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={
                          project.image_url ||
                          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80'
                        }
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 image-reveal duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                      {/* Corner Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono-tag text-white uppercase border border-white/15">
                          EXPLORE CASE STUDY &bull;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative & Architectural Breakdown (Spans 5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display text-white mb-3 tracking-tight group-hover:text-neutral-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono-tag text-neutral-400 mb-6 uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Architecture Callout */}
                      {project.architecture_notes && (
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-6">
                          <div className="flex items-center gap-2 text-xs font-mono-tag text-white mb-2 uppercase tracking-wide">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>System Architecture</span>
                          </div>
                          <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-3">
                            {project.architecture_notes}
                          </p>
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech_stack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono-tag text-neutral-300 uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all"
                        data-cursor="INSPECT"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 p-2.5 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 transition-all text-xs font-mono-tag"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 p-2.5 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 transition-all text-xs font-mono-tag"
                          title="Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Modal Detail */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
