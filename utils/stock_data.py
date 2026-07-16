import os 
from sympy import false
import yfinance as yf
import pandas as pd

def download_stock_data(ticker):

    stock = yf.download(ticker, period="5y",progress=False,auto_adjust=False,group_by='column')

    stock.columns= stock.columns.get_level_values(0)

    if stock.empty:
        raise ValueError(f"No data found for ticker: {ticker}")
    
    stock.reset_index(inplace=True) # reset index to have 'Date' as a column

    # remove duplicates rows
    stock.drop_duplicates(inplace=True)

    # sort by date
    stock.sort_values(by="Date", inplace=True)

    stock.ffill(inplace=True)  # forward fill missing values

    stock.dropna(inplace=True)  # drop any remaining rows with NaN values

    stock.reset_index(drop=True, inplace=True)  # reset index after dropping rows

    return stock
