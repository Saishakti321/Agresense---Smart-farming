# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # --------------------------
# # Load trained ML models
# # --------------------------
# try:
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     print("✅ Models and scaler loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {e}")

# # --------------------------
# # Crop → Fertilizer / Pesticide name mapping
# # --------------------------
# fertilizer_map = {
#     "Rice": "Urea (NPK 46-0-0)",
#     "Wheat": "NPK (15-15-15)",
#     "Maize": "DAP (18-46-0)",
#     "Cotton": "Potash (KCl)",
#     "Tomato": "Calcium Nitrate",
#     "Soybean": "Ammonium Sulphate",
#     "Banana": "Organic Compost",
#     "Onion": "Super Phosphate",
# }

# pesticide_map = {
#     "Rice": "Neem Oil",
#     "Wheat": "Pyrethrin",
#     "Maize": "Chlorpyrifos",
#     "Cotton": "Imidacloprid",
#     "Tomato": "Spinosad",
#     "Soybean": "Carbaryl",
#     "Banana": "Copper Oxychloride",
#     "Onion": "Mancozeb",
# }

# # --------------------------
# # 🔮 Prediction Route
# # --------------------------
# # @app.route("/predict", methods=["POST"])
# # def predict():
# #     try:
# #         # ✅ Safely parse JSON input
# #         data = request.get_json(force=True)
# #         print("📥 Received JSON:", data)

# #         # ✅ Extract values
# #         crop = data.get("crop", "").capitalize()
# #         soil_pH = float(data.get("ph", 6.5))
# #         soil_moisture = float(data.get("soil_moisture", 30))
# #         temperature = float(data.get("temperature", 25))
# #         rainfall = float(data.get("rainfall", 100))

# #         # ✅ Prepare feature array for ML models
# #         X = np.array([[soil_pH, soil_moisture, temperature, rainfall]])
# #         X_scaled = scaler.transform(X)

# #         # ✅ Predict fertilizer and pesticide quantities
# #         fert_amount = float(fertilizer_model.predict(X_scaled)[0])
# #         pest_amount = float(pesticide_model.predict(X_scaled)[0])

# #         # ✅ Get names for fertilizer and pesticide based on crop
# #         fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
# #         pest_name = pesticide_map.get(crop, "Generic Pesticide")

# #         # ✅ Dynamic irrigation suggestion
# #         if soil_moisture < 25:
# #             irrigation = "💧 Immediate irrigation required – very low soil moisture."
# #         elif 25 <= soil_moisture < 50:
# #             irrigation = "💧 Irrigate every 3–4 days to maintain optimal growth."
# #         else:
# #             irrigation = "🌦️ Soil moisture sufficient; postpone irrigation."

# #         # ✅ Sustainability tip
# #         sustainability_tip = (
# #             "🌱 Practice crop rotation and use bio-fertilizers for sustainable soil health."
# #         )

# #         # ✅ Build final response
# #         response = {
# #             "crop": crop,
# #             "fertilizer": {
# #                 "name": fert_name,
# #                 "amount_kg": round(fert_amount, 2),
# #             },
# #             "pesticide": {
# #                 "name": pest_name,
# #                 "amount_kg": round(pest_amount, 2),
# #             },
# #             "irrigation": irrigation,
# #             "sustainability_tip": sustainability_tip,
# #         }

# #         return jsonify({"status": "success", "data": response})

# #     except Exception as e:
# #         print("❌ Error:", e)
# #         return jsonify({"status": "error", "message": str(e)})
# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # --------------------------
# # Load trained ML models
# # --------------------------
# # try:
# #     fertilizer_model = joblib.load("fertilizer_model.pkl")
# #     pesticide_model = joblib.load("pesticide_model.pkl")
# #     scaler = joblib.load("scaler.pkl")
# #     print("✅ Models and scaler loaded successfully!")
# # except Exception as e:
# #     print(f"❌ Error loading models: {e}")
# # --------------------------
# # Load trained ML models, scaler & crop encoder
# # --------------------------
# try:
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     crop_encoder = joblib.load("crop_encoder.pkl")   # ✅ ADDED HERE
#     print("✅ Models, scaler, and crop encoder loaded successfully!")
# except Exception as e:
#     crop_encoder = None  # ✅ fallback if encoder missing
#     print(f"❌ Error loading models or encoder: {e}")

