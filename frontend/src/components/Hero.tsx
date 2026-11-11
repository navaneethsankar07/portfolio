import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Database, Cpu, Sparkles, Layers } from 'lucide-react';
import { Profile, Project } from '../types';

interface HeroProps {
  profile: Profile | null;
  flagshipProject: Project | null;
  onOpenProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, flagshipProject, onOpenProject }) => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-white/[0.08]">
      
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Editorial Index Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08] text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>[INDEX]</span>
            <span className="text-white">FULL-STACK SOFTWARE DEVELOPER</span>
          </div>
          <div className="hidden sm:block">
            <span>CORE SPEC: DJANGO REST FRAMEWORK + REACT</span>
          </div>
          <div>
            <span>EDITION [2026]</span>
          </div>
        </div>

        {/* Hero Grid: Left Typography Manifesto, Right Peak Work Above The Fold */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Spans 7 cols): Strong Editorial Headline & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 text-xs font-mono-tag tracking-widest text-neutral-400 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>NAVANEETH SANKAR — PORTFOLIO</span>
            </motion.div>

            {/* Massive Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold uppercase leading-[0.92] tracking-tighter text-white mb-8 font-display"
            >
              Engineered <br />
              <span className="text-neutral-400 font-light italic">for Extreme</span> <br />
              Performance.
            </motion.h1>

            {/* Editorial Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-10"
            >
              Specializing in scalable distributed web systems with <strong className="text-white font-semibold">Python</strong>, <strong className="text-white font-semibold">Django REST Framework</strong>, and reactive <strong className="text-white font-semibold">React interfaces</strong>. Designing resilient database layers with <span className="text-neutral-200">PostgreSQL</span>, async pipelines with <span className="text-neutral-200">Celery & Redis</span>, and sub-millisecond <span className="text-neutral-200">WebSockets</span>.
            </motion.p>

            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tag tracking-wider uppercase hover:bg-neutral-200 transition-all group"
                data-cursor="DISCOVER"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono-tag text-neutral-400 hover:text-white transition-colors tracking-widest uppercase border-b border-neutral-700 hover:border-white pb-1"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </div>

          {/* Right Column (Spans 5 cols): PEAK WORK ABOVE THE FOLD */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative group cursor-pointer"
              onClick={() => flagshipProject && onOpenProject(flagshipProject)}
              data-cursor="CASE STUDY"
            >
              {/* Outer Card with High-End Minimal Border */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0E12] border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl">
                
                {/* Header bar above preview */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>PEAK WORK // 01</span>
                  </span>
                  <span className="text-white font-bold group-hover:text-neutral-300 transition-colors flex items-center gap-1">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900 mb-5">
                  <img
                    src={
                      flagshipProject?.image_url ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'
                    }
                    alt={flagshipProject?.title || 'GROLANCE'}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono-tag text-white uppercase border border-white/10">
                      CELERY + REDIS + POSTGRESQL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-tag border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Card Title & Meta */}
                <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                  {flagshipProject?.title || 'GROLANCE'}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4 line-clamp-2">
                  {flagshipProject?.subtitle ||
                    'Full-stack freelancing platform engineered with role-based JWT auth, PayPal escrow milestones, and distributed async Celery workers.'}
                </p>

                {/* Quick Architecture Indicators */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-tag text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-white" />
                    <span>0ms Blocking Latency</span>
                  </span>
                  <span className="text-white uppercase tracking-wider">
                    VIEW CASE STUDY &rarr;
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Kinetic Infinite Marquee Banner (Subtle, Monochrome, Classy) */}
      <div className="mt-16 pt-6 border-t border-white/[0.08] overflow-hidden whitespace-nowrap bg-[#0A0B0E]">
        <div className="inline-flex animate-marquee text-xs font-mono-tag text-neutral-400 uppercase tracking-[0.25em] py-3">
          {[1, 2, 3].map((idx) => (
            <span key={idx} className="flex items-center gap-8 mr-8">
              <span>DJANGO REST FRAMEWORK</span>
              <span className="text-white">•</span>
              <span>REACT 18 & TYPESCRIPT</span>
              <span className="text-white">•</span>
              <span>POSTGRESQL RELATIONAL ARCHITECTURE</span>
              <span className="text-white">•</span>
              <span>CELERY DISTRIBUTED WORKERS</span>
              <span className="text-white">•</span>
              <span>REDIS CHANNEL LAYERS</span>
              <span className="text-white">•</span>
              <span>WEBSOCKET REAL-TIME STREAMING</span>
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
