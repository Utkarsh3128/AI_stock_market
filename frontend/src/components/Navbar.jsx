import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    <nav className={`flex items-center justify-between px-6 py-3 border-b z-20 flex-shrink-0 transition-colors ${
      isDark ? "bg-[#0d1220] border-slate-700/60" : "bg-white border-slate-200 shadow-xs"
    }`}>
      {/* Brand */}
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg blue-glow">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <div>
          <h1 className={`text-sm font-bold leading-tight tracking-wide ${isDark ? "text-white" : "text-slate-900"}`}>
            StockSense <span className="text-blue-600 dark:text-blue-400">AI</span>
          </h1>
          <p className={`text-[10px] leading-none ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Enterprise Analytics Platform
          </p>
        </div>
      </div>

      {/* Center title */}
      <div className="hidden md:block text-center">
        <p className={`text-xs font-semibold tracking-widest uppercase ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          AI-Powered Market Signal &amp; Price Movement Analytics
        </p>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-3.5">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isDark
              ? "bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-700/80"
              : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200/80"
          }`}
        >
          {isDark ? (
            <>
              {/* Sun Icon */}
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span className="hidden sm:inline text-[11px] font-semibold">Light Mode</span>
            </>
          ) : (
            <>
              {/* Moon Icon */}
              <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <span className="hidden sm:inline text-[11px] font-semibold">Dark Mode</span>
            </>
          )}
        </button>

        {/* Live badge */}
        <div className={`flex items-center gap-2 border rounded-full px-3 py-1.5 ${
          isDark
            ? "bg-slate-800/70 border-slate-700/50 text-emerald-400"
            : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
          <span className="text-[11px] font-semibold">LIVE</span>
        </div>

        {/* Time */}
        <div className="hidden sm:flex flex-col items-end">
          <span className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{timeStr}</span>
          <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{dateStr}</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">
          U
        </div>
      </div>
    </nav>
  );
}