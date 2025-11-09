# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.ensemble import RandomForestClassifier
# import joblib

# # Load dataset
# df = pd.read_csv("FertilizerPrediction.csv")

# # 🧹 Clean and normalize column names
# df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
# print("Detected Columns:", df.columns.tolist())

# # Check available columns
# required_cols = ["temparature", "humidity", "moisture", "soil_type", "crop_type", "nitrogen", "potassium", "phosphorous", "fertilizer_name"]
# missing = [col for col in required_cols if col not in df.columns]
# if missing:
#     raise KeyError(f"Missing columns in dataset: {missing}")

# # Encode categorical columns
# le_soil = LabelEncoder()
# le_crop = LabelEncoder()
# le_target = LabelEncoder()

# df["soil_type"] = le_soil.fit_transform(df["soil_type"])
# df["crop_type"] = le_crop.fit_transform(df["crop_type"])
# df["fertilizer_name"] = le_target.fit_transform(df["fertilizer_name"])

# # Select features and target
# X = df[["temparature", "humidity", "moisture", "soil_type", "crop_type", "nitrogen", "potassium", "phosphorous"]]
# y = df["fertilizer_name"]

# # Scale numerical values
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # Train model
# model = RandomForestClassifier(n_estimators=150, random_state=42)
# model.fit(X_scaled, y)

# # Save all models & encoders
# joblib.dump(model, "fertilizer_model.pkl")
# joblib.dump(scaler, "fertilizer_scaler.pkl")
# joblib.dump(le_soil, "le_soil.pkl")
# joblib.dump(le_crop, "le_crop.pkl")
# joblib.dump(le_target, "le_target.pkl")

# print("✅ Model training complete and files saved successfully!")
























# import pandas as pd
# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# import joblib

# # 1️⃣ Load dataset
# df = pd.read_csv("FertilizerPrediction.csv")

# # 2️⃣ Encode categorical columns
# le_soil = LabelEncoder()
# le_crop = LabelEncoder()
# le_fert = LabelEncoder()

# df["Soil Type"] = le_soil.fit_transform(df["Soil Type"])
# df["Crop Type"] = le_crop.fit_transform(df["Crop Type"])
# df["Fertilizer Name"] = le_fert.fit_transform(df["Fertilizer Name"])

# # 3️⃣ Define features (X) and target (y)
# X = df[["Temparature", "Humidity ", "Moisture", "Soil Type", "Crop Type", "Nitrogen", "Potassium", "Phosphorous"]]
# y = df["Fertilizer Name"]

# # 4️⃣ Split into train/test
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # 5️⃣ Train model
# model = RandomForestClassifier()
# model.fit(X_train, y_train)

# # 6️⃣ Save model and encoders
# joblib.dump(model, "fertilizer_model.pkl")
# joblib.dump(le_soil, "le_soil.pkl")
# joblib.dump(le_crop, "le_crop.pkl")
# joblib.dump(le_fert, "le_fert.pkl")

# print("✅ Model trained and saved successfully!")











# import pandas as pd
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.ensemble import RandomForestClassifier
# import joblib

# # Load dataset
# df = pd.read_csv("FertilizerPrediction.csv")

# # 🧹 Clean headers
# df.columns = df.columns.str.strip().str.replace(" ", "_")

# print("🧾 Cleaned columns:", df.columns.tolist())  # debug print

# # ✅ Rename to consistent names
# df = df.rename(columns={
#     "Temparature": "Temperature",
#     "Phosphorous": "Phosphorus",
#     "Fertilizer_Name": "Fertilizer",
#     "Soil_Type": "Soil",
#     "Crop_Type": "Crop"
# })

# # Label encoding for categorical columns
# le_soil = LabelEncoder()
# le_crop = LabelEncoder()
# le_target = LabelEncoder()

# df["Soil"] = le_soil.fit_transform(df["Soil"])
# df["Crop"] = le_crop.fit_transform(df["Crop"])
# df["Fertilizer"] = le_target.fit_transform(df["Fertilizer"])

# # ✅ Features + Target (your dataset-specific)
# X = df[["Temperature", "Humidity", "Moisture", "Soil", "Crop", "Nitrogen", "Potassium", "Phosphorus"]]
# y = df["Fertilizer"]

# # Scaling
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # Train Random Forest model
# model = RandomForestClassifier(random_state=42)
# model.fit(X_scaled, y)

# # ✅ Save model + encoders
# joblib.dump(model, "fertilizer_model.pkl")
# joblib.dump(scaler, "fertilizer_scaler.pkl")
# joblib.dump(le_soil, "le_soil.pkl")
# joblib.dump(le_crop, "le_crop.pkl")
# joblib.dump(le_target, "le_target.pkl")

# print("✅ Fertilizer model trained and saved successfully!")

# FertilizerPrediction
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("FertilizerPrediction.csv")

# 🧹 Clean column names
df.columns = df.columns.str.strip()
print("🧾 Columns:", df.columns.tolist())

# Rename to uniform names (match your actual CSV)
df.rename(columns={
    "Temparature": "Temperature",
    "Soil Moisture": "Moisture",
    "Humidity": "Humidity",
    "Soil Type": "Soil_Type",
    "Crop Type": "Crop_Type",
    "Phosphorous": "Phosphorus",
    "Fertilizer Name": "Fertilizer_Name"
}, inplace=True)

# Select features that actually exist
features = ["Temperature", "Humidity", "Moisture", "Soil_Type", "Crop_Type", "Nitrogen", "Potassium", "Phosphorus"]
target = "Fertilizer_Name"

X = df[features]
y = df[target]

# Encode categorical columns
le_soil = LabelEncoder()
le_crop = LabelEncoder()
le_target = LabelEncoder()

X["Soil_Type"] = le_soil.fit_transform(X["Soil_Type"])
X["Crop_Type"] = le_crop.fit_transform(X["Crop_Type"])
y_encoded = le_target.fit_transform(y)

# Scale numeric features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_scaled, y_encoded)

# Save trained components
joblib.dump(model, "fertilizer_model.pkl")
joblib.dump(scaler, "fertilizer_scaler.pkl")
joblib.dump(le_soil, "le_soil.pkl")
joblib.dump(le_crop, "le_crop.pkl")
joblib.dump(le_target, "le_target.pkl")

print("✅ Fertilizer model trained and saved successfully!")
