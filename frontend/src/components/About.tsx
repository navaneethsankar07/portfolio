import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowUpRight, CheckCircle2, Shield, Zap, Terminal, Sparkles } from 'lucide-react';
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
        "Navaneeth brings a rare combination of backend architectural discipline and frontend polish. His design of Celery workers and Redis caching in Grolance turned a heavy milestone billing process into a sub-second, production-grade workflow.",
      author: "Rahul K.",
      role: "Backend Engineer & Project Collaborator",
      project: "Grolance Platform Sprint",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "During our full-stack training at Brototype, Navaneeth consistently stood out for his clean architecture principles, mastery of Django REST Framework, and ability to debug complex WebSocket channel layers with zero fuss.",
      author: "Arjun Menon",
      role: "Technical Mentor",
      organization: "Brototype Engineering",
      project: "Full-Stack Specialization",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Collaborating with Navaneeth on the React and Django integration was effortless. His APIs were always strictly typed, thoughtfully paginated, and never had N+1 query bottlenecks. A reliable, high-output engineer.",
      author: "Aditya S.",
      role: "Frontend Developer",
      project: "ReStore Marketplace",
      rating: 5,
    },
  ];

  const philosophies = [
    {
      number: "01",
      title: "Relational Rigor & Query Discipline",
      summary:
        "No sloppy schema design. Every database relationship in PostgreSQL is modeled with ACID integrity, proper indexes, and selective query prefetching to eliminate N+1 latency entirely.",
    },
    {
      number: "02",
      title: "Asynchronous by Default",
      summary:
        "Any operation that takes longer than 100ms—payment webhooks, PDF invoices, email dispatches—is offloaded to background Celery workers backed by in-memory Redis message queues.",
    },
    {
      number: "03",
      title: "Deterministic Reactive Interfaces",
      summary:
        "Frontend engineering is not just styling; it is state orchestration. Building with React 18, TypeScript, and Tailwind ensures strictly typed components, predictable state trees, and zero layout shift.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>(02)</span>
              <span>/</span>
              <span>EXPERIENCE, PHILOSOPHY & REVIEWS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-display">
              The Architecture.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-400 max-w-md leading-relaxed">
            Bridging high-throughput backend engineering with refined, editorial user experiences. Here is how I think, build, and collaborate.
          </p>
        </div>

        {/* 1. Years of Experience & Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-16 mb-20 border-b border-white/[0.08]">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-display mb-1">
              1+
            </div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider">
              Years Dedicated Engineering
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-display mb-1">
              {stats?.projects_count || 3}
            </div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider">
              Flagship Full-Stack Platforms
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-display mb-1">
              {stats?.skills_count || 25}+
            </div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider">
              Technologies in Production Stack
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-display mb-1">
              0ms
            </div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-wider">
              Blocking Request Overhead
            </div>
          </div>
        </div>

        {/* 2. Engineering & Design Philosophy */}
        <div id="philosophy" className="mb-24">
          <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-6">
            // CORE DESIGN & ENGINEERING PHILOSOPHY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophies.map((phil) => (
              <div
                key={phil.number}
                className="p-8 rounded-2xl bg-[#0D0E12] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono-tag text-white font-bold mb-4">
                    [{phil.number}]
                  </div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3">
                    {phil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                    {phil.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11px] font-mono-tag text-neutral-500 uppercase tracking-widest">
                  STRICT ENFORCEMENT
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Reviews from Previous Teammates & Collaborators */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-1">
                // PEER TESTIMONIALS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display uppercase text-white">
                Reviews from Teammates.
              </h3>
            </div>

            {/* Selector Buttons */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIdx(i)}
                  className={`w-9 h-9 rounded-full text-xs font-mono-tag transition-all ${
                    activeReviewIdx === i
                      ? 'bg-white text-black font-bold'
                      : 'border border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Active Display Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0E12] border border-white/10 relative overflow-hidden">
            <Quote className="w-12 h-12 text-white/[0.06] absolute top-8 right-8 pointer-events-none" />

            <div className="max-w-3xl">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6 text-white">
                {[...Array(reviews[activeReviewIdx].rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-white" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-2xl font-sans font-light text-white leading-relaxed mb-8 italic">
                "{reviews[activeReviewIdx].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase tracking-wide text-sm font-display">
                    {reviews[activeReviewIdx].author}
                  </div>
                  <div className="text-xs font-mono-tag text-neutral-400">
                    {reviews[activeReviewIdx].role} • {reviews[activeReviewIdx].project}
                  </div>
                </div>

                <div className="hidden sm:block text-[11px] font-mono-tag text-neutral-500 uppercase tracking-wider">
                  VERIFIED PEER FEEDBACK
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
