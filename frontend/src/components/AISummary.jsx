export default function AISummary({ stockData }) {
  if (!stockData) return null;

  return (
    <div className="max-w-7xl mx-auto mt-6 px-6">
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-3">
          AI Summary
        </h2>

        <p className="text-gray-300">
          {Array.isArray(stockData.summary)
            ? stockData.summary[0]
            : stockData.summary}
        </p>

      </div>
    </div>
  );
}