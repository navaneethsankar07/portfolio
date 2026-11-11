import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2, Database, Zap, Layers, Server } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<Record<number, 'telemetry' | 'diagram' | 'specs'>>({
    1: 'telemetry',
    2: 'telemetry',
    3: 'telemetry',
  });

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
        "Role-based workflows with dynamic access permissions for Clients and Freelancers",
        "Stateless JWT authentication and secure refresh token rotation",
        "Milestone contract lifecycle and integrated payment processing",
        "Asynchronous email alerts and PDF invoice generation with Celery workers",
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
        "Bidirectional full-duplex WebSocket communication with zero polling latency",
        "Channel layer broadcasting backed by in-memory Redis instances",
        "JWT-authenticated WebSocket handshake with token validation",
        "User presence tracking (Online/Offline) with heartbeat detection",
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
        "Dynamic multi-step product listing with instant drag-and-drop uploads",
        "Cloudinary automated image compression and responsive delivery (96% payload reduction)",
        "Global filter engine powered by Redux Toolkit slices",
      ],
      live_url: "https://restore-marketplace.demo.app",
      github_url: "https://github.com/navaneethsankar/ReStore-Marketplace",
      image_url: "",
      featured: true,
      order: 3,
      created_at: new Date().toISOString(),
    }
  ];

  const setProjectTab = (id: number, tab: 'telemetry' | 'diagram' | 'specs') => {
    setActiveTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="work" className="py-28 sm:py-36 border-b border-white/[0.08] relative bg-studio-grid">
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
            const currentTab = activeTab[project.id] || 'telemetry';

            return (
              <article key={project.id || idx} className="group">
                
                {/* Meta Top Line */}
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

                {/* Grid Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  
                  {/* Visual Interface Showcase (7 cols) */}
                  <div className={`lg:col-span-7 flex flex-col ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* View Switcher Pills */}
                    <div className="flex items-center gap-2 mb-3 self-start">
                      <button
                        onClick={() => setProjectTab(project.id, 'telemetry')}
                        className={`px-3 py-1 rounded-full text-xs font-mono-tag uppercase transition-all ${
                          currentTab === 'telemetry'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Telemetry &amp; State
                      </button>
                      <button
                        onClick={() => setProjectTab(project.id, 'diagram')}
                        className={`px-3 py-1 rounded-full text-xs font-mono-tag uppercase transition-all ${
                          currentTab === 'diagram'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        System Flow
                      </button>
                      <button
                        onClick={() => setProjectTab(project.id, 'specs')}
                        className={`px-3 py-1 rounded-full text-xs font-mono-tag uppercase transition-all ${
                          currentTab === 'specs'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Architecture Specs
                      </button>
                    </div>

                    {/* Frame Container */}
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden rounded-2xl bg-[#07080C] border border-white/10 group-hover:border-electric-cyan/40 transition-all duration-500 shadow-2xl p-6 sm:p-8"
                    >
                      {currentTab === 'telemetry' && (
                        <div className="space-y-4 font-mono text-xs select-none">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px]">
                            <span className="text-white font-bold">{project.title} // LIVE MONITOR</span>
                            <span className="text-electric-cyan">HEALTH: 100% OPERATIONAL</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                              <div className="text-[10px] text-neutral-500 uppercase">DATABASE TRANSACTION</div>
                              <div className="text-lg font-bold font-sans text-white mt-1">ACID Committed</div>
                              <div className="text-[10px] text-electric-cyan">PostgreSQL Relational</div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                              <div className="text-[10px] text-neutral-500 uppercase">ROUND-TRIP LATENCY</div>
                              <div className="text-lg font-bold font-sans text-white mt-1">&lt;35ms Response</div>
                              <div className="text-[10px] text-emerald-400">P95 Benchmark</div>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-neutral-300">
                            <span className="text-neutral-500 uppercase text-[10px] block mb-1">// SYSTEM EXECUTION CONTEXT</span>
                            {project.title === 'GROLANCE' && (
                              <span>Stateless JWT with RBAC &bull; Celery worker pool active &bull; Escrow milestone contract verified</span>
                            )}
                            {project.title === 'ChitChat' && (
                              <span>Django Channels ASGI &bull; Redis channel layers &bull; Full-duplex persistent WebSocket stream</span>
                            )}
                            {project.title === 'ReStore' && (
                              <span>Redux Toolkit global state &bull; Cloudinary WebP automated media optimization &bull; Vite build</span>
                            )}
                          </div>
                        </div>
                      )}

                      {currentTab === 'diagram' && (
                        <div className="space-y-4 font-mono text-xs select-none">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px]">
                            <span className="text-white font-bold">// ARCHITECTURAL PIPELINE</span>
                            <span className="text-emerald-400">UNIDIRECTIONAL FLOW</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center my-3">
                            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                              <div className="text-[9px] text-neutral-500">CLIENT</div>
                              <div className="text-white font-bold text-xs mt-0.5">React 18</div>
                              <div className="text-[9px] text-cyan-400">TypeScript</div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                              <div className="text-[9px] text-neutral-500">API GATEWAY</div>
                              <div className="text-white font-bold text-xs mt-0.5">Django DRF</div>
                              <div className="text-[9px] text-emerald-400">Stateless JWT</div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                              <div className="text-[9px] text-neutral-500">ASYNC QUEUE</div>
                              <div className="text-white font-bold text-xs mt-0.5">Celery + Redis</div>
                              <div className="text-[9px] text-purple-400">Workers</div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                              <div className="text-[9px] text-neutral-500">DATABASE</div>
                              <div className="text-white font-bold text-xs mt-0.5">PostgreSQL</div>
                              <div className="text-[9px] text-yellow-400">ACID Schemas</div>
                            </div>
                          </div>

                          <div className="text-[10px] text-neutral-400 flex items-center justify-between pt-2 border-t border-white/10">
                            <span>Zero N+1 Queries via prefetch</span>
                            <span className="text-electric-cyan">Click to inspect deep-dive &rarr;</span>
                          </div>
                        </div>
                      )}

                      {currentTab === 'specs' && (
                        <div className="space-y-4 font-mono text-xs select-none">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px]">
                            <span className="text-white font-bold">// KEY ENGINEERING SPECS</span>
                            <span className="text-electric-cyan">STANDARDS ENFORCED</span>
                          </div>

                          <div className="space-y-2">
                            {project.key_features?.slice(0, 3).map((feat, i) => (
                              <div key={i} className="flex items-start gap-2 text-neutral-300 font-sans text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Narrative Breakdown (5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div>
                      <h3 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mb-3 tracking-tight group-hover:text-electric-cyan transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs font-mono-tag text-neutral-400 mb-6 uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Architecture Callout */}
                      {project.architecture_notes && (
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-6">
                          <div className="flex items-center gap-2 text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>System Architecture</span>
                          </div>
                          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                            {project.architecture_notes}
                          </p>
                        </div>
                      )}

                      {/* Tech Pills */}
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
                          className="p-2.5 rounded-full border border-white/10 hover:border-white text-neutral-300 hover:text-white transition-all"
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
                          className="p-2.5 rounded-full border border-white/10 hover:border-white text-neutral-300 hover:text-white transition-all"
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
