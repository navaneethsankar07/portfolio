import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Cpu, Workflow, Radio, ShieldCheck, Atom, Layers, 
  Palette, Code2, Component, FileCode2, Code, Binary, Database, 
  Zap, Search, Box, Cloud, GitMerge, Globe, Boxes, GitBranch, 
  CreditCard, Image, CheckCircle2, Terminal, Filter 
} from 'lucide-react';
import { Skill, SkillCategory } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const iconMap: Record<string, React.ElementType> = {
  Server, Cpu, Workflow, Radio, ShieldCheck, Atom, Layers,
  Palette, Code2, Component, FileCode2, Code, Binary, Database,
  Zap, Search, Box, Cloud, GitMerge, Globe, Boxes, GitBranch,
  CreditCard, Image, CheckCircle2
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'backend', label: 'Backend (Django & DRF)' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'database', label: 'Databases & Redis' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'programming', label: 'Languages & DSA' },
    { id: 'tools', label: 'Tools & APIs' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // SKILL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Arsenal & Tooling
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Categorized overview of backend frameworks, reactive libraries, cloud platforms, and engineering methodologies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count = cat.id === 'all' 
              ? skills.length 
              : skills.filter((s) => s.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'glass-panel text-slate-400 hover:text-slate-200 border-white/5 hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-cyan-400 text-black font-bold' : 'bg-white/10 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const IconComp = iconMap[skill.icon_name] || Code2;
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon, Name & Level */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-cyan-950/40 border border-white/10 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors">
                          <IconComp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400 capitalize">
                            {skill.category_display || skill.category}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {skill.level_label || 'Advanced'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-slate-400">Proficiency</span>
                      <span className="text-cyan-300 font-semibold">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

