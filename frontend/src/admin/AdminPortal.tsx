import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Shield, LogOut, LayoutDashboard, FolderGit2, 
  Layers, BookOpen, Mail, User, Lock, KeyRound, ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Profile, Skill, Project, Article } from '../types';
import { DashboardOverview } from './DashboardOverview';
import { ProjectsManager } from './ProjectsManager';
import { SkillsManager } from './SkillsManager';
import { ArticlesManager } from './ArticlesManager';
import { MessagesInbox } from './MessagesInbox';
import { ProfileEditor } from './ProfileEditor';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  articles: Article[];
  onRefreshAll: () => void;
}

type TabType = 'overview' | 'projects' | 'skills' | 'articles' | 'messages' | 'profile';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
  articles,
  onRefreshAll,
}) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin12345');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await login(username, password);
    } catch (err: any) {
      setLoginError('Invalid credentials. (Default is admin / admin12345)');
    } finally {
      setLoginLoading(false);
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'messages', label: 'Inquiries', icon: Mail },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-5xl bg-[#090D17] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[90vh] max-h-[850px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0D1220] border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Portfolio Admin Console</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    DRF + JWT
                  </span>
                </h2>
                <div className="text-[11px] font-mono text-slate-400">
                  {isAuthenticated ? `Logged in as @${user?.username}` : 'Restricted Administrative Access'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isAuthenticated ? (
            /* Login Form */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md p-8 rounded-3xl glass-panel border-cyan-500/30 bg-[#0B0F19] shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Admin Authentication</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Verify credentials to access project & skill management.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Default Admin Account:</span>
                    <span className="text-cyan-300">admin / admin12345</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-black font-semibold text-xs hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    {loginLoading ? 'Authenticating...' : 'Sign In to Admin Workspace'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Logged in Admin Workspace */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Sidebar Tabs */}
              <div className="w-full md:w-56 p-4 border-b md:border-b-0 md:border-r border-white/10 bg-[#0B0F19] flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
                {tabs.map((t) => {
                  const IconComp = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors shrink-0 ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}

                <div className="hidden md:block mt-auto pt-4 border-t border-white/5">
                  <a
                    href="http://127.0.0.1:8000/admin/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Django Admin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Main Content Pane */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'overview' && <DashboardOverview />}
                {activeTab === 'projects' && <ProjectsManager projects={projects} onRefresh={onRefreshAll} />}
                {activeTab === 'skills' && <SkillsManager skills={skills} onRefresh={onRefreshAll} />}
                {activeTab === 'articles' && <ArticlesManager articles={articles} onRefresh={onRefreshAll} />}
                {activeTab === 'messages' && <MessagesInbox />}
                {activeTab === 'profile' && <ProfileEditor profile={profile} onRefresh={onRefreshAll} />}
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