# # --------------------------
# # Crop → Fertilizer / Pesticide name mapping
# # --------------------------
# fertilizer_map = {
#     "Rice": "Urea (NPK 46-0-0)",
#     "Wheat": "NPK (15-15-15)",
#     "Maize": "DAP (18-46-0)",
#     "Cotton": "Potash (KCl)",
#     "Tomato": "Calcium Nitrate",
#     "Soybean": "Ammonium Sulphate",
#     "Banana": "Organic Compost",
#     "Onion": "Super Phosphate",
# }

# pesticide_map = {
#     "Rice": "Neem Oil",
#     "Wheat": "Pyrethrin",
#     "Maize": "Chlorpyrifos",
#     "Cotton": "Imidacloprid",
#     "Tomato": "Spinosad",
#     "Soybean": "Carbaryl",
#     "Banana": "Copper Oxychloride",
#     "Onion": "Mancozeb",
# }

# # --------------------------
# # 🔮 Prediction Route
# # --------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         # ✅ Parse JSON input
#         data = request.get_json(force=True)
#         print("📥 Received JSON:", data)

#         # ✅ Extract input values
#         crop = data.get("crop", "").capitalize()
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 30))
#         temperature = float(data.get("temperature", 25))
#         rainfall = float(data.get("rainfall", 100))

#         # ✅ Encode crop to numeric code
#         try:
#             crop_code = crop_encoder.transform([crop])[0]
#         except ValueError:
#             crop_code = 0  # unknown crop fallback

#         # ✅ Create feature vector (5 features)
#         X = np.array([[crop_code, soil_pH, soil_moisture, temperature, rainfall]])
#         X_scaled = scaler.transform(X)

#         # ✅ Predict amounts from ML models
#         fert_amount = float(fertilizer_model.predict(X_scaled)[0])
#         pest_amount = float(pesticide_model.predict(X_scaled)[0])

#         # ✅ Crop-specific names
#         fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
#         pest_name = pesticide_map.get(crop, "Generic Pesticide")

#         # ✅ Irrigation logic
#         if soil_moisture < 25:
#             irrigation = "💧 Immediate irrigation required – very low soil moisture."
#         elif 25 <= soil_moisture < 50:
#             irrigation = "💧 Irrigate every 3–4 days to maintain optimal growth."
#         else:
#             irrigation = "🌦️ Soil moisture sufficient; postpone irrigation."

#         sustainability_tip = "🌱 Practice crop rotation and use bio-fertilizers for sustainable soil health."

#         # ✅ Build response
#         response = {
#             "crop": crop,
#             "fertilizer": {
#                 "name": fert_name,
#                 "amount_kg": round(fert_amount, 2)
#             },
#             "pesticide": {
#                 "name": pest_name,
#                 "amount_kg": round(pest_amount, 2)
#             },
#             "irrigation": irrigation,
#             "sustainability_tip": sustainability_tip
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
#         print("❌ Error:", e)
#         return jsonify({"status": "error", "message": str(e)})

# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route("/")
# def home():
#     return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# # --------------------------
# # 🚀 Run Server
# # --------------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# # @app.route("/")
# # def home():
# #     return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# # # --------------------------
# # # 🚀 Run Server
# # # --------------------------
# # if __name__ == "__main__":
# #     app.run(debug=True, port=5000)


from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Allow React connection
import joblib
import numpy as np

# --------------------------
# Initialize Flask
# --------------------------
app = Flask(__name__)
CORS(app)  # ✅ Enables CORS for all routes (React can access Flask)

