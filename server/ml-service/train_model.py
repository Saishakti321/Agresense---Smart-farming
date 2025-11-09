# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
# import pickle

# # ✅ Load dataset
# data = pd.read_csv("Crop_recommendation.csv")

# # Split into features and target
# X = data.drop("label", axis=1)
# y = data["label"]

# # 🌾 Crop Recommendation Model
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# crop_model = RandomForestClassifier(n_estimators=150, random_state=42)
# crop_model.fit(X_train, y_train)

# # 💧 Fertilizer Quantity (dummy regression for example)
# fertilizer_df = data.copy()
# fertilizer_df["fertilizer_qty"] = (fertilizer_df["N"] + fertilizer_df["P"] + fertilizer_df["K"]) / 3 + 10
# Xf = fertilizer_df[["temperature", "humidity", "ph", "rainfall"]]
# yf = fertilizer_df["fertilizer_qty"]

# Xf_train, Xf_test, yf_train, yf_test = train_test_split(Xf, yf, test_size=0.2, random_state=42)
# fertilizer_model = RandomForestRegressor(n_estimators=100, random_state=42)
# fertilizer_model.fit(Xf_train, yf_train)

# # 🌊 Irrigation Interval Prediction
# irrigation_df = data.copy()
# irrigation_df["irrigation_days"] = 10 - (irrigation_df["humidity"] / 20) + (irrigation_df["temperature"] / 15)
# Xi = irrigation_df[["temperature", "humidity", "rainfall"]]
# yi = irrigation_df["irrigation_days"]

# Xi_train, Xi_test, yi_train, yi_test = train_test_split(Xi, yi, test_size=0.2, random_state=42)
# irrigation_model = RandomForestRegressor(n_estimators=100, random_state=42)
# irrigation_model.fit(Xi_train, yi_train)

# # ✅ Save all models
# with open("crop_model.pkl", "wb") as f:
#     pickle.dump(crop_model, f)

# with open("fertilizer_model.pkl", "wb") as f:
#     pickle.dump(fertilizer_model, f)

# with open("irrigation_model.pkl", "wb") as f:
#     pickle.dump(irrigation_model, f)

# print("✅ All three ML models trained and saved successfully!")


# ==========================================================
# AgriSense - Train All Models (Crop, Fertilizer, Irrigation)
# Using your dataset: N, P, K, temperature, humidity, ph, rainfall, label
# Theme: Sustainability & Resource Management
# ==========================================================































































import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, mean_squared_error
from math import sqrt

# 1️⃣ Load data
data = pd.read_csv("Crop_recommendation.csv").dropna()

# 2️⃣ Encode crop labels
le = LabelEncoder()
data["crop_encoded"] = le.fit_transform(data["label"])

# ---------------------- Crop Model ----------------------
X_crop = data[['N','P','K','temperature','humidity','ph','rainfall']]
y_crop = data['crop_encoded']
Xc_train,Xc_test,yc_train,yc_test = train_test_split(X_crop,y_crop,test_size=0.2,random_state=42)
crop_model = RandomForestClassifier(n_estimators=200,random_state=42)
crop_model.fit(Xc_train,yc_train)
acc = accuracy_score(yc_test,crop_model.predict(Xc_test))
print(f"✅ Crop model accuracy: {acc*100:.2f}%")

# ---------------------- Fertilizer Model ----------------------
data["fertilizer_kg"] = 0.3*data["N"] + 0.2*data["P"] + 0.1*data["K"] + \
                        0.05*data["humidity"] - 0.02*data["rainfall"] + 25
Xf = data[['temperature','humidity','ph','rainfall']]
yf = data['fertilizer_kg']
Xf_train,Xf_test,yf_train,yf_test = train_test_split(Xf,yf,test_size=0.2,random_state=42)
fert_model = RandomForestRegressor(n_estimators=150,random_state=42)
fert_model.fit(Xf_train,yf_train)
rmse_f = sqrt(mean_squared_error(yf_test,fert_model.predict(Xf_test)))
print(f"✅ Fertilizer RMSE: {rmse_f:.2f}")

# ---------------------- Irrigation Model ----------------------
data["irrigation_days"] = (
    (40 - (data["rainfall"]/25)) + (data["temperature"]/10) - (data["humidity"]/20)
).clip(2,15)
Xi = data[['temperature','humidity','rainfall','crop_encoded']]
yi = data['irrigation_days']
Xi_train,Xi_test,yi_train,yi_test = train_test_split(Xi,yi,test_size=0.2,random_state=42)
irrig_model = RandomForestRegressor(n_estimators=200,random_state=42)
irrig_model.fit(Xi_train,yi_train)
rmse_i = sqrt(mean_squared_error(yi_test,irrig_model.predict(Xi_test)))
print(f"✅ Irrigation RMSE: {rmse_i:.2f}")

