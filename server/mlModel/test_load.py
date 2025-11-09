# diagnose_models.py
import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import classification_report, confusion_matrix, r2_score, mean_absolute_error

# load data (use same CSV you trained on)
df = pd.read_csv("farmer_advisor_dataset.csv").dropna()

# FEATURES used in training
FEATURES = ["Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm"]

# targets used in training
crop_col = "Crop_Type"
fert_col = "Fertilizer_Usage_kg"
pest_col = "Pesticide_Usage_kg"

# load models & scaler + encoder
crop_model = joblib.load("crop_model.pkl")
fert_model = joblib.load("fertilizer_model.pkl")
pest_model = joblib.load("pesticide_model.pkl")
scaler = joblib.load("scaler.pkl")
le = joblib.load("label_encoder.pkl")

# prepare test split (same logic as training)
from sklearn.model_selection import train_test_split
X = df[FEATURES]
y_crop = df[crop_col]
y_fert = df[fert_col]
y_pest = df[pest_col]

# encode crop labels
y_crop_enc = le.transform(y_crop)

X_scaled = scaler.transform(X)
X_train, X_test, yc_train, yc_test, yf_train, yf_test, yp_train, yp_test = train_test_split(
    X_scaled, y_crop_enc, y_fert, y_pest, test_size=0.2, random_state=42
)

# Crop classification metrics
y_pred_crop = crop_model.predict(X_test)
print("=== Crop classification report ===")
print(classification_report(yc_test, y_pred_crop, target_names=le.classes_))
print("Confusion matrix (rows=true, cols=pred):")
print(confusion_matrix(yc_test, y_pred_crop))

# Fertilizer regressor metrics
y_pred_fert = fert_model.predict(X_test)
print("\n=== Fertilizer regressor metrics ===")
print("R2:", r2_score(yf_test, y_pred_fert))
print("MAE:", mean_absolute_error(yf_test, y_pred_fert))
print("Sample real v pred (first 10):")
for real, pred in list(zip(yf_test[:10], y_pred_fert[:10])):
    print(f"real={real:.2f}, pred={pred:.2f}")

# Pesticide regressor metrics
y_pred_pest = pest_model.predict(X_test)
print("\n=== Pesticide regressor metrics ===")
print("R2:", r2_score(yp_test, y_pred_pest))
print("MAE:", mean_absolute_error(yp_test, y_pred_pest))
print("Sample real v pred (first 10):")
for real, pred in list(zip(yp_test[:10], y_pred_pest[:10])):
    print(f"real={real:.2f}, pred={pred:.2f}")
