# generate_indian_agri_dataset.py
import csv, random, math
random.seed(42)

n_samples = 8000
output_path = "indian_crop_fertilizer_pesticide_large.csv"

crops = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Mustard", "Groundnut", "Pulses"]
fertilizers = {
    "Rice": ["Urea", "DAP", "MOP"],
    "Wheat": ["Urea", "SSP", "NPK"],
    "Maize": ["Urea", "DAP", "Compost"],
    "Sugarcane": ["Urea", "NPK", "Potash"],
    "Cotton": ["NPK", "Compost", "Potash"],
    "Mustard": ["SSP", "Urea", "Compost"],
    "Groundnut": ["Compost", "Gypsum", "Urea"],
    "Pulses": ["Compost", "NPK", "DAP"]
}
pesticides = {
    "Rice": ["Cartap Hydrochloride", "Chlorpyrifos", "Imidacloprid"],
    "Wheat": ["Carbendazim", "Mancozeb", "Propiconazole"],
    "Maize": ["Lambda-Cyhalothrin", "Imidacloprid", "Chlorantraniliprole"],
    "Sugarcane": ["Chlorpyrifos", "Malathion", "Imidacloprid"],
    "Cotton": ["Acephate", "Buprofezin", "Imidacloprid"],
    "Mustard": ["Mancozeb", "Carbendazim", "Imidacloprid"],
    "Groundnut": ["Dimethoate", "Chlorpyrifos", "Carbendazim"],
    "Pulses": ["Thiamethoxam", "Mancozeb", "Imidacloprid"]
}
fert_base = {"Rice":150,"Wheat":120,"Maize":110,"Sugarcane":220,"Cotton":160,"Mustard":100,"Groundnut":90,"Pulses":80}
pest_base = {"Rice":2.8,"Wheat":1.8,"Maize":2.2,"Sugarcane":3.2,"Cotton":2.6,"Mustard":1.6,"Groundnut":1.9,"Pulses":1.5}
fert_type_multiplier = {"Urea":1.0,"DAP":0.95,"MOP":0.9,"NPK":1.05,"SSP":0.9,"Compost":0.6,"Potash":0.85,"Gypsum":0.5}
pest_type_multiplier = {"Cartap Hydrochloride":1.0,"Chlorpyrifos":1.05,"Imidacloprid":0.9,"Carbendazim":0.8,"Mancozeb":1.0,
                        "Propiconazole":0.95,"Lambda-Cyhalothrin":1.1,"Chlorantraniliprole":1.0,"Malathion":1.05,
                        "Acephate":1.0,"Buprofezin":0.85,"Dimethoate":1.0,"Thiamethoxam":0.95}
regions = ["Punjab","Uttar Pradesh","Maharashtra","Karnataka","Tamil Nadu","Bihar","Odisha","Rajasthan"]
seasons = ["Kharif","Rabi","Zaid"]

def clamp(x, a, b): return max(a, min(b, x))
def rand_normal(mean_v, std_v):
    # simple Box-Muller
    u1, u2 = random.random(), random.random()
    z0 = math.sqrt(-2.0 * math.log(max(u1,1e-12))) * math.cos(2*math.pi*u2)
    return mean_v + z0 * std_v

def compute_fertilizer_amount(base, temp, hum, ph, moisture, fert_name):
    moisture_effect = moisture * 0.35
    ph_penalty = -abs(ph - 6.5) * 6.0
    hum_effect = (hum - 60) * 0.18
    temp_effect = (temp - 25) * 0.25
    fmult = fert_type_multiplier.get(fert_name, 1.0)
    noise = rand_normal(0, 4)
    amount = (base + moisture_effect + ph_penalty + hum_effect + temp_effect) * fmult + noise
    return round(max(amount, 5.0), 2)

def compute_pesticide_amount(base, temp, hum, moisture, pest_name):
    hum_effect = max(0, (hum - 60) * 0.06)
    temp_effect = max(0, (temp - 24) * 0.05)
    moisture_effect = (moisture - 35) * 0.01
    p_mult = pest_type_multiplier.get(pest_name, 1.0)
    noise = rand_normal(0, 0.18)
    amount = (base + hum_effect + temp_effect + moisture_effect) * p_mult + noise
    return round(max(amount, 0.05), 3)

header = ["Crop","Region","Season","Temperature_C","Humidity_%","Soil_pH","Soil_Moisture_%",
          "Fertilizer_Name","Fertilizer_Amount_kg","Pesticide_Name","Pesticide_Amount_kg"]

with open(output_path, "w", newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(header)
    for i in range(n_samples):
        crop = random.choice(crops)
        temp = clamp(rand_normal(28,4), 18, 45)
        hum = clamp(rand_normal(70,12), 30, 100)
        ph = round(clamp(rand_normal(6.5,0.6), 4.5, 8.5), 2)
        moisture = round(clamp(rand_normal(40,12), 5, 90), 2)
        fert = random.choice(fertilizers[crop])
        pest = random.choice(pesticides[crop])
        fert_amt = compute_fertilizer_amount(fert_base[crop], temp, hum, ph, moisture, fert)
        pest_amt = compute_pesticide_amount(pest_base[crop], temp, hum, moisture, pest)
        region = random.choice(regions)
        season = random.choice(seasons)
        row = [crop, region, season, round(temp,2), round(hum,2), ph, moisture, fert, fert_amt, pest, pest_amt]
        writer.writerow(row)

print("Saved dataset to:", output_path)
print("Rows generated:", n_samples)
