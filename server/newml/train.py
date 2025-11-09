import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import joblib

# 1️⃣ Load dataset
df = pd.read_csv("farmer_advisor_dataset.csv")
df.dropna(inplace=True)

# 2️⃣ Encode crop type numerically
le = LabelEncoder()
df["Crop_Code"] = le.fit_transform(df["Crop_Type"])

# 3️⃣ Define features & targets
features = ["Crop_Code", "Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm"]
X = df[features]
y_fert = df["Fertilizer_Usage_kg"]
y_pest = df["Pesticide_Usage_kg"]

# 4️⃣ Scale and split
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, yf_train, yf_test = train_test_split(X_scaled, y_fert, test_size=0.2, random_state=42)
Xp_train, Xp_test, yp_train, yp_test = train_test_split(X_scaled, y_pest, test_size=0.2, random_state=42)

# 5️⃣ Train models
fert_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)
pest_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)

fert_model.fit(X_train, yf_train)
pest_model.fit(Xp_train, yp_train)

# 6️⃣ Evaluate
print("💧 Fertilizer R2:", r2_score(yf_test, fert_model.predict(X_test)))
print("🧴 Pesticide R2:", r2_score(yp_test, pest_model.predict(Xp_test)))

# 7️⃣ Save all
joblib.dump(fert_model, "fertilizer_model.pkl")
joblib.dump(pest_model, "pesticide_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(le, "crop_encoder.pkl")

print("✅ Retrained models saved successfully!")
