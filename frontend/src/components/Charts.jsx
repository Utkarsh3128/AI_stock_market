import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Shared chart options base
const baseOptions = {
  responsive: true,
  maintainAspectRatio: true,
  animation: { duration: 600 },
  plugins: {
    legend: {
      labels: {
        color: "#94a3b8",
        font: { size: 11, family: "Inter" },
        boxWidth: 12,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.9)",
      titleColor: "#e2e8f0",
      bodyColor: "#94a3b8",
      borderColor: "rgba(59,130,246,0.3)",
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "#475569", font: { size: 9, family: "Inter" }, maxTicksLimit: 8 },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "#475569", font: { size: 10, family: "Inter" } },
    },
  },
};

// Spark overview chart – close price only with gradient fill
export function OverviewChart({ stockData }) {
  if (!stockData) return null;

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Close Price",
        data: stockData.close,
        borderColor: "#3b82f6",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "transparent";
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, "rgba(59,130,246,0.25)");
          grad.addColorStop(1, "rgba(59,130,246,0.01)");
          return grad;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          legend: { display: false },
        },
      }}
    />
  );
}

// Technical chart – Close + SMA + EMA
export function TechnicalPriceChart({ stockData }) {
  if (!stockData) return null;

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Close Price",
        data: stockData.close,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.0)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "SMA 20",
        data: stockData.sma_values,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.0)",
        borderWidth: 1.5,
        borderDash: [5, 3],
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "EMA 20",
        data: stockData.ema_values,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.0)",
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={baseOptions} />;
}

// RSI chart – fixed 0-100 axis
export function RSIChart({ stockData }) {
  if (!stockData) return null;

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "RSI 14",
        data: stockData.rsi_values,
        borderColor: "#f43f5e",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "transparent";
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, "rgba(244,63,94,0.18)");
          grad.addColorStop(1, "rgba(244,63,94,0.01)");
          return grad;
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const rsiOptions = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        min: 0,
        max: 100,
        ticks: {
          ...baseOptions.scales.y.ticks,
          stepSize: 20,
          callback: (val) => val,
        },
      },
    },
    plugins: {
      ...baseOptions.plugins,
      annotation: {
        annotations: {
          overbought: { type: "line", yMin: 70, yMax: 70, borderColor: "rgba(249,115,22,0.5)", borderWidth: 1 },
          oversold: { type: "line", yMin: 30, yMax: 30, borderColor: "rgba(34,197,94,0.5)", borderWidth: 1 },
        },
      },
    },
  };

  return <Line data={data} options={rsiOptions} />;
}