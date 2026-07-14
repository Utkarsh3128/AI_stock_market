import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split    
from sklearn.metrics import accuracy_score, classification_report

df = pd.read_csv("data/processed/TCS_NS_features.csv")

X = df[
    ["Open","High","Low","Close","Volume", "SMA_20", "EMA_20", "RSI_14"]
]

y=df["Target"]

# split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=False) 

model = RandomForestClassifier(n_estimators=100, random_state=42)

#train
model.fit(X_train, y_train)

#predict
predictions = model.predict(X_test)

#accuracy
accuracy = accuracy_score(y_test, predictions)

print(f"Random Forest Classifier Accuracy: {accuracy*100:.2f}%")

print(classification_report(y_test, predictions))

#save the model
joblib.dump(model, "models/random_forest_model.pkl")