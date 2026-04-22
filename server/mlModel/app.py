
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  

 
try:
    crop_model = joblib.load("crop_model.pkl")
    fert_model = joblib.load("fertilizer_model.pkl")
    pest_model = joblib.load("pesticide_model.pkl")
    scaler = joblib.load("scaler.pkl")
    le_crop = joblib.load("label_encoder.pkl")
    print("✅ Models and scalers loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")

 
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        soil_pH = float(data.get("ph", 6.5))
        soil_moisture = float(data.get("soil_moisture", 35))
        temperature = float(data.get("temperature", 28))
        humidity = float(data.get("humidity", 60))

        X_new = scaler.transform([[soil_pH, soil_moisture, temperature, humidity]])

        crop_pred = le_crop.inverse_transform(crop_model.predict(X_new))[0]

        fert_pred = fert_model.predict(X_new)[0]
        pest_pred = pest_model.predict(X_new)[0]

        response = {
            "status": "success",
            "ai_recommendation": {
                "best_crop": crop_pred,
                "fertilizer": {
                    "name": "Example Fertilizer",  
                    "amount_kg_per_acre": round(fert_pred, 2),
                },
                "pesticide": {
                    "name": "Example Pesticide",  
                    "amount_kg_per_acre": round(pest_pred, 2),
                },
                "irrigation": {
                    "message": "Irrigate every 5 days",  
                    "interval_days": 5,
                },
                "sustainability_tip": "Use organic manure to improve soil fertility.",
            },
        }

        return jsonify(response)  

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500  


@app.route("/")
def home():
    return jsonify({"message": "🌾 AI Farm Plan API is running!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
