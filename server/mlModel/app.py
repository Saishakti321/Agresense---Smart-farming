
# import pickle
# import numpy as np
# import numpy.random

# # 🔧 Patch: define missing MT19937 generator if not found
# if not hasattr(np.random, "MT19937"):
#     from numpy.random.bit_generator import MT19937
#     np.random.MT19937 = MT19937

# # Try loading the model
# try:
#     model = pickle.load(open("crop_model.pkl", "rb"))
#     print("✅ Model loaded successfully!")
# except Exception as e:
#     print("❌ Error loading model:", e)
# # --------------------------
# # 🧠 Crop Prediction Function
# # --------------------------
# def predict_crop(soil_pH, moisture, temp, rainfall):
#     ratio = moisture / (rainfall + 1)
#     index = temp * (moisture / 100)
#     ph_cat_alk = 1 if soil_pH > 7.5 else 0
#     ph_cat_neu = 1 if 6.5 <= soil_pH <= 7.5 else 0

#     sample = np.array([[soil_pH, moisture, temp, rainfall, ratio, index, ph_cat_alk, ph_cat_neu]])
#     sample_scaled = scaler.transform(sample)
#     pred = model.predict(sample_scaled)
#     crop = encoder.inverse_transform(pred)[0]
#     return crop


# # --------------------------
# # 🌿 Schedule Recommendation
# # --------------------------
# def get_schedule(crop):
#     crop = crop.lower()

#     fertilizer_schedules = {
#         "rice": "Use Urea 60kg/acre at 20 DAS and DAP 40kg/acre at sowing.",
#         "wheat": "Apply NPK 10:26:26 at sowing and top-dress with Urea 30kg/acre at 25 DAS.",
#         "soybean": "Apply SSP 100kg/acre before sowing and MOP 20kg/acre at flowering stage.",
#         "corn": "Apply Urea 50kg/acre at 25 DAS and DAP 40kg/acre at sowing."
#     }

#     pesticide_schedules = {
#         "rice": "Spray Carbendazim 0.1% for blast disease at 30 DAS.",
#         "wheat": "Use Imidacloprid 0.05% for aphid control at tillering stage.",
#         "soybean": "Apply Chlorpyrifos 2ml/L for leaf miner and stem borer.",
#         "corn": "Spray Spinosad 45% SC (0.4ml/L) for fall armyworm control."
#     }

#     fertilizer = fertilizer_schedules.get(crop, "No fertilizer schedule found.")
#     pesticide = pesticide_schedules.get(crop, "No pesticide schedule found.")

#     return fertilizer, pesticide


# # --------------------------
# # 🌾 Flask API Endpoint
# # --------------------------
# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     soil_pH = float(data['soil_pH'])
#     moisture = float(data['moisture'])
#     temp = float(data['temperature'])
#     rainfall = float(data['rainfall'])

#     crop = predict_crop(soil_pH, moisture, temp, rainfall)
#     fertilizer, pesticide = get_schedule(crop)

#     return jsonify({
#         "predicted_crop": crop,
#         "fertilizer_recommendation": fertilizer,
#         "pesticide_recommendation": pesticide
#     })


# if __name__ == '__main__':
#     app.run(debug=True)

# 🌾 Smart Farm AI Flask API
# ----------------------------------------------------
# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # Load saved models and preprocessors
# try:
#     crop_model = joblib.load("crop_model.pkl")
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     label_encoder = joblib.load("label_encoder.pkl")
#     print("✅ All models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model: {e}")

# # --------------------------
# # 🔮 Prediction Route
# # --------------------------
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()

#         # Extract and convert values safely (case-insensitive)
#         soil_pH = float(data.get('soil_pH', 0))
#         soil_moisture = float(data.get('soil_moisture', 0))
#         temperature = float(data.get('temperature', 0))
#         rainfall = float(data.get('rainfall', 0))

#         # Prepare input for model
#         X_input = scaler.transform([[soil_pH, soil_moisture, temperature, rainfall]])

#         # Predictions
#         crop_pred = label_encoder.inverse_transform(crop_model.predict(X_input))[0]
#         fert_pred = float(fertilizer_model.predict(X_input)[0])
#         pest_pred = float(pesticide_model.predict(X_input)[0])

