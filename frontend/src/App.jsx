import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  const [stockData, setStockData] = useState(null);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0b0f1a]">
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

export default App;
