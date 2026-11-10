import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Eye, BookOpen, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl glass-panel-glow border-cyan-500/30 bg-[#0B0F19] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Meta Header */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.read_time}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views} reads</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
            {article.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/10">
            {article.tags?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Body Content with formatted paragraphs & code blocks */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-white mt-6 mb-2">
                    {paragraph.replace('## ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-lg font-semibold text-cyan-300 mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```[a-z]*\n?/g, '');
                return (
                  <pre key={index} className="p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={index} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Written by Navaneeth Sankar</span>
            <span>Published on engineering notes</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

