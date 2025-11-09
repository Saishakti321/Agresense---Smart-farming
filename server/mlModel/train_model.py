# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# import pickle

# # === Load dataset ===
# df = pd.read_csv("farmer_advisor_dataset.csv")

# # Convert all column names to lowercase (ignore case sensitivity)
# df.columns = [col.lower() for col in df.columns]

# # Expected target column names (in lowercase)
# target_cols = ['crop', 'fertilizer', 'pesticide']

# # Check which targets are present
# available_targets = [col for col in target_cols if col in df.columns]

# if not available_targets:
#     raise ValueError("❌ No target columns found (expected: crop, fertilizer, pesticide)")

# # Define features (exclude targets)
# X = df.drop(columns=available_targets)

# # === Train and save models ===
# def train_and_save(target):
#     y = df[target]
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#     model = RandomForestClassifier(
#         n_estimators=200, 
#         max_depth=15, 
#         random_state=42,
#         n_jobs=-1
#     )
#     model.fit(X_train, y_train)
#     y_pred = model.predict(X_test)
#     acc = accuracy_score(y_test, y_pred)

#     print(f"✅ {target.capitalize()} Model Accuracy: {acc * 100:.2f}%")

#     # Save model
#     with open(f"{target}_model.pkl", "wb") as f:
#         pickle.dump(model, f)

# # Train models
# for target in available_targets:
#     train_and_save(target)

# print("\n🎯 All models trained and saved successfully!")
# print("📂 Saved files: crop_model.pkl, fertilizer_model.pkl, pesticide_model.pkl")



# import pandas as pd

# df = pd.read_csv("farmer_advisor_dataset.csv")
# print("Columns in your dataset:\n")
# print(list(df.columns))


# 🌾 Unified Crop, Fertilizer & Pesticide Prediction Model
# --------------------------------------------------------
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, r2_score
import joblib

# 1️⃣ Load Dataset
df = pd.read_csv("farmer_advisor_dataset.csv")
df.dropna(inplace=True)
print(f"✅ Dataset loaded: {df.shape}")

# 2️⃣ Define Features and Targets
features = ["Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm"]
target_crop = "Crop_Type"
target_fert = "Fertilizer_Usage_kg"
target_pest = "Pesticide_Usage_kg"

X = df[features]
y_crop = df[target_crop]
y_fert = df[target_fert]
y_pest = df[target_pest]

# 3️⃣ Encode Crop (classification target)
le_crop = LabelEncoder()
y_crop_enc = le_crop.fit_transform(y_crop)

# 4️⃣ Scale Features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 5️⃣ Split Data
X_train, X_test, yc_train, yc_test, yf_train, yf_test, yp_train, yp_test = train_test_split(
    X_scaled, y_crop_enc, y_fert, y_pest, test_size=0.2, random_state=42
)

# 6️⃣ Train Models
crop_model = RandomForestClassifier(n_estimators=250, max_depth=15, random_state=42)
fert_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)
pest_model = RandomForestRegressor(n_estimators=250, max_depth=15, random_state=42)

crop_model.fit(X_train, yc_train)
fert_model.fit(X_train, yf_train)
pest_model.fit(X_train, yp_train)

# 7️⃣ Evaluate Accuracy
crop_acc = accuracy_score(yc_test, crop_model.predict(X_test))
fert_r2 = r2_score(yf_test, fert_model.predict(X_test))
pest_r2 = r2_score(yp_test, pest_model.predict(X_test))

print("\n✅ Model Performance:")
print(f"🌾 Crop Prediction Accuracy: {crop_acc*100:.2f}%")
print(f"💧 Fertilizer Prediction R²: {fert_r2:.4f}")
print(f"🧴 Pesticide Prediction R²: {pest_r2:.4f}")

# 8️⃣ Save Models
joblib.dump(crop_model, "crop_model.pkl")
joblib.dump(fert_model, "fertilizer_model.pkl")
joblib.dump(pest_model, "pesticide_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(le_crop, "label_encoder.pkl")

print("\n💾 Models and scalers saved successfully!")

# 9️⃣ Example Prediction Function
def predict_all(ph, moisture, temp, rain):
    X_new = scaler.transform([[ph, moisture, temp, rain]])
    crop_pred = le_crop.inverse_transform(crop_model.predict(X_new))[0]
    fert_pred = fert_model.predict(X_new)[0]
    pest_pred = pest_model.predict(X_new)[0]
    return crop_pred, round(fert_pred, 2), round(pest_pred, 2)

# 🔍 Test Example
example = predict_all(6.8, 35, 28, 120)
print(f"\n🔮 Predicted Crop: {example[0]}")
print(f"💧 Fertilizer (kg): {example[1]}")
print(f"🧴 Pesticide (kg): {example[2]}")
