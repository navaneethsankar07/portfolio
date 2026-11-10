import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ArticleModal } from './ArticleModal';
import { api } from '../services/api';

interface BlogProps {
  articles: Article[];
}

export const Blog: React.FC<BlogProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpenArticle = async (article: Article) => {
    try {
      const full = await api.getArticleDetail(article.slug);
      setSelectedArticle(full);
    } catch {
      setSelectedArticle(article);
    }
  };

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>05 // ENGINEERING NOTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Insights & Architecture
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Articles on backend scaling, real-time message broadcasting, database tuning, and asynchronous worker queues.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => handleOpenArticle(art)}
              className="glass-panel p-6 sm:p-7 rounded-3xl border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.read_time}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{art.views}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {art.summary}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {art.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-300 group-hover:text-cyan-200">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Reader */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

      </div>
    </section>
  );
};

