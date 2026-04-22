

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import datetime
import random

app = Flask(__name__)
CORS(app)


fert_model = joblib.load("trained_models/fertilizer_model.joblib")
pest_model = joblib.load("trained_models/pesticide_model.joblib")



def crop_mappings(crop):
    crop_to_fert = {
        "Rice": "Urea", "Wheat": "NPK", "Maize": "DAP", "Sugarcane": "Urea",
        "Cotton": "Potash", "Mustard": "SSP", "Groundnut": "Compost",
        "Pulses": "DAP", "Potato": "MOP", "Tomato": "NPK", "Paddy": "Urea"
    }
    crop_to_pest = {
        "Rice": "Chlorpyrifos", "Wheat": "Mancozeb", "Maize": "Lambda-Cyhalothrin",
        "Sugarcane": "Malathion", "Cotton": "Acephate", "Mustard": "Carbendazim",
        "Groundnut": "Dimethoate", "Pulses": "Thiamethoxam", "Potato": "Cartap Hydrochloride",
        "Tomato": "Imidacloprid", "Paddy": "Chlorpyrifos"
    }
    return crop_to_fert.get(crop, "Urea"), crop_to_pest.get(crop, "Imidacloprid")



def predict_fertilizer_pesticide(temperature, humidity, moisture, soil, crop):
    fert_name, pest_name = crop_mappings(crop)
    soil_ph = 6.5

    fert_input = pd.DataFrame([{
        "Crop": crop, "Region": "Odisha", "Season": "Kharif",
        "Temperature_C": temperature, "Humidity_%": humidity,
        "Soil_pH": soil_ph, "Soil_Moisture_%": moisture,
        "Fertilizer_Name": fert_name
    }])
    pest_input = pd.DataFrame([{
        "Crop": crop, "Region": "Odisha", "Season": "Kharif",
        "Temperature_C": temperature, "Humidity_%": humidity,
        "Soil_pH": soil_ph, "Soil_Moisture_%": moisture,
        "Pesticide_Name": pest_name
    }])

    fert_pred = fert_model.predict(fert_input)[0]
    pest_pred = pest_model.predict(pest_input)[0]

    return fert_name, round(fert_pred, 2), pest_name, round(pest_pred, 2)



def generate_10day_schedule(fertilizer_name, fert_amount, pesticide_name, pest_amount):
    base_date = datetime.date.today()
    schedule = []


    fert_half = round(fert_amount / 2, 2)
    pest_half = round(pest_amount / 2, 2)

    for i in range(10):
        date = base_date + datetime.timedelta(days=i)
        actions = []

    
        if i == 0:
            actions.append({
                "kind": "Soil Prep",
                "action": "Check soil moisture and pH before starting.",
                "note": "Ensure soil is tilled properly before fertilizer application."
            })
            actions.append({
                "kind": "Fertilizer",
                "action": f"Apply {fertilizer_name}",
                "note": f"Use {fert_half} kg/acre for base layer nutrition."
            })

        elif i == 1:
            actions.append({
                "kind": "Irrigation",
                "action": "Light irrigation after fertilizer application.",
                "note": "Helps dissolve nutrients into soil."
            })

        elif i == 2:
            actions.append({
                "kind": "Monitoring",
                "action": "Inspect for pests or leaf damage.",
                "note": "Prepare for preventive spraying if needed."
            })

        elif i == 3:
            actions.append({
                "kind": "Pesticide",
                "action": f"Spray {pesticide_name}",
                "note": f"Use {pest_half} kg/acre for pest prevention."
            })

        elif i == 4:
            actions.append({
                "kind": "Irrigation",
                "action": "Normal watering",
                "note": "Maintain moisture above 40%."
            })

        elif i == 5:
            actions.append({
                "kind": "Fertilizer",
                "action": f"Top dress {fertilizer_name}",
                "note": f"Apply remaining {fert_half} kg/acre for strong growth."
            })

        elif i == 6:
            actions.append({
                "kind": "Monitoring",
                "action": "Observe leaf color and plant height.",
                "note": "Ensure no nutrient deficiency signs."
            })

        elif i == 7:
            actions.append({
                "kind": "Pesticide",
                "action": f"Second spray of {pesticide_name} if pests appear.",
                "note": f"Use {pest_half} kg/acre for re-treatment."
            })

        elif i == 8:
            actions.append({
                "kind": "Irrigation",
                "action": "Moderate irrigation",
                "note": "Avoid water stress."
            })

        elif i == 9:
            actions.append({
                "kind": "Monitoring",
                "action": "Final crop health check before next cycle.",
                "note": "Plan next irrigation or nutrient application if needed."
            })

        if actions:
            schedule.append({"date": str(date), "actions": actions})

    return schedule



@app.route("/predict_plan", methods=["POST"])
def predict_plan():
    try:
        data = request.get_json()
        temperature = float(data.get("temperature"))
        humidity = float(data.get("humidity"))
        moisture = float(data.get("moisture"))
        soil = data.get("soil")
        crop = data.get("crop")

        if not all([temperature, humidity, moisture, soil, crop]):
            return jsonify({"error": "Missing input fields"}), 400

        fert_name, fert_amt, pest_name, pest_amt = predict_fertilizer_pesticide(
            temperature, humidity, moisture, soil, crop
        )
        plan = generate_10day_schedule(fert_name, fert_amt, pest_name, pest_amt)

        result = {
            "fertilizer": {
                "name": fert_name,
                "amount_kg_per_acre": fert_amt
            },
            "pesticide": {
                "name": pest_name,
                "amount_kg_per_acre": pest_amt
            },
            "plan": plan
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🌾 Smart Agri 10-Day Planning API active!"})


if __name__ == "__main__":
    app.run(port=5002, debug=True)
