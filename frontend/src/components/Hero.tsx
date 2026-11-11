import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, Database, Cpu, Check, Layers, Sparkles } from 'lucide-react';
import { Profile, Project } from '../types';
import { GrolanceMockup, ChitChatMockup, ReStoreMockup } from './ProjectMockups';

interface HeroProps {
  profile: Profile | null;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, projects, onOpenProject }) => {
  const [activePeakIdx, setActivePeakIdx] = useState(0);

  const peakProjects = projects && projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 1,
      title: "GROLANCE",
      slug: "grolance-freelancing-platform",
      subtitle: "Full-Stack Freelancing Platform with Role-Based Workflows",
      category: "fullstack" as const,
      description: "A comprehensive full-stack freelancing platform connecting clients and freelance professionals through role-based workflows, contract milestones, and escrow payments.",
      architecture_notes: "Engineered with Django REST Framework backend paired with a high-performance React client. Implemented secure stateless authentication using JWT and role-based permissions (RBAC). Integrated PostgreSQL for persistent contract records with Redis & Celery background tasks.",
      tech_stack: ["Django", "DRF", "React.js", "PostgreSQL", "Redis", "Celery"],
      key_features: ["Role-based workflows", "Stateless JWT Auth", "PayPal Escrow", "Celery async tasks"],
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
      category: "realtime" as const,
      description: "Low-latency communication platform engineered with Django Channels and WebSockets for instant message delivery and presence tracking.",
      architecture_notes: "Django Channels ASGI server backed by Redis channel layers for distributed message routing with JWT handshake validation.",
      tech_stack: ["React.js", "Django", "Django Channels", "WebSockets", "Redis"],
      key_features: ["Bidirectional WebSockets", "Redis Channel Layers", "JWT WebSocket Auth", "Presence Tracking"],
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
      category: "marketplace" as const,
      description: "Customer-to-customer marketplace with cloud media transformation and Redux Toolkit state management.",
      architecture_notes: "React and Vite with Redux Toolkit for unified global state. Cloudinary handles automated image compression and responsive delivery.",
      tech_stack: ["React.js", "Vite", "Redux Toolkit", "Firebase", "Cloudinary"],
      key_features: ["Multi-step listing", "Cloudinary image CDN", "Redux Global State"],
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
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-white/[0.08] overflow-hidden">
      
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Editorial Index Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-white font-bold">NAVANEETH SANKAR</span>
            <span className="text-neutral-500">—</span>
            <span>PYTHON FULL STACK DEVELOPER</span>
          </div>
          <div className="hidden md:block text-neutral-400">
            <span>CORE: DJANGO REST FRAMEWORK + REACT</span>
          </div>
          <div>
            <span>[2024—2026]</span>
          </div>
        </div>

        {/* Hero Grid: Left Typography, Right Above-The-Fold Peak Work Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Spans 7 cols): Strong Editorial Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono-tag tracking-widest text-neutral-400 uppercase">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-[10px]">
                FULL-STACK ARCHITECT
              </span>
              <span>&bull;</span>
              <span>BACKEND ENGINEERING SPECIALIST</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-bold uppercase leading-[0.95] tracking-tight text-white mb-6 font-display">
              Architecting <br />
              <span className="text-neutral-400 font-light italic">Resilient Systems</span> <br />
              & Reactive Apps.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-xl mb-8">
              Specializing in scalable distributed web services with <strong className="text-white font-semibold">Python</strong>, <strong className="text-white font-semibold">Django REST Framework</strong>, and reactive <strong className="text-white font-semibold">React interfaces</strong>. Designing robust database layers with <span className="text-white font-medium">PostgreSQL</span>, asynchronous task queues with <span className="text-white font-medium">Celery & Redis</span>, and low-latency <span className="text-white font-medium">WebSockets</span>.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-md group"
                data-cursor="EXPLORE"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono-tag text-neutral-300 hover:text-white transition-colors tracking-widest uppercase border-b border-neutral-700 hover:border-white pb-1"
              >
                <span>DIRECT INQUIRY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/Navaneeth_Sankar_CV.pdf"
                target="_blank"
                download
                className="inline-flex items-center gap-2 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors tracking-widest uppercase"
              >
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>

            {/* Quick Metrics Bar with Real Check Icons */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono-tag text-neutral-400">
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>PostgreSQL ACID Relational DB</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Celery Workers & Redis</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-3.5 h-3.5 text-indigo-400" />
                <span>Django Channels WebSockets</span>
              </span>
            </div>

          </div>

          {/* Right Column (Spans 5 cols): PEAK WORK ABOVE THE FOLD */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0E12] border border-white/15 hover:border-white/30 transition-all duration-500 shadow-2xl">
              
              {/* Header with Switcher Tabs */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold">PEAK WORK // 0{activePeakIdx + 1}</span>
                </div>
                
                {/* 3 tabs to toggle peak projects right above fold */}
                <div className="flex items-center gap-1.5">
                  {peakProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePeakIdx(idx)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-tag transition-all ${
                        activePeakIdx === idx
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Showcase Interface Mockup */}
              <div
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#0A0C10] border border-white/10 mb-4 cursor-pointer group shadow-inner"
                onClick={() => onOpenProject(currentProject)}
                data-cursor="INSPECT"
              >
                {renderMockup(currentProject.title)}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
                    {currentProject.title}
                  </h3>
                  <button
                    onClick={() => onOpenProject(currentProject)}
                    className="text-xs font-mono-tag text-white hover:text-neutral-300 flex items-center gap-1 uppercase"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2">
                  {currentProject.subtitle}
                </p>
              </div>

              {/* Bottom Quick Architecture Highlights */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-tag text-neutral-400">
                <span className="flex items-center gap-1 text-white">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{currentProject.key_features?.[0] || 'Optimized Architecture'}</span>
                </span>
                <span className="text-white font-bold cursor-pointer hover:underline" onClick={() => onOpenProject(currentProject)}>
                  INSPECT &rarr;
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Kinetic Infinite Marquee Banner */}
      <div className="mt-14 pt-4 border-t border-white/[0.08] overflow-hidden whitespace-nowrap bg-[#0A0B0E]">
        <div className="inline-flex animate-marquee text-xs font-mono-tag text-neutral-400 uppercase tracking-[0.25em] py-3">
          {[1, 2, 3].map((idx) => (
            <span key={idx} className="flex items-center gap-8 mr-8">
              <span>DJANGO REST FRAMEWORK</span>
              <span className="text-white">•</span>
              <span>REACT 18 & TYPESCRIPT</span>
              <span className="text-white">•</span>
              <span>POSTGRESQL RELATIONAL ARCHITECTURE</span>
              <span className="text-white">•</span>
              <span>CELERY ASYNC WORKERS</span>
              <span className="text-white">•</span>
              <span>REDIS MESSAGE BROKER</span>
              <span className="text-white">•</span>
              <span>DJANGO CHANNELS WEBSOCKETS</span>
              <span className="text-white">•</span>
              <span>DOCKER & CI/CD PIPELINES</span>
              <span className="text-white">•</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
