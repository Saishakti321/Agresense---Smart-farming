# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# import requests

# app = Flask(__name__)
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # ✅ Load trained ML models
# with open("crop_model.pkl", "rb") as f:
#     crop_model = pickle.load(f)

# with open("fertilizer_model.pkl", "rb") as f:
#     fertilizer_model = pickle.load(f)

# with open("irrigation_model.pkl", "rb") as f:
#     irrigation_model = pickle.load(f)


# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "🌱 AgriSense AI Service is Running Successfully!"})


# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # 🌦 Get input parameters
#         N = data.get("N", 90)
#         P = data.get("P", 42)
#         K = data.get("K", 43)
#         temperature = data.get("temperature", 28)
#         humidity = data.get("humidity", 80)
#         ph = data.get("ph", 6.5)
#         rainfall = data.get("rainfall", 150)

#         # 🚀 Crop Prediction
#         features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
#         predicted_crop = crop_model.predict(features)[0]

#         # 💧 Fertilizer Quantity Prediction
#         fert_features = np.array([[temperature, humidity, ph, rainfall]])
#         fertilizer_qty = fertilizer_model.predict(fert_features)[0]

#         # 🌊 Irrigation Interval Prediction
#         irrigation_features = np.array([[temperature, humidity, rainfall]])
#         irrigation_days = irrigation_model.predict(irrigation_features)[0]

#         # 🌾 Generate a smart AI-based recommendation
#         recommendation = f"Based on soil and weather conditions, planting **{predicted_crop}** is optimal."
#         fertilizer_advice = f"Use approximately {fertilizer_qty:.1f} kg/acre of balanced NPK (10:26:26)."
#         irrigation_advice = f"Irrigate every {int(irrigation_days)} days for healthy crop growth."

#         response = {
#             "recommended_crop": predicted_crop,
#             "recommendation": recommendation,
#             "fertilizer": fertilizer_advice,
#             "irrigation": irrigation_advice
#         }

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)








# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # ✅ Load trained ML models
# with open("crop_model.pkl", "rb") as f:
#     crop_model = pickle.load(f)

# with open("fertilizer_model.pkl", "rb") as f:
#     fertilizer_model = pickle.load(f)

# with open("irrigation_model.pkl", "rb") as f:
#     irrigation_model = pickle.load(f)


# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "🌱 AgriSense AI Service is Running Successfully!"})


# # 🧠 Main Crop + Fertilizer + Irrigation Suggestion
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # 🌦 Get input parameters safely
#         N = float(data.get("N", 90))
#         P = float(data.get("P", 42))
#         K = float(data.get("K", 43))
#         temperature = float(data.get("temperature", 28))
#         humidity = float(data.get("humidity", 80))
#         ph = float(data.get("ph", 6.5))
#         rainfall = float(data.get("rainfall", 150))

#         # 🚀 Crop Prediction
#         features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
#         predicted_crop = crop_model.predict(features)[0]

#         # 💧 Fertilizer Quantity Prediction
#         fert_features = np.array([[temperature, humidity, ph, rainfall]])
#         fertilizer_qty = fertilizer_model.predict(fert_features)[0]

#         # 🌊 Irrigation Interval Prediction
#         irrigation_features = np.array([[temperature, humidity, rainfall]])
#         irrigation_days = irrigation_model.predict(irrigation_features)[0]

#         # 🌾 Generate AI Recommendation
#         recommendation = (
#             f"Based on soil and weather conditions, planting **{predicted_crop}** is optimal."
#         )
#         fertilizer_advice = (
#             f"Use approximately {fertilizer_qty:.1f} kg/acre of balanced NPK (10:26:26)."
#         )
#         irrigation_advice = (
#             f"Irrigate every {int(irrigation_days)} days for healthy crop growth."
#         )

#         response = {
#             "recommended_crop": predicted_crop,
#             "recommendation": recommendation,
#             "fertilizer": fertilizer_advice,
#             "irrigation": irrigation_advice,
#         }

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # 💧 Standalone Irrigation Planner Endpoint
# @app.route("/irrigation", methods=["POST"])
# def irrigation_predict():
#     try:
#         data = request.get_json()

#         crop = data.get("crop", "rice")
#         temperature = float(data.get("temperature", 28))
#         humidity = float(data.get("humidity", 75))
#         rainfall = float(data.get("rainfall", 100))
#         soil_ph = float(data.get("soil_ph", 6.5))

#         # Predict irrigation interval using your irrigation model
#         features = np.array([[temperature, humidity, rainfall]])
#         irrigation_days = irrigation_model.predict(features)[0]

