

import React, { useEffect, useState } from "react";
import Snav from "./sidenav";
import { motion, AnimatePresence } from "framer-motion";

function IrrigationPlanner() {
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setForecast(data.forecast || []);
        } catch (error) {
          console.error("Error fetching forecast:", error);
        }
      },
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  
  const getWeatherIcon = (weather) => {
    const condition = weather?.toLowerCase() || "";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("sun") || condition.includes("clear")) return "☀️";
    if (condition.includes("storm")) return "⛈️";
    if (condition.includes("wind")) return "💨";
    if (condition.includes("snow")) return "❄️";
    return "🌤️";
  };

  
  const getBackground = (weather) => {
    if (!weather) return "linear-gradient(160deg, #f3f8ee 0%, #e9f5dc 100%)";
    if (weather.includes("rain"))
      return "linear-gradient(160deg, #a2c4fc 0%, #d9e9ff 100%)";
    if (weather.includes("cloud"))
      return "linear-gradient(160deg, #cfd8dc 0%, #e0e0e0 100%)";
    if (weather.includes("sun") || weather.includes("clear"))
      return "linear-gradient(160deg, #fff9c4 0%, #fffde7 100%)";
    return "linear-gradient(160deg, #f3f8ee 0%, #e9f5dc 100%)";
  };

  
  const getIrrigationTip = (weather) => {
    const condition = weather?.toLowerCase() || "";
    if (condition.includes("rain"))
      return "🌧️ Rain expected — reduce watering or pause irrigation today.";
    if (condition.includes("cloud"))
      return "☁️ Cloudy skies — maintain moderate irrigation.";
    if (condition.includes("sun") || condition.includes("clear"))
      return "☀️ Sunny and dry — increase irrigation by 20%.";
    if (condition.includes("storm"))
      return "⛈️ Stormy conditions — avoid irrigation to prevent overwatering.";
    if (condition.includes("wind"))
      return "💨 Windy — irrigate in early morning or evening to reduce evaporation.";
    return "🌿 Maintain balanced irrigation as per soil moisture.";
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: getBackground(forecast[0]?.weather),
          fontFamily: "Poppins, sans-serif",
          padding: "40px 20px",
          transition: "background 0.5s ease",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "30px",
            letterSpacing: "1px",
          }}
        >
          💧 Smart Irrigation Planner — 15-Day Weather Forecast
        </h1>

        {forecast.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginTop: "50px",
            }}
          >
            Fetching your local forecast... 🌍
          </p>
        ) : (
          <>
            
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "20px",
                padding: "10px 10px 30px",
                scrollbarWidth: "thin",
              }}
            >
              {forecast.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    minWidth: "200px",
                    flexShrink: 0,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "18px",
                    padding: "20px",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onClick={() => setSelectedDay(day)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 25px rgba(0,0,0,0.15)";
                  }}
                >
                  <div style={{ fontSize: "45px", animation: "float 2s infinite" }}>
                    {getWeatherIcon(day.weather || day.recommendation)}
                  </div>
                  <div style={{ fontWeight: "600", marginTop: "10px" }}>{day.date}</div>
                  <div style={{ fontSize: "14px", margin: "5px 0" }}>
                    🌡️ {day.temperature}°C
                  </div>
                  <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
                  <div style={{ fontSize: "14px" }}>💧 {day.predictedMoisture}%</div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontWeight: "500",
                      color: day.recommendation?.includes("🟢")
                        ? "#81c784"
                        : day.recommendation?.includes("🟡")
                        ? "#fbc02d"
                        : "#e57373",
                    }}
                  >
                    {day.recommendation}
                  </div>
                </motion.div>
              ))}
            </div>

          
            <h2
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "20px",
                fontSize: "1.6rem",
                fontWeight: "600",
              }}
            >
              🌿 Upcoming 6-Day Irrigation Insights
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              {forecast.slice(0, 6).map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "25px",
                    textAlign: "center",
                    boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setSelectedDay(day)}
                >
                  <div style={{ fontSize: "50px", animation: "float 2s infinite" }}>
                    {getWeatherIcon(day.weather || day.recommendation)}
                  </div>
                  <h3 style={{ fontWeight: "600", fontSize: "1rem", marginTop: "8px" }}>
                    {day.date}
                  </h3>
                  <p style={{ margin: "6px 0", fontSize: "14px" }}>
                    🌡️ {day.temperature}°C
                  </p>
                  <p style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</p>
                  <p style={{ fontSize: "14px" }}>💧 {day.predictedMoisture}%</p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#2d6a4f",
                      marginTop: "8px",
                      background: "rgba(255,255,255,0.5)",
                      padding: "5px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    {getIrrigationTip(day.weather || day.recommendation)}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
              onClick={() => setSelectedDay(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#ffffff",
                  padding: "30px",
                  borderRadius: "20px",
                  maxWidth: "420px",
                  width: "90%",
                  textAlign: "center",
                  boxShadow: "0 8px 35px rgba(0,0,0,0.3)",
                }}
              >
                <h2>{selectedDay.date}</h2>
                <div style={{ fontSize: "55px", margin: "10px 0" }}>
                  {getWeatherIcon(selectedDay.weather || selectedDay.recommendation)}
                </div>
                <p>🌡️ {selectedDay.temperature}°C</p>
                <p>🌧️ {selectedDay.rainfall} mm</p>
                <p>💧 {selectedDay.predictedMoisture}%</p>
                <p style={{ color: "#2d6a4f", marginTop: "10px" }}>
                  {getIrrigationTip(selectedDay.weather || selectedDay.recommendation)}
                </p>
                <button
                  onClick={() => setSelectedDay(null)}
                  style={{
                    marginTop: "15px",
                    padding: "8px 18px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#2D6A4F",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          ::-webkit-scrollbar {
            height: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
          }
          @media (max-width: 768px) {
            h1 { font-size: 1.5rem; }
            h2 { font-size: 1.2rem; }
          }
        `}</style>
      </div>
    </>
  );
}

export default IrrigationPlanner;
