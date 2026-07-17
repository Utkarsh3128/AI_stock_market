function PredCard({ label, value, accent = "blue", icon }) {
  const accents = {
    blue:   { ring: "border-blue-500/20",    bg: "bg-blue-500/10",    text: "text-blue-400" },
    green:  { ring: "border-emerald-500/20",  bg: "bg-emerald-500/10", text: "text-emerald-400" },
    orange: { ring: "border-orange-500/20",   bg: "bg-orange-500/10",  text: "text-orange-400" },
    violet: { ring: "border-violet-500/20",   bg: "bg-violet-500/10",  text: "text-violet-400" },
    red:    { ring: "border-rose-500/20",     bg: "bg-rose-500/10",    text: "text-rose-400" },
  };
  const a = accents[accent] || accents.blue;
  return (
    <div className={`glass-card p-5 flex flex-col gap-3 border ${a.ring} fade-in-up`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{label}</p>
        <div className={`w-8 h-8 rounded-xl ${a.bg} flex items-center justify-center ${a.text}`}>
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-bold ${a.text}`}>{value ?? "—"}</p>
    </div>
  );
}

export default function Prediction({ stockData }) {
  if (!stockData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
        <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="text-sm">Run a prediction to see ML output</p>
      </div>
    );
  }

  const isBuy       = stockData.prediction === "Buy";
  const confPct     = stockData.confidence != null ? Math.min(100, Math.round(stockData.confidence * 100)) : null;
  const signalAccent = isBuy ? "green" : "red";

  return (
    <div className="flex flex-col gap-6 fade-in-up h-full overflow-y-auto">
      {/* Main prediction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <PredCard
          label="Signal"
          value={stockData.prediction}
          accent={signalAccent}
          icon={
            isBuy ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )
          }
        />
        <PredCard
          label="Predicted Price"
          value={stockData.predicted_price != null ? `$${Number(stockData.predicted_price).toFixed(2)}` : "—"}
          accent="violet"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <PredCard
          label="Confidence"
          value={confPct != null ? `${confPct}%` : "—"}
          accent="orange"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <PredCard
          label="Model"
          value="Random Forest"
          accent="blue"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
          }
        />
      </div>

      {/* Confidence progress bar */}
      {confPct != null && (
        <div className="glass-card p-5 fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Model Confidence</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Probability of correct prediction</p>
            </div>
            <span className="text-2xl font-bold text-orange-400">{confPct}%</span>
          </div>

          {/* Track */}
          <div className="h-3 bg-slate-700/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-glow transition-all duration-700"
              style={{
                width: `${confPct}%`,
                background: confPct >= 70
                  ? "linear-gradient(90deg, #059669, #10b981)"
                  : confPct >= 50
                  ? "linear-gradient(90deg, #d97706, #f59e0b)"
                  : "linear-gradient(90deg, #dc2626, #ef4444)",
              }}
            />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-2 text-[10px] text-slate-500">
            <span>0%</span>
            <span className="text-rose-400">Low (&lt;50%)</span>
            <span className="text-orange-400">Medium (50-70%)</span>
            <span className="text-emerald-400">High (&gt;70%)</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Model info */}
      <div className="glass-card p-5 fade-in-up">
        <h3 className="text-sm font-semibold text-white mb-3">Model Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Algorithm",        value: "Random Forest Classifier" },
            { label: "Features Used",    value: "SMA, EMA, RSI, MACD, Volume" },
            { label: "Prediction Type",  value: "Buy / Sell Classification" },
            { label: "Data Source",      value: "Yahoo Finance (yfinance)" },
            { label: "AI Explanation",   value: "Gemini 3.5 Flash" },
            { label: "Backend",          value: "FastAPI + Python" },
          ].map((row) => (
            <div key={row.label} className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/40">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">{row.label}</p>
              <p className="text-xs font-medium text-slate-200 mt-1">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
