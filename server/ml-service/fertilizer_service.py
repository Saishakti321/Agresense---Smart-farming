

# from flask import Flask, request, jsonify
# import joblib, numpy as np, os
# from datetime import datetime, timedelta
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# BASE_DIR = os.path.dirname(__file__)
# def load_file(filename):
#     return joblib.load(os.path.join(BASE_DIR, filename))

# model = load_file("fertilizer_model.pkl")
# scaler = load_file("fertilizer_scaler.pkl")
# le_soil = load_file("le_soil.pkl")
# le_crop = load_file("le_crop.pkl")
# le_target = load_file("le_target.pkl")

# @app.route("/predict_fertilizer", methods=["POST"])
# def predict():
#     data = request.get_json()

#     try:
#         temperature = float(data["temperature"])
#         humidity = float(data["humidity"])
#         moisture = float(data["moisture"])
#         soil = data["soil"]
#         crop = data["crop"]
#         nitrogen = float(data["nitrogen"])
#         potassium = float(data["potassium"])
#         phosphorous = float(data["phosphorous"])
#     except KeyError:
#         return jsonify({"error": "Missing arguments"}), 400

#     soil_encoded = le_soil.transform([soil])[0] if soil in le_soil.classes_ else 0
#     crop_encoded = le_crop.transform([crop])[0] if crop in le_crop.classes_ else 0

#     X = np.array([[temperature, humidity, moisture, soil_encoded, crop_encoded, nitrogen, potassium, phosphorous]])
#     X_scaled = scaler.transform(X)
#     y_pred = model.predict(X_scaled)
#     fertilizer = le_target.inverse_transform(y_pred)[0]

#     today = datetime.today()
#     schedule = [{"date": (today + timedelta(days=i)).strftime("%Y-%m-%d"),
#                  "action": "Apply" if i % 3 == 0 else "Monitor"} for i in range(10)]

#     return jsonify({
#         "predicted_fertilizer": fertilizer,
#         "schedule": schedule
#     })

# if __name__ == "__main__":
#     app.run(port=5002, debug=True)


# from flask import Flask, request, jsonify
# import joblib, numpy as np, os
# from datetime import datetime, timedelta
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# BASE_DIR = os.path.dirname(__file__)
# def load_file(filename):
#     return joblib.load(os.path.join(BASE_DIR, filename))

# model = load_file("fertilizer_model.pkl")
# scaler = load_file("fertilizer_scaler.pkl")
# le_soil = load_file("le_soil.pkl")
# le_crop = load_file("le_crop.pkl")
# le_target = load_file("le_target.pkl")

# # 🌾 Fertilizer descriptions for farmers
# fertilizer_info = {
#     "17-17-17": "Balanced fertilizer with Nitrogen, Phosphorus, and Potassium — good for all crops and healthy plant growth.",
#     "Urea": "Rich in Nitrogen — helps crops grow faster and greener.",
#     "DAP": "Contains Phosphorus and Nitrogen — good for strong roots and early growth.",
#     "MOP": "Provides Potassium — improves fruit size, taste, and disease resistance.",
#     "10-26-26": "Best for flowering and fruiting stage — boosts yield and crop strength.",
#     "20-20": "Balanced fertilizer for vegetables, pulses, and cereals.",
#     "Ammonium Sulphate": "Improves soil nitrogen and provides sulfur for oilseed crops.",
# }

# @app.route("/predict_fertilizer", methods=["POST"])
# def predict():
#     data = request.get_json()

