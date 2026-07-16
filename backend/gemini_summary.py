import os 
from click import prompt
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.5-flash")

def generate_summary(ticker, prediction, confidence, price, sma, ema, rsi):
    prompt = f""" You are a financial assistant.

     Analyze the following stock information:
     Stock: {ticker}
     Current Price: {price}
     Prediction: {prediction}
     Confidence: {confidence}%
     SMA20: {sma}
     EMA20: {ema}
     RSI14: {rsi}
     Generate a short professional explanation (3-4 lines).
     Do not guarantee profits.
     Mention the prediction and technical indicators."""
    
    response = model.generate_content(prompt)
    return response.text