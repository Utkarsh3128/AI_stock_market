import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import joblib
from utils.ai_summary import generate_summary

st.set_page_config(page_title="AI Stock Price Prediction", page_icon="📈", layout="wide")

st.title("AI Stock Price Prediction")

st.markdown(
    """
    Predict stock movement using **Machine learning** and **Technical indicators**.

    **Features used for prediction:**
    - SMA (Simple Moving Average)
    - EMA (Exponential Moving Average) 
    - RSI (Relative Strength Index)
    - Random Forest Classifier
    """
)

stock = st.selectbox("Select a stock", ["TCS_NS", "GOOG_NS", "AAPL", "MSFT", "AMZN "])

# load data
df=pd.read_csv(f"data/processed/{stock}_features.csv")

st.success(f"Data for {stock} loaded successfully!")

# KPI cards
latest = df.iloc[-1]

col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Current Price", f"${latest['Close']:.2f}")

with col2:
    st.metric("RSI", f"${latest['RSI_14']:.2f}")

with col3:
    st.metric("20 days SMA", f"${latest['SMA_20']:.2f}")

st.subheader("Stock Closing Price with Technical Indicators")

fig = go.Figure()

fig.add_trace(go.Scatter(x=df['Date'], y=df['Close'], mode='lines', name='Close Price'))
fig.add_trace(go.Scatter(x=df['Date'], y=df['SMA_20'], mode='lines', name='SMA 20'))
fig.add_trace(go.Scatter(x=df['Date'], y=df['EMA_20'], mode='lines', name='EMA 20'))

fig.update_layout(height=550,xaxis_title="Date", yaxis_title="Price", template="plotly_dark")

# fig = px.line(df, x='Date', y='Close', title=f"{stock} Closing Price")
st.plotly_chart(fig, use_container_width=True)

# RSI chart
st.subheader("Relative Strength Index (RSI)")
fig2 = go.Figure()

fig2.add_trace(go.Scatter(x=df['Date'], y=df['RSI_14'], mode='lines', name='RSI 14'))

fig2.update_layout(height=400,xaxis_title="Date", yaxis_title="RSI", template="plotly_dark")
st.plotly_chart(fig2, use_container_width=True)

# Random forest prediction
st.subheader("Random Forest Classifier Prediction")

model = joblib.load("models/random_forest_model.pkl")

features = df[["Open","High","Low","Close","Volume", "SMA_20", "EMA_20", "RSI_14"]]

predictions = model.predict(pd.DataFrame(features))[0]

if predictions == 1:
    st.success("Buy signal 📈")
else:
    st.error("Sell signal 📉")


# AI summary
st.subheader("AI Summary")

# if latest["RSI_14"] > 70:
#     rsi_text = "The stock is overbought. Consider selling."
# elif latest["RSI_14"] < 30:
#     rsi_text = "The stock is oversold. Consider buying."
# else:
#     rsi_text = "The stock is in a neutral zone."

summary = generate_summary(predictions, latest["RSI_14"], latest["Close"])

st.info(summary)