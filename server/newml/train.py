import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import joblib

df = pd.read_csv("farmer_advisor_dataset.csv")
df.dropna(inplace=True)

le = LabelEncoder()
df["Crop_Code"] = le.fit_transform(df["Crop_Type"])

features = ["Crop_Code", "Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm"]
X = df[features]
y_fert = df["Fertilizer_Usage_kg"]
y_pest = df["Pesticide_Usage_kg"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, yf_train, yf_test = train_test_split(X_scaled, y_fert, test_size=0.2, random_state=42)
Xp_train, Xp_test, yp_train, yp_test = train_test_split(X_scaled, y_pest, test_size=0.2, random_state=42)

fert_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)
pest_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)

fert_model.fit(X_train, yf_train)
pest_model.fit(Xp_train, yp_train)

print("💧 Fertilizer R2:", r2_score(yf_test, fert_model.predict(X_test)))
print("🧴 Pesticide R2:", r2_score(yp_test, pest_model.predict(Xp_test)))

joblib.dump(fert_model, "fertilizer_model.pkl")
joblib.dump(pest_model, "pesticide_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(le, "crop_encoder.pkl")

print(" Retrained models saved successfully!")
