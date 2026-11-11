import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work', number: '01' },
    { label: 'Stack', href: '#stack', number: '02' },
    { label: 'Philosophy', href: '#philosophy', number: '03' },
    { label: 'Testimonials', href: '#testimonials', number: '04' },
    { label: 'Contact', href: '#contact', number: '05' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#030305]/80 backdrop-blur-2xl border-b border-white/[0.08]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left: Identity & Availability */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-electric-cyan transition-colors">
            NAVANEETH SANKAR
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-[10px] font-mono-tag text-electric-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            <span>AVAILABLE</span>
          </span>
        </a>

        {/* Center: Floating Capsule Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono-tag text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all tracking-wider flex items-center gap-1.5"
            >
              <span className="text-[9px] text-neutral-600">{item.number}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Time & Contact Action */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="text-[11px] font-mono-tag text-neutral-400 flex items-center gap-2">
            <span className="text-neutral-600">KERALA</span>
            <span className="text-white font-mono">{currentTime || '10:00 AM'}</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold font-mono-tag tracking-wider hover:bg-electric-cyan transition-all shadow-md group"
          >
            <span>Initiate Brief</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07080B] border-b border-white/10 px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-mono-tag text-neutral-200 hover:text-white py-1.5"
            >
              <span>{item.label}</span>
              <span className="text-xs text-neutral-500">{item.number}</span>
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="/Navaneeth_Sankar_CV.pdf"
              target="_blank"
              download
              className="text-xs font-mono-tag text-neutral-300 hover:text-white"
            >
              DOWNLOAD RESUME [PDF]
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono-tag px-4 py-1.5 bg-electric-cyan text-black rounded-full font-bold"
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
