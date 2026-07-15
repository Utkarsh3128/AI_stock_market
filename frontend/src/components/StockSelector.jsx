import { useState } from "react";
import { predictStock } from "../services/api";

export default function Stockselector({onPredict}) {
    const [ticker, setTicker] = useState("CAP.PA");
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        try {
            setLoading(true);
            const data = await predictStock(ticker);
            console.log("Predicted stock data:", data);

            onPredict(data);

        } catch (error) {
            console.error("Error predicting stock:", error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-w-7xl mx-auto mt-8 px-6">
            <div className="bg-slate-800 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Select a Stock</h2>

                <div className="flex gap-4">
                    <select value={ticker} onChange={(e) => setTicker(e.target.value)} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-3 outline-none">
                        <option value="CAP.PA">Capgemini</option>
                        <option value="FARM.PA">Farmers</option>
                        <option value="MSFT">Microsoft</option>
                        <option value="AAPL">Apple</option>
                        <option value="GOOGL">Google</option>
                    </select>

                    <button onClick={handlePredict} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-lg">
                        {loading ? "Predicting..." : "Predict"}
                    </button>
                </div>
            </div>
        </div>
    )
}