import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Zap, Shield, Database, Cpu, Layers, 
  Terminal, Award, CheckCircle2, FileText, ArrowUpRight 
} from 'lucide-react';
import { Profile, PublicStats } from '../types';

interface AboutProps {
  profile: Profile | null;
  stats: PublicStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const pillars = [
    {
      icon: Server,
      title: "Scalable REST & GraphQL APIs",
      description: "Engineered with Django & DRF, featuring selective querying, pagination, rate limiting, and comprehensive test coverage.",
      tag: "Backend",
      accent: "text-cyan-400"
    },
    {
      icon: Zap,
      title: "Async Queues & Background Workers",
      description: "Decoupling long-running workloads, email dispatches, and third-party webhook handling using Celery workers with Redis brokers.",
      tag: "Asynchronous",
      accent: "text-amber-400"
    },
    {
      icon: Cpu,
      title: "Real-Time WebSockets",
      description: "Bi-directional event streaming and instant chat broadcasting via Django Channels, ASGI protocols, and Redis Channel Layers.",
      tag: "Low Latency",
      accent: "text-emerald-400"
    },
    {
      icon: Database,
      title: "Database Performance & Caching",
      description: "PostgreSQL schema design, ACID transactions, eliminating N+1 queries via select_related/prefetch_related, and Redis caching.",
      tag: "Data Layer",
      accent: "text-indigo-400"
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering High-Performance Systems
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging the gap between heavy, resilient backend architectures and responsive, pixel-perfect user interfaces.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Story Card (Spans 8 cols on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Software Developer Profile
                </span>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                  Navaneeth Sankar
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Specializing in Python, Django REST Framework, and React.js
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {profile?.bio || 
                    "Software Developer specializing in building scalable full-stack web applications with Python, Django, Django REST Framework, and React. Skilled in designing RESTful services, database architectures, asynchronous workflows, and modern frontend applications."
                  }
                </p>
                <p>
                  With a solid foundation in <span className="text-cyan-300 font-medium">Data Structures and Algorithms</span>, I focus on writing clean, maintainable software and continuously developing expertise in backend engineering, cloud-native deployments with <span className="text-slate-100 font-medium">Docker</span>, and modern DevOps practices.
                </p>
              </div>
            </div>

            {/* Bottom Highlights */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>REST API Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>JWT & RBAC Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Microsecond Caching</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Bento Card (Spans 4 cols on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-4">
                Key Metrics
              </span>

              <div className="space-y-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                    {stats?.projects_count || 3}+
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Full-Stack Production Projects</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {stats?.skills_count || 25}+
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Technologies & Tools Mastered</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Commitment to Clean Architecture</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={profile?.resume_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Resume / CV PDF</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 4 Architectural Pillars (Spans 12 cols, grid of 4) */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-panel p-5 rounded-2xl border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-cyan-950/40 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                      <IconComp className={`w-5 h-5 ${item.accent}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

