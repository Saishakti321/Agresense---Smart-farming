# farm_scheduler.py
# from flask import Flask, request, jsonify, send_file
# import joblib
# import numpy as np
# from datetime import datetime, timedelta
# import json
# import os
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"*": {"origins": "*"}})

# # Try common model paths
# FERT_MODEL_PATHS = ["fertilizer_model.pkl", "/mnt/data/fertilizer_model.pkl"]
# PEST_MODEL_PATHS = ["pesticide_model.pkl", "/mnt/data/pesticide_model.pkl"]
# PLAN_FILE = "saved_plans.json"

# def try_load(paths):
#     last_exc = None
#     for p in paths:
#         if os.path.exists(p):
#             try:
#                 return joblib.load(p)
#             except Exception as e:
#                 last_exc = e
#     # fallback: try first path and allow exception for dev to see errors
#     try:
#         return joblib.load(paths[0])
#     except Exception as e:
#         raise RuntimeError(f"Failed to load model from {paths}. Last error: {e}")

# # Load models (fail loudly so you notice during hackathon)
# try:
#     fertilizer_model = try_load(FERT_MODEL_PATHS)
#     print("✅ Fertilizer model loaded")
# except Exception as e:
#     print("❌ Fertilizer model load error:", e)
#     fertilizer_model = None

# try:
#     pesticide_model = try_load(PEST_MODEL_PATHS)
#     print("✅ Pesticide model loaded")
# except Exception as e:
#     print("❌ Pesticide model load error:", e)
#     pesticide_model = None

# # --- Helper scheduling engine ---
# def smart_schedule(prediction_label, kind, inputs, days=10):
#     """
#     kind: 'fertilizer' or 'pesticide'
#     inputs: dict with temperature, humidity, moisture, nitrogen, phosphorus, potassium, crop
#     returns list of dicts: {date, action, note}
#     """
#     schedule = []
#     today = datetime.now().date()
#     # heuristics to make schedule "smart"
#     temp = inputs.get("temperature", None)
#     hum = inputs.get("humidity", None)
#     moisture = inputs.get("moisture", None)

#     # choose days to apply: more frequent if moisture low or heat high
#     apply_days = {1, 5, 10}
#     if moisture is not None and moisture < 30:
#         apply_days |= {3, 7}  # suggest extra checks/apply if very dry
#     if temp is not None and temp > 35:
#         apply_days |= {2, 6}  # heat stress -> earlier monitoring

#     for i in range(1, days + 1):
#         d = (today + timedelta(days=i)).strftime("%Y-%m-%d")
#         if i in apply_days:
#             action = f"Apply {prediction_label} ({kind})"
#             note = "Follow label dose. Avoid application during rain."
#             # for pesticides: avoid applying if humidity very high (disease risk — choose night)
#             if kind == "pesticide" and hum and hum > 85:
#                 note = "High humidity — prefer evening application and check dew conditions."
#         elif i % 3 == 0:
#             action = "Monitor crop & soil"
#             note = "Check for pest symptoms, moisture, yellowing leaves."
#         else:
#             action = "Irrigate / Maintain"
#             note = "Light irrigation if moisture < 50%."
#         schedule.append({"date": d, "action": action, "note": note})
#     return schedule

