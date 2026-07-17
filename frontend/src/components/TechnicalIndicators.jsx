import { TechnicalPriceChart, RSIChart } from "./Charts";

function MetricBadge({ label, value, color }) {
  return (
    <div className="flex flex-col gap-1 bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/40">
      <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value ?? "—"}</p>
    </div>
  );
}

function getRsiZone(rsi) {
  if (rsi == null) return { label: "—", color: "text-slate-400" };
  if (rsi >= 70) return { label: "Overbought", color: "text-orange-400" };
  if (rsi <= 30) return { label: "Oversold", color: "text-blue-400" };
  return { label: "Neutral", color: "text-emerald-400" };
}

export default function TechnicalIndicators({ stockData }) {
  if (!stockData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
        <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        </svg>
        <p className="text-sm">Run a prediction to see technical indicators</p>
      </div>
    );
  }

  const rsiValue = stockData.RSI_14 != null ? Number(stockData.RSI_14).toFixed(1) : null;
  const rsiZone  = getRsiZone(rsiValue);

  return (
    <div className="flex flex-col gap-5 h-full fade-in-up">
      {/* Metric summary row */}
      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <MetricBadge label="Close Price" value={stockData.price != null ? `$${Number(stockData.price).toFixed(2)}` : "—"} color="text-blue-400" />
        <MetricBadge label="SMA 20" value={stockData.SMA_20 != null ? `$${Number(stockData.SMA_20).toFixed(2)}` : "—"} color="text-orange-400" />
        <MetricBadge label="EMA 20" value={stockData.EMA_20 != null ? `$${Number(stockData.EMA_20).toFixed(2)}` : "—"} color="text-emerald-400" />
      </div>

      {/* Price + SMA + EMA chart */}
      <div className="glass-card p-5 flex flex-col" style={{ flex: "1 1 55%" }}>
        <div className="flex items-center gap-4 mb-4 flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Price &amp; Moving Averages</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Close · SMA 20 · EMA 20</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {[
              { color: "bg-blue-500",   label: "Close" },
              { color: "bg-orange-500", label: "SMA 20" },
              { color: "bg-emerald-500",label: "EMA 20" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`}></span>
                <span className="text-[10px] text-slate-400">{l.label}</span>
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
            <h2 className="text-sm font-semibold text-white">RSI Indicator (14)</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Scale: 0 – 100 · fixed axis</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-xs font-semibold ${rsiZone.color} bg-slate-800/60 border border-slate-700/40 rounded-full px-3 py-1`}>
              RSI {rsiValue} · {rsiZone.label}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span className="text-orange-400">70 = Overbought</span>
              <span className="text-blue-400">30 = Oversold</span>
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