# Save all
pickle.dump(crop_model,open("crop_model.pkl","wb"))
pickle.dump(fert_model,open("fertilizer_model123.pkl","wb"))
pickle.dump(irrig_model,open("irrigation_model.pkl","wb"))
pickle.dump(le,open("crop_encoder.pkl","wb"))
print("💾 Models saved successfully.")




















# # train_model.py
# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, mean_squared_error
# from math import sqrt

# print("\n🌾 Initializing Sustainable Agriculture ML Training...\n")

# # ----------------------------------------------------------
# # 1️⃣ Load Dataset
# # ----------------------------------------------------------
# data = pd.read_csv("Crop_recommendation.csv")
# data = data.dropna()

# print(f"✅ Dataset loaded successfully with {len(data)} records.\n")

# # ----------------------------------------------------------
# # 2️⃣ Train Crop Recommendation Model
# # ----------------------------------------------------------
# print("🚜 Training Crop Recommendation Model...")

# X_crop = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
# y_crop = data['label']

# X_train, X_test, y_train, y_test = train_test_split(X_crop, y_crop, test_size=0.2, random_state=42)

# crop_model = RandomForestClassifier(n_estimators=150, random_state=42)
# crop_model.fit(X_train, y_train)

# y_pred_crop = crop_model.predict(X_test)
# acc_crop = accuracy_score(y_test, y_pred_crop)
# print(f"✅ Crop Model Accuracy: {acc_crop*100:.2f}%")

# pickle.dump(crop_model, open("crop_model.pkl", "wb"))
# print("💾 Saved model: crop_model.pkl\n")

# # ----------------------------------------------------------
# # 3️⃣ Train Fertilizer Optimization Model
# # ----------------------------------------------------------
# print("🌱 Training Fertilizer Optimization Model...")

# # Simulate fertilizer usage (proxy for real-world relation)
# data["fertilizer_kg"] = (
#     0.3 * data["N"] + 0.2 * data["P"] + 0.1 * data["K"]
#     + 0.05 * data["humidity"] - 0.02 * data["rainfall"] + 20
# )

# X_fert = data[["temperature", "humidity", "ph", "rainfall", "N", "P", "K"]]
# y_fert = data["fertilizer_kg"]

# X_train, X_test, y_train, y_test = train_test_split(X_fert, y_fert, test_size=0.2, random_state=42)

# fert_model = RandomForestRegressor(n_estimators=120, random_state=42)
# fert_model.fit(X_train, y_train)

# y_pred_fert = fert_model.predict(X_test)
# rmse_fert = sqrt(mean_squared_error(y_test, y_pred_fert))
# print(f"✅ Fertilizer Model RMSE: {rmse_fert:.2f}")

# pickle.dump(fert_model, open("fertilizer_model.pkl", "wb"))
# print("💾 Saved model: fertilizer_model.pkl\n")

# # ----------------------------------------------------------
# # 4️⃣ Train Crop-Aware Irrigation Planner Model
# # ----------------------------------------------------------
# print("💧 Training Crop-Aware Irrigation Planner Model...")

# # Encode crops
# le = LabelEncoder()
# data["crop_encoded"] = le.fit_transform(data["label"])

# # Create synthetic irrigation planning data (approximate realistic intervals)
# data["irrigation_days"] = (
#     (40 - (data["rainfall"] / 25)) +
#     (data["temperature"] / 10) -
#     (data["humidity"] / 20) +
#     (data["crop_encoded"] % 5)
# ).clip(lower=2, upper=15)

# X_irrig = data[["temperature", "humidity", "rainfall", "crop_encoded"]]
# y_irrig = data["irrigation_days"]

# X_train, X_test, y_train, y_test = train_test_split(X_irrig, y_irrig, test_size=0.2, random_state=42)

# irrigation_model = RandomForestRegressor(n_estimators=150, random_state=42)
# irrigation_model.fit(X_train, y_train)

# y_pred_irrig = irrigation_model.predict(X_test)
# rmse_irrig = sqrt(mean_squared_error(y_test, y_pred_irrig))
# print(f"✅ Irrigation Planner Model RMSE: {rmse_irrig:.2f}")

# pickle.dump(irrigation_model, open("irrigation_model.pkl", "wb"))
# pickle.dump(le, open("crop_encoder.pkl", "wb"))
# print("💾 Saved models: irrigation_model.pkl & crop_encoder.pkl\n")

# # ----------------------------------------------------------
# # 5️⃣ Summary
# # ----------------------------------------------------------
# print("==================================================")
# print("🌾  Sustainable Agriculture ML Training Completed!")
# print(f"🌿 Crop Recommendation Accuracy : {acc_crop*100:.2f}%")
# print(f"🌱 Fertilizer Prediction RMSE   : {rmse_fert:.2f}")
# print(f"💧 Irrigation Planner RMSE      : {rmse_irrig:.2f}")
# print("✅ All models saved successfully for Flask API use!")
# print("==================================================\n")












# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, mean_squared_error
# from math import sqrt

# # ----------------------------------------------------------
# # 1️⃣  Load Dataset
# # ----------------------------------------------------------
# print("\n📂 Loading dataset...")

# data = pd.read_csv("Crop_recommendation.csv")  # <-- Your dataset filename here

# # Clean & check
# data = data.dropna()
# print(f"✅ Dataset loaded with {len(data)} records.")
# print(data.head())

# # ----------------------------------------------------------
# # 2️⃣  Train Crop Recommendation Model
# # ----------------------------------------------------------
# print("\n🌾 Training Crop Recommendation Model...")

# X_crop = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
# y_crop = data['label']

# X_train, X_test, y_train, y_test = train_test_split(X_crop, y_crop, test_size=0.2, random_state=42)

# crop_model = RandomForestClassifier(n_estimators=150, random_state=42)
# crop_model.fit(X_train, y_train)

# y_pred_crop = crop_model.predict(X_test)
# acc_crop = accuracy_score(y_test, y_pred_crop)

# print(f"✅ Crop Model Accuracy: {acc_crop*100:.2f}%")

# pickle.dump(crop_model, open("crop_model.pkl", "wb"))
# print("💾 Saved crop_model.pkl")

# # ----------------------------------------------------------
# # 3️⃣  Train Fertilizer Model (Regression)
# # ----------------------------------------------------------
# print("\n🌱 Training Fertilizer Prediction Model...")

# # Fertilizer is derived from soil + environment
# # Since you don’t have real fertilizer column, we simulate using rainfall & nutrients
# data['fertilizer_kg'] = (
#     0.3 * data['N'] + 0.2 * data['P'] + 0.1 * data['K'] + 0.05 * data['humidity'] - 0.02 * data['rainfall'] + 20
# )

# X_fert = data[['temperature', 'humidity', 'ph', 'rainfall']]
# y_fert = data['fertilizer_kg']

# X_train, X_test, y_train, y_test = train_test_split(X_fert, y_fert, test_size=0.2, random_state=42)

# fertilizer_model = RandomForestRegressor(n_estimators=120, random_state=42)
# fertilizer_model.fit(X_train, y_train)

# y_pred_fert = fertilizer_model.predict(X_test)
# rmse_fert = sqrt(mean_squared_error(y_test, y_pred_fert))

# print(f"✅ Fertilizer Model RMSE: {rmse_fert:.2f}")
# pickle.dump(fertilizer_model, open("fertilizer_model.pkl", "wb"))
# print("💾 Saved fertilizer_model.pkl")

# # ----------------------------------------------------------
# # 4️⃣  Train Irrigation Model (Crop-Aware)
# # ----------------------------------------------------------
# print("\n💧 Training Irrigation Planner Model...")

# # Encode crop labels for irrigation planner
# le = LabelEncoder()
# data['crop_encoded'] = le.fit_transform(data['label'].astype(str))

# # Synthetic irrigation days (estimated realistically)
# data['irrigation_days'] = (
#     (40 - (data['rainfall'] / 25)) +
#     (data['temperature'] / 10) -
#     (data['humidity'] / 20)
# ).clip(lower=2, upper=15)

# X_irrig = data[['temperature', 'humidity', 'rainfall', 'crop_encoded']]
# y_irrig = data['irrigation_days']

# X_train, X_test, y_train, y_test = train_test_split(X_irrig, y_irrig, test_size=0.2, random_state=42)

# irrigation_model = RandomForestRegressor(n_estimators=150, random_state=42)
# irrigation_model.fit(X_train, y_train)

# y_pred_irrig = irrigation_model.predict(X_test)
# rmse_irrig = sqrt(mean_squared_error(y_test, y_pred_irrig))

# print(f"✅ Irrigation Model RMSE: {rmse_irrig:.2f}")

# pickle.dump(irrigation_model, open("irrigation_model.pkl", "wb"))
# pickle.dump(le, open("crop_encoder.pkl", "wb"))
# print("💾 Saved irrigation_model.pkl and crop_encoder.pkl")

# # ----------------------------------------------------------
# # 5️⃣  Summary
# # ----------------------------------------------------------
# print("\n================ Training Summary ================")
# print(f"Crop Recommendation Model  : Accuracy = {acc_crop*100:.2f}%")
# print(f"Fertilizer Prediction Model: RMSE = {rmse_fert:.2f}")
# print(f"Irrigation Planner Model   : RMSE = {rmse_irrig:.2f}")
# print("✅ All models trained and saved successfully!")
# print("==================================================")
