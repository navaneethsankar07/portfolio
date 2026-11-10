import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, ExternalLink, Github, Cpu } from 'lucide-react';
import { Project } from '../types';
import { api } from '../services/api';

interface ProjectsManagerProps {
  projects: Project[];
  onRefresh: () => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onRefresh }) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'fullstack',
    description: '',
    architecture_notes: '',
    tech_stack: [],
    key_features: [],
    live_url: '',
    github_url: '',
    image_url: '',
    featured: true,
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'fullstack',
      description: '',
      architecture_notes: '',
      tech_stack: ['Django', 'React'],
      key_features: [],
      live_url: '',
      github_url: '',
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      featured: true,
    });
    setTechInput('');
    setFeatureInput('');
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreating(false);
    setFormData({ ...project });
    setTechInput('');
    setFeatureInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isCreating) {
        await api.createProject(formData);
      } else if (editingProject && editingProject.id) {
        await api.updateProject(editingProject.id, formData);
      }
      setIsCreating(false);
      setEditingProject(null);
      onRefresh();
    } catch (err: any) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      onRefresh();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        tech_stack: [...(formData.tech_stack || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTech = (t: string) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack?.filter((x) => x !== t) || [],
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        key_features: [...(formData.key_features || []), featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (f: string) => {
    setFormData({
      ...formData,
      key_features: formData.key_features?.filter((x) => x !== f) || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white">Project Portfolio Manager</h3>
          <p className="text-xs text-slate-400 font-mono">
            Create, update, or remove projects shown on your live portfolio.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {(isCreating || editingProject) && (
        <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-cyan-300">
              {isCreating ? 'Create New Project' : `Edit "${editingProject?.title}"`}
            </h4>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded-xl">{error}</div>}

          <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Subtitle / Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="fullstack">Full-Stack Platforms</option>
                  <option value="realtime">Real-Time & WebSockets</option>
                  <option value="marketplace">E-Commerce & Marketplaces</option>
                  <option value="backend">Backend APIs & Microservices</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Image URL Preview</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1">Architecture & Engineering Notes</label>
              <textarea
                rows={3}
                value={formData.architecture_notes}
                onChange={(e) => setFormData({ ...formData, architecture_notes: e.target.value })}
                placeholder="Explain DB design, async Celery queues, Redis caching, WebSockets..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Tech Stack Tags */}
            <div>
              <label className="block font-mono text-slate-300 mb-1">Tech Stack Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. Django, Redis, Celery..."
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.tech_stack?.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
                  >
                    <span>{t}</span>
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="block font-mono text-slate-300 mb-1">Key Feature Bullet Points</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="e.g. Role-based JWT authentication with refresh token rotation"
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {formData.key_features?.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-[11px] text-slate-300">
                    <span>• {f}</span>
                    <button type="button" onClick={() => removeFeature(f)} className="text-slate-400 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingProject(null); }}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                {loading ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{proj.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {proj.category_display || proj.category}
                </span>
                {proj.featured && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{proj.subtitle}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.tech_stack?.slice(0, 5).map((t) => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(proj)}
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-colors"
                title="Edit Project"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-950/60 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