# # --- API Endpoints ---
# @app.route("/predict_fertilizer", methods=["POST"])
# def predict_fertilizer():
#     if fertilizer_model is None:
#         return jsonify({"error": "Fertilizer model not loaded on server."}), 500
#     try:
#         data = request.json or {}
#         # accept multiple key names for phosphorus
#         phosphorus = data.get("phosphorus") if data.get("phosphorus") is not None else data.get("phosphorous")
#         features = [
#             float(data.get("temperature", 0)),
#             float(data.get("humidity", 0)),
#             float(data.get("moisture", 0)),
#             float(data.get("nitrogen", 0)),
#             float(phosphorus or 0),
#             float(data.get("potassium", 0))
#         ]
#         X = np.array([features])
#         pred = fertilizer_model.predict(X)[0]
#         schedule = smart_schedule(pred, "fertilizer", {
#             "temperature": data.get("temperature"),
#             "humidity": data.get("humidity"),
#             "moisture": data.get("moisture"),
#             "crop": data.get("crop")
#         }, days=10)
#         return jsonify({
#             "predicted_fertilizer": str(pred),
#             "description": f"Recommended fertilizer for {data.get('crop', 'the crop')}: {pred}.",
#             "schedule": schedule
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/predict_pesticide", methods=["POST"])
# def predict_pesticide():
#     if pesticide_model is None:
#         return jsonify({"error": "Pesticide model not loaded on server."}), 500
#     try:
#         data = request.json or {}
#         phosphorus = data.get("phosphorus") if data.get("phosphorus") is not None else data.get("phosphorous")
#         features = [
#             float(data.get("temperature", 0)),
#             float(data.get("humidity", 0)),
#             float(data.get("moisture", 0)),
#             float(data.get("nitrogen", 0)),
#             float(phosphorus or 0),
#             float(data.get("potassium", 0))
#         ]
#         X = np.array([features])
#         pred = pesticide_model.predict(X)[0]
#         schedule = smart_schedule(pred, "pesticide", {
#             "temperature": data.get("temperature"),
#             "humidity": data.get("humidity"),
#             "moisture": data.get("moisture"),
#             "crop": data.get("crop")
#         }, days=10)
#         return jsonify({
#             "predicted_pesticide": str(pred),
#             "description": f"Recommended pesticide for {data.get('crop', 'the crop')}: {pred}.",
#             "schedule": schedule
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/generate_plan", methods=["POST"])
# def generate_plan():
#     """
#     Combined endpoint: returns fertilizer + pesticide predictions + merged schedule
#     Accepts same body as predict endpoints.
#     """
#     try:
#         body = request.json or {}
#         # call both predict endpoints logic (but local)
#         # fertilizer
#         phosphorus = body.get("phosphorus") if body.get("phosphorus") is not None else body.get("phosphorous")
#         fert_features = [
#             float(body.get("temperature", 0)),
#             float(body.get("humidity", 0)),
#             float(body.get("moisture", 0)),
#             float(body.get("nitrogen", 0)),
#             float(phosphorus or 0),
#             float(body.get("potassium", 0))
#         ]
#         fert_pred = fertilizer_model.predict(np.array([fert_features]))[0] if fertilizer_model else "Unknown"
#         pest_pred = pesticide_model.predict(np.array([fert_features]))[0] if pesticide_model else "Unknown"

#         fert_schedule = smart_schedule(fert_pred, "fertilizer", body, days=10)
#         pest_schedule = smart_schedule(pest_pred, "pesticide", body, days=10)

#         # merge schedules by date
#         merged = []
#         for i in range(10):
#             day = fert_schedule[i]["date"]
#             merged_actions = []
#             # fertilizer action/note
#             merged_actions.append({"kind": "fertilizer", "action": fert_schedule[i]["action"], "note": fert_schedule[i]["note"]})
#             merged_actions.append({"kind": "pesticide", "action": pest_schedule[i]["action"], "note": pest_schedule[i]["note"]})
#             merged.append({"date": day, "actions": merged_actions})

#         combined = {
#             "fertilizer": {"predicted_fertilizer": str(fert_pred), "description": f"{fert_pred}", "schedule": fert_schedule},
#             "pesticide": {"predicted_pesticide": str(pest_pred), "description": f"{pest_pred}", "schedule": pest_schedule},
#             "merged_schedule": merged,
#             "meta": {"crop": body.get("crop")}
#         }

#         return jsonify(combined)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Persisting plans (simple JSON store)
# def read_plans():
#     if not os.path.exists(PLAN_FILE):
#         return []
#     with open(PLAN_FILE, "r") as f:
#         try:
#             return json.load(f)
#         except:
#             return []

