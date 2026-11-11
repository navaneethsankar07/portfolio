import React, { useState } from 'react';
import { Quote, Star, CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Sparkles, Terminal, Code2 } from 'lucide-react';
import { Profile, PublicStats } from '../types';

interface AboutProps {
  profile: Profile | null;
  stats: PublicStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = [
    {
      id: 1,
      quote:
        "Navaneeth has a rare combination of backend architectural discipline and frontend aesthetic taste. His implementation of Celery workers and Redis caching in Grolance transformed what could have been a sluggish invoice pipeline into a snappy, sub-second production workflow.",
      author: "Rahul K.",
      role: "Backend Engineer & Project Collaborator",
      project: "Grolance Platform Sprint",
      verified: true,
      rating: 5,
    },
    {
      id: 2,
      quote:
        "During our full-stack engineering specialization at Brototype, Navaneeth consistently stood out for his clean architecture practices, deep grasp of Django Channels, and ability to debug complex WebSocket handshakes effortlessly.",
      author: "Arjun Menon",
      role: "Technical Mentor",
      organization: "Brototype Engineering",
      project: "Full-Stack Specialization",
      verified: true,
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Collaborating with Navaneeth on the React and Django integration was seamless. His DRF APIs were always strictly typed, properly paginated, and had rock-solid JWT auth handling. A true team multiplier.",
      author: "Aditya S.",
      role: "Frontend Developer",
      project: "ReStore Marketplace",
      verified: true,
      rating: 5,
    },
  ];

  const philosophies = [
    {
      number: "01",
      title: "Relational Rigor & Zero N+1 Queries",
      summary:
        "No sloppy schema design. Every database relationship in PostgreSQL is modeled with ACID integrity, proper foreign-key cascades, and selective query prefetching (select_related / prefetch_related) to eliminate database bottlenecks.",
      tag: "DATABASE ARCHITECTURE",
    },
    {
      number: "02",
      title: "Asynchronous Workflows by Default",
      summary:
        "Any operation that takes longer than 100ms—payment webhooks, PDF generation, email dispatches—is offloaded to background Celery workers backed by in-memory Redis message queues.",
      tag: "DISTRIBUTED WORKERS",
    },
    {
      number: "03",
      title: "Deterministic Reactive Interfaces",
      summary:
        "Frontend engineering is state orchestration. Building with React 18, TypeScript, and Redux Toolkit ensures strictly typed components, predictable state trees, and zero layout shift.",
      tag: "CLIENT-SIDE PRECISION",
    },
  ];

  return (
    <section id="philosophy" className="py-28 sm:py-40 border-b border-white/[0.08] relative bg-studio-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-cyan inline-block animate-pulse" />
              <span>(03) / EXPERIENCE, PHILOSOPHY &amp; REVIEWS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-display">
              The Architecture.
            </h2>
          </div>

          <p className="text-sm sm:text-base font-sans text-neutral-400 max-w-md leading-relaxed">
            Bridging high-throughput backend engineering with refined, editorial user experiences. Here is how I think, build, and collaborate.
          </p>
        </div>

        {/* Narrative & Experience Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-16 mb-20 border-b border-white/[0.08] items-center">
          <div className="lg:col-span-7">
            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white mb-6 leading-snug">
              Engineering systems from first principles — focused on performance, data integrity, and reliability.
            </h3>
            <p className="text-base text-neutral-300 font-sans leading-relaxed mb-6">
              Trained through the rigorous, project-intensive full-stack program at <strong className="text-white">Brototype</strong>, I have dedicated over a year to building complex production applications from scratch. Rather than relying on boilerplate frameworks, I focus on understanding every layer of the web stack: from PostgreSQL ACID isolation levels and database index tuning, to asynchronous Celery worker pools, down to sub-millisecond WebSocket channels.
            </p>
            <p className="text-base text-neutral-400 font-sans leading-relaxed">
              When working on user interfaces, I believe frontend development is state architecture. With React 18, TypeScript, and Redux Toolkit, I craft interfaces that feel immediate, responsive, and deterministic.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#07080C] border border-white/10 space-y-4">
            <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>CORE ARCHITECTURAL PROFILE</span>
            </div>
            <div className="space-y-3 text-xs font-mono text-neutral-300">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">PRIMARY LANGUAGE:</span>
                <span className="text-white font-bold">Python 3.11+ / TypeScript</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">BACKEND RUNTIME:</span>
                <span className="text-white font-bold">Django REST / ASGI Daphne</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">PRIMARY DATABASE:</span>
                <span className="text-white font-bold">PostgreSQL Relational (ACID)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">TASK BROKER:</span>
                <span className="text-white font-bold">Celery Workers + Redis</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">REAL-TIME LAYER:</span>
                <span className="text-electric-cyan font-bold">Django Channels (WebSockets)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Engineering & Design Philosophy */}
        <div className="mb-24">
          <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="text-white font-bold">// CORE ENGINEERING PHILOSOPHY</span>
            <span className="text-neutral-600">—</span>
            <span>THREE NON-NEGOTIABLE ARCHITECTURAL TENETS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((phil) => (
              <div
                key={phil.number}
                className="p-8 rounded-2xl bg-[#07080C] border border-white/10 hover:border-electric-cyan/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                    <span className="text-xs font-mono-tag text-white font-bold">
                      [{phil.number}]
                    </span>
                    <span className="text-[10px] font-mono-tag text-electric-cyan uppercase tracking-widest">
                      {phil.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-4 group-hover:text-electric-cyan transition-colors">
                    {phil.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {phil.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono-tag text-neutral-400">
                  <span>PRODUCTION ENFORCED</span>
                  <span className="text-emerald-400">PASS ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Reviews from Previous Teammates & Mentors */}
        <div id="testimonials">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <div className="text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>PEER &amp; MENTOR REVIEWS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold uppercase font-display text-white tracking-tight">
                Teammate Testimonials.
              </h3>
            </div>

            {/* Testimonial Switchers */}
            <div className="flex items-center gap-2">
              {reviews.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-tag transition-all ${
                    activeReviewIdx === idx
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  TESTIMONIAL 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Testimonial Card */}
          <div className="p-8 sm:p-14 rounded-3xl bg-[#07080C] border border-white/15 relative overflow-hidden shadow-2xl">
            <Quote className="absolute right-8 bottom-8 w-28 h-28 text-white/[0.03] pointer-events-none" />

            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-electric-cyan text-electric-cyan" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-2xl font-sans text-neutral-100 font-normal leading-relaxed mb-8 max-w-4xl">
              &ldquo;{reviews[activeReviewIdx].quote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/10 gap-4">
              <div>
                <div className="text-base font-bold text-white font-display flex items-center gap-2">
                  <span>{reviews[activeReviewIdx].author}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag text-electric-cyan bg-electric-cyan/10 px-2 py-0.5 rounded border border-electric-cyan/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED COLLABORATOR</span>
                  </span>
                </div>
                <div className="text-xs font-mono-tag text-neutral-400 mt-1">
                  {reviews[activeReviewIdx].role} {reviews[activeReviewIdx].organization && `• ${reviews[activeReviewIdx].organization}`}
                </div>
              </div>

              <div className="text-xs font-mono-tag text-neutral-400">
                PROJECT: <span className="text-white">{reviews[activeReviewIdx].project}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
