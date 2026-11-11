import React, { useState } from 'react';
import { Server, Database, Layout, Cloud, Wrench, Code2, Cpu } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL CAPABILITIES' },
    { id: 'backend', label: 'BACKEND & APIS' },
    { id: 'database', label: 'DATABASES & REDIS' },
    { id: 'frontend', label: 'FRONTEND & REACT' },
    { id: 'devops', label: 'CLOUD & DEVOPS' },
    { id: 'tools', label: 'INTEGRATIONS & TOOLS' },
  ];

  const defaultSkills: Partial<Skill>[] = [
    { name: 'Python', category: 'backend', proficiency: 95, level_label: 'Expert' },
    { name: 'Django & DRF', category: 'backend', proficiency: 95, level_label: 'Expert' },
    { name: 'Celery & Redis', category: 'backend', proficiency: 90, level_label: 'Advanced' },
    { name: 'Django Channels', category: 'backend', proficiency: 88, level_label: 'Advanced' },
    { name: 'PostgreSQL', category: 'database', proficiency: 92, level_label: 'Expert' },
    { name: 'React.js & TS', category: 'frontend', proficiency: 92, level_label: 'Advanced' },
    { name: 'Redux Toolkit', category: 'frontend', proficiency: 88, level_label: 'Advanced' },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 94, level_label: 'Expert' },
    { name: 'Docker', category: 'devops', proficiency: 85, level_label: 'Advanced' },
    { name: 'AWS EC2 & Nginx', category: 'devops', proficiency: 82, level_label: 'Proficient' },
    { name: 'CI/CD Pipelines', category: 'devops', proficiency: 84, level_label: 'Proficient' },
    { name: 'PayPal & Cloudinary', category: 'tools', proficiency: 88, level_label: 'Advanced' },
  ];

  const skillList = skills && skills.length > 0 ? skills : (defaultSkills as Skill[]);

  const filteredSkills = activeCategory === 'all'
    ? skillList
    : skillList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              <span>(02) / TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white font-display">
              Stack & Tooling.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-400 max-w-md leading-relaxed">
            Full-stack engineering capabilities across distributed server backends, relational databases, cloud containerization, and modern client architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? skillList.length
              : skillList.filter((s) => s.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tag tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid of Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold uppercase font-display text-white">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono-tag px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 uppercase">
                    {skill.level_label || 'ADVANCED'}
                  </span>
                </div>

                <div className="text-[11px] font-mono-tag text-neutral-500 uppercase tracking-wider mb-4">
                  {skill.category_display || skill.category}
                </div>
              </div>

              {/* Minimal Progress Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-mono-tag text-neutral-400 mb-1.5">
                  <span>PROFICIENCY</span>
                  <span className="text-white font-bold">{skill.proficiency}%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
