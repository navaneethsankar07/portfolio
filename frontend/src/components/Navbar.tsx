import React, { useState, useEffect } from 'react';
import { Terminal, Command, Shield, Menu, X, ExternalLink, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenCommandPalette,
  onOpenAdmin,
}) => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Engineering Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-panel-glow border-cyan-500/20 shadow-2xl bg-cyber-dark/85'
            : 'glass-panel border-white/10 bg-cyber-dark/60'
        }`}
      >
        {/* Monogram / Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-base shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
            NS
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>Navaneeth Sankar</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" title="Available for hire" />
            </div>
            <div className="text-xs text-cyber-muted font-mono flex items-center gap-1">
              <Code2 className="w-3 h-3 text-cyan-400" />
              <span>Full Stack Python/Django</span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs lg:text-sm font-medium px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Cmd+K trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 bg-white/5 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-500/40 rounded-lg transition-all"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cmd+K</span>
          </button>

          {/* Terminal CLI trigger */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 bg-white/5 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 rounded-lg transition-all"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Terminal</span>
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isAuthenticated
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-200 hover:bg-purple-900/60'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Admin Portal (CRUD Projects, Skills, Messages)"
          >
            <Shield className={`w-3.5 h-3.5 ${isAuthenticated ? 'text-purple-400 animate-pulse' : 'text-slate-400'}`} />
            <span>{isAuthenticated ? 'Admin Active' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 glass-panel border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50 bg-cyber-dark/95">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-lg"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Cmd+K</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 rounded-lg"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

