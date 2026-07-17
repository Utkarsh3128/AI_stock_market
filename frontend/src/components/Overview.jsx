import { OverviewChart } from "./Charts";

function StatCard({ label, value, icon, accent = "blue", sub }) {
  const accents = {
    blue:   { ring: "border-blue-500/20",   badge: "text-blue-400",   bg: "bg-blue-500/10" },
    green:  { ring: "border-emerald-500/20", badge: "text-emerald-400", bg: "bg-emerald-500/10" },
    orange: { ring: "border-orange-500/20",  badge: "text-orange-400",  bg: "bg-orange-500/10" },
    violet: { ring: "border-violet-500/20",  badge: "text-violet-400",  bg: "bg-violet-500/10" },
  };
  const a = accents[accent] || accents.blue;

  return (
    <div className={`glass-card p-4 flex flex-col gap-3 border ${a.ring} accent-border-top fade-in-up`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{label}</p>
        <div className={`w-7 h-7 rounded-lg ${a.bg} flex items-center justify-center ${a.badge}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value ?? "—"}</p>
      {sub && <p className="text-[11px] text-slate-500">{sub}</p>}
    </div>
  );
}

export default function Overview({ stockData }) {
  if (!stockData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
        <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        <p className="text-sm">Select a stock and click <span className="text-blue-400 font-semibold">Run Prediction</span> to begin</p>
      </div>
    );
  }

  const predColor = stockData.prediction === "Buy" ? "text-emerald-400" : "text-rose-400";
  const predBg    = stockData.prediction === "Buy" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20";

  return (
    <div className="flex flex-col gap-5 h-full fade-in-up">
      {/* Stat cards row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 flex-shrink-0">
        <StatCard
          label="Ticker"
          value={stockData.ticker}
          accent="blue"
          sub="Symbol"
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          }
        />
        <StatCard
          label="Current Price"
          value={stockData.price != null ? `$${Number(stockData.price).toFixed(2)}` : "—"}
          accent="green"
          sub="Latest close"
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <StatCard
          label="Predicted Price"
          value={stockData.predicted_price != null ? `$${Number(stockData.predicted_price).toFixed(2)}` : "—"}
          accent="violet"
          sub="ML forecast"
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />
        {/* Prediction signal */}
        <div className={`glass-card p-4 flex flex-col gap-3 border fade-in-up ${predBg} accent-border-top`}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Signal</p>
            <div className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-slate-300">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className={`text-2xl font-bold ${predColor}`}>{stockData.prediction}</p>
          <p className="text-[11px] text-slate-500">
            Confidence: {stockData.confidence != null ? `${(stockData.confidence * 100).toFixed(1)}%` : "—"}
          </p>
        </div>
      </div>

      {/* Price chart */}
      <div className="glass-card flex-1 p-5 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Stock Price Chart</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Historical close price</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-xs text-slate-400">Close</span>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <OverviewChart stockData={stockData} />
        </div>
      </div>
    </div>
  );
}