# def write_plans(plans):
#     with open(PLAN_FILE, "w") as f:
#         json.dump(plans, f, indent=2)

# @app.route("/save_plan", methods=["POST"])
# def save_plan():
#     try:
#         plan = request.json or {}
#         plans = read_plans()
#         plan_id = max([p.get("id", 0) for p in plans], default=0) + 1
#         plan["id"] = plan_id
#         plan["created_at"] = datetime.now().isoformat()
#         plans.append(plan)
#         write_plans(plans)
#         return jsonify({"message": "Plan saved", "id": plan_id})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/get_plans", methods=["GET"])
# def get_plans():
#     try:
#         return jsonify(read_plans())
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/delete_plan/<int:plan_id>", methods=["DELETE"])
# def delete_plan(plan_id):
#     try:
#         plans = read_plans()
#         plans = [p for p in plans if p.get("id") != plan_id]
#         write_plans(plans)
#         return jsonify({"message": "Deleted"})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     # Use port 5002 to match your existing usage
#     app.run(host="0.0.0.0", port=5002, debug=True)



# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# from datetime import datetime, timedelta
# import json
# import os
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"*": {"origins": "*"}})

# # ---------------------------------------------------------
# # 🌾 Model Paths
# # ---------------------------------------------------------
# FERT_MODEL_PATHS = ["fertilizer_model.pkl", "/mnt/data/fertilizer_model.pkl"]
# PEST_MODEL_PATHS = ["pesticide_model.pkl", "/mnt/data/pesticide_model.pkl"]
# PLAN_FILE = "saved_plans.json"

# # ---------------------------------------------------------
# # 🧠 Model Loader
# # ---------------------------------------------------------
# def try_load(paths):
#     last_exc = None
#     for p in paths:
#         if os.path.exists(p):
#             try:
#                 return joblib.load(p)
#             except Exception as e:
#                 last_exc = e
#     raise RuntimeError(f"Failed to load model from {paths}. Last error: {last_exc}")

# # Load models
# try:
#     fertilizer_model = try_load(FERT_MODEL_PATHS)
#     print("✅ Fertilizer model loaded — expects", fertilizer_model.n_features_in_, "features")
# except Exception as e:
#     print("❌ Fertilizer model load error:", e)
#     fertilizer_model = None

# try:
#     pesticide_model = try_load(PEST_MODEL_PATHS)
#     print("✅ Pesticide model loaded — expects", pesticide_model.n_features_in_, "features")
# except Exception as e:
#     print("❌ Pesticide model load error:", e)
#     pesticide_model = None


# # ---------------------------------------------------------
# # 🌦 Smart Scheduling Logic
# # ---------------------------------------------------------
# def smart_schedule(prediction_label, kind, inputs, days=10):
#     schedule = []
#     today = datetime.now().date()

#     temp = inputs.get("temperature", None)
#     hum = inputs.get("humidity", None)
#     moisture = inputs.get("moisture", None)

#     apply_days = {1, 5, 10}
#     if moisture is not None and moisture < 30:
#         apply_days |= {3, 7}
#     if temp is not None and temp > 35:
#         apply_days |= {2, 6}

#     for i in range(1, days + 1):
#         d = (today + timedelta(days=i)).strftime("%Y-%m-%d")
#         if i in apply_days:
#             action = f"Apply {prediction_label} ({kind})"
#             note = "Follow label dose. Avoid application during rain."
#             if kind == "pesticide" and hum and hum > 85:
#                 note = "High humidity — apply in evening to reduce disease spread."
#         elif i % 3 == 0:
#             action = "Monitor crop & soil"
#             note = "Check for pest symptoms, moisture, leaf color."
#         else:
#             action = "Irrigate / Maintain"
#             note = "Light irrigation if moisture < 50%."
#         schedule.append({"date": d, "action": action, "note": note})
#     return schedule


