import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ stockData }) {
  if (!stockData) return null;

  const priceData = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Close Price",
        data: stockData.close,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
      {
        label: "SMA 20",
        data: stockData.sma_values,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.3,
      },
      {
        label: "EMA 20",
        data: stockData.ema_values,
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.3,
      },
    ],
  };

  const rsiData = {
    labels: stockData.dates,
    datasets: [
      {
        label: "RSI 14",
        data: stockData.rsi_values,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.3,
      },
    ],
  };

  const priceOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const rsiOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-6">

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Stock Price with SMA & EMA
        </h2>

        <Line data={priceData} options={priceOptions} />
      </div>

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-4">
            RSI Indicator
        </h2>

        <Line data={rsiData} options={rsiOptions} />
      </div>
    </div>
  );
}