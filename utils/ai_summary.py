def generate_summary(prediction, rsi, close_price):
 
    if prediction == 1:
        signal = "BUY"
        recommendation = (
            "The model predicts an upward movement based on the "
            "current market trend."
        )
    else:
        signal = "SELL"
        recommendation = (
            "The model predicts a downward movement. Investors "
            "should be cautious."
        )
 
    if rsi > 70:
        risk = "High"
        momentum = "Overbought"
 
    elif rsi < 30:
        risk = "Medium"
        momentum = "Oversold"
 
    else:
        risk = "Low"
        momentum = "Neutral"
 
    summary = f"""
### AI Investment Summary
 
Current Price : ₹{close_price:.2f}
 
Prediction : {signal}
 
Market Momentum : {momentum}
 
Risk Level : {risk}
 
Recommendation :
 
{recommendation}
 
This recommendation is generated using technical indicators and
the Random Forest prediction model.
"""
 
    return summary
 