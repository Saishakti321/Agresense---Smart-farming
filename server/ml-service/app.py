
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, numpy as np
import requests
from datetime import datetime, timedelta

#  Api key 

app = Flask(__name__)
CORS(app)

import joblib

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
        print("📩 Received data:", data)  

        crop = data.get("crop", "").strip().lower()
        N = float(data.get("N", 0))
        P = float(data.get("P", 0))
        K = float(data.get("K", 0))
        temperature = float(data.get("temperature", 25))
        humidity = float(data.get("humidity", 70))
        ph = float(data.get("ph", 6.5))
        rainfall = float(data.get("rainfall", 100))

        if not crop:
            return jsonify({"error": "Crop name is missing"}), 400

        try:
            crop_encoded = crop_encoder.transform([crop])[0]
        except Exception as e:
            print("⚠️ Crop encoding failed:", e)
            crop_encoded = 0  

        print(" Encoded crop:", crop_encoded)

        fert_features = np.array([[temperature, humidity, ph, rainfall]])
        fert_pred = fertilizer_model.predict(fert_features)[0]

        irrig_features = np.array([[temperature, humidity, rainfall, crop_encoded]])
        irrig_pred = irrigation_model.predict(irrig_features)[0]

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

        print(" Response ready")

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
        lat, lon = 19.0896, 73.0199

        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        weather_res = requests.get(weather_url).json()

        temperature = weather_res["main"]["temp"]
        humidity = weather_res["main"]["humidity"]
        location = weather_res.get("name", "Unknown")


        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        forecast_res = requests.get(forecast_url).json()
        rainfall = forecast_res["list"][0].get("rain", {}).get("3h", 0) if "list" in forecast_res else 0

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
