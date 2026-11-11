import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Database, Cpu, Check, Layers, ExternalLink, Copy, Terminal } from 'lucide-react';
import { Profile, Project } from '../types';
import { GrolanceMockup, ChitChatMockup, ReStoreMockup } from './ProjectMockups';

interface HeroProps {
  profile: Profile | null;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, projects, onOpenProject }) => {
  const [activePeakIdx, setActivePeakIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
      subtitle: "Full-Stack Freelancing Platform with Role-Based Workflows",
      category: "fullstack",
      category_display: "Full-Stack Platform",
      description: "A comprehensive freelancing ecosystem engineered with dual role-based workflows for clients and freelancers, milestone-driven escrow protection, and asynchronous Celery workers.",
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
      subtitle: "Real-Time WebSocket Messaging Platform",
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

  const renderMockup = (title: string) => {
    if (title.toLowerCase().includes('grolance')) return <GrolanceMockup />;
    if (title.toLowerCase().includes('chitchat')) return <ChitChatMockup />;
    return <ReStoreMockup />;
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 border-b border-white/[0.08] overflow-hidden bg-architectural-grid">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* System Telemetry & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-white/[0.08] text-xs font-mono-tag text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">NAVANEETH SANKAR</span>
            <span className="text-neutral-600">—</span>
            <span className="text-neutral-300">PYTHON FULL-STACK &amp; BACKEND ARCHITECT</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-neutral-400">
            <span>KERALA, INDIA</span>
            <span className="text-neutral-700">•</span>
            <span className="text-white font-mono">{istTime || '11:45:00 AM'} IST</span>
            <span className="text-neutral-700">•</span>
            <span className="text-emerald-400 font-bold">STATUS: AVAILABLE</span>
          </div>
        </div>

        {/* Editorial Headline & Value Proposition */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-tag text-neutral-300 mb-6">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>FULL-STACK ARCHITECTURE // SCALABLE WEB PLATFORMS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-tight text-white leading-[1.04] mb-8 font-display">
            Architecting Resilient Backends &amp; High-Fidelity Products.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-2xl mb-10">
            Specializing in distributed Python / Django REST services, asynchronous Celery queues, PostgreSQL relational architectures, and reactive React 18 + TypeScript frontends.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-lg group"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-mono-tag text-neutral-300 hover:text-white transition-colors tracking-widest uppercase border-b border-neutral-700 hover:border-white pb-1"
            >
              <span>Direct Transmission</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors tracking-widest uppercase"
            >
              <span>{copiedEmail ? 'Email Copied ✓' : 'Copy Email'}</span>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Engineering Standards Checklist */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono-tag text-neutral-300">
            <span className="flex items-center gap-1.5 text-white">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>PostgreSQL ACID Relational Schemas</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              <span>Celery Distributed Queues &amp; Redis</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Check className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sub-10ms WebSockets via Channels</span>
            </span>
          </div>
        </div>

        {/* ================================================================
            PEAK WORK ABOVE THE FOLD: Interactive Systems Cockpit Frame
           ================================================================ */}
        <div className="rounded-3xl bg-[#0B0D13]/90 border border-white/15 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Cockpit Header with Project Switcher Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono-tag text-neutral-400">
                PEAK WORK INTERACTIVE COCKPIT // 0{activePeakIdx + 1} OF 03
              </span>
            </div>

            {/* Interactive Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {peakProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePeakIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-tag transition-all flex items-center gap-1.5 ${
                    activePeakIdx === idx
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cockpit Body: Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Live Interface Simulation (Spans 7 cols) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#07080C] border border-white/10 shadow-xl">
              <div className="relative min-h-[300px] w-full">
                {renderMockup(currentProject.title)}
              </div>
            </div>

            {/* Project Summary & Technical Details (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono-tag text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{currentProject.category_display || currentProject.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 font-display">
                  {currentProject.title}
                </h3>

                <p className="text-xs font-mono-tag text-neutral-400 mb-4 uppercase">
                  {currentProject.subtitle}
                </p>

                <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                  {currentProject.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {currentProject.tech_stack?.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono-tag text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenProject(currentProject)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-md"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {currentProject.github_url && (
                  <a
                    href={currentProject.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors"
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

      {/* Kinetic Infinite Marquee Ticker */}
      <div className="mt-16 pt-5 border-t border-white/[0.08] overflow-hidden whitespace-nowrap bg-[#050609]">
        <div className="inline-flex animate-marquee text-xs font-mono-tag text-neutral-400 uppercase tracking-[0.25em] py-2">
          {[1, 2, 3].map((idx) => (
            <span key={idx} className="flex items-center gap-8 mr-8">
              <span>DJANGO REST FRAMEWORK</span>
              <span className="text-emerald-400">•</span>
              <span>REACT 18 &amp; TYPESCRIPT</span>
              <span className="text-cyan-400">•</span>
              <span>POSTGRESQL RELATIONAL ARCHITECTURE</span>
              <span className="text-purple-400">•</span>
              <span>CELERY ASYNCHRONOUS WORKERS</span>
              <span className="text-yellow-400">•</span>
              <span>REDIS MESSAGE BROKER</span>
              <span className="text-emerald-400">•</span>
              <span>DJANGO CHANNELS WEBSOCKETS</span>
              <span className="text-cyan-400">•</span>
              <span>DOCKER &amp; CI/CD AUTOMATION</span>
              <span className="text-purple-400">•</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
