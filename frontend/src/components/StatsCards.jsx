export default function StatsCards({ stockData }) {
    if (!stockData) return null;

    const stats = [
        {
            title: "Current Price",
            value: `${stockData.price}`,
        },
        {
            title: "20-Day SMA",
            value: `${stockData.SMA_20}`,
        },
        {
            title: "20-Day EMA",
            value: `${stockData.EMA_20}`,
        },
        {
            title: "RSI",
            value: `${stockData.RSI_14}`,
        }
    ];

    return (
        <div className="max-w-7xl mx-auto mt-8 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item)=> (
                    <div key={item.title} className="bg-slate-800 shadow-lg rounded-xl p-6">
                        <p className="text-slate-400">{item.title}</p>
                        <h2 className="text-3xl font-bold text-white">{item.value}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}