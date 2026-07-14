import pandas as pd 
import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    ConfusionMatrixDisplay
)

import matplotlib.pyplot as plt

df=pd.read_csv("data/processed/TCS_NS_features.csv")

X= df[
    ["Open", "High", "Low", "Close", "Volume", "SMA_20", "EMA_20", "RSI_14"]
]

y= df["Target"]

model= joblib.load("models/random_forest_model.pkl")
y_pred= model.predict(X)

# Keep label handling stable even when only one class appears.
class_labels = [0, 1]
display_labels = ["Sell", "Buy"]

accuracy= accuracy_score(y, y_pred)
precision= precision_score(y, y_pred, pos_label=1, zero_division=0)
recall= recall_score(y, y_pred, pos_label=1, zero_division=0)
f1= f1_score(y, y_pred, pos_label=1, zero_division=0)

print(f"Accuracy: {accuracy:.2%}")
print(f"Precision: {precision:.2%}")
print(f"Recall: {recall:.2%}")
print(f"F1-Score: {f1:.2%}")

#confusion matrix
cm= confusion_matrix(y, y_pred, labels=class_labels)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=display_labels)
disp.plot(cmap=plt.cm.Blues)
plt.savefig("models/confusion_matrix.png")