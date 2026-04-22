

import React, { useState } from "react";
import "./FertilizerAdvisor.css";
import Snav from "./sidenav";
import { FaSeedling, FaSyncAlt, FaFlask, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

const initialForm = {
  temperature: "",
  humidity: "",
  moisture: "",
  soil: "",
  crop: "",
  city: "",
  mode: "manual",
};

export default function FertilizerAdvisor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  const fetchWeatherAuto = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (data.main) {
          setForm((prev) => ({
            ...prev,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            moisture: (data.main.humidity * 0.5).toFixed(1),
            city: data.name,
          }));
          setError("");
        } else setError("Unable to fetch location weather");
      } catch {
        setError("Error fetching weather.");
      }
    });
  };

  const fetchWeatherManual = async () => {
    if (!form.city) return setError("Enter city name first");
    const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.main) {
        setForm((prev) => ({
          ...prev,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          moisture: (data.main.humidity * 0.5).toFixed(1),
        }));
        setError("");
      } else setError("City not found");
    } catch {
      setError("Error fetching weather");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = ["temperature", "humidity", "moisture", "soil", "crop"];
    for (let f of required) if (!form[f]) return setError(`Please provide ${f}`);
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedMsg("");
    if (!validate()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const flaskRes = await fetch("http://127.0.0.1:5002/predict_plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temperature: Number(form.temperature),
          humidity: Number(form.humidity),
          moisture: Number(form.moisture),
          soil: form.soil,
          crop: form.crop,
        }),
      });
      const data = await flaskRes.json();
      if (data.error) throw new Error(data.error);
      setResult(data);

      const user_id = localStorage.getItem("id");
      if (user_id) {
        const saveRes = await fetch("http://localhost:1000/save_plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id,
            city: form.city,
            temperature: form.temperature,
            humidity: form.humidity,
            moisture: form.moisture,
            soil: form.soil,
            crop: form.crop,
            fertilizer: {
              name: data.fertilizer.name,
              amount_kg_per_acre: data.fertilizer.amount_kg_per_acre,
              type: "Primary",
              note: "Recommended by ML model",
            },
            pesticide: {
              name: data.pesticide.name,
              amount_kg_per_acre: data.pesticide.amount_kg_per_acre,
              type: "Preventive",
              note: "AI generated pest control plan",
            },
            plan: data.plan,
          }),
        });
        const saveData = await saveRes.json();
        if (saveData.success) setSavedMsg("✅ Plan saved successfully!");
        else setError(saveData.error || "Failed to save plan");
      } else {
        setSavedMsg("⚠️ Login required to save plan!");
      }
    } catch (err) {
      console.error(err);
      setError("Error generating plan.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
    setSavedMsg("");
  };

  return (
    <>
      
      <div className="fa-page">
        <header className="fa-header">
          <h1 className="natural-title">
            <FaLeaf className="icon" /> Smart Farm Fertilizer Advisor
          </h1>
          <p className="sub">Sustainable • Data-Driven • Nature Inspired</p>
        </header>

        <div className="fa-grid">
          
          <form className="fa-card form fade-in" onSubmit={handleSubmit}>
            <h2>🌿 Enter Farm Details</h2>
            {error && <div className="error">{error}</div>}
            {savedMsg && <div className="success">{savedMsg}</div>}

            <div className="mode-toggle">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="manual"
                  checked={form.mode === "manual"}
                  onChange={handleChange}
                />{" "}
                Manual
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="auto"
                  checked={form.mode === "auto"}
                  onChange={(e) => {
                    setForm({ ...form, mode: e.target.value });
                    if (e.target.value === "auto") fetchWeatherAuto();
                  }}
                />{" "}
                Auto
              </label>
            </div>

            {form.mode === "manual" && (
              <div className="row">
                <label><FaMapMarkerAlt /> City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
                <button type="button" className="btn mini" onClick={fetchWeatherManual}>
                  <FaSyncAlt /> Fetch Weather
                </button>
              </div>
            )}

            <div className="row">
              <label>🌡 Temperature (°C)</label>
              <input name="temperature" type="number" value={form.temperature} onChange={handleChange} />
              <label>💧 Humidity (%)</label>
              <input name="humidity" type="number" value={form.humidity} onChange={handleChange} />
            </div>

            <div className="row">
              <label>🌱 Moisture (%)</label>
              <input name="moisture" type="number" value={form.moisture} onChange={handleChange} />
              <label>🧪 Soil Type</label>
              <select name="soil" value={form.soil} onChange={handleChange}>
                <option value="">-- Select --</option>
                <option>Loamy</option>
                <option>Clay</option>
                <option>Sandy</option>
                <option>Silty</option>
                <option>Peaty</option>
                <option>Chalky</option>
              </select>
            </div>

            <div className="row">
              <label>🌾 Crop</label>
              <select name="crop" value={form.crop} onChange={handleChange}>
                <option value="">-- Select --</option>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Maize</option>
                <option>Sugarcane</option>
                <option>Paddy</option>
                <option>Tomato</option>
                <option>Potato</option>
                <option>Pulses</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? "Analyzing..." : "🌾 Generate Plan"}
              </button>
              <button type="button" className="btn ghost" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>

          <div className="fa-card preview fade-in">
            <h2>🌻 AI Recommendations</h2>
            {!result && <p className="muted">Enter inputs to see your personalized plan.</p>}

            {result && (
              <>
                <div className="summary">
                  <div className="card mini">
                    <h4>Fertilizer</h4>
                    <div className="big">
                      {result.fertilizer?.name} — {result.fertilizer?.amount_kg_per_acre} kg/acre
                    </div>
                  </div>
                  <div className="card mini">
                    <h4>Pesticide</h4>
                    <div className="big">
                      {result.pesticide?.name} — {result.pesticide?.amount_kg_per_acre} kg/acre
                    </div>
                  </div>
                </div>

                <div className="merged-schedule scrollable">
                  <h4>🌤 Smart 10-Day Schedule</h4>
                  {result.plan.map((day, i) => (
                    <div key={i} className="table-row slide-up">
                      <div className="date">{day.date}</div>
                      <div className="actions">
                        {day.actions.map((a, j) => (
                          <div key={j} className={`action-pill ${a.kind.toLowerCase()}`}>
                            <strong>{a.kind}</strong>: {a.action}
                            <div className="note">{a.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}





