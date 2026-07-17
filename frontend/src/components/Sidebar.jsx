import { useState } from "react";
import { predictStock } from "../services/api";

const STOCKS = [
  { value: "CAP.PA",  label: "Capgemini",  exchange: "PA" },
  { value: "ZURN.SW", label: "Farmers",    exchange: "SW" },
  { value: "MSFT",    label: "Microsoft",  exchange: "NASDAQ" },
  { value: "AAPL",    label: "Apple",      exchange: "NASDAQ" },
  { value: "GOOGL",   label: "Google",     exchange: "NASDAQ" },
  { value: "TCS.NS",  label: "TCS",        exchange: "NSE" },
];


export default function Sidebar({ onPredict }) {
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
    <aside className="w-[250px] flex-shrink-0 h-full flex flex-col border-r border-slate-700/50 bg-[#0d1220] overflow-y-auto">


      {/* Divider */}
      <div className="mx-4 my-3 border-t border-slate-700/50" />

      {/* Stock Selector Section */}
      <div className="px-4 flex flex-col gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">Stock Analysis</p>

          {/* Search */}
          <div className="relative mb-3">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
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
              className="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Dropdown */}
          <label className="text-[11px] text-slate-400 font-medium mb-1.5 block">Select Ticker</label>
          <select
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/60 transition-all appearance-none cursor-pointer"
          >
            {filtered.map((s) => (
              <option key={s.value} value={s.value} className="bg-slate-800">
                {s.label} ({s.value})
              </option>
            ))}
          </select>

          {/* Selected stock info card */}
          {selectedStock && (
            <div className="mt-3 bg-slate-800/60 border border-slate-700/40 rounded-lg px-3 py-2.5 fade-in-up">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Selected</p>
              <p className="text-sm font-semibold text-white mt-0.5">{selectedStock.label}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded px-1.5 py-0.5 font-mono">{selectedStock.value}</span>
                <span className="text-[10px] text-slate-500">{selectedStock.exchange}</span>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-[11px] text-red-400">
              {error}
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
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
      <div className="mx-4 my-3 border-t border-slate-700/50" />

      {/* Bottom info */}
      <div className="px-4 pb-4 mt-auto">
        <div className="bg-gradient-to-br from-blue-900/30 to-slate-800/40 border border-blue-500/15 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-blue-300">ML Powered</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Predictions use Random Forest with technical indicators: SMA, EMA, RSI &amp; more.
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <span className="text-[10px] text-slate-500">Gemini AI Summaries Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}