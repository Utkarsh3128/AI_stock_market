import pandas as pd
from ta.momentum import RSIIndicator

# read processed stock data
df = pd.read_csv("data/processed/CAP_PA_clean.csv")

if "unnamed: 0" in df.columns:
    df.drop(columns=["unnamed: 0"], inplace=True)

# convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# feature engineering: calculate SMA

df['SMA_20'] = df['Close'].rolling(window=20).mean()

# feature engineering: calculate EMA
df['EMA_20'] = df['Close'].ewm(span=20, adjust=False).mean()

# feature engineering: calculate RSI
rsi = RSIIndicator(close=df['Close'], window=14)
df['RSI_14'] = rsi.rsi()

# daily returns
df['Daily_Return'] = df['Close'].pct_change()

# target variable: next day's return
df['Target'] = df['Daily_Return'].shift(-1) > df['Close'].astype(int)

df.dropna(inplace=True)  # drop rows with NaN values    

# save the feature engineered data
df.to_csv("data/processed/CAP_PA_features.csv", index=False) 

print("Feature engineered data saved to data/processed/CAP_PA_features.csv")
print(df.head())