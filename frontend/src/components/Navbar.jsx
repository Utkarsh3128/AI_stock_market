export default function Navbar() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-700/60 bg-[#0d1220] z-20 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg blue-glow">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight tracking-wide">
            StockSense <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-[10px] text-slate-400 leading-none">Enterprise Analytics Platform</p>
        </div>
      </div>

      {/* Center title */}
      <div className="hidden md:block text-center">
        <p className="text-xs font-semibold text-slate-300 tracking-widest uppercase">
          AI-Powered Market Signal &amp; Price Movement Analytics
        </p>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        {/* Live badge */}
        <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/50 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
          <span className="text-[11px] font-semibold text-emerald-400">LIVE</span>
        </div>
        {/* Time */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-semibold text-white">{timeStr}</span>
          <span className="text-[10px] text-slate-400">{dateStr}</span>
        </div>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">
          U
        </div>
      </div>
    </nav>
  );
}