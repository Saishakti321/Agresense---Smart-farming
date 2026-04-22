

from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Allow React connection
import joblib
import numpy as np


app = Flask(__name__)
CORS(app) 


try:
    fertilizer_model = joblib.load("fertilizer_model.pkl")
    pesticide_model = joblib.load("pesticide_model.pkl")
    scaler = joblib.load("scaler.pkl")
    crop_encoder = joblib.load("crop_encoder.pkl")  # ✅ Encoder for crop
    print(" Models, scaler, and crop encoder loaded successfully!")
except Exception as e:
    crop_encoder = None
    print(f" Error loading models or encoder: {e}")


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


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        print("📥 Received JSON:", data)

        crop = data.get("crop", "").capitalize()
        soil_pH = float(data.get("ph", 6.5))
        soil_moisture = float(data.get("soil_moisture", 30))
        temperature = float(data.get("temperature", 25))
        rainfall = float(data.get("rainfall", 100))

        try:
            crop_code = crop_encoder.transform([crop])[0] if crop_encoder else 0
        except Exception:
            crop_code = 0
            print(f"⚠️ Crop '{crop}' not found in encoder; using default code 0.")

        X = np.array([[crop_code, soil_pH, soil_moisture, temperature, rainfall]])
        X_scaled = scaler.transform(X)

        fert_amount = float(fertilizer_model.predict(X_scaled)[0])
        pest_amount = float(pesticide_model.predict(X_scaled)[0])

        fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
        pest_name = pesticide_map.get(crop, "Generic Pesticide")

        if soil_moisture < 25:
            irrigation = "💧 Immediate irrigation required – very low soil moisture."
        elif 25 <= soil_moisture < 50:
            irrigation = "💧 Irrigate every 3–4 days to maintain optimal growth."
        else:
            irrigation = "🌦️ Soil moisture sufficient; postpone irrigation."

        sustainability_tip = (
            "🌱 Practice crop rotation and use bio-fertilizers for sustainable soil health."
        )

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

        print("Prediction successful for:", crop)
        return jsonify({"status": "success", "data": response})

    except Exception as e:
        print(" Error:", e)
        return jsonify({"status": "error", "message": str(e)})


@app.route("/")
def home():
    return jsonify({"message": "🌾 Smart Farm AI API is running!"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
