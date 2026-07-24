import { useState } from "react";
import { predictStock } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const STOCKS = [
  { value: "CAP.PA",  label: "Capgemini",  exchange: "PA" },
  { value: "ZURN.SW", label: "Farmers",    exchange: "SW" },
  { value: "MSFT",    label: "Microsoft",  exchange: "NASDAQ" },
  { value: "AAPL",    label: "Apple",      exchange: "NASDAQ" },
  { value: "GOOGL",   label: "Google",     exchange: "NASDAQ" },
  { value: "TCS.NS",  label: "TCS",        exchange: "NSE" },
];

export default function Sidebar({ onPredict }) {
  const { isDark } = useTheme();
  const [ticker, setTicker] = useState("CAP.PA");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filtered = STOCKS.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()) ||
    s.value.toLowerCase().includes(search.toLowerCase())
  );

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await predictStock(ticker);
      onPredict(data);
    } catch (err) {
      setError("Failed to fetch prediction. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedStock = STOCKS.find((s) => s.value === ticker);

  return (
    <aside className={`w-[250px] flex-shrink-0 h-full flex flex-col border-r transition-colors ${
      isDark ? "border-slate-700/50 bg-[#0d1220]" : "border-slate-200 bg-white"
    } overflow-y-auto`}>

      {/* Divider */}
      <div className={`mx-4 my-3 border-t ${isDark ? "border-slate-700/50" : "border-slate-200"}`} />

      {/* Stock Selector Section */}
      <div className="px-4 flex flex-col gap-4">
        <div>
          <p className={`text-[10px] uppercase tracking-widest font-semibold mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            Stock Analysis
          </p>

          {/* Search */}
          <div className="relative mb-3">
            <span className={`absolute inset-y-0 left-3 flex items-center ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search stocks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full border rounded-lg pl-8 pr-3 py-2 text-xs transition-all focus:outline-none ${
                isDark
                  ? "bg-slate-800/80 border-slate-700/60 text-slate-200 placeholder-slate-500 focus:border-blue-500/60 focus:bg-slate-800"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-500"
              }`}
            />
          </div>

          {/* Dropdown */}
          <label className={`text-[11px] font-medium mb-1.5 block ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Select Ticker
          </label>
          <select
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm transition-all appearance-none cursor-pointer focus:outline-none ${
              isDark
                ? "bg-slate-800/80 border-slate-700/60 text-slate-200 focus:border-blue-500/60"
                : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white"
            }`}
          >
            {filtered.map((s) => (
              <option key={s.value} value={s.value} className={isDark ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                {s.label} ({s.value})
              </option>
            ))}
          </select>

          {/* Selected stock info card */}
          {selectedStock && (
            <div className={`mt-3 border rounded-lg px-3 py-2.5 fade-in-up ${
              isDark ? "bg-slate-800/60 border-slate-700/40" : "bg-slate-50 border-slate-200"
            }`}>
              <p className={`text-[10px] uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Selected</p>
              <p className={`text-sm font-semibold mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>{selectedStock.label}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] border rounded px-1.5 py-0.5 font-mono ${
                  isDark
                    ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                    : "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
                }`}>
                  {selectedStock.value}
                </span>
                <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>{selectedStock.exchange}</span>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-[11px] text-red-500">
              {error}
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-blue-500/25 active:scale-95 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="spin-glow" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Run Prediction</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={`mx-4 my-3 border-t ${isDark ? "border-slate-700/50" : "border-slate-200"}`} />

      {/* Bottom info */}
      <div className="px-4 pb-4 mt-auto">
        <div className={`border rounded-xl p-3 ${
          isDark
            ? "bg-gradient-to-br from-blue-900/30 to-slate-800/40 border-blue-500/15"
            : "bg-blue-50/60 border-blue-100"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDark ? "bg-blue-500/20" : "bg-blue-100"
            }`}>
              <svg className={`w-3 h-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-xs font-semibold ${isDark ? "text-blue-300" : "text-blue-800"}`}>ML Powered</span>
          </div>
          <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Predictions use Random Forest with technical indicators: SMA, EMA, RSI &amp; more.
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>Gemini AI Summaries Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}