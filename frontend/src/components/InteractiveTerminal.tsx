import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { Profile, Skill, Project } from '../types';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-slate-300 space-y-1">
          <p className="text-cyan-400 font-bold">Navaneeth Sankar — Interactive Dev Shell v1.0.0</p>
          <p className="text-slate-400">Type <span className="text-emerald-400 font-semibold">'help'</span> to see available system commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-semibold">Available Commands:</p>
            <p><span className="text-emerald-400 w-28 inline-block">cat bio</span> — Print summary and background</p>
            <p><span className="text-emerald-400 w-28 inline-block">skills</span> — List technical skills & proficiency</p>
            <p><span className="text-emerald-400 w-28 inline-block">projects</span> — List production full-stack projects</p>
            <p><span className="text-emerald-400 w-28 inline-block">contact</span> — Get contact info (email, phone)</p>
            <p><span className="text-emerald-400 w-28 inline-block">download-cv</span> — Download resume PDF</p>
            <p><span className="text-emerald-400 w-28 inline-block">sudo hire-me</span> — Unlock secret recruiter protocol 😉</p>
            <p><span className="text-emerald-400 w-28 inline-block">clear</span> — Clear terminal output</p>
            <p><span className="text-emerald-400 w-28 inline-block">exit</span> — Close this CLI</p>
          </div>
        );
        break;

      case 'cat bio':
      case 'bio':
        outputNode = (
          <div className="text-slate-300 space-y-2">
            <p className="text-cyan-400 font-semibold">{profile?.name} — {profile?.title}</p>
            <p className="leading-relaxed">{profile?.bio}</p>
            <p className="text-slate-400 text-xs">📍 {profile?.location} | Status: {profile?.status_text}</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold mb-1">Loaded Technical Arsenal:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {skills.slice(0, 14).map((s) => (
                <div key={s.id} className="flex justify-between text-xs pr-4">
                  <span className="text-slate-300">• {s.name}</span>
                  <span className="text-cyan-400 font-mono">[{s.proficiency}% - {s.level_label}]</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs mt-2">+ more backend & DevOps integrations</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-semibold">Flagship Projects:</p>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/50 pl-2">
                <p className="font-semibold text-white">{p.title} <span className="text-xs text-slate-400">({p.subtitle})</span></p>
                <p className="text-xs text-slate-300 mt-0.5">{p.description}</p>
                <p className="text-xs text-cyan-300 font-mono mt-1">Tech: {p.tech_stack?.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-slate-300 space-y-1">
            <p className="text-cyan-400 font-semibold">Direct Communication Lines:</p>
            <p>📧 Email: <a href={`mailto:${profile?.email}`} className="text-cyan-300 underline">{profile?.email}</a></p>
            <p>📱 Phone: <a href={`tel:${profile?.phone}`} className="text-cyan-300 underline">{profile?.phone}</a></p>
            <p>🐙 GitHub: <a href={profile?.github_url} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{profile?.github_url}</a></p>
            <p>💼 LinkedIn: <a href={profile?.linkedin_url} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{profile?.linkedin_url}</a></p>
          </div>
        );
        break;

      case 'sudo hire-me':
      case 'hire-me':
        outputNode = (
          <div className="text-emerald-400 space-y-1">
            <p className="font-bold">✓ Permission Granted: Root access unlocked!</p>
            <p className="text-slate-300">Initiating offer negotiation sequence...</p>
            <p className="text-cyan-300">Redirecting to contact dispatch: send an email to <span className="underline">{profile?.email}</span></p>
          </div>
        );
        break;

      case 'download-cv':
      case 'resume':
      case 'cv':
        outputNode = (
          <div className="text-cyan-300 space-y-1">
            <p>Initiating CV download: <a href={profile?.resume_url || '#'} download target="_blank" rel="noreferrer" className="underline font-bold text-emerald-400">Navaneeth_Sankar_CV.pdf</a></p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputNode = (
          <p className="text-red-400">
            command not found: '{cmd}'. Type <span className="text-cyan-300">'help'</span> for instructions.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: rawCmd, output: outputNode }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#080B12] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[520px]"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0E1320] border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-medium text-slate-300">
                navaneeth@brocamp-terminal: ~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal logs */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-4 terminal-scroll text-slate-200">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">visitor@portfolio:~$</span>
                  <span className="text-white">{log.command}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <div className="p-3 bg-[#0B0F19] border-t border-slate-800 flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-xs font-bold">visitor@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. 'help', 'skills', 'contact')..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-600"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/30"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

