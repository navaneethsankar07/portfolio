import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, CheckCircle2, Cpu, Database, Server } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">

        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl glass-panel-glow border-cyan-500/30 bg-[#0B0F19] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            {project.category_display || project.category}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-cyan-300/90 font-medium mb-6">
            {project.subtitle}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-white/10">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demonstration</span>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>Source Code on GitHub</span>
              </a>
            )}
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              Project Overview
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture & Engineering Highlights */}
          {project.architecture_notes && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300 mb-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Architectural Design & Engineering Decisions</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.architecture_notes}
              </p>
            </div>
          )}

          {/* Key Implemented Features */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Key Features & Capabilities
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {project.key_features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
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

