import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CommandPalette } from './components/CommandPalette';
import { AdminPortal } from './admin/AdminPortal';
import { api } from './services/api';
import { Profile, Skill, Project, Experience as ExperienceType, Article, PublicStats } from './types';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals & Panels
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  const fetchAllData = async () => {
    try {
      const [profData, skillsData, projData, expData, artData, statsData] = await Promise.allSettled([
        api.getProfile(),
        api.getSkills(),
        api.getProjects(),
        api.getExperiences(),
        api.getArticles(),
        api.getPublicStats(),
      ]);

      if (profData.status === 'fulfilled') setProfile(profData.value);
      if (skillsData.status === 'fulfilled') setSkills(skillsData.value);
      if (projData.status === 'fulfilled') setProjects(projData.value);
      if (expData.status === 'fulfilled') setExperiences(expData.value);
      if (artData.status === 'fulfilled') setArticles(artData.value);
      if (statsData.status === 'fulfilled') setStats(statsData.value);
    } catch (e) {
      console.error('Data fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    // Record page visit
    api.recordVisit(window.location.pathname).catch(() => {});
  }, []);

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-dark text-cyber-text font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Dynamic Animated Particle & Ambient Grid Canvas */}
      <ParticleBackground />

      {/* Cyber Grid background subtle overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40 -z-10" />

      {/* Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero */}
        <Hero
          profile={profile}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* About & Core Pillars */}
        <About
          profile={profile}
          stats={stats}
        />

        {/* Categorized Skills Matrix */}
        <Skills skills={skills} />

        {/* Featured Projects with Architecture Modal */}
        <Projects projects={projects} />

        {/* Career & Training Timeline */}
        <Experience experiences={experiences} />

        {/* Engineering Blog */}
        <Blog articles={articles} />

        {/* Contact & Inquiries Form */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        stats={stats}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Interactive Terminal CLI */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
      />

      {/* Cmd+K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        profile={profile}
        projects={projects}
      />

      {/* Admin Management Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        articles={articles}
        onRefreshAll={fetchAllData}
      />

    </div>
  );
};

export default App;

