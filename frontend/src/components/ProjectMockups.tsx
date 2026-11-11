import React from 'react';
import { 
  CheckCircle2, ShieldCheck, Zap, Radio, Database, 
  Terminal, ArrowUpRight, DollarSign, Clock, Layers 
} from 'lucide-react';

export const GrolanceMockup: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0E1017] p-5 sm:p-7 flex flex-col justify-between font-mono text-xs select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-bold text-white tracking-wider">GROLANCE // PLATFORM CONSOLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white">ROLE: CLIENT & FREELANCER</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYPAL ESCROW: VERIFIED</span>
        </div>
      </div>

      {/* Main Mockup Content: Milestone & Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-[10px] text-neutral-400 mb-1">CONTRACT VALUE</div>
          <div className="text-xl font-bold font-sans text-white">$4,850.00</div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Escrow Locked</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-[10px] text-neutral-400 mb-1">CELERY WORKER QUEUE</div>
          <div className="text-xl font-bold font-sans text-cyan-300">0ms Idle</div>
          <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Async PDF & Email Dispatch</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-[10px] text-neutral-400 mb-1">DATABASE INTEGRITY</div>
          <div className="text-xl font-bold font-sans text-white">PostgreSQL</div>
          <div className="text-[10px] text-purple-300 mt-1 flex items-center gap-1">
            <Database className="w-3 h-3 text-purple-400" />
            <span>ACID Isolation Level</span>
          </div>
        </div>
      </div>

      {/* Milestone Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-white/10">
        <div className="flex justify-between text-[11px] text-neutral-400">
          <span>Milestone 03: Full-Stack Integration</span>
          <span className="text-white font-bold">100% Completed</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ChitChatMockup: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0E1017] p-5 sm:p-7 flex flex-col justify-between font-mono text-xs select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider">CHITCHAT // ASGI WEBSOCKET STREAM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PING: 3ms</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300">REDIS LAYER</span>
        </div>
      </div>

      {/* Chat Messages Mockup */}
      <div className="space-y-2.5 my-3">
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            AR
          </div>
          <div className="p-2.5 rounded-2xl rounded-tl-none bg-white/[0.05] border border-white/10 text-neutral-200 text-xs font-sans">
            How fast is the WebSocket handshake with the JWT token?
          </div>
        </div>

        <div className="flex items-start gap-2 max-w-[85%] ml-auto flex-row-reverse">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black shrink-0">
            NS
          </div>
          <div className="p-2.5 rounded-2xl rounded-tr-none bg-white text-black text-xs font-sans font-medium">
            Sub-millisecond. Query params validated directly in Django Channels ASGI middleware with Redis broadcast.
          </div>
        </div>
      </div>

      {/* WebSocket Status Ticker */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Full-Duplex TCP Active</span>
        </span>
        <span className="text-neutral-500">Zero Polling Latency</span>
      </div>
    </div>
  );
};

export const ReStoreMockup: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0E1017] p-5 sm:p-7 flex flex-col justify-between font-mono text-xs select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-white tracking-wider">RESTORE // C2C MARKETPLACE ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white">REDUX TOOLKIT</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px]">CLOUDINARY CDN</span>
        </div>
      </div>

      {/* Grid of Listings Mockup */}
      <div className="grid grid-cols-3 gap-2.5 my-3">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-20">
          <span className="text-[10px] text-neutral-400">Mechanical Keyboard</span>
          <div className="flex justify-between items-end">
            <span className="text-white font-bold font-sans">$120</span>
            <span className="text-[9px] text-emerald-400">Verified</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-20">
          <span className="text-[10px] text-neutral-400">Sony Mirrorless Lens</span>
          <div className="flex justify-between items-end">
            <span className="text-white font-bold font-sans">$480</span>
            <span className="text-[9px] text-emerald-400">Featured</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-20">
          <span className="text-[10px] text-neutral-400">Studio Monitor 4K</span>
          <div className="flex justify-between items-end">
            <span className="text-white font-bold font-sans">$350</span>
            <span className="text-[9px] text-cyan-400">Reserved</span>
          </div>
        </div>
      </div>

      {/* Image Optimization Pipeline */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5 text-white">
          <span>Responsive WebP / AVIF CDN Compression</span>
        </span>
        <span className="text-emerald-400 font-bold">100% Client Sync</span>
      </div>
    </div>
  );
};
