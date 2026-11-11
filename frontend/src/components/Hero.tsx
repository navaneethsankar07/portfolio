import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Database, Cpu, Check, Layers, Copy, Terminal, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { Profile, Project } from '../types';

interface HeroProps {
  profile: Profile | null;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, projects, onOpenProject }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('navaneethsankar07@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-36 sm:pt-48 pb-24 border-b border-white/[0.08] bg-studio-grid overflow-hidden">
      
      {/* Subtle Luminous Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[640px] h-[340px] bg-electric-cyan/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-electric-blue/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Eyebrow Tag */}
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
            <span className="text-electric-cyan">
              precision digital products.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed max-w-3xl mb-10">
            Hi, I’m <strong className="text-white font-semibold">Navaneeth Sankar</strong>. I engineer distributed Django REST APIs, asynchronous Celery task pipelines, PostgreSQL relational architectures, and reactive React 18 interfaces. Based in Kerala, India — available for global engineering roles.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-xs font-mono-tag tracking-wider uppercase hover:bg-electric-cyan transition-all shadow-xl group"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-white font-mono-tag text-xs tracking-wider uppercase transition-all"
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

          {/* Architectural Metrics Grid in Hero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/[0.08] mb-10">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#07080C] border border-white/10">
              <div className="text-3xl sm:text-5xl font-bold text-white font-display mb-1">
                1+
              </div>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider mb-1">
                Years Intensive Engineering
              </div>
              <div className="text-[11px] font-mono-tag text-electric-cyan">
                Brototype Full-Stack Specialization
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#07080C] border border-white/10">
              <div className="text-3xl sm:text-5xl font-bold text-white font-display mb-1">
                3
              </div>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider mb-1">
                Flagship Production Platforms
              </div>
              <div className="text-[11px] font-mono-tag text-electric-blue">
                Grolance, ChitChat, ReStore
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#07080C] border border-white/10">
              <div className="text-3xl sm:text-5xl font-bold text-white font-display mb-1">
                25+
              </div>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider mb-1">
                Production Stack Technologies
              </div>
              <div className="text-[11px] font-mono-tag text-purple-400">
                Celery, Redis, Docker, WebSockets
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#07080C] border border-white/10">
              <div className="text-3xl sm:text-5xl font-bold text-white font-display mb-1">
                &lt;40ms
              </div>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider mb-1">
                Average API Response P95
              </div>
              <div className="text-[11px] font-mono-tag text-emerald-400">
                Zero N+1 Query Prefetching
              </div>
            </div>
          </div>

          {/* Architectural Standards Checklist */}
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
