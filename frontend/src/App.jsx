import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import StockChart from "./components/StockChart";
import Stockselector from "./components/Stockselector";
import { useState } from "react";

function App() {

  const [stockData, setStockData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar/>
      <Stockselector onPredict={setStockData}/>
      <StatsCards stockData={stockData}/>
      <StockChart stockData={stockData}/>
    </div>
  );
}

export default App
