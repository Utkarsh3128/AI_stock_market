import Plot from 'react-plotly.js';

export default function StockChart({stockData}) {
    
    if (!stockData) return null;


    return (
        <div className="max-w-7xl mx-auto mt-8 px-6">
            <div className="bg-slate-800 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Stock Price with Technical Indicators</h2>
                <Plot
                    data={[
                        {
                            x: stockData.dates,
                            y: stockData.close,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Close Price',
                        },
                        {
                            x: stockData.dates,
                            y: stockData.sma_values,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'SMA 20',
                        },
                        {
                            x: stockData.dates,
                            y: stockData.ema_values,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'EMA 20',
                        }
                    ]}
                    layout={{
                        paper_bgcolor: '#1e293b',
                        plot_bgcolor: '#1e293b',
                        font: {
                            color: '#ffffff'
                        },
                        autosize: true,
                        height: 500,
                    }}

                    style={{ width: '100%'}}
                />
            </div>
        </div>
    )
}