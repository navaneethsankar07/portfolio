import React from 'react';
import { Github, Linkedin, Mail, Heart, Code2, Terminal } from 'lucide-react';
import { Profile, PublicStats } from '../types';

interface FooterProps {
  profile: Profile | null;
  stats: PublicStats | null;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, stats, onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/5 bg-[#05070B] py-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm">
              NS
            </div>
            <div>
              <div className="text-sm font-bold text-white">Navaneeth Sankar</div>
              <div className="text-xs text-slate-500 font-mono">Python Full Stack Developer</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#timeline" className="hover:text-cyan-300 transition-colors">Timeline</a>
            <a href="#blog" className="hover:text-cyan-300 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
            <button onClick={onOpenAdmin} className="text-purple-400 hover:text-purple-300 transition-colors">
              Admin Portal
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={profile?.github_url || 'https://github.com/navaneethsankar'}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile?.linkedin_url || 'https://www.linkedin.com/in/navaneethsankar/'}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile?.email || 'navaneethsankar07@gmail.com'}`}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Stats */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Navaneeth Sankar. Engineered with Django & React.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry: {stats?.total_visits || 142} Visits</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">DRF + React TS + Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

