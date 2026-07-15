import os 
from sympy import false
import yfinance as yf
import pandas as pd

def download_stock_data(ticker):

    stock = yf.download(ticker, period="5y",progress=False,auto_adjust=False,group_by='column')

    stock.columns= stock.columns.get_level_values(0)

    if stock.empty:
        raise ValueError(f"No data found for ticker: {ticker}")
    
    stock.reset_index(inplace=True)

    return stock