#         response = {
#             "crop_recommendation": crop_pred,
#             "fertilizer_kg": round(fert_pred, 2),
#             "pesticide_kg": round(pest_pred, 2)
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)})

# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route('/')
# def home():
#     return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# # --------------------------
# # 🚀 Run Server
# # --------------------------
# if __name__ == '__main__':
#     app.run(debug=True, port=5000)










# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # Load saved models and preprocessors
# try:
#     crop_model = joblib.load("crop_model.pkl")
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     label_encoder = joblib.load("label_encoder.pkl")
#     print("✅ All models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model: {e}")

# # --------------------------
# # 🔮 Prediction Route
# # --------------------------
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()

#         # Extract and convert values safely (case-insensitive)
#         soil_pH = float(data.get('soil_pH', 0))
#         soil_moisture = float(data.get('soil_moisture', 0))
#         temperature = float(data.get('temperature', 0))
#         rainfall = float(data.get('rainfall', 0))

#         # Prepare input for model
#         X_input = scaler.transform([[soil_pH, soil_moisture, temperature, rainfall]])

#         # Predictions
#         crop_pred = label_encoder.inverse_transform(crop_model.predict(X_input))[0]
#         fert_pred = float(fertilizer_model.predict(X_input)[0])
#         pest_pred = float(pesticide_model.predict(X_input)[0])

#         # Based on crop prediction, set fertilizer name, pesticide name, and irrigation advice
#         if crop_pred == "Rice":
#             fertilizer_name = "Urea (NPK 46-0-0)"
#             pesticide_name = "Neem Oil"
#             irrigation_advice = "Water every 3 days due to high temperature."
#         elif crop_pred == "Wheat":
#             fertilizer_name = "NPK (15-15-15)"
#             pesticide_name = "Pyrethrin"
#             irrigation_advice = "Water every 5 days based on moderate soil moisture."
#         else:
#             fertilizer_name = "Generic Fertilizer"
#             pesticide_name = "Generic Pesticide"
#             irrigation_advice = "Water based on soil moisture levels."

#         # Sustainability tips (optional and can be dynamic based on crop prediction)
#         sustainability_tip = "Consider using organic fertilizers and pesticides for sustainability."

#         response = {
#             "crop_recommendation": crop_pred,
#             "fertilizer": {
#                 "name": fertilizer_name,
#                 "amount_kg": round(fert_pred, 2)
#             },
#             "pesticide": {
#                 "name": pesticide_name,
#                 "amount_kg": round(pest_pred, 2)
#             },
#             "irrigation": irrigation_advice,
#             "sustainability_tip": sustainability_tip
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)})

# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route('/')
# def home():
#     return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# # --------------------------
# # 🚀 Run Server
# # --------------------------
# if __name__ == '__main__':
#     app.run(debug=True, port=5000)


# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # --------------------------
# # Load trained models
# # --------------------------
# try:
#     crop_model = joblib.load("crop_model.pkl")
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     label_encoder = joblib.load("label_encoder.pkl")
#     print("✅ Models and scaler loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model: {e}")

# # --------------------------
# # Lookup tables (optional)
# # --------------------------
# fertilizer_map = {
#     "Rice": "Urea (NPK 46-0-0)",
#     "Wheat": "NPK (15-15-15)",
#     "Maize": "DAP (18-46-0)",
#     "Cotton": "Potash (KCl)",
# }

# pesticide_map = {
#     "Rice": "Neem Oil",
#     "Wheat": "Pyrethrin",
#     "Maize": "Chlorpyrifos",
#     "Cotton": "Imidacloprid",
# }

# # --------------------------
# # 🔮 Prediction Route
# # --------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         crop_name = data.get("crop", "").capitalize()
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 30))
#         temperature = float(data.get("temperature", 25))
#         rainfall = float(data.get("rainfall", 100))

#         # --------------------------
#         # Prepare input for models
#         # --------------------------
#         X_input = np.array([[soil_pH, soil_moisture, temperature, rainfall]])
#         X_scaled = scaler.transform(X_input)

