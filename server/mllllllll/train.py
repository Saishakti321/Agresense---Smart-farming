# train_agri_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import joblib
import os

# ========== CONFIG ==========
DATA_PATH = "hybrid_indian_agri_dataset_10000.csv"
OUTPUT_DIR = "trained_models"
os.makedirs(OUTPUT_DIR, exist_ok=True)
RANDOM_STATE = 42
# ============================

print("📘 Loading dataset...")
df = pd.read_csv(DATA_PATH)
print("✅ Dataset loaded:", df.shape)

# --- Split data for both tasks ---
fert_features = ["Crop", "Region", "Season", "Temperature_C", "Humidity_%", "Soil_pH", "Soil_Moisture_%", "Fertilizer_Name"]
pest_features = ["Crop", "Region", "Season", "Temperature_C", "Humidity_%", "Soil_pH", "Soil_Moisture_%", "Pesticide_Name"]

X_fert = df[fert_features]
y_fert = df["Fertilizer_Amount_kg_per_acre"]

X_pest = df[pest_features]
y_pest = df["Pesticide_Amount_kg_per_acre"]

# --- Preprocessing ---
num_cols = ["Temperature_C", "Humidity_%", "Soil_pH", "Soil_Moisture_%"]
cat_cols_f = ["Crop", "Region", "Season", "Fertilizer_Name"]
cat_cols_p = ["Crop", "Region", "Season", "Pesticide_Name"]

preproc_f = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols_f)
])
preproc_p = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols_p)
])

# --- Train/test split ---
Xf_train, Xf_test, yf_train, yf_test = train_test_split(X_fert, y_fert, test_size=0.2, random_state=RANDOM_STATE)
Xp_train, Xp_test, yp_train, yp_test = train_test_split(X_pest, y_pest, test_size=0.2, random_state=RANDOM_STATE)

# --- Random Forest models ---
rf_fert = Pipeline([
    ("pre", preproc_f),
    ("model", RandomForestRegressor(
        n_estimators=400, 
        max_depth=14, 
        random_state=RANDOM_STATE, 
        n_jobs=-1))
])

rf_pest = Pipeline([
    ("pre", preproc_p),
    ("model", RandomForestRegressor(
        n_estimators=400, 
        max_depth=14, 
        random_state=RANDOM_STATE, 
        n_jobs=-1))
])

# --- Train models ---
print("🚜 Training Fertilizer model...")
rf_fert.fit(Xf_train, yf_train)

print("🦋 Training Pesticide model...")
rf_pest.fit(Xp_train, yp_train)

# --- Evaluate ---
yf_pred = rf_fert.predict(Xf_test)
yp_pred = rf_pest.predict(Xp_test)

fert_r2 = r2_score(yf_test, yf_pred)
pest_r2 = r2_score(yp_test, yp_pred)
fert_mae = mean_absolute_error(yf_test, yf_pred)
pest_mae = mean_absolute_error(yp_test, yp_pred)

print("\n📊 Model Performance:")
print(f"Fertilizer → R²: {fert_r2:.3f} | MAE: {fert_mae:.2f}")
print(f"Pesticide  → R²: {pest_r2:.3f} | MAE: {pest_mae:.2f}")

# --- Save trained models ---
fert_model_path = os.path.join(OUTPUT_DIR, "fertilizer_model.joblib")
pest_model_path = os.path.join(OUTPUT_DIR, "pesticide_model.joblib")

joblib.dump(rf_fert, fert_model_path)
joblib.dump(rf_pest, pest_model_path)

print("\n💾 Models saved successfully:")
print(f"Fertilizer model → {fert_model_path}")
print(f"Pesticide model  → {pest_model_path}")

# --- Sample predictions ---
print("\n🔍 Sample Predictions:")
sample_df = Xf_test.copy().reset_index(drop=True).head(5)
sample_df["Actual_Fertilizer_kg"] = yf_test.reset_index(drop=True).head(5)
sample_df["Predicted_Fertilizer_kg"] = np.round(yf_pred[:5], 2)
print(sample_df)

sample_df_p = Xp_test.copy().reset_index(drop=True).head(5)
sample_df_p["Actual_Pesticide_kg"] = yp_test.reset_index(drop=True).head(5)
sample_df_p["Predicted_Pesticide_kg"] = np.round(yp_pred[:5], 2)
print("\nPesticide predictions sample:")
print(sample_df_p)
