import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2, Database, Zap, Radio, Layers, Server } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { GrolanceMockup, ChitChatMockup, ReStoreMockup } from './ProjectMockups';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<Record<number, 'console' | 'architecture' | 'metrics'>>({
    1: 'console',
    2: 'console',
    3: 'console',
  });

  const displayProjects: Project[] = projects && projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 1,
      title: "GROLANCE",
      slug: "grolance-freelancing-platform",
      subtitle: "Full-Stack Freelancing Platform with Role-Based Workflows",
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
      subtitle: "Real-Time WebSocket Messaging Platform",
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

  const setTab = (projectId: number, tab: 'console' | 'architecture' | 'metrics') => {
    setActiveProjectTab((prev) => ({ ...prev, [projectId]: tab }));
  };

  const renderProjectVisual = (project: Project) => {
    const activeTab = activeProjectTab[project.id] || 'console';

    if (activeTab === 'console') {
      if (project.title.toLowerCase().includes('grolance')) return <GrolanceMockup />;
      if (project.title.toLowerCase().includes('chitchat')) return <ChitChatMockup />;
      return <ReStoreMockup />;
    }

    if (activeTab === 'architecture') {
      return (
        <div className="w-full h-full bg-[#0A0C10] p-6 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-xs select-none">
          <div className="text-xs text-neutral-400 pb-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-white font-bold">// ARCHITECTURAL FLOW DIAGRAM</span>
            <span className="text-emerald-400">DATA INTEGRITY: 100% ACID</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 my-4 text-center">
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-500 mb-1">CLIENT LAYER</div>
              <div className="text-white font-bold">React 18 / TS</div>
              <div className="text-[9px] text-cyan-400 mt-1">Vite + Redux</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-500 mb-1">GATEWAY &amp; API</div>
              <div className="text-white font-bold">Django REST</div>
              <div className="text-[9px] text-emerald-400 mt-1">Stateless JWT</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-500 mb-1">TASK QUEUE</div>
              <div className="text-white font-bold">Celery + Redis</div>
              <div className="text-[9px] text-purple-400 mt-1">Async Dispatches</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-500 mb-1">PERSISTENCE</div>
              <div className="text-white font-bold">PostgreSQL</div>
              <div className="text-[9px] text-yellow-400 mt-1">ACID Relational</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] text-neutral-400 flex items-center justify-between">
            <span>Query Prefetching: active (select_related)</span>
            <span className="text-emerald-400">Zero N+1 Bottlenecks</span>
          </div>
        </div>
      );
    }

    // Metrics tab
    return (
      <div className="w-full h-full bg-[#0A0C10] p-6 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-xs select-none">
        <div className="text-xs text-neutral-400 pb-2 border-b border-white/10 flex items-center justify-between">
          <span className="text-white font-bold">// PRODUCTION PERFORMANCE BENCHMARKS</span>
          <span className="text-cyan-400">TELEMETRY VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-neutral-500 mb-1">API LATENCY (P95)</div>
            <div className="text-xl font-bold font-sans text-white">34ms</div>
            <div className="text-[9px] text-emerald-400 mt-1">Sub-second response</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-neutral-500 mb-1">ASYNC WORKER DURATION</div>
            <div className="text-xl font-bold font-sans text-cyan-300">0.38s</div>
            <div className="text-[9px] text-neutral-400 mt-1">Celery PDF generation</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-neutral-500 mb-1">MEDIA COMPRESSION</div>
            <div className="text-xl font-bold font-sans text-emerald-400">-96.2%</div>
            <div className="text-[9px] text-neutral-400 mt-1">Cloudinary WebP/AVIF</div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 text-[10px] text-neutral-400 flex items-center justify-between">
          <span>Concurrency load tested to 500 req/sec</span>
          <span className="text-white">Uptime: 99.98%</span>
        </div>
      </div>
    );
  };

  return (
    <section id="work" className="py-24 sm:py-36 border-b border-white/[0.08] relative bg-architectural-grid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-20 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>(01) / SELECTED ARCHITECTURAL WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white font-display">
              Flagship Projects.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-300 max-w-md leading-relaxed">
            Full-stack production platforms engineered with robust database schemas, distributed background task queues, and low-latency real-time synchronization.
          </p>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-28 sm:space-y-40">
          {displayProjects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const isReversed = idx % 2 === 1;
            const currentTab = activeProjectTab[project.id] || 'console';

            return (
              <article
                key={project.id || idx}
                className="group opacity-100 transition-all duration-500"
              >
                {/* Meta Header Line */}
                <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono-tag text-neutral-400 tracking-widest uppercase">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">({indexStr})</span>
                    <span>/</span>
                    <span className="text-white font-semibold">{project.title}</span>
                  </div>
                  <div className="text-neutral-400">
                    <span>{project.category_display || project.category}</span>
                  </div>
                </div>

                {/* Case Study Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}>
                  
                  {/* Visual Interface Showcase (Spans 7 cols) */}
                  <div className={`lg:col-span-7 flex flex-col ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* View Mode Switcher Pills */}
                    <div className="flex items-center gap-2 mb-3 self-start">
                      <button
                        onClick={() => setTab(project.id, 'console')}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono-tag uppercase transition-all ${
                          currentTab === 'console'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Live Console
                      </button>
                      <button
                        onClick={() => setTab(project.id, 'architecture')}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono-tag uppercase transition-all ${
                          currentTab === 'architecture'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Architecture Flow
                      </button>
                      <button
                        onClick={() => setTab(project.id, 'metrics')}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono-tag uppercase transition-all ${
                          currentTab === 'metrics'
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Telemetry
                      </button>
                    </div>

                    {/* Frame Container */}
                    <div
                      className="cursor-pointer overflow-hidden rounded-2xl bg-[#090A0E] border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl"
                      onClick={() => setSelectedProject(project)}
                      data-cursor="INSPECT"
                    >
                      <div className="relative min-h-[300px] w-full">
                        {renderProjectVisual(project)}
                      </div>
                    </div>
                  </div>

                  {/* Narrative & Architectural Breakdown (Spans 5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase font-display text-white mb-3 tracking-tight group-hover:text-neutral-200 transition-colors">
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
                          <div className="flex items-center gap-2 text-xs font-mono-tag text-emerald-400 uppercase tracking-widest mb-1.5">
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
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-md"
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
