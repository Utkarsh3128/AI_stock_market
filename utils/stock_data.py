from yfinance.utils import auto_adjust
import os 
import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol="TCS.NS", period="5y"):
    data = yf.download(symbol, period=period, auto_adjust=False)

    if isinstance(data.columns, pd.MultiIndex):
        data.columns = data.columns.get_level_values(0)
        data.reset_index(inplace=True)
    
    os.makedirs("data/raw", exist_ok=True)

    file_path = f"data/raw/{symbol.replace('.', '_')}.csv"
    data.to_csv(file_path)

    print(f"Data for {symbol} saved to {file_path}")

    return data

if __name__ == "__main__":
    df=fetch_stock_data()

    print=(df.head())