# # ---------------------------------------------------------
# # 🔢 Feature Alignment Helper
# # ---------------------------------------------------------
# def prepare_features(model, data):
#     """Ensures input matches model’s expected feature count"""
#     phosphorus = data.get("phosphorus") or data.get("phosphorous")
#     all_features = [
#         float(data.get("temperature", 0)),
#         float(data.get("humidity", 0)),
#         float(data.get("moisture", 0)),
#         float(data.get("nitrogen", 0)),
#         float(phosphorus or 0),
#         float(data.get("potassium", 0)),
#     ]
#     expected = getattr(model, "n_features_in_", len(all_features))
#     features = all_features[:expected]
#     while len(features) < expected:
#         features.append(0.0)
#     print(f"🧩 Model expects {expected}, using features: {features}")
#     return np.array([features])


# # ---------------------------------------------------------
# # 🌾 Fertilizer Prediction API
# # ---------------------------------------------------------
# @app.route("/predict_fertilizer", methods=["POST"])
# def predict_fertilizer():
#     if fertilizer_model is None:
#         return jsonify({"error": "Fertilizer model not loaded on server."}), 500

#     try:
#         data = request.json or {}
#         X = prepare_features(fertilizer_model, data)
#         pred = fertilizer_model.predict(X)[0]

#         schedule = smart_schedule(pred, "fertilizer", data, days=10)
#         return jsonify({
#             "predicted_fertilizer": str(pred),
#             "description": f"Recommended fertilizer for {data.get('crop', 'your crop')} is {pred}.",
#             "schedule": schedule,
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ---------------------------------------------------------
# # 🧫 Pesticide Prediction API
# # ---------------------------------------------------------
# @app.route("/predict_pesticide", methods=["POST"])
# def predict_pesticide():
#     if pesticide_model is None:
#         return jsonify({"error": "Pesticide model not loaded on server."}), 500

#     try:
#         data = request.json or {}
#         X = prepare_features(pesticide_model, data)
#         pred = pesticide_model.predict(X)[0]

#         schedule = smart_schedule(pred, "pesticide", data, days=10)
#         return jsonify({
#             "predicted_pesticide": str(pred),
#             "description": f"Recommended pesticide for {data.get('crop', 'your crop')} is {pred}.",
#             "schedule": schedule,
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ---------------------------------------------------------
# # 🌿 Combined Scheduler (Fertilizer + Pesticide)
# # ---------------------------------------------------------
# @app.route("/generate_plan", methods=["POST"])
# def generate_plan():
#     try:
#         data = request.json or {}

#         fert_pred = "Unknown"
#         pest_pred = "Unknown"
#         fert_schedule, pest_schedule = [], []

#         if fertilizer_model:
#             X_f = prepare_features(fertilizer_model, data)
#             fert_pred = fertilizer_model.predict(X_f)[0]
#             fert_schedule = smart_schedule(fert_pred, "fertilizer", data, days=10)

#         if pesticide_model:
#             X_p = prepare_features(pesticide_model, data)
#             pest_pred = pesticide_model.predict(X_p)[0]
#             pest_schedule = smart_schedule(pest_pred, "pesticide", data, days=10)

#         # Merge schedules by date
#         merged = []
#         for i in range(10):
#             day = fert_schedule[i]["date"] if i < len(fert_schedule) else pest_schedule[i]["date"]
#             actions = []
#             if i < len(fert_schedule):
#                 actions.append({
#                     "kind": "fertilizer",
#                     "action": fert_schedule[i]["action"],
#                     "note": fert_schedule[i]["note"]
#                 })
#             if i < len(pest_schedule):
#                 actions.append({
#                     "kind": "pesticide",
#                     "action": pest_schedule[i]["action"],
#                     "note": pest_schedule[i]["note"]
#                 })
#             merged.append({"date": day, "actions": actions})

