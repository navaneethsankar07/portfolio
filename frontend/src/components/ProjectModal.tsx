import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, CheckCircle2, Server, Zap, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl">
        
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#07080C] border border-white/15 rounded-3xl p-6 sm:p-12 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-electric-cyan transition-all bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Meta Header */}
          <div className="flex items-center gap-3 text-xs font-mono-tag text-electric-cyan uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
            <span className="text-white font-bold">CASE STUDY DEEP-DIVE</span>
            <span className="text-neutral-600">/</span>
            <span>{project.category_display || project.category}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mb-2 tracking-tight">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono-tag text-neutral-400 mb-8 uppercase tracking-wide">
            {project.subtitle}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-white/[0.08]">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tag uppercase tracking-wider hover:bg-electric-cyan transition-all shadow-md"
              >
                <span>LIVE PRODUCTION DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white font-mono-tag text-xs uppercase tracking-wider hover:bg-white/5 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}
          </div>

          {/* Overview */}
          <div className="mb-8">
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-electric-cyan mb-3 flex items-center gap-2">
              <Server className="w-3.5 h-3.5" />
              <span>// SYSTEM OVERVIEW</span>
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Architecture & Scaling Decisions */}
          {project.architecture_notes && (
            <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-white mb-3">
                <Cpu className="w-4 h-4 text-electric-cyan" />
                <span>SYSTEM ARCHITECTURE &amp; SCALING DECISIONS</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {project.architecture_notes}
              </p>
            </div>
          )}

          {/* Key Implemented Capabilities */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-mono-tag uppercase tracking-widest text-electric-cyan mb-4 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                <span>// IMPLEMENTED SYSTEM CAPABILITIES</span>
              </h4>
              <div className="space-y-3">
                {project.key_features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>// INFRASTRUCTURE &amp; TECHNOLOGIES</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono-tag text-white uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
