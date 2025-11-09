# # 🌾 High-Accuracy Crop Recommendation Model (Final Version)
# # ----------------------------------------------------------
# # Trains an AI model to recommend the best crop based on soil & weather conditions.

# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split, GridSearchCV
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
# from sklearn.metrics import accuracy_score, classification_report

# # -----------------------------
# # 🔹 Step 1: Load Dataset
# # -----------------------------
# df = pd.read_csv("farmer_advisor_dataset.csv")

# print("✅ Data Loaded Successfully!")
# print("📊 Columns:", df.columns.tolist())

# # -----------------------------
# # 🧩 Step 2: Feature Engineering
# # -----------------------------
# # Handle missing values
# df = df.dropna()

# # Derived features
# df["Moisture_Rainfall_Ratio"] = df["Soil_Moisture"] / (df["Rainfall_mm"] + 1)
# df["Temp_Moisture_Index"] = df["Temperature_C"] * (df["Soil_Moisture"] / 100)

# # Categorize pH values
# def categorize_ph(ph):
#     if ph < 6.5:
#         return "Acidic"
#     elif ph > 7.5:
#         return "Alkaline"
#     else:
#         return "Neutral"

# df["pH_Category"] = df["Soil_pH"].apply(categorize_ph)
# df = pd.get_dummies(df, columns=["pH_Category"], drop_first=False)

# # Ensure all dummy columns exist
# for col in ["pH_Category_Alkaline", "pH_Category_Neutral"]:
#     if col not in df.columns:
#         df[col] = 0

# # -----------------------------
# # ⚙️ Step 3: Feature Selection
# # -----------------------------
# features = [
#     "Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm",
#     "Moisture_Rainfall_Ratio", "Temp_Moisture_Index",
#     "pH_Category_Alkaline", "pH_Category_Neutral"
# ]

# target = "Crop_Type"  # Change if your dataset column name differs

# if target not in df.columns:
#     raise KeyError(f"❌ Target column '{target}' not found in dataset!")

# X = df[features]
# y = df[target]

# # Encode crop labels
# label_encoder = LabelEncoder()
# y_encoded = label_encoder.fit_transform(y)

# # Scale numeric features
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # Split into training/testing
# X_train, X_test, y_train, y_test = train_test_split(
#     X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
# )

# # -----------------------------
# # 🤖 Step 4: Model Training
# # -----------------------------
# # Random Forest Tuning
# rf = RandomForestClassifier(random_state=42)
# param_grid = {
#     "n_estimators": [200, 300],
#     "max_depth": [10, 15, 20],
#     "min_samples_split": [2, 4],
#     "min_samples_leaf": [1, 2],
# }
# grid_search = GridSearchCV(rf, param_grid, cv=3, scoring="accuracy", n_jobs=-1)
# grid_search.fit(X_train, y_train)
# best_rf = grid_search.best_estimator_

# # Gradient Boosting
# gb = GradientBoostingClassifier(
#     n_estimators=200, learning_rate=0.05, max_depth=5, random_state=42
# )

# # Ensemble Voting
# ensemble = VotingClassifier(
#     estimators=[("rf", best_rf), ("gb", gb)], voting="soft"
# )
# ensemble.fit(X_train, y_train)

# # -----------------------------
# # 📈 Step 5: Evaluation
# # -----------------------------
# y_pred = ensemble.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# report = classification_report(y_test, y_pred, target_names=label_encoder.classes_)

# print("\n✅ Model Training Complete!")
# print(f"🎯 Final Accuracy: {accuracy * 100:.2f}%")
# print("\n📊 Classification Report:")
# print(report)

# # -----------------------------
# # 🌿 Step 6: Save Models
# # -----------------------------
# pickle.dump(ensemble, open("crop_model.pkl", "wb"))
# pickle.dump(scaler, open("scaler.pkl", "wb"))
# pickle.dump(label_encoder, open("label_encoder.pkl", "wb"))

# print("💾 Models saved successfully!")

# # -----------------------------
# # 🔮 Step 7: Prediction Function
# # -----------------------------
# def predict_crop(soil_pH, moisture, temp, rainfall):
#     # Derived features
#     ratio = moisture / (rainfall + 1)
#     index = temp * (moisture / 100)
#     ph_cat_alk = 1 if soil_pH > 7.5 else 0
#     ph_cat_neu = 1 if 6.5 <= soil_pH <= 7.5 else 0

#     # Prepare data
#     sample = np.array([[soil_pH, moisture, temp, rainfall, ratio, index, ph_cat_alk, ph_cat_neu]])
#     sample_scaled = scaler.transform(sample)
#     pred = ensemble.predict(sample_scaled)
#     return label_encoder.inverse_transform(pred)[0]

