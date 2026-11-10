import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, Github, ArrowUpRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack Platforms' },
    { id: 'realtime', label: 'Real-Time & WebSockets' },
    { id: 'marketplace', label: 'Marketplaces' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production-Grade Applications
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Engineered with modern architectural standards, distributed background queues, and low-latency real-time synchronization.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const count = tab.id === 'all'
              ? projects.length
              : projects.filter((p) => p.category === tab.id).length;

            if (count === 0 && tab.id !== 'all') return null;

            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'glass-panel text-slate-400 hover:text-slate-200 border-white/5 hover:border-white/20'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Project Image Banner / Visual with overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-white/5">
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />

                  {/* Category Pill on top left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                      {project.category_display || project.category}
                    </span>
                  </div>

                  {/* Architecture quick badge on top right */}
                  {project.architecture_notes && (
                    <div className="absolute top-4 right-4">
                      <span className="p-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 flex items-center justify-center" title="Has Architecture Breakdown">
                        <Cpu className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center justify-between">
                    <span>{project.title}</span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-slate-400 group-hover:text-cyan-400 p-1"
                      title="View Architecture & Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </h3>
                  
                  <p className="text-xs font-medium text-cyan-400/90 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tech_stack?.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack?.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-slate-400">
                        +{project.tech_stack.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Links */}
              <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
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
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

