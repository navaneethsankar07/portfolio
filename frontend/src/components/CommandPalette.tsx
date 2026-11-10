import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, Terminal, FileText, Mail, 
  Github, Linkedin, ExternalLink, Shield, Code2 
} from 'lucide-react';
import { Profile, Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenAdmin: () => void;
  profile: Profile | null;
  projects: Project[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenAdmin,
  profile,
  projects,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    // Sections
    { id: 'sec-about', label: 'Go to About Me', category: 'Navigation', icon: Code2, action: () => { window.location.hash = '#about'; onClose(); } },
    { id: 'sec-skills', label: 'Go to Technical Skills', category: 'Navigation', icon: Code2, action: () => { window.location.hash = '#skills'; onClose(); } },
    { id: 'sec-projects', label: 'Go to Projects Showcase', category: 'Navigation', icon: Code2, action: () => { window.location.hash = '#projects'; onClose(); } },
    { id: 'sec-timeline', label: 'Go to Career Timeline', category: 'Navigation', icon: Code2, action: () => { window.location.hash = '#timeline'; onClose(); } },
    { id: 'sec-blog', label: 'Go to Engineering Blog', category: 'Navigation', icon: Code2, action: () => { window.location.hash = '#blog'; onClose(); } },
    { id: 'sec-contact', label: 'Go to Contact Form', category: 'Navigation', icon: Mail, action: () => { window.location.hash = '#contact'; onClose(); } },
    
    // Tools
    { id: 'act-terminal', label: 'Open Interactive Dev CLI', category: 'Tools', icon: Terminal, action: () => { onClose(); onOpenTerminal(); } },
    { id: 'act-admin', label: 'Open Admin Management Portal', category: 'Tools', icon: Shield, action: () => { onClose(); onOpenAdmin(); } },
    { id: 'act-resume', label: 'Download Resume (CV PDF)', category: 'Actions', icon: FileText, action: () => { window.open(profile?.resume_url || '#', '_blank'); onClose(); } },
    
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.title} (${p.subtitle})`,
      category: 'Projects',
      icon: ExternalLink,
      action: () => { window.location.hash = '#projects'; onClose(); },
    })),

    // Socials
    { id: 'soc-github', label: 'Open GitHub Profile', category: 'Links', icon: Github, action: () => { window.open(profile?.github_url || 'https://github.com/navaneethsankar', '_blank'); onClose(); } },
    { id: 'soc-linkedin', label: 'Open LinkedIn Profile', category: 'Links', icon: Linkedin, action: () => { window.open(profile?.linkedin_url || 'https://www.linkedin.com/in/navaneethsankar/', '_blank'); onClose(); } },
  ];

  const filtered = items.filter((it) =>
    it.label.toLowerCase().includes(query.toLowerCase()) ||
    it.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl glass-panel-glow border-cyan-500/30 bg-[#0B0F19] rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-black/30">
            <Search className="w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections, projects, commands, social links..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-500"
              autoFocus
            />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
              ESC to exit
            </span>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-slate-500">
                No matching results found for "{query}".
              </div>
            ) : (
              filtered.map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-cyan-950/60 border border-white/5 group-hover:border-cyan-500/30 text-slate-400 group-hover:text-cyan-300">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

