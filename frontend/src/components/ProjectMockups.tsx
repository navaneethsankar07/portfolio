import React from 'react';
import { 
  CheckCircle2, ShieldCheck, Zap, Radio, Database, 
  Terminal, ArrowUpRight, DollarSign, Clock, Layers,
  Cpu, Send, RefreshCw, Filter, Check, ShoppingBag, 
  Search, User, MessageSquare, Bell, ChevronRight, Lock
} from 'lucide-react';

/* =========================================================================
   1. GROLANCE: Realistic Modern Freelance Dashboard & Escrow Management UI
   ========================================================================= */
export const GrolanceUIPreview: React.FC = () => {
  return (
    <div className="w-full bg-[#080A0F] rounded-2xl border border-white/10 overflow-hidden shadow-2xl font-sans text-xs select-none">
      
      {/* Browser Chrome Header */}
      <div className="bg-[#0C0E14] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>https://grolance.app/dashboard/contracts</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
            POSTGRESQL ACID: ACTIVE
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono">
            CELERY WORKERS: IDLE (0ms)
          </span>
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <div className="p-4 sm:p-6 space-y-5">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
              <span>ESCROW BALANCE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-display text-white">$4,850.00</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">
              100% Vaulted &amp; ACID Protected
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
              <span>ACTIVE CONTRACTS</span>
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-display text-white">3 Running</div>
            <div className="text-[10px] text-neutral-400 font-mono mt-1">
              Milestone Escrow Lifecycle
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
              <span>QUERY EFFICIENCY</span>
              <Database className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-display text-white">18.4ms P95</div>
            <div className="text-[10px] text-purple-300 font-mono mt-1">
              Prefetched via select_related
            </div>
          </div>
        </div>

        {/* Active Contract Detail Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Fintech Platform API Redesign</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  MILESTONE 03 / 04
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                Client: Global Capital Inc. &bull; Contract ID: #CTR-2024-884
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-white">$2,400.00</span>
              <span className="text-[10px] text-neutral-500 block font-mono">Milestone Amount</span>
            </div>
          </div>

          {/* Milestone Pipeline Steps */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <div className="font-bold">01. CREATED</div>
              <div className="text-[9px] text-neutral-400">Verified &bull; Oct 12</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <div className="font-bold">02. ESCROW LOCKED</div>
              <div className="text-[9px] text-neutral-400">PayPal Vaulted</div>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <div className="font-bold">03. WORK REVIEW</div>
              <div className="text-[9px] text-cyan-400">In Progress</div>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10 text-neutral-500">
              <div className="font-bold">04. RELEASE &amp; INVOICE</div>
              <div className="text-[9px] text-neutral-600">Pending Release</div>
            </div>
          </div>

          {/* Celery Worker Log Stream */}
          <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-neutral-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>[Celery-Worker-1] Asynchronous PDF invoice task dispatched (Redis Queue)</span>
            </div>
            <span className="text-emerald-400 text-[10px]">EXECUTION: 34ms</span>
          </div>
        </div>

      </div>
    </div>
  );
};


/* =========================================================================
   2. CHITCHAT: Realistic Real-Time WebSocket Messaging Application UI
   ========================================================================= */
export const ChitChatUIPreview: React.FC = () => {
  return (
    <div className="w-full bg-[#080A0F] rounded-2xl border border-white/10 overflow-hidden shadow-2xl font-sans text-xs select-none">
      
      {/* Browser Header */}
      <div className="bg-[#0C0E14] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>wss://chitchat.app/ws/chat/architecture/</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>FULL-DUPLEX WEBSOCKET: 1.8ms</span>
          </span>
        </div>
      </div>

      {/* Main Chat Split Interface */}
      <div className="grid grid-cols-12 min-h-[300px]">
        
        {/* Left Channels Sidebar (4 cols) */}
        <div className="col-span-4 border-r border-white/10 p-3 sm:p-4 bg-black/40 space-y-3">
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
            CHANNELS (REDIS GROUPS)
          </div>

          <div className="p-2 rounded-lg bg-white/10 border border-white/15 text-white flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
              <span className="text-cyan-400">#</span>
              <span>architecture</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <div className="p-2 rounded-lg bg-transparent hover:bg-white/[0.03] text-neutral-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>#</span>
              <span>backend-team</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">12 online</span>
          </div>

          <div className="p-2 rounded-lg bg-transparent hover:bg-white/[0.03] text-neutral-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>#</span>
              <span>general-stream</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">28 online</span>
          </div>

          {/* Redis Telemetry Widget */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-[9px] font-mono text-neutral-500 uppercase mb-1">
              REDIS LAYER TELEMETRY
            </div>
            <div className="text-[10px] font-mono text-neutral-300">
              Channel Broadcast: <span className="text-emerald-400">Sub-5ms</span>
            </div>
            <div className="text-[10px] font-mono text-neutral-300">
              Heartbeat: <span className="text-cyan-400">30s Ping / Pong</span>
            </div>
          </div>
        </div>

        {/* Right Chat Stream Area (8 cols) */}
        <div className="col-span-8 p-4 flex flex-col justify-between bg-[#080A0F]">
          
          {/* Messages Stream */}
          <div className="space-y-3 my-2">
            
            {/* Message 1 */}
            <div className="flex items-start gap-2.5 max-w-[90%]">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                RK
              </div>
              <div className="p-3 rounded-2xl rounded-tl-none bg-white/[0.04] border border-white/10 text-neutral-200 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-[11px]">Rahul K.</span>
                  <span className="text-[9px] font-mono text-neutral-500">10:14 AM</span>
                </div>
                <span>Did you validate the JWT query token directly in the ASGI consumer handshake?</span>
              </div>
            </div>

            {/* Message 2 (Self) */}
            <div className="flex items-start gap-2.5 max-w-[90%] ml-auto flex-row-reverse">
              <div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-black text-[10px] shrink-0">
                NS
              </div>
              <div className="p-3 rounded-2xl rounded-tr-none bg-white text-black text-xs font-medium">
                <div className="flex items-center gap-2 mb-1 justify-end">
                  <span className="text-[9px] font-mono text-neutral-600">10:14 AM &bull; 1.4ms</span>
                  <span className="font-bold text-black text-[11px]">Navaneeth Sankar</span>
                </div>
                <span>Yes. Query tokens are decoded inside the AuthTokenMiddlewareStack and mounted to scope['user'] before connection accept. Zero polling latency.</span>
              </div>
            </div>

          </div>

          {/* Chat Input Box */}
          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="Broadcasting message across Redis channel layer in sub-2ms..."
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-400 font-mono focus:outline-none"
            />
            <button className="px-3 py-2 rounded-lg bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 font-mono">
              <Send className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};


/* =========================================================================
   3. RESTORE: Realistic Modern C2C Marketplace Grid & Cloudinary Pipeline UI
   ========================================================================= */
export const ReStoreUIPreview: React.FC = () => {
  return (
    <div className="w-full bg-[#080A0F] rounded-2xl border border-white/10 overflow-hidden shadow-2xl font-sans text-xs select-none">
      
      {/* Browser Chrome Header */}
      <div className="bg-[#0C0E14] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>https://restore.market/category/electronics</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
            CLOUDINARY CDN: -96.2% COMPRESSION
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] font-mono">
            REDUX STATE: SYNCED
          </span>
        </div>
      </div>

      {/* Main Marketplace Area */}
      <div className="p-4 sm:p-6 space-y-4">
        
        {/* Marketplace Filter Pills */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white text-black font-bold text-[10px] font-mono">
              ALL ITEMS (14)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-mono">
              AUDIO &amp; HEADPHONES
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-mono">
              CAMERA GEAR
            </span>
          </div>

          <div className="text-[11px] font-mono text-neutral-400">
            SORT: <span className="text-white font-bold">RECENTLY LISTED</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Card 1 */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-white">Sony A7 IV Mirrorless</span>
                <span className="text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                  MINT
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Asset: 4.8MB raw &rarr; <span className="text-emerald-400 font-bold">184KB WebP</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-base font-bold font-display text-white">$1,850</span>
              <span className="px-2 py-1 rounded bg-white text-black font-bold text-[10px] font-mono">
                BUY NOW
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-white">Custom Keychron Q1 Pro</span>
                <span className="text-[9px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                  LIKE NEW
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Asset: 3.2MB raw &rarr; <span className="text-cyan-400 font-bold">128KB WebP</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-base font-bold font-display text-white">$190</span>
              <span className="px-2 py-1 rounded bg-white text-black font-bold text-[10px] font-mono">
                BUY NOW
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-white">Bose Noise Cancelling 700</span>
                <span className="text-[9px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10">
                  REFURBISHED
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Asset: 2.9MB raw &rarr; <span className="text-purple-400 font-bold">96KB WebP</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-base font-bold font-display text-white">$240</span>
              <span className="px-2 py-1 rounded bg-white text-black font-bold text-[10px] font-mono">
                BUY NOW
              </span>
            </div>
          </div>

        </div>

        {/* Global State Telemetry Banner */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
          <span>Redux Slice: cart.items.length = 2 &bull; filter: 'electronics'</span>
          <span className="text-emerald-400">Edge CDN Load: 38ms</span>
        </div>

      </div>
    </div>
  );
};
