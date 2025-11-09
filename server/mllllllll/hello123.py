# # predict_agri_usage.py
# import joblib
# import pandas as pd

# # Load trained models
# fert_model = joblib.load("trained_models/fertilizer_model.joblib")
# pest_model = joblib.load("trained_models/pesticide_model.joblib")

# # --- Define a function to predict fertilizer & pesticide usage ---
# def predict_usage(crop, region, season, temperature, humidity, soil_ph, soil_moisture, fertilizer_name, pesticide_name):
#     # Prepare data for each model
#     fert_input = pd.DataFrame([{
#         "Crop": crop,
#         "Region": region,
#         "Season": season,
#         "Temperature_C": temperature,
#         "Humidity_%": humidity,
#         "Soil_pH": soil_ph,
#         "Soil_Moisture_%": soil_moisture,
#         "Fertilizer_Name": fertilizer_name
#     }])

#     pest_input = pd.DataFrame([{
#         "Crop": crop,
#         "Region": region,
#         "Season": season,
#         "Temperature_C": temperature,
#         "Humidity_%": humidity,
#         "Soil_pH": soil_ph,
#         "Soil_Moisture_%": soil_moisture,
#         "Pesticide_Name": pesticide_name
#     }])

#     # Predict
#     fert_pred = fert_model.predict(fert_input)[0]
#     pest_pred = pest_model.predict(pest_input)[0]

#     return {
#         "Fertilizer_Name": fertilizer_name,
#         "Predicted_Fertilizer_Amount_kg_per_acre": round(fert_pred, 2),
#         "Pesticide_Name": pesticide_name,
#         "Predicted_Pesticide_Amount_kg_per_acre": round(pest_pred, 3)
#     }

# # --- Example Usage ---
# if __name__ == "__main__":
#     print("🌾 Fertilizer & Pesticide Prediction System 🌱\n")

#     # Example input (you can replace these dynamically)
#     crop = "Rice"
#     region = "Odisha"
#     season = "Kharif"
#     temperature = 30.0
#     humidity = 80.0
#     soil_ph = 6.2
#     soil_moisture = 55.0
#     fertilizer_name = "Urea"
#     pesticide_name = "Chlorpyrifos"

#     result = predict_usage(crop, region, season, temperature, humidity, soil_ph, soil_moisture, fertilizer_name, pesticide_name)
#     print("Prediction Results:")
#     print(result)






# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import pandas as pd
# import datetime
# import json
# import os

# app = Flask(__name__)
# CORS(app)

# # Load trained models
# fert_model = joblib.load("trained_models/fertilizer_model.joblib")
# pest_model = joblib.load("trained_models/pesticide_model.joblib")

# # File to store saved plans
# SAVED_PLANS_FILE = "saved_plans.json"
# if not os.path.exists(SAVED_PLANS_FILE):
#     with open(SAVED_PLANS_FILE, "w") as f:
#         json.dump([], f)

# # =========================
# #   AI Prediction Function
# # =========================
# def generate_predictions(temperature, humidity, moisture, soil, crop):
#     # Basic mappings for realistic fertilizer/pesticide names
#     crop_to_fert = {
#         "Rice": "Urea", "Wheat": "NPK", "Maize": "DAP", "Sugarcane": "Urea",
#         "Cotton": "Potash", "Mustard": "SSP", "Groundnut": "Compost",
#         "Pulses": "DAP", "Potato": "MOP", "Tomato": "NPK", "Paddy": "Urea"
#     }
#     crop_to_pest = {
#         "Rice": "Chlorpyrifos", "Wheat": "Mancozeb", "Maize": "Lambda-Cyhalothrin",
#         "Sugarcane": "Malathion", "Cotton": "Acephate", "Mustard": "Carbendazim",
#         "Groundnut": "Dimethoate", "Pulses": "Thiamethoxam", "Potato": "Cartap Hydrochloride",
#         "Tomato": "Imidacloprid", "Paddy": "Chlorpyrifos"
#     }

#     fert_name = crop_to_fert.get(crop, "Urea")
#     pest_name = crop_to_pest.get(crop, "Imidacloprid")

#     # Prepare fertilizer and pesticide input dataframes
#     fert_input = pd.DataFrame([{
#         "Crop": crop,
#         "Region": "Odisha",  # default for now
#         "Season": "Kharif",
#         "Temperature_C": temperature,
#         "Humidity_%": humidity,
#         "Soil_pH": 6.5,
#         "Soil_Moisture_%": moisture,
#         "Fertilizer_Name": fert_name
#     }])
#     pest_input = pd.DataFrame([{
#         "Crop": crop,
#         "Region": "Odisha",
#         "Season": "Kharif",
#         "Temperature_C": temperature,
#         "Humidity_%": humidity,
#         "Soil_pH": 6.5,
#         "Soil_Moisture_%": moisture,
#         "Pesticide_Name": pest_name
#     }])