#     try:
#         # temperature = float(data["temperature"])
#         temparature = float(data["temperature"])
#         humidity = float(data["humidity"])
#         moisture = float(data["moisture"])
#         soil = data["soil"]
#         crop = data["crop"]
#         nitrogen = float(data["nitrogen"])
#         potassium = float(data["potassium"])
#         phosphorous = float(data["phosphorous"])
#     except KeyError:
#         return jsonify({"error": "Missing arguments"}), 400
#       # Normalize case (title case like training data)
#     soil = soil.strip().title()
#     crop = crop.strip().title()
#     soil_encoded = le_soil.transform([soil])[0] if soil in le_soil.classes_ else le_soil.transform([le_soil.classes_[0]])[0]
#     crop_encoded = le_crop.transform([crop])[0] if crop in le_crop.classes_ else le_crop.transform([le_crop.classes_[0]])[0]
#     print("Soil:", soil, "Encoded:", soil_encoded)
#     print("Crop:", crop, "Encoded:", crop_encoded)

#     # soil_encoded = le_soil.transform([soil])[0] if soil in le_soil.classes_ else 0
#     # crop_encoded = le_crop.transform([crop])[0] if crop in le_crop.classes_ else 0

#     X = np.array([[temperature, humidity, moisture, soil_encoded, crop_encoded, nitrogen, potassium, phosphorous]])

#     X_scaled = scaler.transform(X)
#     y_pred = model.predict(X_scaled)
#     fertilizer = le_target.inverse_transform(y_pred)[0]

#     # 🌱 Create simple 10-day plan
#     today = datetime.today()
#     schedule = [
#         {"date": (today + timedelta(days=i)).strftime("%Y-%m-%d"),
#          "action": "Apply fertilizer" if i % 3 == 0 else "Water and check plants"}
#         for i in range(10)
#     ]

#     # 🧑‍🌾 Farmer-friendly message
#     description = fertilizer_info.get(fertilizer, "This fertilizer supports healthy crop growth.")

#     return jsonify({
#         "predicted_fertilizer": fertilizer,
#         "description": description,
#         "schedule": schedule
#     })

# if __name__ == "__main__":
#     app.run(port=5002, debug=True)





































# from flask import Flask, request, jsonify
# import joblib, numpy as np, os
# from datetime import datetime, timedelta
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # 🧠 Base directory for loading models
# BASE_DIR = os.path.dirname(__file__)

# def load_file(filename):
#     return joblib.load(os.path.join(BASE_DIR, filename))

# # 🌾 Load models and encoders
# model = load_file("fertilizer_model.pkl")
# scaler = load_file("fertilizer_scaler.pkl")
# le_soil = load_file("le_soil.pkl")
# le_crop = load_file("le_crop.pkl")
# le_target = load_file("le_target.pkl")

# # 🌱 Fertilizer information for farmers
# fertilizer_info = {
#     "17-17-17": "Balanced fertilizer with Nitrogen, Phosphorus, and Potassium — good for all crops and healthy plant growth.",
#     "Urea": "Rich in Nitrogen — helps crops grow faster and greener.",
#     "DAP": "Contains Phosphorus and Nitrogen — good for strong roots and early growth.",
#     "MOP": "Provides Potassium — improves fruit size, taste, and disease resistance.",
#     "10-26-26": "Best for flowering and fruiting stage — boosts yield and crop strength.",
#     "20-20": "Balanced fertilizer for vegetables, pulses, and cereals.",
#     "Ammonium Sulphate": "Improves soil nitrogen and provides sulfur for oilseed crops."
# }

# @app.route("/predict_fertilizer", methods=["POST"])
# def predict_fertilizer():
#     data = request.get_json()

#     try:
#         # Extract and convert inputs
#         temperature = float(data["temperature"])
#         humidity = float(data["humidity"])
#         moisture = float(data["moisture"])
#         soil = data["soil"].strip().title()
#         crop = data["crop"].strip().title()
#         nitrogen = float(data["nitrogen"])
#         potassium = float(data["potassium"])
#         phosphorous = float(data["phosphorous"])
#     except (KeyError, ValueError):
#         return jsonify({"error": "Missing or invalid arguments"}), 400

#     # Encode soil and crop safely
#     soil_encoded = le_soil.transform([soil])[0] if soil in le_soil.classes_ else le_soil.transform([le_soil.classes_[0]])[0]
#     crop_encoded = le_crop.transform([crop])[0] if crop in le_crop.classes_ else le_crop.transform([le_crop.classes_[0]])[0]