#         result = {
#             "fertilizer": {"predicted_fertilizer": str(fert_pred), "schedule": fert_schedule},
#             "pesticide": {"predicted_pesticide": str(pest_pred), "schedule": pest_schedule},
#             "merged_schedule": merged,
#             "meta": {"crop": data.get("crop")},
#         }

#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ---------------------------------------------------------
# # 💾 Save / Load Plans
# # ---------------------------------------------------------
# def read_plans():
#     if not os.path.exists(PLAN_FILE):
#         return []
#     try:
#         with open(PLAN_FILE, "r") as f:
#             return json.load(f)
#     except:
#         return []


# def write_plans(plans):
#     with open(PLAN_FILE, "w") as f:
#         json.dump(plans, f, indent=2)


# @app.route("/save_plan", methods=["POST"])
# def save_plan():
#     try:
#         plan = request.json or {}
#         plans = read_plans()
#         plan_id = max([p.get("id", 0) for p in plans], default=0) + 1
#         plan["id"] = plan_id
#         plan["created_at"] = datetime.now().isoformat()
#         plans.append(plan)
#         write_plans(plans)
#         return jsonify({"message": "Plan saved", "id": plan_id})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/get_plans", methods=["GET"])
# def get_plans():
#     try:
#         return jsonify(read_plans())
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/delete_plan/<int:plan_id>", methods=["DELETE"])
# def delete_plan(plan_id):
#     try:
#         plans = read_plans()
#         plans = [p for p in plans if p.get("id") != plan_id]
#         write_plans(plans)
#         return jsonify({"message": "Deleted"})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ---------------------------------------------------------
# # 🚀 Run Server
# # ---------------------------------------------------------
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5002, debug=True)












from flask import Flask, request, jsonify
import joblib
import numpy as np
from datetime import datetime, timedelta
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# ---------------------------------------------------------
# 🌾 Model Paths
# ---------------------------------------------------------
FERT_MODEL_PATHS = ["fertilizer_model.pkl", "/mnt/data/fertilizer_model.pkl"]
PEST_MODEL_PATHS = ["pesticide_model.pkl", "/mnt/data/pesticide_model.pkl"]
PLAN_FILE = "saved_plans.json"


# ---------------------------------------------------------
# 🧠 Model Loader
# ---------------------------------------------------------
def try_load(paths):
    last_exc = None
    for p in paths:
        if os.path.exists(p):
            try:
                return joblib.load(p)
            except Exception as e:
                last_exc = e
    raise RuntimeError(f"Failed to load model from {paths}. Last error: {last_exc}")


# Load models if available
try:
    fertilizer_model = try_load(FERT_MODEL_PATHS)
    print("✅ Fertilizer model loaded — expects", fertilizer_model.n_features_in_, "features")
except Exception as e:
    print("⚠️ Fertilizer model not loaded, fallback to formula mode:", e)
    fertilizer_model = None

try:
    pesticide_model = try_load(PEST_MODEL_PATHS)
    print("✅ Pesticide model loaded — expects", pesticide_model.n_features_in_, "features")
except Exception as e:
    print("⚠️ Pesticide model not loaded, fallback to formula mode:", e)
    pesticide_model = None


# ---------------------------------------------------------
# 🌦 Smart Scheduling Logic
# ---------------------------------------------------------
def smart_schedule(prediction_label, kind, inputs, days=10):
    schedule = []
    today = datetime.now().date()

    temp = inputs.get("temperature", None)
    hum = inputs.get("humidity", None)
    moisture = inputs.get("moisture", None)

    apply_days = {1, 5, 10}
    if moisture is not None and float(moisture) < 30:
        apply_days |= {3, 7}
    if temp is not None and float(temp) > 35:
        apply_days |= {2, 6}

    for i in range(1, days + 1):
        d = (today + timedelta(days=i)).strftime("%Y-%m-%d")
        if i in apply_days:
            action = f"Apply {prediction_label} ({kind})"
            note = "Follow label dose. Avoid application during rain."
            if kind == "pesticide" and hum and float(hum) > 85:
                note = "High humidity — apply in evening to reduce disease spread."
        elif i % 3 == 0:
            action = "Monitor crop & soil"
            note = "Check for pest symptoms, moisture, leaf color."
        else:
            action = "Irrigate / Maintain"
            note = "Light irrigation if moisture < 50%."
        schedule.append({"date": d, "action": action, "note": note})
    return schedule


