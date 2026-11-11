import React, { useState } from 'react';
import { Plus, Edit3, Trash2, X, Eye, FileText } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';

interface ArticlesManagerProps {
  articles: Article[];
  onRefresh: () => void;
}

export const ArticlesManager: React.FC<ArticlesManagerProps> = ({ articles, onRefresh }) => {
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    tags: ['Django', 'Python'],
    read_time: '5 min read',
    published: true,
  });

  const [tagInput, setTagInput] = useState('');

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingArticle(null);
    setFormData({
      title: '',
      summary: '',
      content: '## Overview\n\nWrite your technical article here in Markdown...',
      tags: ['Django', 'Python'],
      read_time: '5 min read',
      published: true,
    });
    setTagInput('');
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setIsCreating(false);
    setFormData({ ...art });
    setTagInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        await api.createArticle(formData);
      } else if (editingArticle && editingArticle.id) {
        await api.updateArticle(editingArticle.id, formData);
      }
      setIsCreating(false);
      setEditingArticle(null);
      onRefresh();
    } catch {
      alert('Failed to save article.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.deleteArticle(id);
      onRefresh();
    } catch {
      alert('Failed to delete article.');
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((x) => x !== t) || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white">Engineering Blog Manager</h3>
          <p className="text-xs text-slate-400 font-mono">
            Publish technical posts and architectural deep dives.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Editor Drawer */}
      {(isCreating || editingArticle) && (
        <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-cyan-300">
              {isCreating ? 'Write New Article' : `Edit "${editingArticle?.title}"`}
            </h4>
            <button
              onClick={() => { setIsCreating(false); setEditingArticle(null); }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Django REST with Celery"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Read Time</label>
                <input
                  type="text"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  placeholder="5 min read"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1">Short Summary *</label>
              <textarea
                rows={2}
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1">Article Markdown Content *</label>
              <textarea
                rows={10}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-mono text-slate-300 mb-1">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag (e.g. Celery)..."
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.tags?.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                  >
                    <span>#{t}</span>
                    <button type="button" onClick={() => removeTag(t)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded accent-cyan-400"
              />
              <label htmlFor="published" className="font-mono text-slate-300">
                Published & Visible on Portfolio
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingArticle(null); }}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                {loading ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{art.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  {art.read_time}
                </span>
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{art.views} views</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">{art.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(art)}
                className="p-2 rounded-xl bg-white/5 hover:text-cyan-300 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(art.id)}
                className="p-2 rounded-xl bg-white/5 hover:text-red-400 transition-colors"
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

