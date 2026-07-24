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
import { useTheme } from "../context/ThemeContext";

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

// Shared chart options base generator based on theme
function getBaseOptions(isDark) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 600 },
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#94a3b8" : "#475569",
          font: { size: 11, family: "Inter" },
          boxWidth: 12,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)",
        titleColor: isDark ? "#e2e8f0" : "#0f172a",
        bodyColor: isDark ? "#94a3b8" : "#334155",
        borderColor: isDark ? "rgba(59,130,246,0.3)" : "rgba(203,213,225,0.9)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: { color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)" },
        ticks: { color: isDark ? "#94a3b8" : "#64748b", font: { size: 9, family: "Inter" }, maxTicksLimit: 8 },
      },
      y: {
        grid: { color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)" },
        ticks: { color: isDark ? "#94a3b8" : "#64748b", font: { size: 10, family: "Inter" } },
      },
    },
  };
}

// Spark overview chart – close price only with gradient fill
export function OverviewChart({ stockData }) {
  const { isDark } = useTheme();
  if (!stockData) return null;

  const baseOptions = getBaseOptions(isDark);

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Close Price",
        data: stockData.close,
        borderColor: "#2563eb",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "transparent";
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, isDark ? "rgba(59,130,246,0.25)" : "rgba(37,99,235,0.2)");
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
  const { isDark } = useTheme();
  if (!stockData) return null;

  const baseOptions = getBaseOptions(isDark);

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Close Price",
        data: stockData.close,
        borderColor: "#2563eb",
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
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.0)",
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
  const { isDark } = useTheme();
  if (!stockData) return null;

  const baseOptions = getBaseOptions(isDark);

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "RSI 14",
        data: stockData.rsi_values,
        borderColor: "#e11d48",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "transparent";
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, isDark ? "rgba(244,63,94,0.18)" : "rgba(225,29,72,0.15)");
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
  };

  return <Line data={data} options={rsiOptions} />;
}
