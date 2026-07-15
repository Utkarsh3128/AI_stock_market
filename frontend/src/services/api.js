const api = "http://127.0.0.1:8000";

export async function predictStock(ticker){
    const response = await fetch(`${api}/predict`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker: ticker }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}