# --------------------------
# Load trained ML models, scaler & crop encoder
# --------------------------
try:
    fertilizer_model = joblib.load("fertilizer_model.pkl")
    pesticide_model = joblib.load("pesticide_model.pkl")
    scaler = joblib.load("scaler.pkl")
    crop_encoder = joblib.load("crop_encoder.pkl")  # ✅ Encoder for crop
    print("✅ Models, scaler, and crop encoder loaded successfully!")
except Exception as e:
    crop_encoder = None
    print(f"❌ Error loading models or encoder: {e}")

# --------------------------
# Crop → Fertilizer / Pesticide name mapping
# --------------------------
fertilizer_map = {
    "Rice": "Urea (NPK 46-0-0)",
    "Wheat": "NPK (15-15-15)",
    "Maize": "DAP (18-46-0)",
    "Cotton": "Potash (KCl)",
    "Tomato": "Calcium Nitrate",
    "Soybean": "Ammonium Sulphate",
    "Banana": "Organic Compost",
    "Onion": "Super Phosphate",
}

pesticide_map = {
    "Rice": "Neem Oil",
    "Wheat": "Pyrethrin",
    "Maize": "Chlorpyrifos",
    "Cotton": "Imidacloprid",
    "Tomato": "Spinosad",
    "Soybean": "Carbaryl",
    "Banana": "Copper Oxychloride",
    "Onion": "Mancozeb",
}

# --------------------------
# 🔮 Prediction Route
# --------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # ✅ Parse JSON input
        data = request.get_json(force=True)
        print("📥 Received JSON:", data)

        # ✅ Extract input values safely
        crop = data.get("crop", "").capitalize()
        soil_pH = float(data.get("ph", 6.5))
        soil_moisture = float(data.get("soil_moisture", 30))
        temperature = float(data.get("temperature", 25))
        rainfall = float(data.get("rainfall", 100))

        # ✅ Encode crop safely (even if encoder missing)
        try:
            crop_code = crop_encoder.transform([crop])[0] if crop_encoder else 0
        except Exception:
            crop_code = 0
            print(f"⚠️ Crop '{crop}' not found in encoder; using default code 0.")

        # ✅ Create feature vector (5 features)
        X = np.array([[crop_code, soil_pH, soil_moisture, temperature, rainfall]])
        X_scaled = scaler.transform(X)

        # ✅ Predict fertilizer & pesticide quantities
        fert_amount = float(fertilizer_model.predict(X_scaled)[0])
        pest_amount = float(pesticide_model.predict(X_scaled)[0])

        # ✅ Get crop-specific fertilizer/pesticide names
        fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
        pest_name = pesticide_map.get(crop, "Generic Pesticide")

        # ✅ Irrigation logic
        if soil_moisture < 25:
            irrigation = "💧 Immediate irrigation required – very low soil moisture."
        elif 25 <= soil_moisture < 50:
            irrigation = "💧 Irrigate every 3–4 days to maintain optimal growth."
        else:
            irrigation = "🌦️ Soil moisture sufficient; postpone irrigation."

        # ✅ Sustainability suggestion
        sustainability_tip = (
            "🌱 Practice crop rotation and use bio-fertilizers for sustainable soil health."
        )

        # ✅ Final response
        response = {
            "crop": crop,
            "fertilizer": {
                "name": fert_name,
                "amount_kg": round(fert_amount, 2),
            },
            "pesticide": {
                "name": pest_name,
                "amount_kg": round(pest_amount, 2),
            },
            "irrigation": irrigation,
            "sustainability_tip": sustainability_tip,
        }

        print("✅ Prediction successful for:", crop)
        return jsonify({"status": "success", "data": response})

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"status": "error", "message": str(e)})

# --------------------------
# 🧠 Root Endpoint
# --------------------------
@app.route("/")
def home():
    return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# --------------------------
# 🚀 Run Flask Server
# --------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