#         response = {
#             "crop": crop,
#             "irrigation": f"Irrigate every {int(irrigation_days)} days for {crop}.",
#             "note": "Auto-calculated using ML model based on weather and soil data.",
#         }

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle, numpy as np

# app = Flask(__name__)
# CORS(app)

# crop_model = pickle.load(open("crop_model.pkl", "rb"))
# fertilizer_model = pickle.load(open("fertilizer_model.pkl", "rb"))
# irrigation_model = pickle.load(open("irrigation_model.pkl", "rb"))
# le = pickle.load(open("crop_encoder.pkl", "rb"))

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "🌾 ML Service is Running!"})

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()
#         print("📩 Received data:", data)  # <-- Debug log

#         crop = data.get("crop", "").strip().lower()
#         N = float(data.get("N", 0))
#         P = float(data.get("P", 0))
#         K = float(data.get("K", 0))
#         temperature = float(data.get("temperature", 25))
#         humidity = float(data.get("humidity", 70))
#         ph = float(data.get("ph", 6.5))
#         rainfall = float(data.get("rainfall", 100))

#         # ✅ Ensure models exist
#         if not crop:
#             return jsonify({"error": "Crop name is missing"}), 400

#         # ✅ Encode crop safely
#         try:
#             crop_encoded = crop_encoder.transform([crop])[0]
#         except Exception as e:
#             print("⚠️ Crop encoding failed:", e)
#             crop_encoded = 0

#         print("✅ Encoded crop:", crop_encoded)

#         # 🌿 Fertilizer prediction
#         fert_features = np.array([[temperature, humidity, ph, rainfall]])
#         print("🧪 Fert features:", fert_features)
#         fert_pred = fertilizer_model.predict(fert_features)[0]

#         # 💧 Irrigation prediction
#         irrig_features = np.array([[temperature, humidity, rainfall, crop_encoded]])
#         print("💧 Irrig features:", irrig_features)
#         irrig_pred = irrigation_model.predict(irrig_features)[0]

#         fertilizer_advice = f"Apply approximately {fert_pred:.1f} kg/acre of balanced NPK (10:26:26)."
#         irrigation_advice = f"Irrigate every {int(irrig_pred)} days for optimal {crop.capitalize()} growth."

#         sustainability = ""
#         if ph < 5.5:
#             sustainability = "Soil is acidic. Apply lime to neutralize."
#         elif ph > 7.5:
#             sustainability = "Soil is alkaline. Add organic compost to balance."
#         else:
#             sustainability = "Soil pH is optimal for healthy crop growth."

#         recommendation = f"Based on your soil and climate, conditions are suitable for {crop.capitalize()}."

#         print("✅ Response ready")

#         return jsonify({
#             "crop": crop,
#             "recommendation": recommendation,
#             "fertilizer": fertilizer_advice,
#             "irrigation": irrigation_advice,
#             "sustainability": sustainability
#         })

#     except Exception as e:
#         import traceback
#         print("🔥 ERROR in /predict:", str(e))
#         print(traceback.format_exc())  # <-- show full error
#         return jsonify({"error": str(e)}), 500

# @app.route("/irrigation", methods=["POST"])
# def irrigation():
#     try:
#         data = request.get_json()
#         crop = data.get("crop", "rice")
#         lat = float(data.get("lat", 20.5))
#         lon = float(data.get("lon", 78.9))
#         ph = float(data.get("ph", 6.5))
#         temperature = float(data.get("temperature", 28))
#         humidity = float(data.get("humidity", 70))

#         # 1️⃣ Fetch 5-day rainfall forecast from OpenWeatherMap
#         api_key = "YOUR_OPENWEATHERMAP_API_KEY"
#         url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
#         forecast = requests.get(url).json()

#         # 2️⃣ Calculate average expected rainfall for next 5 days
#         rain_values = [
#             item.get("rain", {}).get("3h", 0)
#             for item in forecast.get("list", [])
#         ]
#         avg_rainfall = sum(rain_values) / len(rain_values) if rain_values else 0

#         # 3️⃣ ML-based irrigation interval prediction
#         X = np.array([[temperature, humidity, avg_rainfall, 0]])  # crop_encoded optional
#         irrigation_days = irrigation_model.predict(X)[0]

#         # 4️⃣ Generate milestone schedule
#         from datetime import datetime, timedelta
#         schedule = []
#         today = datetime.now()
#         water_base = 30
#         for i in range(5):
#             date = today + timedelta(days=int(irrigation_days * i))
#             rain_pred = rain_values[min(i, len(rain_values)-1)] if rain_values else 0
#             water = water_base + (i * 5)
#             note = "Normal irrigation"
#             if rain_pred > 10:
#                 note = "Rain expected — reduce water by 30%"
#                 water *= 0.7
#             schedule.append({
#                 "date": date.strftime("%Y-%m-%d"),
#                 "water_required": f"{water:.1f} litres/acre",
#                 "note": note
#             })

