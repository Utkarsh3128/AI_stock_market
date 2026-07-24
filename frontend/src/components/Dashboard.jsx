import { useState } from "react";
import Tabs from "./Tabs";
import Overview from "./Overview";
import TechnicalIndicators from "./TechnicalIndicators";
import Prediction from "./Prediction";
import AISummary from "./AISummary";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard({ stockData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { isDark } = useTheme();

  const renderTab = () => {
    switch (activeTab) {
      case "overview":   return <Overview stockData={stockData} />;
      case "technical":  return <TechnicalIndicators stockData={stockData} />;
      case "prediction": return <Prediction stockData={stockData} />;
      case "aisummary":  return <AISummary stockData={stockData} />;
      default:           return <Overview stockData={stockData} />;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-grid">
      {/* Tab bar */}
      <div className={`flex items-center justify-between px-6 py-3 border-b flex-shrink-0 transition-colors ${
        isDark ? "bg-[#0b0f1a]/80 border-slate-700/40" : "bg-white/90 border-slate-200 shadow-xs"
      }`}>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Right: data status indicator */}
        {stockData && (
          <div className={`flex items-center gap-2 border rounded-full px-3 py-1.5 ${
            isDark ? "bg-slate-800/60 border-slate-700/40 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700 font-medium"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></span>
            <span className="text-[11px]">
              {stockData.ticker} loaded
            </span>
          </div>
        )}
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {renderTab()}
      </div>
    </div>
  );
}