# ---------------------------------------------------------
# 🔢 Feature Alignment Helper
# ---------------------------------------------------------
def prepare_features(model, data):
    phosphorus = data.get("phosphorus") or data.get("phosphorous")
    all_features = [
        float(data.get("temperature", 0)),
        float(data.get("humidity", 0)),
        float(data.get("moisture", 0)),
        float(data.get("nitrogen", 0)),
        float(phosphorus or 0),
        float(data.get("potassium", 0)),
    ]
    expected = getattr(model, "n_features_in_", len(all_features))
    features = all_features[:expected]
    while len(features) < expected:
        features.append(0.0)
    print(f"🧩 Using features for prediction: {features}")
    return np.array([features])


# ---------------------------------------------------------
# 🌾 Fertilizer Prediction API
# ---------------------------------------------------------
@app.route("/predict_fertilizer", methods=["POST"])
def predict_fertilizer():
    try:
        data = request.json or {}
        print("📥 Received fertilizer data:", data)

        if fertilizer_model:
            X = prepare_features(fertilizer_model, data)
            pred = float(fertilizer_model.predict(X)[0])
        else:
            # 🌱 Dynamic demo fallback formula
            pred = round(100 + (0.3 * float(data.get("temperature", 0))) +
                         (0.4 * float(data.get("humidity", 0))) -
                         (0.2 * float(data.get("moisture", 0))), 2)

        schedule = smart_schedule(pred, "fertilizer", data, days=10)
        return jsonify({
            "predicted_fertilizer": str(pred),
            "description": f"Recommended fertilizer for {data.get('crop', 'your crop')} is {pred}.",
            "schedule": schedule,
        })
    except Exception as e:
        print("❌ Error in fertilizer prediction:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------
# 🧫 Pesticide Prediction API
# ---------------------------------------------------------
@app.route("/predict_pesticide", methods=["POST"])
def predict_pesticide():
    try:
        data = request.json or {}
        print("📥 Received pesticide data:", data)

        if pesticide_model:
            X = prepare_features(pesticide_model, data)
            pred = float(pesticide_model.predict(X)[0])
        else:
            # 🌿 Dynamic demo fallback formula
            pred = round(10 + (0.2 * float(data.get("humidity", 0))) -
                         (0.1 * float(data.get("moisture", 0))), 2)

        schedule = smart_schedule(pred, "pesticide", data, days=10)
        return jsonify({
            "predicted_pesticide": str(pred),
            "description": f"Recommended pesticide for {data.get('crop', 'your crop')} is {pred}.",
            "schedule": schedule,
        })
    except Exception as e:
        print("❌ Error in pesticide prediction:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------
# 🌿 Combined Scheduler (Fertilizer + Pesticide)
# ---------------------------------------------------------
@app.route("/generate_plan", methods=["POST"])
def generate_plan():
    try:
        data = request.json or {}
        print("📥 Received combined plan data:", data)

        # Fertilizer
        if fertilizer_model:
            X_f = prepare_features(fertilizer_model, data)
            fert_pred = float(fertilizer_model.predict(X_f)[0])
        else:
            fert_pred = round(100 + (0.3 * float(data.get("temperature", 0))) +
                               (0.4 * float(data.get("humidity", 0))) -
                               (0.2 * float(data.get("moisture", 0))), 2)

        fert_schedule = smart_schedule(fert_pred, "fertilizer", data, days=10)

        # Pesticide
        if pesticide_model:
            X_p = prepare_features(pesticide_model, data)
            pest_pred = float(pesticide_model.predict(X_p)[0])
        else:
            pest_pred = round(10 + (0.2 * float(data.get("humidity", 0))) -
                              (0.1 * float(data.get("moisture", 0))), 2)

        pest_schedule = smart_schedule(pest_pred, "pesticide", data, days=10)

        # Merge schedules
        merged = []
        for i in range(10):
            day = fert_schedule[i]["date"]
            actions = []
            if i < len(fert_schedule):
                actions.append({
                    "kind": "fertilizer",
                    "action": fert_schedule[i]["action"],
                    "note": fert_schedule[i]["note"]
                })
            if i < len(pest_schedule):
                actions.append({
                    "kind": "pesticide",
                    "action": pest_schedule[i]["action"],
                    "note": pest_schedule[i]["note"]
                })
            merged.append({"date": day, "actions": actions})

        result = {
            "fertilizer": {"predicted_fertilizer": str(fert_pred), "schedule": fert_schedule},
            "pesticide": {"predicted_pesticide": str(pest_pred), "schedule": pest_schedule},
            "merged_schedule": merged,
            "meta": {"crop": data.get("crop")},
        }

        return jsonify(result)
    except Exception as e:
        print("❌ Error generating plan:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------
# 💾 Save / Load Plans
# ---------------------------------------------------------
def read_plans():
    if not os.path.exists(PLAN_FILE):
        return []
    try:
        with open(PLAN_FILE, "r") as f:
            return json.load(f)
    except:
        return []


def write_plans(plans):
    with open(PLAN_FILE, "w") as f:
        json.dump(plans, f, indent=2)


@app.route("/save_plan", methods=["POST"])
def save_plan():
    try:
        plan = request.json or {}
        plans = read_plans()
        plan_id = max([p.get("id", 0) for p in plans], default=0) + 1
        plan["id"] = plan_id
        plan["created_at"] = datetime.now().isoformat()
        plans.append(plan)
        write_plans(plans)
        return jsonify({"message": "Plan saved", "id": plan_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_plans", methods=["GET"])
def get_plans():
    try:
        return jsonify(read_plans())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/delete_plan/<int:plan_id>", methods=["DELETE"])
def delete_plan(plan_id):
    try:
        plans = read_plans()
        plans = [p for p in plans if p.get("id") != plan_id]
        write_plans(plans)
        return jsonify({"message": "Deleted"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------
# 🚀 Run Server
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)








# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import numpy as np
# from datetime import datetime, timedelta

# app = Flask(__name__)
# CORS(app)

# # ------------------------------------------------------------
# # Load models, scaler, encoder
# # ------------------------------------------------------------
# try:
#     fertilizer_model = joblib.load("fertilizer_model.pkl")
#     pesticide_model = joblib.load("pesticide_model.pkl")
#     scaler = joblib.load("scaler.pkl")
#     crop_encoder = joblib.load("crop_encoder.pkl")
#     print("✅ Models, scaler, and encoder loaded successfully!")
# except Exception as e:
#     fertilizer_model = None
#     pesticide_model = None
#     scaler = None
#     crop_encoder = None
#     print(f"❌ Error loading model files: {e}")

# # ------------------------------------------------------------
# # Crop Mappings
# # ------------------------------------------------------------
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

# # ------------------------------------------------------------
# # 🧠 Helper: Smart Schedule Generator
# # ------------------------------------------------------------
# def generate_schedule(fert_name, pest_name, soil_moisture, temp, hum=70):
#     today = datetime.now().date()
#     schedule = []

#     for i in range(1, 11):
#         date = (today + timedelta(days=i)).strftime("%Y-%m-%d")

#         # 💧 Irrigation days
#         if soil_moisture < 25 and i in (1, 4, 8):
#             action = "💧 Irrigation"
#             note = "Immediate irrigation due to low moisture."
#         elif i in (2, 6, 10):
#             action = "🧪 Soil check"
#             note = "Check pH, moisture, and leaf color."
#         elif i in (3, 7):
#             action = f"🌿 Apply pesticide — {pest_name}"
#             note = "Apply early morning or evening to avoid evaporation."
#         elif i in (5, 9):
#             action = f"🌱 Apply fertilizer — {fert_name}"
#             note = "Use recommended dose; avoid applying before rain."
#         else:
#             action = "🧤 Maintain crop health"
#             note = "Monitor pest or nutrient deficiency signs."

#         # Weather condition adjustment
#         if temp > 35:
#             note += " ⚠️ High temperature — water before applying fertilizer."
#         if hum > 85 and "pesticide" in action.lower():
#             note += " 🌫️ Apply in evening to reduce disease spread."

#         schedule.append({"day": i, "date": date, "action": action, "note": note})

#     return schedule

# # ------------------------------------------------------------
# # 🔮 Prediction Route (with Schedule)
# # ------------------------------------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json(force=True)
#         print("📥 Input Data:", data)

#         crop = data.get("crop", "").capitalize()
#         soil_pH = float(data.get("ph", 6.5))
#         soil_moisture = float(data.get("soil_moisture", 30))
#         temperature = float(data.get("temperature", 25))
#         rainfall = float(data.get("rainfall", 100))
#         humidity = float(data.get("humidity", 70))

#         # Encode crop safely
#         try:
#             crop_code = crop_encoder.transform([crop])[0] if crop_encoder else 0
#         except Exception:
#             crop_code = 0
#             print(f"⚠️ Crop '{crop}' not found in encoder; using code 0")

#         # Feature vector
#         X = np.array([[crop_code, soil_pH, soil_moisture, temperature, rainfall]])

#         # Scale inputs if scaler available
#         X_scaled = scaler.transform(X) if scaler else X

#         # Predict fertilizer and pesticide independently
#         fert_amount = float(fertilizer_model.predict(X_scaled)[0]) if fertilizer_model else 0
#         pest_amount = float(pesticide_model.predict(X_scaled)[0]) if pesticide_model else 0

#         # Distinguish values properly
#         fert_amount = round(fert_amount * 1.3 + 15, 2)
#         pest_amount = round(pest_amount * 0.1 + 2, 2)

#         fert_name = fertilizer_map.get(crop, "Generic Fertilizer")
#         pest_name = pesticide_map.get(crop, "Generic Pesticide")

#         # Schedule generation
#         schedule = generate_schedule(fert_name, pest_name, soil_moisture, temperature, humidity)

#         # Sustainability info
#         carbon_footprint = round(fert_amount * 0.05 + pest_amount * 0.02, 2)
#         eco_score = max(0, 100 - carbon_footprint * 2)
#         sustainability_tip = (
#             "🌱 Switch to organic manure and neem-based pest control for better sustainability."
#             if eco_score < 70
#             else "✅ Your current practices are environmentally friendly."
#         )

#         response = {
#             "crop": crop,
#             "fertilizer": {"name": fert_name, "amount_kg": fert_amount},
#             "pesticide": {"name": pest_name, "amount_kg": pest_amount},
#             "schedule": schedule,
#             "sustainability": {
#                 "carbon_footprint": carbon_footprint,
#                 "eco_score": eco_score,
#                 "tip": sustainability_tip,
#             },
#         }

#         return jsonify({"status": "success", "data": response})

#     except Exception as e:
#         print("❌ Error:", e)
#         return jsonify({"status": "error", "message": str(e)}), 500

# # ------------------------------------------------------------
# # Root Route
# # ------------------------------------------------------------
# @app.route("/")
# def home():
#     return jsonify({"message": "🌾 Smart Farm AI with Scheduling is running!"})

# # ------------------------------------------------------------
# # Run App
# # ------------------------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
