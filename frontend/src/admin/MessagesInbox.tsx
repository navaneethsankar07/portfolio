import React, { useState, useEffect } from 'react';
import { Mail, Check, Trash2, Reply, Eye, Calendar } from 'lucide-react';
import { ContactMessage } from '../types';
import { api } from '../services/api';

export const MessagesInbox: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await api.getMessages();
      setMessages(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: number, currentRead: boolean) => {
    try {
      await api.markMessageRead(id, !currentRead);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !currentRead } : m))
      );
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this message inquiry?')) return;
    try {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert('Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white">Contact Submissions Inbox</h3>
          <p className="text-xs text-slate-400 font-mono">
            Messages transmitted by recruiters and clients from the contact form.
          </p>
        </div>
        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          Total Inquiries: {messages.length}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 font-mono text-xs text-slate-500">
          Loading transmissions...
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-slate-500">
          No inquiries in database yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.is_read
                  ? 'bg-white/[0.01] border-white/5 opacity-80'
                  : 'bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-950/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{msg.name}</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    &lt;{msg.email}&gt;
                  </a>
                  {!msg.is_read && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-black font-bold">
                      NEW
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Just now'}</span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-300 font-medium mb-2">
                Subject: {msg.subject}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5 mb-4 font-sans whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => msg.id && handleToggleRead(msg.id, !!msg.is_read)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{msg.is_read ? 'Mark Unread' : 'Mark Read'}</span>
                </button>

                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </a>

                <button
                  onClick={() => msg.id && handleDelete(msg.id)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

