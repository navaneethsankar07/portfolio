import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const flagshipProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="relative min-h-screen bg-[#08080A] text-[#EDEDED] font-sans selection:bg-white selection:text-black">
      
      {/* Luxury Film Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Bespoke Interactive Custom Cursor */}
      <CustomCursor />

      {/* High-End Editorial Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main>
        {/* Editorial Hero with Peak Work Above The Fold */}
        <Hero
          profile={profile}
          flagshipProject={flagshipProject}
          onOpenProject={(proj) => setSelectedProject(proj)}
        />

        {/* Selected Works (Curated Case Studies) */}
        <Projects projects={projects} />

        {/* About, Philosophy & Verified Teammate Reviews */}
        <About
          profile={profile}
          stats={stats}
        />

        {/* High-Fidelity Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Editorial Footer */}
      <Footer
        profile={profile}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => {}}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        profile={profile}
        projects={projects}
      />

      {/* Custom React Admin Management Portal */}
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