#         return jsonify({
#             "crop": crop,
#             "average_interval_days": round(irrigation_days, 1),
#             "avg_forecast_rainfall": round(avg_rainfall, 2),
#             "irrigation_schedule": schedule
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)






from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, numpy as np
import requests
from datetime import datetime, timedelta
# 🌦 Weather + Soil Moisture Integration
API_KEY = "64ec4e8adf69cb9be080f0c6d813f56d"


app = Flask(__name__)
CORS(app)

# Load the pre-trained models
import joblib
# fertilizer_model = joblib.load("fertilizer_model.pkl")

crop_model = pickle.load(open("crop_model.pkl", "rb"))
fertilizer_model = pickle.load(open("fertilizer_model123.pkl", "rb"))
irrigation_model = pickle.load(open("irrigation_model.pkl", "rb"))
crop_encoder = pickle.load(open("crop_encoder.pkl", "rb"))

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🌾 ML Service is Running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("📩 Received data:", data)  # <-- Debug log

        # Extract input data from request body
        crop = data.get("crop", "").strip().lower()
        N = float(data.get("N", 0))
        P = float(data.get("P", 0))
        K = float(data.get("K", 0))
        temperature = float(data.get("temperature", 25))
        humidity = float(data.get("humidity", 70))
        ph = float(data.get("ph", 6.5))
        rainfall = float(data.get("rainfall", 100))

        # Ensure crop name is provided
        if not crop:
            return jsonify({"error": "Crop name is missing"}), 400

        # Encode crop safely
        try:
            crop_encoded = crop_encoder.transform([crop])[0]
        except Exception as e:
            print("⚠️ Crop encoding failed:", e)
            crop_encoded = 0  # Default fallback

        print("✅ Encoded crop:", crop_encoded)

        # Fertilizer prediction
        fert_features = np.array([[temperature, humidity, ph, rainfall]])
        fert_pred = fertilizer_model.predict(fert_features)[0]

        # Irrigation prediction
        irrig_features = np.array([[temperature, humidity, rainfall, crop_encoded]])
        irrig_pred = irrigation_model.predict(irrig_features)[0]

        # Formulate advice
        fertilizer_advice = f"Apply approximately {fert_pred:.1f} kg/acre of balanced NPK (10:26:26)."
        irrigation_advice = f"Irrigate every {int(irrig_pred)} days for optimal {crop.capitalize()} growth."

        sustainability = ""
        if ph < 5.5:
            sustainability = "Soil is acidic. Apply lime to neutralize."
        elif ph > 7.5:
            sustainability = "Soil is alkaline. Add organic compost to balance."
        else:
            sustainability = "Soil pH is optimal for healthy crop growth."

        recommendation = f"Based on your soil and climate, conditions are suitable for {crop.capitalize()}."

        print("✅ Response ready")

        return jsonify({
            "crop": crop,
            "recommendation": recommendation,
            "fertilizer": fertilizer_advice,
            "irrigation": irrigation_advice,
            "sustainability": sustainability
        })

    except Exception as e:
        import traceback
        print("🔥 ERROR in /predict:", str(e))
        print(traceback.format_exc())  # <-- show full error
        return jsonify({"error": str(e)}), 500


@app.route("/weather", methods=["GET"])
def get_weather_data():
    try:
        # Example: Navi Mumbai coordinates
        lat, lon = 19.0896, 73.0199

        # Step 1: Get current weather data
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        weather_res = requests.get(weather_url).json()

        temperature = weather_res["main"]["temp"]
        humidity = weather_res["main"]["humidity"]
        location = weather_res.get("name", "Unknown")

        # Step 2: Get rainfall (optional) using forecast API
        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        forecast_res = requests.get(forecast_url).json()
        rainfall = forecast_res["list"][0].get("rain", {}).get("3h", 0) if "list" in forecast_res else 0

        # Step 3: Estimate soil moisture using weather data
        soil_moisture = (humidity * 0.6) + (rainfall * 0.3) - (temperature * 0.2)
        soil_moisture = round(max(0, min(100, soil_moisture)), 2)

        return jsonify({
            "location": location,
            "temperature": temperature,
            "humidity": humidity,
            "rainfall": rainfall,
            "estimated_soil_moisture(%)": soil_moisture
        })

    except Exception as e:
        print("🔥 ERROR in /weather:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
