from fastapi import FastAPI
from pydantic import BaseModel
from utils.stock_data import download_stock_data
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from backend.gemini_summary import generate_summary

app = FastAPI()

model = joblib.load("models/random_forest_model.pkl")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockRequest(BaseModel):
    ticker: str

# home api 
@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.post("/predict")
def predict(request: StockRequest):
    
    ticker = request.ticker
    print(request.ticker)

    df=download_stock_data(ticker)
    print(df.tail())

    # technical indicators
    df["SMA_20"] = df["Close"].rolling(window=20).mean()

    df["EMA_20"] = df["Close"].ewm(span=20).mean()

    delta = df["Close"].diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()
    rs = avg_gain / avg_loss
    df["RSI_14"] = 100 - (100 / (1 + rs))

    df.dropna(inplace=True)
    df.dropna(subset=["Close"])

    latest = df.iloc[-1]

    features= np.array(
        [[latest["SMA_20"], latest["EMA_20"], latest["RSI_14"]]]
    )

    prediction = model.predict(features)[0]

    confidence = round(max(model.predict_proba(features)[0]) * 100, 2)

    prediction = "Buy" if prediction == 1 else "Sell"

    gemini_summary = generate_summary(
        ticker,
        prediction,
        confidence,
        round(float(latest["Close"]), 2),
        round(float(latest["SMA_20"]), 2),
        round(float(latest["EMA_20"]), 2),
        round(float(latest["RSI_14"]), 2),
    )

    df=df.fillna(0)

    if prediction == "Buy":
        predicted_price = round(float(latest["Close"]) * 1.05, 2)
    else:
        predicted_price = round(float(latest["Close"]) * 0.98, 2)

    return {
        "ticker": ticker,
        "price": round(float(latest["Close"]), 2),
        "SMA_20": round(float(latest["SMA_20"]), 2),
        "EMA_20": round(float(latest["EMA_20"]), 2),
        "RSI_14": round(float(latest["RSI_14"]), 2),
        "prediction": prediction,
        "predicted_price": predicted_price,
        "confidence": confidence,
        "summary": gemini_summary,
        "dates": df["Date"].dt.strftime("%Y-%m-%d").tolist(),
        "close": df["Close"].round(2).tolist(),
        "sma_values": df["SMA_20"].fillna(0).round(2).tolist(),
        "ema_values": df["EMA_20"].fillna(0).round(2).tolist(),
        "rsi_values": df["RSI_14"].fillna(0).round(2).tolist(),
    }