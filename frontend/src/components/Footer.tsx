import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile | null;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#020204] py-16 sm:py-24 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Massive Typographic Signature */}
        <div className="pb-16 border-b border-white/[0.08]">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[108px] font-extrabold uppercase font-display tracking-tighter text-white/90 leading-none select-none hover:text-electric-cyan transition-colors duration-700">
            NAVANEETH SANKAR
          </h2>
        </div>

        {/* Bottom Metadata & Controls */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono-tag">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="text-neutral-500">
              &copy; {new Date().getFullYear()} NAVANEETH SANKAR. ALL RIGHTS RESERVED.
            </span>
            <span className="text-neutral-700 hidden sm:inline">&bull;</span>
            <span className="text-neutral-400">
              ARCHITECTURE: DJANGO REST + POSTGRESQL + REACT TS
            </span>
          </div>

          <div className="flex items-center gap-6 ml-auto md:ml-0">
            <button
              onClick={onOpenAdmin}
              className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ADMIN ACCESS</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-white/10 hover:border-electric-cyan text-white transition-all flex items-center gap-1 bg-white/5"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