#     fert_pred = fert_model.predict(fert_input)[0]
#     pest_pred = pest_model.predict(pest_input)[0]

#     return {
#         "fertilizer": {
#             "predicted_fertilizer": f"{fert_name} ({fert_pred:.2f} kg/acre)"
#         },
#         "pesticide": {
#             "predicted_pesticide": f"{pest_name} ({pest_pred:.2f} kg/acre)"
#         },
#         "fert_name": fert_name,
#         "pest_name": pest_name,
#         "fert_amount": round(fert_pred, 2),
#         "pest_amount": round(pest_pred, 2)
#     }

# # =========================
# #   Smart Schedule Generator
# # =========================
# def generate_schedule(fertilizer_name, fert_amount, pesticide_name, pest_amount):
#     base_date = datetime.date.today()
#     schedule = []

#     for i in range(10):
#         date = base_date + datetime.timedelta(days=i)
#         actions = []

#         if i == 0:
#             actions.append({
#                 "kind": "Fertilizer",
#                 "action": f"Apply {fertilizer_name}",
#                 "note": f"Use {fert_amount/2:.1f} kg/acre initially for base nutrition."
#             })
#         elif i == 3:
#             actions.append({
#                 "kind": "Pesticide",
#                 "action": f"Spray {pesticide_name}",
#                 "note": f"Use {pest_amount:.2f} kg/acre for pest control."
#             })
#         elif i == 5:
#             actions.append({
#                 "kind": "Fertilizer",
#                 "action": f"Apply {fertilizer_name}",
#                 "note": f"Use remaining {fert_amount/2:.1f} kg/acre for top dressing."
#             })
#         elif i in [2, 7]:
#             actions.append({
#                 "kind": "Irrigation",
#                 "action": "Ensure sufficient watering",
#                 "note": "Maintain soil moisture for best nutrient uptake."
#             })

#         if actions:
#             schedule.append({
#                 "date": str(date),
#                 "actions": actions
#             })

#     return schedule


# # =========================
# #   API ROUTES
# # =========================
# @app.route("/generate_plan", methods=["POST"])
# def generate_plan():
#     data = request.get_json()
#     temperature = data.get("temperature")
#     humidity = data.get("humidity")
#     moisture = data.get("moisture")
#     soil = data.get("soil")
#     crop = data.get("crop")

#     if not all([temperature, humidity, moisture, soil, crop]):
#         return jsonify({"error": "Missing required input fields."}), 400

#     prediction = generate_predictions(temperature, humidity, moisture, soil, crop)
#     schedule = generate_schedule(
#         prediction["fert_name"], prediction["fert_amount"],
#         prediction["pest_name"], prediction["pest_amount"]
#     )

#     result = {
#         **prediction,
#         "merged_schedule": schedule
#     }

#     return jsonify(result)


# @app.route("/save_plan", methods=["POST"])
# def save_plan():
#     plan = request.get_json()
#     with open(SAVED_PLANS_FILE, "r+") as f:
#         plans = json.load(f)
#         plan["id"] = len(plans) + 1
#         plans.append(plan)
#         f.seek(0)
#         json.dump(plans, f, indent=2)
#     return jsonify({"message": "Plan saved successfully."})


# @app.route("/get_plans", methods=["GET"])
# def get_plans():
#     with open(SAVED_PLANS_FILE, "r") as f:
#         return jsonify(json.load(f))


# @app.route("/delete_plan/<int:plan_id>", methods=["DELETE"])
# def delete_plan(plan_id):
#     with open(SAVED_PLANS_FILE, "r+") as f:
#         plans = json.load(f)
#         plans = [p for p in plans if p.get("id") != plan_id]
#         f.seek(0)
#         f.truncate()
#         json.dump(plans, f, indent=2)
#     return jsonify({"message": "Deleted successfully"})


# if __name__ == "__main__":
#     app.run(port=5002, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import datetime
import random

app = Flask(__name__)
CORS(app)

# ==============================
# Load Trained ML Models
# ==============================
fert_model = joblib.load("trained_models/fertilizer_model.joblib")
pest_model = joblib.load("trained_models/pesticide_model.joblib")


# ==============================
# Crop-wise Fertilizer/Pesticide Mapping
# ==============================
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


# ==============================
# Predict Fertilizer & Pesticide
# ==============================
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


# ==============================
# Generate Full 10-Day Smart Plan
# ==============================
def generate_10day_schedule(fertilizer_name, fert_amount, pesticide_name, pest_amount):
    base_date = datetime.date.today()
    schedule = []

    # Distribute fertilizer and pesticide applications logically
    fert_half = round(fert_amount / 2, 2)
    pest_half = round(pest_amount / 2, 2)

    for i in range(10):
        date = base_date + datetime.timedelta(days=i)
        actions = []

        # Logical scheduling pattern
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


# ==============================
# Flask API Endpoint
# ==============================
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
