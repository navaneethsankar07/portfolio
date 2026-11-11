import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, Zap, Radio, Database, 
  Terminal, ArrowUpRight, DollarSign, Clock, Layers,
  Cpu, Send, RefreshCw, Sparkles, Filter, Check, Eye
} from 'lucide-react';

/* =========================================================================
   1. GROLANCE: Interactive Freelance & Escrow Platform Architecture Console
   ========================================================================= */
export const GrolanceMockup: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'client' | 'freelancer' | 'worker'>('client');
  const [milestoneStatus, setMilestoneStatus] = useState<'locked' | 'processing' | 'released'>('locked');
  const [workerLogs, setWorkerLogs] = useState<string[]>([
    "[09:41:02] Celery worker-1 spawned (PID: 4892)",
    "[09:41:04] Redis broker: task received celery.tasks.dispatch_milestone",
    "[09:41:05] PostgreSQL: SELECT * FROM contracts WHERE id=104 (1.8ms)",
    "[09:41:05] ACID transaction locked in isolation level READ COMMITTED",
  ]);

  const handleSimulateRelease = () => {
    if (milestoneStatus === 'released') {
      setMilestoneStatus('locked');
      setWorkerLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Reset milestone contract state for demo`,
        ...prev.slice(0, 4)
      ]);
      return;
    }

    setMilestoneStatus('processing');
    setWorkerLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] [QUEUE] Dispatched async payment release via Celery...`,
      ...prev
    ]);

    setTimeout(() => {
      setMilestoneStatus('released');
      setWorkerLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Escrow \$1,250 released. Celery worker generated invoice PDF in 34ms`,
        ...prev
      ]);
    }, 1200);
  };

  return (
    <div className="w-full h-full bg-[#0A0C10] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs select-none border border-white/[0.08] rounded-xl">
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
            GROLANCE // ESCROW &amp; WORKFLOW CONSOLE
          </span>
        </div>
        
        {/* Role Switcher */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveRole('client')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${
              activeRole === 'client' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CLIENT VIEW
          </button>
          <button
            onClick={() => setActiveRole('freelancer')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${
              activeRole === 'freelancer' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            FREELANCER VIEW
          </button>
          <button
            onClick={() => setActiveRole('worker')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${
              activeRole === 'worker' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CELERY LOGS
          </button>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      {activeRole === 'worker' ? (
        <div className="my-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] h-48 overflow-y-auto space-y-1">
          <div className="text-cyan-400 flex items-center justify-between pb-1 mb-2 border-b border-white/10 text-[10px]">
            <span>CELERY ASYNC WORKER TELEMETRY (REDIS BROKER)</span>
            <span className="text-emerald-400">STATUS: ACTIVE POOL (4 WORKERS)</span>
          </div>
          {workerLogs.map((log, i) => (
            <div key={i} className="text-neutral-300 leading-relaxed font-mono">
              {log}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              {activeRole === 'client' ? 'Active Escrow Deposit' : 'Guaranteed Payout'}
            </div>
            <div className="text-2xl font-bold font-sans text-white my-1">
              $4,850.00
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PayPal Vaulted &amp; ACID Protected</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Milestone 03 Status
            </div>
            <div className="text-sm font-bold font-mono my-1">
              {milestoneStatus === 'locked' && (
                <span className="text-yellow-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ESCROW LOCKED</span>
                </span>
              )}
              {milestoneStatus === 'processing' && (
                <span className="text-cyan-400 flex items-center gap-1.5 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>CELERY DISPATCHING...</span>
                </span>
              )}
              {milestoneStatus === 'released' && (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FUNDS RELEASED</span>
                </span>
              )}
            </div>
            <button
              onClick={handleSimulateRelease}
              className="text-[10px] px-2.5 py-1 rounded bg-white/10 hover:bg-white hover:text-black text-white font-mono transition-all text-left flex items-center justify-between"
            >
              <span>{milestoneStatus === 'released' ? 'Reset Contract' : 'Simulate Release'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
              Database Query Latency
            </div>
            <div className="text-2xl font-bold font-sans text-white my-1">
              18.4ms
            </div>
            <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>PostgreSQL Prefetched (Zero N+1)</span>
            </div>
          </div>
        </div>
      )}

      {/* Console Bottom Status */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-neutral-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">JWT AUTH:</span>
          <span className="text-white">httpOnly Refresh Token Rotation</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400">
          <Check className="w-3 h-3" />
          <span>DRF REST API Endpoints 200 OK</span>
        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   2. CHITCHAT: Real-Time ASGI WebSocket & Redis Channel Live Simulator
   ========================================================================= */
export const ChitChatMockup: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; latency: string; isSelf: boolean }>>([
    {
      sender: "Rahul K.",
      text: "Did you configure the ASGI middleware to validate JWT in the WebSocket handshake query string?",
      time: "09:42 AM",
      latency: "2.8ms",
      isSelf: false,
    },
    {
      sender: "Navaneeth",
      text: "Yes. Query params are decoded and user is mounted directly on scope['user'] before connection accept.",
      time: "09:42 AM",
      latency: "1.4ms",
      isSelf: true,
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [activeTab, setActiveTab] = useState<'chat' | 'protocol'>('chat');

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: "Navaneeth",
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      latency: `${(Math.random() * 2 + 1.2).toFixed(1)}ms`,
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate instant peer response via Redis
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Redis Broadcast",
          text: "Frame delivered to channel room_peer_broadcast with sub-3ms latency.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          latency: "1.9ms",
          isSelf: false,
        }
      ]);
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#0A0C10] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs select-none border border-white/[0.08] rounded-xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
            CHITCHAT // ASGI WEBSOCKET STREAM
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            LATENCY: 1.8ms
          </span>
          <button
            onClick={() => setActiveTab(activeTab === 'chat' ? 'protocol' : 'chat')}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white hover:text-black text-white text-[10px] transition-all"
          >
            {activeTab === 'chat' ? 'INSPECT PROTOCOL' : 'VIEW CHAT'}
          </button>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === 'protocol' ? (
        <div className="my-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] h-48 overflow-y-auto space-y-1.5">
          <div className="text-neutral-400 text-[10px] pb-1 border-b border-white/10 uppercase">
            WebSocket Handshake &amp; Redis Pub/Sub Frame Trace
          </div>
          <div className="text-emerald-400">1. GET /ws/chat/room_99/?token=eyJhbGciOi... HTTP/1.1</div>
          <div className="text-neutral-300">2. Upgrade: websocket | Connection: Upgrade</div>
          <div className="text-cyan-400">3. ASGI Middleware: JWT validated -&gt; User(id=7, username='navaneeth')</div>
          <div className="text-neutral-300">4. ChannelLayer: group_add('chat_room_99', channel_name)</div>
          <div className="text-emerald-400">5. HTTP/1.1 101 Switching Protocols [TCP Handshake: 1.2ms]</div>
          <div className="text-neutral-400">6. Continuous Full-Duplex binary/text frame stream active.</div>
        </div>
      ) : (
        <div className="my-3 space-y-2.5 h-48 overflow-y-auto pr-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 max-w-[88%] ${msg.isSelf ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                msg.isSelf ? 'bg-white text-black' : 'bg-purple-600 text-white'
              }`}>
                {msg.sender.slice(0, 2).toUpperCase()}
              </div>
              <div className={`p-2.5 rounded-2xl text-xs font-sans ${
                msg.isSelf 
                  ? 'bg-white text-black font-medium rounded-tr-none' 
                  : 'bg-white/[0.04] border border-white/10 text-neutral-200 rounded-tl-none'
              }`}>
                <div>{msg.text}</div>
                <div className={`text-[9px] font-mono mt-1 flex items-center gap-2 ${
                  msg.isSelf ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span>{msg.time}</span>
                  <span>•</span>
                  <span>{msg.latency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Input Trigger */}
      <form onSubmit={handleSendMessage} className="pt-2 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type message to test WebSocket broadcast..."
          className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1"
        >
          <span>Send</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};


/* =========================================================================
   3. RESTORE: Interactive C2C Marketplace Engine & Cloudinary CDN Pipeline
   ========================================================================= */
export const ReStoreMockup: React.FC = () => {
  const [useOptimization, setUseOptimization] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products = [
    { title: "Fujifilm X-T4 Mirrorless", price: "$1,150", condition: "Like New", cat: "cameras" },
    { title: "Mechanical Custom Keyboard", price: "$180", condition: "Mint", cat: "tech" },
    { title: "Bose QuietComfort 45", price: "$220", condition: "Refurbished", cat: "audio" },
  ];

  const filtered = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.cat === selectedCategory);

  return (
    <div className="w-full h-full bg-[#0A0C10] p-4 sm:p-6 flex flex-col justify-between font-mono text-xs select-none border border-white/[0.08] rounded-xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
            RESTORE // C2C MARKETPLACE &amp; MEDIA PIPELINE
          </span>
        </div>
        
        {/* Cloudinary Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseOptimization(!useOptimization)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1.5 ${
              useOptimization 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' 
                : 'bg-white/5 text-neutral-400 border border-white/10'
            }`}
          >
            <span>CLOUDINARY CDN: {useOptimization ? 'ON (WEBP)' : 'OFF (RAW)'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Product Grid & Optimization Comparison */}
      <div className="my-3 space-y-3">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-neutral-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            REDUX:
          </span>
          {['all', 'cameras', 'tech', 'audio'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-24"
            >
              <div>
                <span className="text-[10px] text-neutral-400 block truncate">{item.title}</span>
                <span className="text-[9px] text-emerald-400 font-mono mt-0.5 inline-block">
                  {item.condition}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="text-white font-bold font-sans text-sm">{item.price}</span>
                <span className="text-[9px] font-mono text-neutral-500">Instant Buy</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance & Payload Metric Banner */}
      <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-neutral-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">PAYLOAD:</span>
          {useOptimization ? (
            <span className="text-emerald-400 font-bold">184 KB (WebP • -96.2% Saved)</span>
          ) : (
            <span className="text-yellow-400 font-bold">4.85 MB (Raw Uncompressed)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">TRANSFER LATENCY:</span>
          <span className="text-white font-bold">{useOptimization ? '38ms' : '1,120ms'}</span>
        </div>
      </div>
    </div>
  );
};