#         # --------------------------
#         # Run actual ML predictions
#         # --------------------------
#         predicted_crop_idx = crop_model.predict(X_scaled)[0]
#         predicted_crop = label_encoder.inverse_transform([predicted_crop_idx])[0]

#         fertilizer_amount = float(fertilizer_model.predict(X_scaled)[0])
#         pesticide_amount = float(pesticide_model.predict(X_scaled)[0])

#         # --------------------------
#         # Map fertilizer/pesticide names
#         # --------------------------
#         fert_name = fertilizer_map.get(predicted_crop, "Generic Fertilizer")
#         pest_name = pesticide_map.get(predicted_crop, "Generic Pesticide")

#         # --------------------------
#         # Irrigation & sustainability advice (rule-based helper)
#         # --------------------------
#         if soil_moisture < 30:
#             irrigation_advice = "Irrigation needed — low soil moisture."
#         elif soil_moisture < 50:
#             irrigation_advice = "Maintain moderate irrigation every 3–4 days."
#         else:
#             irrigation_advice = "Soil moisture is sufficient; delay irrigation."

#         sustainability_tip = (
#             "Use organic compost and biological pest control to improve soil health."
#         )

#         # --------------------------
#         # Construct response
#         # --------------------------
#         response = {
#             "predicted_crop": predicted_crop,
#             "fertilizer": {"name": fert_name, "amount_kg": round(fertilizer_amount, 2)},
#             "pesticide": {"name": pest_name, "amount_kg": round(pesticide_amount, 2)},
#             "irrigation": irrigation_advice,
#             "sustainability_tip": sustainability_tip,
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
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
# # Lookup tables for crop-specific names
# # --------------------------
# fertilizer_map = {
#     "Rice": "Urea (NPK 46-0-0)",
#     "Wheat": "NPK (15-15-15)",
#     "Maize": "DAP (18-46-0)",
#     "Cotton": "Potash (KCl)",
#     "Tomato": "Calcium Nitrate",
#     "Soybean": "Ammonium Sulphate",
#     "Banana": "Organic Compost",
#     "Onion": "Super Phosphate"
# }

# pesticide_map = {
#     "Rice": "Neem Oil",
#     "Wheat": "Pyrethrin",
#     "Maize": "Chlorpyrifos",
#     "Cotton": "Imidacloprid",
#     "Tomato": "Spinosad",
#     "Soybean": "Carbaryl",
#     "Banana": "Copper Oxychloride",
#     "Onion": "Mancozeb"
# }

# # --------------------------
# # 🔮 Prediction Endpoint
# # --------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         crop = data.get("crop", "").capitalize()
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 30))
#         temperature = float(data.get("temperature", 25))
#         rainfall = float(data.get("rainfall", 100))

#         # Prepare input for ML models
#         X = np.array([[soil_pH, soil_moisture, temperature, rainfall]])
#         X_scaled = scaler.transform(X)

#         # Predict numeric outputs using trained regressors
#         fert_amount = float(fertilizer_model.predict(X_scaled)[0])
#         pest_amount = float(pesticide_model.predict(X_scaled)[0])

#         # Select crop-specific names
#         fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
#         pest_name = pesticide_map.get(crop, "Generic Pesticide")

#         # Irrigation recommendation
#         if soil_moisture < 25:
#             irrigation = "💧 Immediate irrigation required – very low soil moisture."
#         elif 25 <= soil_moisture < 50:
#             irrigation = "💧 Irrigate every 3–4 days to maintain optimal growth."
#         else:
#             irrigation = "🌦️ Soil moisture is sufficient; postpone irrigation."

#         sustainability = (
#             "🌱 Practice crop rotation and use bio-fertilizers for sustainable soil health."
#         )

#         # Construct response
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
#             "sustainability_tip": sustainability
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)})

# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route("/")
# def home():
#     return jsonify({"message": "🌾 Smart Farm AI API is running!"})

# # --------------------------
# # 🚀 Run
# # --------------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

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
#     crop_model = joblib.load("crop_model.pkl")  # new: crop recommendation model
#     scaler = joblib.load("scaler.pkl")
#     print("✅ All ML models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {e}")

