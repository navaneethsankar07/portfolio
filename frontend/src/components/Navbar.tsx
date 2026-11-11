import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Shield, Menu, X, Command } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenCommandPalette }) => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Philosophy & Reviews', href: '#philosophy' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050608]/90 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white text-black font-extrabold text-xs flex items-center justify-center font-mono-tag shadow-md">
            NS
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              Navaneeth Sankar
            </div>
            <div className="text-[11px] font-mono-tag text-neutral-400">
              Python Full-Stack &amp; DRF
            </div>
          </div>
        </a>

        {/* Center: Status Indicator Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-tag text-neutral-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Roles [2026]</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">Kerala, India</span>
        </div>

        {/* Right: Navigation Links & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-xs font-mono-tag text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors tracking-wider uppercase text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {/* Cmd+K trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono-tag text-neutral-400 hover:text-white transition-all flex items-center gap-1.5"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-3 h-3" />
              <span>⌘K</span>
            </button>

            {/* Admin trigger */}
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-md transition-all text-xs ${
                isAuthenticated
                  ? 'text-white bg-white/10 border border-white/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Admin Console"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* Download CV */}
            <a
              href="/Navaneeth_Sankar_CV.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono-tag tracking-wider hover:bg-neutral-200 transition-all shadow-sm"
            >
              <span>CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C10] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono-tag text-neutral-200 hover:text-white py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="text-xs font-mono-tag text-neutral-400 hover:text-white"
            >
              ADMIN PORTAL
            </button>
            <a
              href="/Navaneeth_Sankar_CV.pdf"
              target="_blank"
              download
              className="text-xs font-mono-tag px-4 py-1.5 bg-white text-black rounded-full font-bold"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
