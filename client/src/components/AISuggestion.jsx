

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Snav from "./sidenav";
import { FaSeedling, FaCloudSun, FaWater, FaThermometerHalf, FaLeaf } from "react-icons/fa";

export default function AISuggestion() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soil: "",
    crop: "",
    city: "",
    mode: "auto",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const WEATHER_API = "5b966ddef50370f78a15f7f0f8544ea6";

  // 🌍 AUTO FETCH
  useEffect(() => {
    if (form.mode !== "auto") return;

    const fetchAutoData = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const locRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const locData = await locRes.json();
            if (!locData || !locData.city) throw new Error("Unable to get city info");

            const city = locData.city || locData.locality || "Unknown";
            const weatherRes = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
            );
            const weatherData = await weatherRes.json();
            if (!weatherData || !weatherData.main) throw new Error("Weather unavailable");

            const soilPh = await fetchSoilPh(latitude, longitude);

            setForm((prev) => ({
              ...prev,
              city: city,
              temperature: weatherData.main?.temp,
              humidity: weatherData.main?.humidity,
              moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
              soil: soilPh,
            }));
          } catch (err) {
            console.error(err);
            setError(`⚠️ ${err.message}`);
          }
        },
        () => setError("❌ Geolocation access denied or unavailable.")
      );
    };
    fetchAutoData();
  }, [form.mode]);

  const fetchSoilPh = () => 6.5;

  // MANUAL FETCH
  const fetchManualData = async () => {
    if (!form.city) return setError("Please enter a city");

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${form.city}&limit=1&appid=${WEATHER_API}`
      );
      const geoData = await geoRes.json();

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=metric&appid=${WEATHER_API}`
      );
      const weatherData = await weatherRes.json();

      setForm((prev) => ({
        ...prev,
        temperature: weatherData.main?.temp,
        humidity: weatherData.main?.humidity,
        moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
      }));
    } catch {
      setError("❌ Failed to fetch weather data.");
    }
  };

  // AI Suggestion
  const getAISuggestion = async () => {
    try {
      const payload = {
        ph: parseFloat(form.soil) || 6.5,
        soil_moisture: form.moisture || 30,
        temperature: form.temperature || 25,
        humidity: form.humidity || 60,
      };

      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server Error");
      const data = await res.json();
      if (data.status !== "success") throw new Error("Invalid server response");

      setResult(data.ai_recommendation);
      setShowModal(true);
    } catch (e) {
      setError(`AI server error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.temperature || !form.humidity || !form.moisture || !form.soil)
      return setError("❌ Please fill all fields.");

    setError("");
    setLoading(true);
    getAISuggestion();
  };

  return (
    <>
      

      <div
        className="d-flex align-items-center justify-content-center min-vh-100 px-3"
        style={{
          background: "linear-gradient(135deg, #f3f8f2, #e0f2e9)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Card
          className="shadow-lg border-0 fade-in"
          style={{
            width: "100%",
            maxWidth: "700px",
            borderRadius: "20px",
            background: "#ffffff",
          }}
        >
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <FaSeedling size={45} color="#2E7D32" className="mb-3 animate-pulse" />
              <h3 className="fw-bold text-success">🌾 Smart Farm AI Advisor</h3>
              <p className="text-muted small">
                Get instant AI-powered suggestions for fertilizer, irrigation & crop care
              </p>
            </div>

            <Form onSubmit={handleSubmit} className="text-center">
              {/* Mode Selection */}
              <div className="d-flex justify-content-center mb-4">
                <Form.Check
                  inline
                  label="Auto Mode"
                  type="radio"
                  checked={form.mode === "auto"}
                  onChange={() => setForm({ ...form, mode: "auto" })}
                />
                <Form.Check
                  inline
                  label="Manual Mode"
                  type="radio"
                  checked={form.mode === "manual"}
                  onChange={() => setForm({ ...form, mode: "manual" })}
                />
              </div>

              {/* City Input */}
              {form.mode === "manual" && (
                <div className="d-flex flex-column align-items-center mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="rounded-pill text-center shadow-sm w-75 mb-2"
                  />
                  <Button variant="outline-success" onClick={fetchManualData} size="sm">
                    Fetch Weather
                  </Button>
                </div>
              )}

              {/* Input Fields */}
              <div className="row g-3 justify-content-center align-items-center text-start">
                <div className="col-md-6">
                  <Form.Group controlId="temperature">
                    <Form.Label className="fw-semibold">
                      <FaThermometerHalf className="me-2 text-danger" /> Temperature (°C)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={form.temperature}
                      onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                      className="shadow-sm rounded-pill text-center"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="humidity">
                    <Form.Label className="fw-semibold">
                      <FaWater className="me-2 text-primary" /> Humidity (%)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={form.humidity}
                      onChange={(e) => setForm({ ...form, humidity: e.target.value })}
                      className="shadow-sm rounded-pill text-center"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="moisture">
                    <Form.Label className="fw-semibold">
                      <FaCloudSun className="me-2 text-info" /> Soil Moisture (%)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={form.moisture}
                      onChange={(e) => setForm({ ...form, moisture: e.target.value })}
                      className="shadow-sm rounded-pill text-center"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="soil">
                    <Form.Label className="fw-semibold">
                      <FaLeaf className="me-2 text-success" /> Soil pH
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={form.soil}
                      onChange={(e) => setForm({ ...form, soil: e.target.value })}
                      className="shadow-sm rounded-pill text-center"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="text-center mt-4">
                <Button
                  variant="success"
                  type="submit"
                  className="px-5 py-2 fw-bold rounded-pill shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Analyzing...
                    </>
                  ) : (
                    "🧠 Get AI Suggestion"
                  )}
                </Button>
              </div>

              {error && (
                <div className="alert alert-danger mt-3 fw-semibold small text-center">
                  {error}
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ background: "linear-gradient(90deg, #43A047, #66BB6A)", color: "white" }}
        >
          <Modal.Title>🌿 AI Farm Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F9FFF9" }}>
          {result ? (
            <div className="p-2">
              <p><b>🌱 Best Crop:</b> {result.best_crop}</p>
              <p><b>🌾 Fertilizer:</b> {result.fertilizer.name} ({result.fertilizer.amount_kg_per_acre} kg/acre)</p>
              <p><b>🛡 Pesticide:</b> {result.pesticide.name} ({result.pesticide.amount_kg_per_acre} kg/acre)</p>
              <p><b>💧 Irrigation:</b> {result.irrigation.message}</p>
              <p><b>♻ Sustainability Tip:</b> {result.sustainability_tip}</p>
            </div>
          ) : (
            <p className="text-center text-muted">No data available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(15px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        input, select {
          min-height: 45px;
        }
      `}</style>
    </>
  );
}
