import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Eye, Mail, FolderGit2, 
  Layers, ExternalLink, ShieldCheck, Activity, Clock 
} from 'lucide-react';
import { AdminStats } from '../types';
import { api } from '../services/api';

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminStats()
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 font-mono text-xs text-slate-500">
        Loading telemetry metrics...
      </div>
    );
  }

  const overview = stats?.overview;

  const statCards = [
    { label: 'Total Inquiries', value: overview?.total_messages || 0, icon: Mail, color: 'text-cyan-400', bg: 'bg-cyan-950/40', border: 'border-cyan-500/30' },
    { label: 'Unread Messages', value: overview?.unread_messages || 0, icon: Mail, color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-500/30' },
    { label: 'Total Page Visits', value: overview?.total_visits || 0, icon: Eye, color: 'text-purple-400', bg: 'bg-purple-950/40', border: 'border-purple-500/30' },
    { label: 'Visits Today', value: overview?.visits_today || 0, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-500/30' },
    { label: 'Projects Live', value: overview?.total_projects || 0, icon: FolderGit2, color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-500/30' },
    { label: 'Skills Registered', value: overview?.total_skills || 0, icon: Layers, color: 'text-teal-400', bg: 'bg-teal-950/40', border: 'border-teal-500/30' },
  ];

  return (
    <div className="space-y-8">
      {/* Django Native Admin Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Dual Admin Capability Active</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            You can use this React Admin Dashboard for instant changes, or switch to Django's native ORM administration interface.
          </p>
        </div>
        <a
          href="http://127.0.0.1:8000/admin/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs transition-colors shrink-0 shadow-lg shadow-purple-600/20"
        >
          <span>Open Django Native Admin</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card, i) => {
          const IconComp = card.icon;
          return (
            <div
              key={i}
              className={`p-4 rounded-2xl ${card.bg} border ${card.border} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <IconComp className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Visits / Telemetry */}
      <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Recent Visitor Telemetry (Anonymous Hash)</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="pb-2">Path</th>
                <th className="pb-2">Client Hash</th>
                <th className="pb-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-y-white/5 text-slate-300">
              {stats?.recent_visits && stats.recent_visits.length > 0 ? (
                stats.recent_visits.map((v) => (
                  <tr key={v.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 text-cyan-300">{v.path}</td>
                    <td className="py-2.5 text-slate-400">{v.ip_hash || 'anonymous'}</td>
                    <td className="py-2.5 text-slate-500">
                      {new Date(v.visited_at).toLocaleTimeString()} ({new Date(v.visited_at).toLocaleDateString()})
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-slate-500">
                    No visit events logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

