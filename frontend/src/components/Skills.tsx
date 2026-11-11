import React, { useState } from 'react';
import { Server, Database, Layout, Cloud, Wrench, Code2, Cpu, Search, Check, Sparkles } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

interface CapabilityItem {
  name: string;
  category: 'backend' | 'database' | 'frontend' | 'devops' | 'tools';
  categoryLabel: string;
  tier: 'CORE STACK' | 'SYSTEMS ARCHITECTURE' | 'PRODUCTION DEPLOYED';
  role: string;
  description: string;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ALL CAPABILITIES' },
    { id: 'backend', label: 'BACKEND & DISTRIBUTED' },
    { id: 'database', label: 'DATABASES & CACHING' },
    { id: 'frontend', label: 'FRONTEND & REACT' },
    { id: 'devops', label: 'DEVOPS & CLOUD' },
    { id: 'tools', label: 'INTEGRATIONS & AUTH' },
  ];

  const capabilities: CapabilityItem[] = [
    {
      name: "Python 3 & Django / DRF",
      category: "backend",
      categoryLabel: "Backend & Distributed",
      tier: "CORE STACK",
      role: "Distributed RESTful Architecture",
      description: "Engineered scalable REST services with serializers, viewsets, query optimizations (select_related / prefetch_related), and granular permission classes.",
    },
    {
      name: "Celery & Redis Task Broker",
      category: "backend",
      categoryLabel: "Backend & Distributed",
      tier: "SYSTEMS ARCHITECTURE",
      role: "Asynchronous Queue Pipeline",
      description: "Offloaded compute-heavy operations like PDF invoice generation and transactional email alerts to background Celery workers, keeping API latency <40ms.",
    },
    {
      name: "Django Channels (WebSockets)",
      category: "backend",
      categoryLabel: "Backend & Distributed",
      tier: "SYSTEMS ARCHITECTURE",
      role: "Bidirectional Real-Time Streaming",
      description: "Architected ASGI WebSocket consumers backed by Redis channel layers for sub-5ms full-duplex message delivery and presence tracking.",
    },
    {
      name: "PostgreSQL Relational DB",
      category: "database",
      categoryLabel: "Databases & Caching",
      tier: "CORE STACK",
      role: "ACID Relational Modeling",
      description: "Structured normalized database schemas with foreign keys, unique constraints, transactional integrity, and B-Tree indexes for fast indexing.",
    },
    {
      name: "Redis In-Memory Cache",
      category: "database",
      categoryLabel: "Databases & Caching",
      tier: "SYSTEMS ARCHITECTURE",
      role: "In-Memory Caching & Pub/Sub",
      description: "Configured high-speed caching layers for hot query results and distributed message routing for Django Channels ASGI workers.",
    },
    {
      name: "React 18 & TypeScript",
      category: "frontend",
      categoryLabel: "Frontend & React",
      tier: "CORE STACK",
      role: "Predictable Reactive Interfaces",
      description: "Built modular, strictly typed design systems with functional components, custom hooks, and zero unintended re-renders.",
    },
    {
      name: "Redux Toolkit & State Slices",
      category: "frontend",
      categoryLabel: "Frontend & React",
      tier: "CORE STACK",
      role: "Centralized State Management",
      description: "Architected predictable global state containers for complex client applications including cart mutations, filter engines, and authenticated user sessions.",
    },
    {
      name: "Tailwind CSS & Editorial Design",
      category: "frontend",
      categoryLabel: "Frontend & React",
      tier: "CORE STACK",
      role: "High-Fidelity Typography & Layouts",
      description: "Crafted dark-aesthetic, responsive, editorial layouts with fluid spacing, micro-interactions, and bespoke typography treatments.",
    },
    {
      name: "Docker Containerization",
      category: "devops",
      categoryLabel: "DevOps & Cloud",
      tier: "PRODUCTION DEPLOYED",
      role: "Multi-Service Containerization",
      description: "Authored multi-stage Dockerfiles and docker-compose configurations orchestrating Django, PostgreSQL, Redis, and Celery services.",
    },
    {
      name: "AWS EC2 & Nginx Reverse Proxy",
      category: "devops",
      categoryLabel: "DevOps & Cloud",
      tier: "PRODUCTION DEPLOYED",
      role: "Cloud Infrastructure & SSL",
      description: "Deployed production servers with Nginx reverse proxying, Gunicorn WSGI processes, Daphne ASGI daemons, and automated SSL certificates via Certbot.",
    },
    {
      name: "JWT Authentication & RBAC",
      category: "tools",
      categoryLabel: "Integrations & Auth",
      tier: "SYSTEMS ARCHITECTURE",
      role: "Stateless Token Security",
      description: "Implemented role-based access control with stateless JSON Web Tokens, httpOnly secure cookie storage, and automated silent refresh rotation.",
    },
    {
      name: "Cloudinary CDN & Media Pipeline",
      category: "tools",
      categoryLabel: "Integrations & Auth",
      tier: "PRODUCTION DEPLOYED",
      role: "Automated Asset Compression",
      description: "Integrated cloud media transformation pipelines delivering responsive WebP/AVIF formats with 96% reduction in transfer payload sizes.",
    },
  ];

  const filteredCapabilities = capabilities.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="capabilities" className="py-24 sm:py-36 border-b border-white/[0.08] relative bg-architectural-grid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>(02) / TECHNICAL ARSENAL &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white font-display">
              Stack &amp; Tooling.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-300 max-w-md leading-relaxed">
            Full-stack engineering capabilities across distributed server backends, relational databases, cloud containerization, and modern client architectures.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = cat.id === 'all'
                ? capabilities.length
                : capabilities.filter((s) => s.category === cat.id).length;

              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono-tag tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* High-Fidelity Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCapabilities.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090B0F] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl"
            >
              <div>
                {/* Header Tag Line */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <span className="text-[10px] font-mono-tag px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-wider">
                    {item.tier}
                  </span>
                  <span className="text-[10px] font-mono-tag text-emerald-400 uppercase">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Tech Title */}
                <h3 className="text-xl font-bold font-display text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                  {item.name}
                </h3>

                <div className="text-xs font-mono-tag text-cyan-400 uppercase tracking-wide mb-3">
                  {item.role}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Status */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-tag text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Production Verified</span>
                </span>
                <span className="text-neutral-500">Zero Technical Debt</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