# # --------------------------
# # Lookup tables for crop & fertilizer mapping
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
#     "Sugarcane": "NPK (19-19-19)"
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
#     "Sugarcane": "Malathion"
# }

# # --------------------------
# # 🔮 Prediction Endpoint
# # --------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # Extract input features
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 35))
#         temperature = float(data.get("temperature", 28))
#         rainfall = float(data.get("rainfall", 90))
#         humidity = float(data.get("humidity", 60))

#         X = np.array([[soil_pH, soil_moisture, temperature, rainfall, humidity]])
#         X_scaled = scaler.transform(X)

#         # Predict fertilizer & pesticide amount
#         fert_amount = float(fertilizer_model.predict(X_scaled)[0])
#         pest_amount = float(pesticide_model.predict(X_scaled)[0])

#         # Predict best crop for given conditions
#         best_crop = crop_model.predict(X_scaled)[0].capitalize()

#         # Fetch fertilizer & pesticide names
#         fert_name = fertilizer_map.get(best_crop, "Balanced NPK Fertilizer")
#         pest_name = pesticide_map.get(best_crop, "Generic Pesticide")

#         # Irrigation scheduling (AI logic)
#         if soil_moisture < 25:
#             irrigation_msg = "💧 Irrigate immediately (every 2 days)."
#             irrigation_days = 2
#         elif 25 <= soil_moisture < 45:
#             irrigation_msg = "💧 Moderate — irrigate every 3–4 days."
#             irrigation_days = 3
#         elif 45 <= soil_moisture < 65:
#             irrigation_msg = "🌤️ Sufficient moisture — irrigate every 5–6 days."
#             irrigation_days = 5
#         else:
#             irrigation_msg = "🌧️ No irrigation needed for 7+ days."
#             irrigation_days = 7

#         sustainability_tip = (
#             "🌱 Use crop rotation and organic manure to maintain soil fertility."
#         )

#         # Construct structured response
#         response = {
#             "status": "success",
#             "ai_recommendation": {
#                 "best_crop": best_crop,
#                 "fertilizer": {
#                     "name": fert_name,
#                     "amount_kg_per_acre": round(fert_amount, 2),
#                 },
#                 "pesticide": {
#                     "name": pest_name,
#                     "amount_kg_per_acre": round(pest_amount, 2),
#                 },
#                 "irrigation": {
#                     "message": irrigation_msg,
#                     "interval_days": irrigation_days,
#                 },
#                 "sustainability_tip": sustainability_tip,
#             },
#         }

#         return jsonify(response)

#     except Exception as e:
#         print(f"❌ Error during prediction: {e}")
#         return jsonify({"status": "error", "message": str(e)}), 500


# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route("/")
# def home():
#     return jsonify({"message": "🌾 AgriSense AI API is running successfully!"})


# # --------------------------
# # 🚀 Run the Server
# # --------------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)


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
#     crop_model = joblib.load("crop_model.pkl")  # crop recommendation model
#     scaler = joblib.load("scaler.pkl")
#     print("✅ All ML models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {e}")

# # --------------------------
# # Lookup tables for crop & fertilizer mapping
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
#     "Sugarcane": "NPK (19-19-19)"
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
#     "Sugarcane": "Malathion"
# }

# # --------------------------
# # 🔮 Prediction Endpoint
# # --------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # Extract input features
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 35))
#         temperature = float(data.get("temperature", 28))
#         rainfall = float(data.get("rainfall", 90))
#         humidity = float(data.get("humidity", 60))

#         # Prepare data for scaling and prediction
#         X = np.array([[soil_pH, soil_moisture, temperature, rainfall, humidity]])
#         X_scaled = scaler.transform(X)

#         # Predict fertilizer & pesticide amount
#         fert_amount = float(fertilizer_model.predict(X_scaled)[0])
#         pest_amount = float(pesticide_model.predict(X_scaled)[0])

#         # Predict best crop for given conditions
#         best_crop = crop_model.predict(X_scaled)[0].capitalize()

