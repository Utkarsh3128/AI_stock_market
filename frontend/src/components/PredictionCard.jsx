export function PredictionCard({ stockData }) {
    if (!stockData) return null;

    return (
        <div className="max-w-7xl mx-auto mt-8 px-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    AI Prediction Summary
                </h2>

                <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-gray-400 mb-2 font-bold text-3xl">
                        Prediction
                    </p>
                    <p className={`text-2xl font-bold ${stockData.prediction === "Buy" ? "text-green-500" : "text-red-500"}`}>
                        {stockData.prediction}
                    </p>
                    <p className="text-lg font-semibold text-green-300">
                        Predicted Price: ${stockData.predicted_price}
                    </p>
                </div>
            </div>
        </div>
    );
}