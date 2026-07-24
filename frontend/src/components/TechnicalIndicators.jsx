import { TechnicalPriceChart, RSIChart } from "./Charts";
import { useTheme } from "../context/ThemeContext";

function MetricBadge({ label, value, color }) {
  const { isDark } = useTheme();
  return (
    <div className={`flex flex-col gap-1 rounded-lg px-3 py-2 border ${
      isDark ? "bg-slate-800/60 border-slate-700/40" : "bg-slate-50 border-slate-200"
    }`}>
      <p className={`text-[10px] uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value ?? "—"}</p>
    </div>
  );
}

function getRsiZone(rsi, isDark) {
  if (rsi == null) return { label: "—", color: isDark ? "text-slate-400" : "text-slate-500" };
  if (rsi >= 70) return { label: "Overbought", color: isDark ? "text-orange-400" : "text-orange-600" };
  if (rsi <= 30) return { label: "Oversold", color: isDark ? "text-blue-400" : "text-blue-600" };
  return { label: "Neutral", color: isDark ? "text-emerald-400" : "text-emerald-600" };
}

export default function TechnicalIndicators({ stockData }) {
  const { isDark } = useTheme();

  if (!stockData) {
    return (
      <div className={`flex flex-col items-center justify-center h-full gap-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        </svg>
        <p className="text-sm font-medium">Run a prediction to see technical indicators</p>
      </div>
    );
  }

  const rsiValue = stockData.RSI_14 != null ? Number(stockData.RSI_14).toFixed(1) : null;
  const rsiZone  = getRsiZone(rsiValue, isDark);

  return (
    <div className="flex flex-col gap-5 h-full fade-in-up">
      {/* Metric summary row */}
      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <MetricBadge label="Close Price" value={stockData.price != null ? `$${Number(stockData.price).toFixed(2)}` : "—"} color={isDark ? "text-blue-400" : "text-blue-600"} />
        <MetricBadge label="SMA 20" value={stockData.SMA_20 != null ? `$${Number(stockData.SMA_20).toFixed(2)}` : "—"} color={isDark ? "text-orange-400" : "text-orange-600"} />
        <MetricBadge label="EMA 20" value={stockData.EMA_20 != null ? `$${Number(stockData.EMA_20).toFixed(2)}` : "—"} color={isDark ? "text-emerald-400" : "text-emerald-600"} />
      </div>

      {/* Price + SMA + EMA chart */}
      <div className="glass-card p-5 flex flex-col" style={{ flex: "1 1 55%" }}>
        <div className="flex items-center gap-4 mb-4 flex-shrink-0">
          <div>
            <h2 className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Price &amp; Moving Averages</h2>
            <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Close · SMA 20 · EMA 20</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {[
              { color: "bg-blue-600",   label: "Close" },
              { color: "bg-orange-500", label: "SMA 20" },
              { color: "bg-emerald-500",label: "EMA 20" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`}></span>
                <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <TechnicalPriceChart stockData={stockData} />
        </div>
      </div>

      {/* RSI chart */}
      <div className="glass-card p-5 flex flex-col" style={{ flex: "1 1 40%" }}>
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div>
            <h2 className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>RSI Indicator (14)</h2>
            <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Scale: 0 – 100 · fixed axis</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-xs font-semibold ${rsiZone.color} border rounded-full px-3 py-1 ${
              isDark ? "bg-slate-800/60 border-slate-700/40" : "bg-slate-100 border-slate-200"
            }`}>
              RSI {rsiValue} · {rsiZone.label}
            </div>
            <div className={`flex items-center gap-3 text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
              <span className="text-orange-500 dark:text-orange-400 font-medium">70 = Overbought</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">30 = Oversold</span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <RSIChart stockData={stockData} />
        </div>
      </div>
    </div>
  );
}
