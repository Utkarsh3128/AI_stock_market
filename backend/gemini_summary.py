# import os 
# from click import prompt
# from dotenv import load_dotenv
# import google.generativeai as genai

# load_dotenv()
# print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# model = genai.GenerativeModel("gemini-3.5-flash")

# def generate_summary(ticker, prediction, confidence, price, sma, ema, rsi):
#     prompt = f""" You are a financial assistant.

#      Analyze the following stock information:
#      Stock: {ticker}
#      Current Price: {price}
#      Prediction: {prediction}
#      Confidence: {confidence}%
#      SMA20: {sma}
#      EMA20: {ema}
#      RSI14: {rsi}
#      Generate a short professional explanation (3-4 lines).
#      Do not guarantee profits.
#      Mention the prediction and technical indicators."""
    
#     response = model.generate_content(prompt)
#     return response.text

import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(ticker, prediction, confidence, price, sma, ema, rsi):
    prompt = f"""
You are a financial assistant.

Analyze this stock:

Stock: {ticker}
Current Price: {price}
Prediction: {prediction}
Confidence: {confidence}%
SMA20: {sma}
EMA20: {ema}
RSI14: {rsi}

Write a professional summary in 3-4 lines.

Mention:
- Current trend
- Meaning of SMA, EMA and RSI
- Explain the Buy/Sell prediction
- Do NOT guarantee profits.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception:
        return (
            f"The AI service is temporarily unavailable. "
            f"Our Random Forest model predicts **{prediction}** "
            f"with **{confidence}% confidence**. "
            f"Current Price: {price}, SMA20: {sma}, EMA20: {ema}, RSI14: {rsi}."
        )