#         # Fetch fertilizer & pesticide names
#         fert_name = fertilizer_map.get(best_crop, "Balanced NPK Fertilizer")
#         pest_name = pesticide_map.get(best_crop, "Generic Pesticide")

#         # Irrigation scheduling (AI logic)
#         if soil_moisture < 25:
#             irrigation_msg = "💧 Irrigate immediately (every 2 days)."
#             irrigation_days = 2
#         elif 25 <= soil_moisture < 45:
#             irrigation_msg = "💧 Moderate — irrigate every 3–4 days."
#             irrigation_days = 3
#         elif 45 <= soil_moisture < 65:
#             irrigation_msg = "🌤️ Sufficient moisture — irrigate every 5–6 days."
#             irrigation_days = 5
#         else:
#             irrigation_msg = "🌧️ No irrigation needed for 7+ days."
#             irrigation_days = 7

#         sustainability_tip = (
#             "🌱 Use crop rotation and organic manure to maintain soil fertility."
#         )

#         # Construct structured response
#         response = {
#             "status": "success",
#             "ai_recommendation": {
#                 "best_crop": best_crop,
#                 "fertilizer": {
#                     "name": fert_name,
#                     "amount_kg_per_acre": round(fert_amount, 2),
#                 },
#                 "pesticide": {
#                     "name": pest_name,
#                     "amount_kg_per_acre": round(pest_amount, 2),
#                 },
#                 "irrigation": {
#                     "message": irrigation_msg,
#                     "interval_days": irrigation_days,
#                 },
#                 "sustainability_tip": sustainability_tip,
#             },
#         }

#         return jsonify(response)

#     except Exception as e:
#         print(f"❌ Error during prediction: {e}")
#         return jsonify({"status": "error", "message": str(e)}), 500


# # --------------------------
# # 🧠 Root Endpoint
# # --------------------------
# @app.route("/")
# def home():
#     return jsonify({"message": "🌾 AgriSense AI API is running successfully!"})


# # --------------------------
# # 🚀 Run the Server
# # --------------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# --------------------------
# Load the trained models and scaler
# --------------------------
try:
    crop_model = joblib.load("crop_model.pkl")
    fert_model = joblib.load("fertilizer_model.pkl")
    pest_model = joblib.load("pesticide_model.pkl")
    scaler = joblib.load("scaler.pkl")
    le_crop = joblib.load("label_encoder.pkl")
    print("✅ Models and scalers loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# --------------------------
# Prediction Endpoint
# --------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get the incoming JSON data
        data = request.get_json()

        # Extract features from the request
        soil_pH = float(data.get("ph", 6.5))
        soil_moisture = float(data.get("soil_moisture", 35))
        temperature = float(data.get("temperature", 28))
        humidity = float(data.get("humidity", 60))

        # Prepare data for prediction
        X_new = scaler.transform([[soil_pH, soil_moisture, temperature, humidity]])

        # Predict crop type using the classifier model
        crop_pred = le_crop.inverse_transform(crop_model.predict(X_new))[0]

        # Predict fertilizer and pesticide usage using the regression models
        fert_pred = fert_model.predict(X_new)[0]
        pest_pred = pest_model.predict(X_new)[0]

        # Construct response
        response = {
            "status": "success",
            "ai_recommendation": {
                "best_crop": crop_pred,
                "fertilizer": {
                    "name": "Example Fertilizer",  # Adjust this based on your dataset
                    "amount_kg_per_acre": round(fert_pred, 2),
                },
                "pesticide": {
                    "name": "Example Pesticide",  # Adjust this based on your dataset
                    "amount_kg_per_acre": round(pest_pred, 2),
                },
                "irrigation": {
                    "message": "Irrigate every 5 days",  # Adjust this based on moisture levels
                    "interval_days": 5,
                },
                "sustainability_tip": "Use organic manure to improve soil fertility.",
            },
        }

        return jsonify(response)  # Return the JSON response

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500  # Always return a valid response in case of error

# --------------------------
# Root Endpoint
# --------------------------
@app.route("/")
def home():
    return jsonify({"message": "🌾 AI Farm Plan API is running!"})

# --------------------------
# Run the Server
# --------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
