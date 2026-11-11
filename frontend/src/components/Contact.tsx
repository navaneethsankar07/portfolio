import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, Mail, Phone, MapPin, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { Profile } from '../types';
import { api } from '../services/api';

interface ContactProps {
  profile: Profile | null;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const email = profile?.email || 'navaneethsankar07@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide your name, email, and message.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Failed to dispatch transmission. Please email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-36 relative bg-architectural-grid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-tag text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>(04) / DIRECT INQUIRIES &amp; BRIEFING</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-display">
              Initiate Contact.
            </h2>
          </div>

          <p className="text-sm font-sans text-neutral-300 max-w-md leading-relaxed">
            Open to full-stack engineering roles, high-throughput backend architecture contracts, and engineering collaborations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Big Email, Details & Socials (Spans 6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono-tag text-neutral-400 uppercase tracking-widest block mb-4">
                PRIMARY TRANSMISSION LINE
              </span>

              {/* Big Interactive Email Clicker */}
              <div
                onClick={copyEmail}
                className="group cursor-pointer inline-flex items-center gap-4 mb-8 p-5 sm:p-7 rounded-2xl bg-[#090B0F] border border-white/10 hover:border-white/30 transition-all w-full shadow-xl"
                data-cursor="COPY"
              >
                <div className="overflow-hidden">
                  <div className="text-lg sm:text-2xl font-bold font-display text-white group-hover:text-neutral-300 transition-colors truncate">
                    {email}
                  </div>
                  <div className="text-xs font-mono-tag text-neutral-400 mt-1 flex items-center gap-2">
                    {copied ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>COPIED TO CLIPBOARD</span>
                      </span>
                    ) : (
                      <span>CLICK TO COPY DIRECT EMAIL</span>
                    )}
                  </div>
                </div>
                <div className="ml-auto p-3 rounded-full bg-white/5 group-hover:bg-white text-neutral-400 group-hover:text-black transition-colors shrink-0">
                  {copied ? <Check className="w-4 h-4 text-emerald-400 group-hover:text-black" /> : <Copy className="w-4 h-4" />}
                </div>
              </div>

              {/* Contact Specifics */}
              <div className="space-y-4 text-xs font-mono-tag text-neutral-300">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <span className="text-neutral-500">PHONE / WHATSAPP</span>
                  <a href={`tel:${profile?.phone || '+919495874414'}`} className="text-white hover:underline">
                    {profile?.phone || '+91-9495874414'}
                  </a>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <span className="text-neutral-500">LOCATION</span>
                  <span className="text-white">{profile?.location || 'Kerala, India (Open to Global Remote)'}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <span className="text-neutral-500">AVAILABILITY</span>
                  <span className="text-emerald-400 font-bold">AVAILABLE / 2026</span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-8 border-t border-white/[0.08] flex items-center gap-6 text-xs font-mono-tag">
              <a
                href={profile?.github_url || 'https://github.com/navaneethsankar'}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile?.linkedin_url || 'https://www.linkedin.com/in/navaneethsankar/'}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/Navaneeth_Sankar_CV.pdf"
                target="_blank"
                download
                className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider ml-auto"
              >
                <span>DOWNLOAD CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Editorial Transmission Form (Spans 6 cols) */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090B0F] border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                Send Direct Dispatch
              </h3>
              <p className="text-xs font-mono-tag text-neutral-400 mb-8 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>STORED DIRECTLY IN POSTGRESQL &bull; FAST RESPONSE</span>
              </p>

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-white text-black font-mono-tag text-xs flex items-center justify-between">
                  <span>TRANSMISSION RECEIVED. I WILL REPLY PROMPTLY.</span>
                  <Check className="w-4 h-4" />
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 font-mono-tag text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest mb-2">
                    01 // YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Engineering Lead"
                    className="w-full pb-3 bg-transparent border-b border-white/15 focus:border-white focus:outline-none text-sm text-white font-sans transition-colors placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest mb-2">
                    02 // YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. lead@enterprise.com"
                    className="w-full pb-3 bg-transparent border-b border-white/15 focus:border-white focus:outline-none text-sm text-white font-sans transition-colors placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest mb-2">
                    03 // SUBJECT OR ROLE
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Python Full-Stack Engineer / Backend Contract"
                    className="w-full pb-3 bg-transparent border-b border-white/15 focus:border-white focus:outline-none text-sm text-white font-sans transition-colors placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest mb-2">
                    04 // MESSAGE TRANSMISSION *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your project scope, team requirements, or engineering inquiry..."
                    className="w-full pb-3 bg-transparent border-b border-white/15 focus:border-white focus:outline-none text-sm text-white font-sans transition-colors placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-white text-black font-bold font-mono-tag text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg"
                  data-cursor="TRANSMIT"
                >
                  <span>{submitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
