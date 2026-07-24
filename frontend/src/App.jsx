import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainContent() {
  const [stockData, setStockData] = useState(null);
  const { isDark } = useTheme();

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${isDark ? "bg-[#0b0f1a] text-slate-100 dark" : "bg-[#f8fafc] text-slate-900 light"}`}>
      {/* Top Navbar - fixed height */}
      <Navbar />

      {/* Body = Sidebar + Main */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar onPredict={setStockData} />

        {/* Main Dashboard */}
        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
          <Dashboard stockData={stockData} />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
