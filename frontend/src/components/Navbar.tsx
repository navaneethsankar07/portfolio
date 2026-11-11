import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Shield, Menu, X, Command } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenCommandPalette }) => {
  const { isAuthenticated } = useAuth();
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT & REVIEWS', href: '#about' },
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08080A]/90 backdrop-blur-xl border-b border-white/[0.08] py-4'
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Left: Brand Monogram / Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight uppercase text-white group-hover:text-neutral-300 transition-colors">
              Navaneeth Sankar
            </span>
            <span className="text-[10px] font-mono-tag text-neutral-400 uppercase tracking-widest">
              Full-Stack Architect
            </span>
          </div>
        </a>

        {/* Center: Live Time & Status (Desktop only) */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono-tag text-neutral-400 uppercase tracking-wider">
          <span className="border border-white/10 px-2.5 py-1 rounded-full bg-white/[0.02]">
            KERALA, IN [IST {time || '09:05 AM'}]
          </span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-300 flex items-center gap-1.5">
            AVAILABLE FOR HIRE [2026]
          </span>
        </div>

        {/* Right: Navigation Links & Actions */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono-tag text-neutral-300 hover:text-white transition-colors tracking-widest relative group"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {/* Cmd+K trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-xs font-mono-tag flex items-center gap-1"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="text-[10px]">⌘K</span>
            </button>

            {/* Admin Portal */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg transition-all text-xs font-mono-tag flex items-center gap-1.5 ${
                isAuthenticated
                  ? 'text-white bg-white/10 border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase">{isAuthenticated ? 'Admin' : 'Login'}</span>
            </button>

            {/* Resume button */}
            <a
              href="/Navaneeth_Sankar_CV.pdf"
              target="_blank"
              download
              className="flex items-center gap-1.5 text-xs font-mono-tag px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white text-black font-semibold hover:bg-neutral-200 transition-all uppercase tracking-wider"
            >
              <span>CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0E12] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono-tag text-neutral-200 hover:text-white tracking-widest py-1"
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
              className="text-xs font-mono-tag px-4 py-2 bg-white text-black rounded-full font-bold"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