#     # Prepare input array
#     X = np.array([[temperature, humidity, moisture, soil_encoded, crop_encoded, nitrogen, potassium, phosphorous]])

#     # Scale and predict
#     X_scaled = scaler.transform(X)
#     y_pred = model.predict(X_scaled)
#     fertilizer = le_target.inverse_transform(y_pred)[0]

#     # 🌿 10-day fertilizer schedule
#     today = datetime.today()
#     schedule = [
#         {
#             "date": (today + timedelta(days=i)).strftime("%Y-%m-%d"),
#             "action": "Apply fertilizer" if i % 3 == 0 else "Water and check plants"
#         }
#         for i in range(10)
#     ]

#     # 🧑‍🌾 Farmer-friendly output
#     description = fertilizer_info.get(fertilizer, "This fertilizer supports healthy crop growth.")

#     return jsonify({
#         "predicted_fertilizer": fertilizer,
#         "description": description,
#         "schedule": schedule
#     })

# if __name__ == "__main__":
#     app.run(port=5002, debug=True)




from flask import Flask, request, jsonify
import joblib, numpy as np, os
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 📁 Load model and encoders
BASE_DIR = os.path.dirname(__file__)
def load_file(filename):
    return joblib.load(os.path.join(BASE_DIR, filename))

model = load_file("fertilizer_model.pkl")
scaler = load_file("fertilizer_scaler.pkl")
le_soil = load_file("le_soil.pkl")
le_crop = load_file("le_crop.pkl")
le_target = load_file("le_target.pkl")

# 🌾 Fertilizer descriptions
fertilizer_info = {
    "17-17-17": "Balanced fertilizer with Nitrogen, Phosphorus, and Potassium — good for all crops.",
    "Urea": "Rich in Nitrogen — helps crops grow faster and greener.",
    "DAP": "Contains Phosphorus and Nitrogen — good for strong roots and early growth.",
    "MOP": "Provides Potassium — improves fruit size and disease resistance.",
    "10-26-26": "Best for flowering and fruiting stage — boosts yield and crop strength.",
    "20-20": "Balanced fertilizer for vegetables, pulses, and cereals.",
    "Ammonium Sulphate": "Improves soil nitrogen and provides sulfur for oilseed crops."
}

@app.route("/predict_fertilizer", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        moisture = float(data["moisture"])
        soil = data["soil"].strip().title()
        crop = data["crop"].strip().title()
        nitrogen = float(data["nitrogen"])
        potassium = float(data["potassium"])
        phosphorus = float(data["phosphorus"])
    except KeyError as e:
        return jsonify({"error": f"Missing argument: {str(e)}"}), 400

    # Encode soil and crop types
    soil_encoded = le_soil.transform([soil])[0] if soil in le_soil.classes_ else le_soil.transform([le_soil.classes_[0]])[0]
    crop_encoded = le_crop.transform([crop])[0] if crop in le_crop.classes_ else le_crop.transform([le_crop.classes_[0]])[0]

    # Prepare input
    X = np.array([[temperature, humidity, moisture, soil_encoded, crop_encoded, nitrogen, potassium, phosphorus]])
    X_scaled = scaler.transform(X)

    # Predict
    y_pred = model.predict(X_scaled)
    fertilizer = le_target.inverse_transform(y_pred)[0]

    # 🌱 Create 10-day recommendation plan
    today = datetime.today()
    schedule = [
        {"date": (today + timedelta(days=i)).strftime("%Y-%m-%d"),
         "action": "Apply fertilizer" if i % 3 == 0 else "Water and check plants"}
        for i in range(10)
    ]

    # 🧑‍🌾 Get description
    description = fertilizer_info.get(fertilizer, "This fertilizer supports healthy crop growth.")

    return jsonify({
        "predicted_fertilizer": fertilizer,
        "description": description,
        "schedule": schedule
    })

if __name__ == "__main__":
    app.run(port=5002, debug=True)