# # Example test prediction
# example = predict_crop(soil_pH=6.9, moisture=40, temp=30, rainfall=180)
# print(f"\n🌾 Suggested Crop: {example}")

# ======================================================
# 🌾 Advanced Crop Recommendation Model (Retrain Script)
# ======================================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler, PolynomialFeatures
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import lightgbm as lgb
import pickle

# -----------------------------
# 🔹 Step 1: Load Dataset
# -----------------------------
df = pd.read_csv("farmer_advisor_dataset.csv")
df.dropna(inplace=True)
print("✅ Data Loaded:", df.shape)

# -----------------------------
# 🧩 Step 2: Feature Engineering
# -----------------------------
df["Moisture_Rainfall_Ratio"] = df["Soil_Moisture"] / (df["Rainfall_mm"] + 1)
df["Temp_Moisture_Index"] = df["Temperature_C"] * (df["Soil_Moisture"] / 100)

# pH category feature
def categorize_ph(ph):
    if ph < 6.5:
        return "Acidic"
    elif ph > 7.5:
        return "Alkaline"
    else:
        return "Neutral"

df["pH_Category"] = df["Soil_pH"].apply(categorize_ph)
df = pd.get_dummies(df, columns=["pH_Category"], drop_first=False)

for col in ["pH_Category_Alkaline", "pH_Category_Neutral"]:
    if col not in df.columns:
        df[col] = 0

# -----------------------------
# ⚙ Step 3: Define Features & Target
# -----------------------------
features = [
    "Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm",
    "Moisture_Rainfall_Ratio", "Temp_Moisture_Index",
    "pH_Category_Alkaline", "pH_Category_Neutral"
]
target = "Crop_Type"

X = df[features]
y = df[target]

# Encode target labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# -----------------------------
# ⚖ Step 4: Scale + Polynomial Features
# -----------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_scaled)

# -----------------------------
# ⚖ Step 5: Handle Class Imbalance
# -----------------------------
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_poly, y_encoded)
print("✅ After SMOTE:", X_res.shape)

# -----------------------------
# 🧠 Step 6: Define Ensemble Models
# -----------------------------
rf = RandomForestClassifier(
    n_estimators=400, max_depth=20, min_samples_split=2, random_state=42
)

gb = GradientBoostingClassifier(
    n_estimators=300, learning_rate=0.05, max_depth=6, random_state=42
)

xgb_model = xgb.XGBClassifier(
    n_estimators=350, learning_rate=0.05, max_depth=8,
    subsample=0.9, colsample_bytree=0.8, random_state=42, eval_metric='mlogloss'
)

lgb_model = lgb.LGBMClassifier(
    n_estimators=300, learning_rate=0.05, max_depth=8,
    subsample=0.9, colsample_bytree=0.8, random_state=42
)

ensemble = VotingClassifier(
    estimators=[
        ("rf", rf),
        ("gb", gb),
        ("xgb", xgb_model),
        ("lgb", lgb_model)
    ],
    voting="soft",
    n_jobs=-1
)

# -----------------------------
# 📊 Step 7: Cross Validation
# -----------------------------
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(ensemble, X_res, y_res, cv=cv, scoring="accuracy")
print(f"📈 Cross-Validation Accuracy: {scores.mean():.4f} ± {scores.std():.4f}")

# -----------------------------
# 🚀 Step 8: Final Train/Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_res, y_res, test_size=0.2, random_state=42, stratify=y_res
)

ensemble.fit(X_train, y_train)
y_pred = ensemble.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred, target_names=le.classes_)

print("\n✅ Final Model Evaluation")
print(f"🎯 Accuracy: {accuracy * 100:.2f}%")
print(report)

# -----------------------------
# 💾 Step 9: Save Model + Objects
# -----------------------------
pickle.dump(ensemble, open("crop_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))
pickle.dump(le, open("label_encoder.pkl", "wb"))
pickle.dump(poly, open("poly.pkl", "wb"))

print("💾 Model and preprocessors saved successfully!")

# -----------------------------
# 🔮 Step 10: Test Prediction
# -----------------------------
def predict_crop(soil_pH, moisture, temp, rainfall):
    ratio = moisture / (rainfall + 1)
    index = temp * (moisture / 100)
    ph_cat_alk = 1 if soil_pH > 7.5 else 0
    ph_cat_neu = 1 if 6.5 <= soil_pH <= 7.5 else 0

    data = pd.DataFrame([[soil_pH, moisture, temp, rainfall, ratio, index, ph_cat_alk, ph_cat_neu]],
                         columns=features)

    scaled = scaler.transform(data)
    poly_features = poly.transform(scaled)
    pred = ensemble.predict(poly_features)
    return le.inverse_transform(pred)[0]

example = predict_crop(6.8, 45, 30, 160)
print(f"\n🌾 Recommended Crop Example: {example}")
