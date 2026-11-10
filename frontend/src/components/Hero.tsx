import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Download, Terminal as TerminalIcon, Github, Linkedin, 
  Mail, Sparkles, CheckCircle2, Copy, Check 
} from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
  onOpenTerminal: () => void;
}

const titles = [
  "Python Full Stack Developer",
  "Django & DRF Backend Specialist",
  "React.js & TypeScript UI Engineer",
  "Celery, Redis & WebSockets Architect"
];

export const Hero: React.FC<HeroProps> = ({ profile, onOpenTerminal }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const codeSnippet = `# Navaneeth Sankar - Core Stack
from rest_framework import viewsets, permissions
from celery import shared_task
import redis

class ScalableBackend(viewsets.ModelViewSet):
    """
    Production-grade Django REST APIs with Celery
    asynchronous workers & in-memory Redis cache.
    """
    queryset = Project.objects.select_related('category')
    permission_classes = [permissions.IsAuthenticated]

    @shared_task
    def process_async_pipeline(payload_id):
        # Offload high-latency tasks
        return celery_worker.execute(payload_id)`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[350px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Roles, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-sm shadow-cyan-900/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile?.status_text || "Available for Full Stack & Backend Roles"}</span>
            </motion.div>

            {/* Main Greeting & Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Navaneeth Sankar</span>
            </motion.h1>

            {/* Dynamic Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden"
            >
              <span className="text-xl sm:text-2xl font-mono text-slate-300 flex items-center">
                <span className="text-cyan-400 mr-2">&gt;</span>
                <motion.span
                  key={titleIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-semibold text-slate-100"
                >
                  {titles[titleIndex]}
                </motion.span>
                <span className="inline-block w-2 h-5 bg-cyan-400 ml-1.5 animate-pulse" />
              </span>
            </motion.div>

            {/* Short Bio Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300/90 leading-relaxed mb-8 max-w-2xl font-normal"
            >
              Specializing in architecting scalable full-stack web applications with <span className="text-cyan-400 font-semibold">Python</span>, <span className="text-cyan-400 font-semibold">Django REST Framework</span>, and <span className="text-indigo-400 font-semibold">React</span>. Experienced in designing resilient database architectures with <span className="text-slate-100 font-medium">PostgreSQL</span>, asynchronous background processing with <span className="text-slate-100 font-medium">Redis & Celery</span>, and low-latency real-time WebSockets with <span className="text-slate-100 font-medium">Django Channels</span>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-black bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Get In Touch</span>
              </a>

              <a
                href={profile?.resume_url || "#contact"}
                target="_blank"
                rel="noreferrer"
                download="Navaneeth_Sankar_CV.pdf"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:text-white"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download CV</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-slate-400 hover:text-cyan-300 bg-black/40 border border-slate-800 hover:border-cyan-500/50 transition-all"
                title="Launch interactive hacker CLI"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>CLI Mode</span>
              </button>
            </motion.div>

            {/* Quick Social & Contact Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 text-slate-400"
            >
              <a
                href={profile?.github_url || "https://github.com/navaneethsankar"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white hover:scale-110 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile?.linkedin_url || "https://www.linkedin.com/in/navaneethsankar/"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <div className="text-xs font-mono text-slate-400">
                <span>📍 {profile?.location || "Kerala, India"}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High-Tech Code Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Border */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative rounded-2xl bg-[#0B0F19] border border-cyan-500/20 shadow-2xl overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#070A11] border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">views.py — Django & Celery</span>
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 text-slate-400 hover:text-cyan-300 transition-colors rounded-md hover:bg-white/5"
                  title="Copy snippet"
                >
                  {copiedSnippet ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto">
                <pre>
                  <code>
                    <span className="text-purple-400"># Core Architecture</span>{'\n'}
                    <span className="text-cyan-400">from</span> rest_framework <span className="text-cyan-400">import</span> viewsets, permissions{'\n'}
                    <span className="text-cyan-400">from</span> celery <span className="text-cyan-400">import</span> shared_task{'\n'}
                    <span className="text-cyan-400">import</span> redis{'\n\n'}
                    <span className="text-yellow-400">class</span> <span className="text-emerald-400">ScalableFullStack</span>(viewsets.ModelViewSet):{'\n'}
                    {'    '}<span className="text-slate-400">""" High-throughput Django REST Backend """</span>{'\n'}
                    {'    '}queryset = Project.objects.select_related(<span className="text-amber-300">'category'</span>){'\n'}
                    {'    '}permission_classes = [permissions.IsAuthenticated]{'\n\n'}
                    {'    '}<span className="text-purple-400">@shared_task</span>{'\n'}
                    {'    '}<span className="text-cyan-400">def</span> <span className="text-blue-400">async_worker_pipeline</span>(payload):{'\n'}
                    {'        '}<span className="text-slate-500"># Offloads heavy tasks to Redis + Celery</span>{'\n'}
                    {'        '}<span className="text-cyan-400">return</span> celery_queue.dispatch(payload){'\n\n'}
                    <span className="text-emerald-400">✓ 0ms Blocking Latency</span> | <span className="text-cyan-400">✓ Redis Cache Hit</span>
                  </code>
                </pre>
              </div>

              {/* Bottom System Stats Bar */}
              <div className="px-4 py-2.5 bg-black/40 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>REST API: Online</span>
                  </span>
                  <span>PostgreSQL: Connected</span>
                </div>
                <div className="text-cyan-400">Python 3.12</div>
              </div>

            </div>

            {/* Floating Tech Badges */}
            <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Django Channels + WebSockets</span>
            </div>
            <div className="absolute -top-4 -right-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border-purple-500/30 text-xs font-mono text-purple-300 shadow-xl">
              <span>React 18 + Redux Toolkit</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

