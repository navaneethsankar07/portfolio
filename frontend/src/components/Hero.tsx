import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Database, Cpu, Check, Layers, Copy, Terminal, ExternalLink, ShieldCheck, Zap, Radio } from 'lucide-react';
import { Profile, Project } from '../types';

interface HeroProps {
  profile: Profile | null;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, projects, onOpenProject }) => {
  const [activePeakIdx, setActivePeakIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('navaneethsankar07@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const peakProjects: Project[] = projects && projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 1,
      title: "GROLANCE",
      slug: "grolance-freelancing-platform",
      subtitle: "Full-Stack Freelancing Ecosystem with Role-Based Workflows",
      category: "fullstack",
      category_display: "Full-Stack Platform",
      description: "An end-to-end freelancing platform featuring dual role-based workflows for clients and freelancers, milestone escrow financial protections, and asynchronous Celery worker pipelines.",
      architecture_notes: "Engineered with Django REST Framework and React 18. Implemented stateless JWT auth with RBAC. PostgreSQL serves as the relational source of truth with strict ACID transaction guarantees. Offloaded invoice generation and email notifications to background Celery workers with a Redis broker.",
      tech_stack: ["Django", "DRF", "React.js", "PostgreSQL", "Redis", "Celery", "JWT", "TailwindCSS"],
      key_features: [
        "Dual client & freelancer workflows with dynamic permission boundaries",
        "Stateless JWT auth with secure token rotation",
        "Milestone contract lifecycles with PayPal escrow integration",
        "Asynchronous email dispatches and PDF invoice generation via Celery workers",
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
      description: "A low-latency, bidirectional communication platform powered by Django Channels ASGI server architecture, Redis channel layers, and full-duplex WebSocket connections.",
      architecture_notes: "Utilizes Django Channels ASGI server architecture backed by Redis channel layers for distributed message routing. Features custom WebSocket consumer authentication via JWT query token validation.",
      tech_stack: ["React.js", "Django", "Django Channels", "WebSockets", "Redis", "PostgreSQL"],
      key_features: [
        "Bidirectional full-duplex WebSocket communication with sub-5ms delivery",
        "Channel layer broadcasting backed by in-memory Redis instances",
        "Custom JWT-authenticated WebSocket handshake middleware",
        "Heartbeat detection and real-time user presence tracking",
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
      description: "A customer-to-customer pre-owned marketplace engineered for instant discovery, automated media optimization, and predictable global state management.",
      architecture_notes: "Built on React and Vite for blazing fast bundle delivery. Redux Toolkit provides predictable global state management. Cloudinary handles media transformations.",
      tech_stack: ["React.js", "Vite", "Redux Toolkit", "Firebase", "Cloudinary", "TailwindCSS"],
      key_features: [
        "Dynamic multi-step product listing with instant drag-and-drop uploads",
        "Cloudinary automated image compression and responsive delivery (96% payload reduction)",
        "Predictable global filter and cart state via Redux Toolkit slices",
      ],
      live_url: "https://restore-marketplace.demo.app",
      github_url: "https://github.com/navaneethsankar/ReStore-Marketplace",
      image_url: "",
      featured: true,
      order: 3,
      created_at: new Date().toISOString(),
    }
  ];

  const currentProject = peakProjects[activePeakIdx] || peakProjects[0];

  return (
    <section className="relative pt-36 sm:pt-44 pb-20 border-b border-white/[0.08] bg-studio-grid overflow-hidden">
      
      {/* Subtle Luminous Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[320px] bg-electric-cyan/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-electric-blue/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Eyebrow Index Tag */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
          <span className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest">
            PYTHON FULL-STACK ARCHITECT // SYSTEMS &amp; INTERFACES
          </span>
        </div>

        {/* Monumental Editorial Headline */}
        <div className="max-w-5xl mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.04] mb-8 font-display">
            Architecting high-concurrency backends &amp;{' '}
            <span className="text-[#00F0FF]">
              precision digital products.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed max-w-3xl mb-10">
            Hi, I’m <strong className="text-white font-semibold">Navaneeth Sankar</strong>. I engineer distributed Django REST APIs, asynchronous Celery task pipelines, PostgreSQL relational architectures, and reactive React 18 interfaces.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-electric-cyan transition-all shadow-xl group"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-white font-mono-tag text-xs tracking-wider uppercase transition-all"
            >
              <span>{copiedEmail ? 'Email Copied ✓' : 'navaneethsankar07@gmail.com'}</span>
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <a
              href="/Navaneeth_Sankar_CV.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-1.5 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors tracking-widest uppercase ml-auto"
            >
              <span>Download CV [PDF]</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Core Technical Highlights Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono-tag text-neutral-400">
            <span className="flex items-center gap-2 text-white">
              <Check className="w-3.5 h-3.5 text-electric-cyan" />
              <span>PostgreSQL ACID Relational Schemas</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-2 text-white">
              <Check className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Celery Distributed Queues &amp; Redis</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-2 text-white">
              <Check className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Sub-10ms WebSockets via Channels</span>
            </span>
          </div>
        </div>

        {/* ================================================================
            PEAK WORK ABOVE THE FOLD: Flagship Case Study Exhibit Frame
           ================================================================ */}
        <div className="mt-12 rounded-3xl bg-[#07080C] border border-white/15 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          
          {/* Header Bar with Switchers */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono-tag text-neutral-400 tracking-wider">
                FLAGSHIP EXHIBIT // 0{activePeakIdx + 1} OF 03
              </span>
            </div>

            {/* Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {peakProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePeakIdx(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono-tag transition-all flex items-center gap-2 ${
                    activePeakIdx === idx
                      ? 'bg-white text-black font-bold shadow-lg'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Exhibition Content: 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Interface Showcase (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#030305] border border-white/10 p-6 sm:p-8 flex flex-col justify-between font-mono text-xs shadow-inner">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                  <span className="text-white font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                    {currentProject.title} // ARCHITECTURE TELEMETRY
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-electric-cyan text-[10px] font-bold">
                  PRODUCTION READY
                </span>
              </div>

              {/* Dynamic Project Specific Preview */}
              {activePeakIdx === 0 && (
                <div className="my-6 space-y-4 font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">ESCROW DEPOSIT</div>
                      <div className="text-2xl font-bold font-sans text-white my-1">$4,850.00</div>
                      <div className="text-[10px] text-electric-cyan flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>ACID Protected</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">CELERY TASK QUEUE</div>
                      <div className="text-xl font-bold font-sans text-electric-cyan my-1">0ms Idle</div>
                      <div className="text-[10px] text-neutral-400">Async Invoice Gen</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">QUERY OPTIMIZATION</div>
                      <div className="text-xl font-bold font-sans text-white my-1">18.4ms</div>
                      <div className="text-[10px] text-electric-emerald text-emerald-400">Zero N+1 Queries</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-neutral-300">
                    <div className="text-neutral-500 text-[10px] mb-1 uppercase">// ACTIVE CELERY WORKER PIPELINE</div>
                    <div>[Celery-Worker-1] Task contracts.tasks.release_milestone succeeded in 38ms</div>
                    <div className="text-electric-cyan">[PostgreSQL] SELECT FOR UPDATE on contract_id=104 committed cleanly</div>
                  </div>
                </div>
              )}

              {activePeakIdx === 1 && (
                <div className="my-6 space-y-4 font-mono">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">WEBSOCKET PING</div>
                      <div className="text-2xl font-bold font-sans text-electric-cyan my-1">1.8ms</div>
                      <div className="text-[10px] text-neutral-400">Django Channels ASGI</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">CHANNEL BROADCAST</div>
                      <div className="text-xl font-bold font-sans text-white my-1">Redis In-Memory</div>
                      <div className="text-[10px] text-emerald-400">Full-Duplex TCP Active</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-neutral-300">
                    <div className="text-neutral-500 text-[10px] mb-1 uppercase">// ASGI WEBSOCKET FRAME TRACE</div>
                    <div>[Handshake] GET /ws/chat/room_849/?token=jwt.token.val HTTP/1.1 101 Switching Protocols</div>
                    <div className="text-electric-cyan">[Broadcast] Message frame delivered across Redis group with 0 polling latency</div>
                  </div>
                </div>
              )}

              {activePeakIdx === 2 && (
                <div className="my-6 space-y-4 font-mono">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">CLOUDINARY CDN</div>
                      <div className="text-2xl font-bold font-sans text-emerald-400 my-1">-96.2%</div>
                      <div className="text-[10px] text-neutral-400">4.8MB &rarr; 184KB WebP</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] text-neutral-500 uppercase">STATE ENGINE</div>
                      <div className="text-xl font-bold font-sans text-white my-1">Redux Toolkit</div>
                      <div className="text-[10px] text-electric-cyan">Predictable Slices</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-neutral-300">
                    <div className="text-neutral-500 text-[10px] mb-1 uppercase">// CLIENT STATE &amp; ASSET PIPELINE</div>
                    <div>[Redux] Cart &amp; faceted filter slice mutations dispatch deterministically</div>
                    <div className="text-emerald-400">[Media CDN] Responsive AVIF/WebP assets delivered in sub-40ms from edge</div>
                  </div>
                </div>
              )}

              {/* Status Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Architecture Verified</span>
                <span className="text-neutral-400">PostgreSQL + Django + React 18</span>
              </div>
            </div>

            {/* Architectural Narrative (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-2">
                  {currentProject.category_display || currentProject.category}
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-display tracking-tight mb-3">
                  {currentProject.title}
                </h3>

                <p className="text-xs font-mono-tag text-neutral-400 mb-6 uppercase">
                  {currentProject.subtitle}
                </p>

                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed mb-6">
                  {currentProject.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono-tag text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenProject(currentProject)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-electric-cyan transition-all shadow-md"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {currentProject.github_url && (
                  <a
                    href={currentProject.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
                  >
                    <span>GitHub Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Kinetic Infinite Marquee Banner */}
      <div className="mt-16 pt-5 border-t border-white/[0.08] overflow-hidden whitespace-nowrap bg-[#020204]">
        <div className="inline-flex animate-marquee text-xs font-mono-tag text-neutral-400 uppercase tracking-[0.25em] py-2">
          {[1, 2, 3].map((idx) => (
            <span key={idx} className="flex items-center gap-8 mr-8">
              <span>DJANGO REST FRAMEWORK</span>
              <span className="text-electric-cyan">•</span>
              <span>REACT 18 &amp; TYPESCRIPT</span>
              <span className="text-electric-blue">•</span>
              <span>POSTGRESQL RELATIONAL ARCHITECTURE</span>
              <span className="text-purple-400">•</span>
              <span>CELERY ASYNCHRONOUS WORKERS</span>
              <span className="text-emerald-400">•</span>
              <span>REDIS MESSAGE BROKER</span>
              <span className="text-electric-cyan">•</span>
              <span>DJANGO CHANNELS WEBSOCKETS</span>
              <span className="text-white">•</span>
              <span>DOCKER CONTAINERIZATION</span>
              <span className="text-neutral-500">•</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
