import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2, Database, Zap, Layers, Server } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { GrolanceUIPreview, ChitChatUIPreview, ReStoreUIPreview } from './ProjectMockups';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayProjects: Project[] = projects && projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 1,
      title: "GROLANCE",
      slug: "grolance-freelancing-platform",
      subtitle: "Full-Stack Freelancing Ecosystem with Role-Based Workflows",
      category: "fullstack",
      category_display: "Full-Stack Platform",
      description: "A comprehensive full-stack freelancing platform connecting clients and freelance professionals through role-based workflows, contract milestones, and escrow payments.",
      architecture_notes: "Built with Django REST Framework and React 18. Implemented stateless JWT auth with RBAC. Utilized PostgreSQL for persistent transaction records with ACID guarantees, combined with Redis and Celery for background processing of notifications and invoice generation.",
      tech_stack: ["Django", "DRF", "React.js", "PostgreSQL", "Redis", "Celery", "JWT", "TailwindCSS"],
      key_features: [
        "Dual role-based workflows (Client/Freelancer) with strict permission boundaries",
        "ACID transactional escrow locking using PostgreSQL select_for_update()",
        "Asynchronous PDF invoice generation and transactional email dispatch via Celery",
        "Stateless JWT authentication with secure httpOnly refresh token rotation",
      ],
      live_url: "https://grolance.demo.app",
      github_url: "https://github.com/navaneethsankar/Grolance-Freelance-Platform",
      image_url: "",
      featured: true,
      order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "ChitChat",
      slug: "chitchat-realtime-messaging",
      subtitle: "Real-Time WebSocket Messaging Infrastructure",
      category: "realtime",
      category_display: "Real-Time & WebSockets",
      description: "A low-latency real-time communication platform engineered with Django Channels and WebSockets for instant message delivery and presence tracking.",
      architecture_notes: "Utilizes Django Channels ASGI server architecture backed by Redis channel layers for distributed message routing. Features custom WebSocket consumer authentication via JWT query token validation.",
      tech_stack: ["React.js", "Django", "Django Channels", "WebSockets", "Redis", "PostgreSQL"],
      key_features: [
        "Bidirectional full-duplex WebSocket communication with sub-5ms delivery",
        "Distributed message routing backed by in-memory Redis channel layers",
        "Custom JWT-authenticated WebSocket consumer handshake validation",
        "Heartbeat detection and real-time user presence tracking (Online/Offline)",
      ],
      live_url: "https://chitchat.demo.app",
      github_url: "https://github.com/navaneethsankar/ChitChat-RealTime-Messaging",
      image_url: "",
      featured: true,
      order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "ReStore",
      slug: "restore-c2c-marketplace",
      subtitle: "C2C Marketplace Platform for Pre-Owned Goods",
      category: "marketplace",
      category_display: "Marketplaces",
      description: "A customer-to-customer marketplace engineered for discovering, buying, and selling pre-owned goods with cloud media optimization and centralized state management.",
      architecture_notes: "Built on React and Vite for blazing fast bundle delivery. Redux Toolkit provides predictable global state management. Cloudinary handles media transformations.",
      tech_stack: ["React.js", "Vite", "Redux Toolkit", "Firebase", "Cloudinary", "TailwindCSS"],
      key_features: [
        "Automated Cloudinary media optimization with 96% reduction in transfer payload",
        "Predictable centralized state management using Redux Toolkit slices",
        "Dynamic multi-step product listing with instant drag-and-drop uploads",
        "Client-side faceted search and filtering across categories and conditions",
      ],
      live_url: "https://restore-marketplace.demo.app",
      github_url: "https://github.com/navaneethsankar/ReStore-Marketplace",
      image_url: "",
      featured: true,
      order: 3,
      created_at: new Date().toISOString(),
    }
  ];

  const renderProjectMockup = (title: string) => {
    if (title.toLowerCase().includes('grolance')) return <GrolanceUIPreview />;
    if (title.toLowerCase().includes('chitchat')) return <ChitChatUIPreview />;
    return <ReStoreUIPreview />;
  };

  return (
    <section id="work" className="py-28 sm:py-40 border-b border-white/[0.08] relative bg-studio-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-20 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-cyan inline-block animate-pulse" />
              <span>(01) / SELECTED ARCHITECTURAL WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-display">
              Flagship Projects.
            </h2>
          </div>

          <p className="text-sm sm:text-base font-sans text-neutral-400 max-w-md leading-relaxed">
            Full-scale web applications engineered with robust database schemas, distributed background task queues, and low-latency real-time synchronization.
          </p>
        </div>

        {/* Project Exhibits List */}
        <div className="space-y-32 sm:space-y-44">
          {displayProjects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const isReversed = idx % 2 === 1;

            return (
              <article key={project.id || idx} className="group">
                
                {/* Meta Header Line */}
                <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono-tag text-neutral-400 tracking-widest uppercase">
                  <div className="flex items-center gap-3">
                    <span className="text-electric-cyan font-bold">({indexStr})</span>
                    <span className="text-neutral-700">/</span>
                    <span className="text-white font-semibold">{project.title}</span>
                  </div>
                  <div>
                    <span>{project.category_display || project.category}</span>
                  </div>
                </div>

                {/* Main Grid: UI Showcase (7 cols) + Details (5 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  
                  {/* Visual Interface Showcase (7 cols) */}
                  <div className={`lg:col-span-7 cursor-pointer group-hover:scale-[1.01] transition-transform duration-500 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  onClick={() => setSelectedProject(project)}
                  >
                    {renderProjectMockup(project.title)}
                  </div>

                  {/* Narrative Breakdown (5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div>
                      <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-2">
                        {project.category_display || project.category}
                      </div>

                      <h3 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mb-3 tracking-tight group-hover:text-electric-cyan transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs font-mono-tag text-neutral-400 mb-6 uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Key Architectural Solutions */}
                      <div className="space-y-2.5 mb-8">
                        {project.key_features?.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans">
                            <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.tech_stack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono-tag text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-electric-cyan transition-all shadow-md"
                      >
                        <span>Case Study Deep-Dive</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full border border-white/10 hover:border-white text-neutral-300 hover:text-white transition-all bg-white/5"
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
                          className="p-2.5 rounded-full border border-white/10 hover:border-white text-neutral-300 hover:text-white transition-all bg-white/5"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
