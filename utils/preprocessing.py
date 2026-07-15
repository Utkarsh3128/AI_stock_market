import os
import pandas as pd

raw_path = "data/raw/CAP_PA.csv"
processed_dir = "data/processed"
processed_path = os.path.join(processed_dir, "CAP_PA_clean.csv")

def preprocess_stock_data():
    df = pd.read_csv(raw_path)

    df['Date'] = pd.to_datetime(df['Date']) #convert date column
    df= df.sort_values('Date') #sort by date
    df=df.drop_duplicates() #remove duplicates
    df=df.dropna() #remove null values
    df=df.reset_index(drop=True) #reset index

    os.makedirs(processed_dir, exist_ok=True)

    df.to_csv(processed_path, index=False)

    print(f"Preprocessed data saved to {processed_path}")

if __name__ == "__main__":
    preprocess_stock_data()