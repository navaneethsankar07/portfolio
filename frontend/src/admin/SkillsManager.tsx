import React, { useState } from 'react';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { Skill, SkillCategory } from '../types';
import { api } from '../services/api';

interface SkillsManagerProps {
  skills: Skill[];
  onRefresh: () => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({ skills, onRefresh }) => {
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'backend',
    proficiency: 85,
    icon_name: 'Server',
    level_label: 'Advanced',
    featured: true,
    order: 0,
  });

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'backend',
      proficiency: 85,
      icon_name: 'Server',
      level_label: 'Advanced',
      featured: true,
      order: 0,
    });
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsCreating(false);
    setFormData({ ...skill });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        await api.createSkill(formData);
      } else if (editingSkill && editingSkill.id) {
        await api.updateSkill(editingSkill.id, formData);
      }
      setIsCreating(false);
      setEditingSkill(null);
      onRefresh();
    } catch {
      alert('Failed to save skill.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      onRefresh();
    } catch {
      alert('Failed to delete skill.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white">Skills & Technologies</h3>
          <p className="text-xs text-slate-400 font-mono">
            Manage your technical toolset, proficiency scores, and display categories.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Editor Drawer */}
      {(isCreating || editingSkill) && (
        <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-cyan-300">
              {isCreating ? 'Add New Skill' : `Edit "${editingSkill?.name}"`}
            </h4>
            <button
              onClick={() => { setIsCreating(false); setEditingSkill(null); }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Django Channels"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="backend">Backend Engineering</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="database">Databases & Caching</option>
                  <option value="devops">Cloud & DevOps</option>
                  <option value="programming">Programming Languages</option>
                  <option value="tools">Tools & Integrations</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Proficiency: {formData.proficiency}%
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Level Label</label>
                <input
                  type="text"
                  value={formData.level_label}
                  onChange={(e) => setFormData({ ...formData, level_label: e.target.value })}
                  placeholder="Expert / Advanced / Proficient"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Lucide Icon Name</label>
                <input
                  type="text"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="Server, Cpu, Database, Code..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingSkill(null); }}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                {loading ? 'Saving...' : 'Save Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills list table/grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
          >
            <div>
              <div className="font-semibold text-white text-xs">{skill.name}</div>
              <div className="text-[10px] font-mono text-slate-400">
                {skill.category_display || skill.category} • {skill.proficiency}%
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleOpenEdit(skill)}
                className="p-1.5 rounded-lg bg-white/5 hover:text-cyan-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1.5 rounded-lg bg-white/5 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

