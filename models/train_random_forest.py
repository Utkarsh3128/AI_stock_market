import joblib
import pandas as pd
import sys
from pathlib import Path

# Add project root to Python path
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split    
from sklearn.metrics import accuracy_score, classification_report

from utils.stock_data import download_stock_data

# stocks to train on 
stocks = ["CAP.PA","AAPL", "GOOGL", "MSFT", "AMZN", "TCS.NS", "ZURN.SW"]

all_data=[]

for ticker in stocks:
    print("Downloading {ticker}....") 

    df=download_stock_data(ticker)

    # technical indicators
    df["SMA_20"] = df["Close"].rolling(window=20).mean()
    df["EMA_20"] = df["Close"].ewm(span=20).mean()

    delta = df["Close"].diff()

    gain = delta.clip(lower=0)
    loss= -delta.clip(upper=0)
    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()

    rs = avg_gain / avg_loss

    df["RSI_14"]   = 100 - (100 / (1 + rs))

    # target variable
    df["target"] = (df["Close"].shift(-1) > df["Close"]).astype(int)
    df.dropna(inplace=True)
    all_data.append(df)

# merge all stocks 
df = pd.concat(all_data, ignore_index=True)
print("totals rows: ", len(df))


# Features and target
X = df[["SMA_20", "EMA_20", "RSI_14"]]
y = df["target"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# train 
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# accuracy 
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2f}")

# save 
joblib.dump(model, "models/random_forest_model.pkl")

print("Model saved successfully!")