



// import React, { useEffect, useState } from "react";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {
//     // Get user location automatically
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>🌾 Soil Moisture Forecast (Next 5 Days)</h2>

//       {forecast.length === 0 ? (
//         <p>Loading forecast...</p>
//       ) : (
//         forecast.map((day, i) => (
//           <div
//             key={i}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "10px",
//               marginBottom: "10px",
//               backgroundColor: "#f9f9f9",
//               color:"black"
//             }}
//           >
//             <h4>{day.date}</h4>
//             <p>🌡️ Temperature: {day.temperature}°C</p>
//             <p>🌧️ Rainfall: {day.rainfall} mm</p>
//             <p>💧 Predicted Moisture: {day.predictedMoisture}%</p>
//             <p>{day.recommendation}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default IrrigationPlanner;


// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           // ✅ Use backticks for template literals
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );

//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   return (
//     <>
    

//       <div
//         style={{
//           padding: "30px",
//           fontFamily: "Poppins, sans-serif",
//           color: "#333",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           🌾 15-Day Soil Moisture Forecast
//         </h2>

//         {forecast.length === 0 ? (
//           <p style={{ textAlign: "center" }}>Loading forecast...</p>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               position: "relative",
//               width: "100%",
//               overflowX: "auto",
//               paddingBottom: "20px",
//               scrollbarWidth: "thin",
//             }}
//           >
//             {/* Milestone Line */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50px",
//                 height: "4px",
//                 background:
//                   "linear-gradient(to right, #ff7b54, #ffd56b, #3dc2ec, #7b5cf0)",
//                 // ✅ use JS interpolation inside object, not ${} in string
//                 width: `${forecast.length * 160}px`,
//                 transform: "translateY(-50%)",
//                 zIndex: 0,
//               }}
//             ></div>

//             {/* Milestone Circles */}
//             {forecast.map((day, i) => (
//               <div
//                 key={i}
//                 style={{
//                   position: "relative",
//                   textAlign: "center",
//                   flexShrink: 0,
//                   width: "160px",
//                   marginRight: "20px",
//                   zIndex: 1,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     backgroundColor: day.recommendation.includes("🟢")
//                       ? "#3ed625"
//                       : day.recommendation.includes("🟡")
//                       ? "#ffcc00"
//                       : "#ff4b4b",
//                     border: "4px solid white",
//                     margin: "0 auto",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                   }}
//                 ></div>

//                 <div
//                   style={{
//                     marginTop: "10px",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {day.date}
//                 </div>
//                 <div style={{ fontSize: "13px", marginTop: "4px" }}>
//                   🌡 {day.temperature}°C
//                 </div>
//                 <div style={{ fontSize: "13px" }}>🌧 {day.rainfall} mm</div>
//                 <div style={{ fontSize: "13px" }}>
//                   💧 {day.predictedMoisture}%
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "13px",
//                     marginTop: "6px",
//                     color: day.recommendation.includes("🟢")
//                       ? "#1b9c26"
//                       : day.recommendation.includes("🟡")
//                       ? "#bfa300"
//                       : "#d00000",
//                   }}
//                 >
//                   {day.recommendation}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default IrrigationPlanner;














// ............................................



// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   // Take latest 6 for the grid view
//   const latestSix = forecast.slice(-6);

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           padding: "30px",
//           fontFamily: "Poppins, sans-serif",
//           color: "#fff",
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "25px",
//             fontSize: "28px",
//             letterSpacing: "0.5px",
//           }}
//         >
//           🌾 15-Day Soil Moisture Forecast
//         </h2>

//         {/* 1️⃣ Horizontal Scrollable 15-Day Forecast */}
//         {forecast.length === 0 ? (
//           <p style={{ textAlign: "center" }}>Loading forecast...</p>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               overflowX: "auto",
//               gap: "25px",
//               padding: "10px",
//               scrollbarWidth: "thin",
//               scrollBehavior: "smooth",
//             }}
//           >
//             {forecast.map((day, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedDay(day)}
//                 style={{
//                   flexShrink: 0,
//                   minWidth: "200px",
//                   background: "rgba(255, 255, 255, 0.15)",
//                   borderRadius: "15px",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   padding: "20px",
//                   textAlign: "center",
//                   cursor: "pointer",
//                   boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                   transition: "transform 0.2s, box-shadow 0.3s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "translateY(-5px)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "translateY(0)")
//                 }
//               >
//                 <div
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     margin: "0 auto 10px",
//                     backgroundColor: day.recommendation.includes("🟢")
//                       ? "#34e89e"
//                       : day.recommendation.includes("🟡")
//                       ? "#FFD700"
//                       : "#FF6347",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#fff",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   💧
//                 </div>
//                 <div style={{ fontWeight: "bold" }}>{day.date}</div>
//                 <div style={{ fontSize: "13px" }}>
//                   🌡 {day.temperature}°C | 🌧 {day.rainfall} mm
//                 </div>
//                 <div style={{ fontSize: "13px", marginTop: "4px" }}>
//                   💧 {day.predictedMoisture}%
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "13px",
//                     color: day.recommendation.includes("🟢")
//                       ? "#7CFC00"
//                       : day.recommendation.includes("🟡")
//                       ? "#FFD700"
//                       : "#FF6347",
//                     marginTop: "5px",
//                   }}
//                 >
//                   {day.recommendation}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* 2️⃣ Latest 6 in 3x2 Grid View */}
//         {latestSix.length > 0 && (
//           <>
//             <h3
//               style={{
//                 textAlign: "center",
//                 marginTop: "40px",
//                 marginBottom: "20px",
//                 fontSize: "24px",
//                 color: "#f1f1f1",
//               }}
//             >
//               🌦 Latest 6-Day Highlights
//             </h3>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                 gap: "25px",
//                 padding: "10px 30px",
//               }}
//             >
//               {latestSix.map((day, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setSelectedDay(day)}
//                   style={{
//                     background:
//                       "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
//                     borderRadius: "20px",
//                     padding: "25px",
//                     backdropFilter: "blur(15px)",
//                     WebkitBackdropFilter: "blur(15px)",
//                     textAlign: "center",
//                     boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//                     color: "#fff",
//                     cursor: "pointer",
//                     transition: "transform 0.2s, background 0.3s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background =
//                       "linear-gradient(135deg, rgba(61,194,236,0.3), rgba(61,194,236,0.1))";
//                     e.currentTarget.style.transform = "scale(1.03)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background =
//                       "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))";
//                     e.currentTarget.style.transform = "scale(1)";
//                   }}
//                 >
//                   <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
//                     {day.date}
//                   </h4>
//                   <p style={{ fontSize: "14px" }}>🌡 {day.temperature}°C</p>
//                   <p style={{ fontSize: "14px" }}>🌧 {day.rainfall} mm</p>
//                   <p style={{ fontSize: "14px" }}>
//                     💧 {day.predictedMoisture}%
//                   </p>
//                   <p
//                     style={{
//                       marginTop: "8px",
//                       fontWeight: "600",
//                       color: day.recommendation.includes("🟢")
//                         ? "#7CFC00"
//                         : day.recommendation.includes("🟡")
//                         ? "#FFD700"
//                         : "#FF6347",
//                     }}
//                   >
//                     {day.recommendation}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* 3️⃣ Popup Modal */}
//         {selectedDay && (
//           <div
//             onClick={() => setSelectedDay(null)}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               background: "rgba(0,0,0,0.7)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 1000,
//             }}
//           >
//             <div
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 background: "rgba(255, 255, 255, 0.2)",
//                 borderRadius: "20px",
//                 backdropFilter: "blur(15px)",
//                 padding: "30px",
//                 color: "#fff",
//                 textAlign: "center",
//                 width: "320px",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
//                 animation: "fadeIn 0.3s ease",
//               }}
//             >
//               <h3 style={{ marginBottom: "10px" }}>📅 {selectedDay.date}</h3>
//               <p>🌡 Temperature: {selectedDay.temperature}°C</p>
//               <p>🌧 Rainfall: {selectedDay.rainfall} mm</p>
//               <p>💧 Predicted Moisture: {selectedDay.predictedMoisture}%</p>
//               <p style={{ marginTop: "10px" }}>{selectedDay.recommendation}</p>
//               <button
//                 onClick={() => setSelectedDay(null)}
//                 style={{
//                   marginTop: "15px",
//                   background: "#3dc2ec",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   color: "#fff",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default IrrigationPlanner;

// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   // Animated weather icons
//   const getWeatherIcon = (weather) => {
//     const condition = weather?.toLowerCase() || "";
//     if (condition.includes("rain")) return "🌧️";
//     if (condition.includes("cloud")) return "☁️";
//     if (condition.includes("sun") || condition.includes("clear")) return "☀️";
//     if (condition.includes("storm")) return "⛈️";
//     if (condition.includes("wind")) return "💨";
//     if (condition.includes("snow")) return "❄️";
//     return "🌤️";
//   };

//   return (
//     <>
      
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(160deg, #155799 0%, #159957 100%)",
//           color: "#fff",
//           fontFamily: "Poppins, sans-serif",
//           padding: "40px 20px",
//           overflowX: "hidden",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             fontSize: "2rem",
//             fontWeight: "700",
//             marginBottom: "30px",
//             letterSpacing: "1px",
//           }}
//         >
//           🌾 Smart Irrigation Planner — 15-Day Forecast
//         </h1>

//         {forecast.length === 0 ? (
//           <p
//             style={{
//               textAlign: "center",
//               fontSize: "18px",
//               marginTop: "50px",
//             }}
//           >
//             Fetching your local forecast... 🌍
//           </p>
//         ) : (
//           <>
//             {/* === TOP HORIZONTAL SCROLL (All 15 Days) === */}
//             <div
//               style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 gap: "20px",
//                 padding: "10px 10px 30px",
//                 scrollbarWidth: "thin",
//               }}
//             >
//               {forecast.map((day, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     minWidth: "200px",
//                     flexShrink: 0,
//                     background: "rgba(255, 255, 255, 0.15)",
//                     backdropFilter: "blur(8px)",
//                     borderRadius: "18px",
//                     padding: "20px",
//                     boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
//                     textAlign: "center",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-10px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 6px 30px rgba(0,0,0,0.35)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 25px rgba(0,0,0,0.2)";
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "40px",
//                       animation: "float 2s ease-in-out infinite",
//                     }}
//                   >
//                     {getWeatherIcon(day.weather || day.recommendation)}
//                   </div>
//                   <div style={{ fontWeight: "600", marginTop: "10px" }}>
//                     {day.date}
//                   </div>
//                   <div style={{ fontSize: "14px", margin: "5px 0" }}>
//                     🌡️ {day.temperature}°C
//                   </div>
//                   <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
//                   <div style={{ fontSize: "14px" }}>
//                     💧 {day.predictedMoisture}%
//                   </div>
//                   <div
//                     style={{
//                       marginTop: "10px",
//                       fontWeight: "500",
//                       color: day.recommendation?.includes("🟢")
//                         ? "#90ee90"
//                         : day.recommendation?.includes("🟡")
//                         ? "#ffeb3b"
//                         : "#ff8a80",
//                     }}
//                   >
//                     {day.recommendation}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* === BOTTOM GRID VIEW (Latest 7 Days) === */}
//             <h2
//               style={{
//                 textAlign: "center",
//                 marginTop: "30px",
//                 marginBottom: "20px",
//                 fontSize: "1.5rem",
//                 fontWeight: "600",
//               }}
//             >
//               🌤️ Latest 7-Day Highlights
//             </h2>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit, minmax(clamp(220px, 30vw, 300px), 1fr))",
//                 gap: "20px",
//                 justifyContent: "center",
//               }}
//             >
//               {forecast
//                 .slice(0, 7)
//                 .map((day, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.15)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "20px",
//                       padding: "25px",
//                       textAlign: "center",
//                       boxShadow: "0 5px 25px rgba(0,0,0,0.25)",
//                       transition:
//                         "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.05)";
//                       e.currentTarget.style.boxShadow =
//                         "0 10px 35px rgba(0,0,0,0.4)";
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.25)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow =
//                         "0 5px 25px rgba(0,0,0,0.25)";
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.15)";
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "48px",
//                         animation: "float 2s ease-in-out infinite",
//                       }}
//                     >
//                       {getWeatherIcon(day.weather || day.recommendation)}
//                     </div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: "1rem",
//                         marginTop: "8px",
//                       }}
//                     >
//                       {day.date}
//                     </div>
//                     <div style={{ fontSize: "14px", margin: "6px 0" }}>
//                       🌡️ {day.temperature}°C
//                     </div>
//                     <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
//                     <div style={{ fontSize: "14px" }}>
//                       💧 {day.predictedMoisture}%
//                     </div>
//                     <div
//                       style={{
//                         marginTop: "10px",
//                         fontWeight: "500",
//                         color: day.recommendation?.includes("🟢")
//                           ? "#90ee90"
//                           : day.recommendation?.includes("🟡")
//                           ? "#ffeb3b"
//                           : "#ff8a80",
//                       }}
//                     >
//                       {day.recommendation}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </>
//         )}

//         <style>{`
//           /* Scrollbar styling */
//           ::-webkit-scrollbar {
//             height: 8px;
//           }
//           ::-webkit-scrollbar-thumb {
//             background: rgba(255,255,255,0.4);
//             border-radius: 10px;
//           }

//           /* Floating animation for weather icons */
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-6px); }
//             100% { transform: translateY(0px); }
//           }

//           /* Responsive adjustments */
//           @media (max-width: 768px) {
//             h1 { font-size: 1.6rem; }
//             h2 { font-size: 1.3rem; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }

// export default IrrigationPlanner;







// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";
// import { Modal } from "react-bootstrap";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   const getWeatherIcon = (weather) => {
//     const condition = weather?.toLowerCase() || "";
//     if (condition.includes("rain")) return "🌧️";
//     if (condition.includes("cloud")) return "☁️";
//     if (condition.includes("sun") || condition.includes("clear")) return "☀️";
//     if (condition.includes("storm")) return "⛈️";
//     if (condition.includes("wind")) return "💨";
//     if (condition.includes("snow")) return "❄️";
//     return "🌤️";
//   };

//   const openModal = (day) => {
//     setSelectedDay(day);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedDay(null);
//   };

//   const latest7Days = forecast.slice(0, 7);

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom, #f7f9f9, #ffffff)",
//           color: "#333",
//           fontFamily: "Poppins, sans-serif",
//           padding: "40px 20px",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             fontSize: "2rem",
//             fontWeight: "700",
//             marginBottom: "30px",
//             letterSpacing: "1px",
//             color: "#1b3d1a",
//           }}
//         >
//           🌾 Smart Irrigation Planner — 15-Day Forecast
//         </h1>

//         {forecast.length === 0 ? (
//           <p style={{ textAlign: "center", fontSize: "18px", marginTop: "50px" }}>
//             Fetching your local forecast... 🌍
//           </p>
//         ) : (
//           <>
//             {/* Top Horizontal Scroll - all 15 days */}
//             <div
//               style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 gap: "15px",
//                 padding: "10px 0 30px",
//               }}
//             >
//               {forecast.map((day, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     minWidth: "180px",
//                     flexShrink: 0,
//                     background: "rgba(200, 230, 200, 0.25)",
//                     backdropFilter: "blur(6px)",
//                     borderRadius: "15px",
//                     padding: "15px",
//                     textAlign: "center",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <div style={{ fontSize: "36px", animation: "float 2s ease-in-out infinite" }}>
//                     {getWeatherIcon(day.weather || day.recommendation)}
//                   </div>
//                   <div style={{ fontWeight: "600", marginTop: "8px" }}>{day.date}</div>
//                   <div style={{ fontSize: "14px" }}>🌡️ {day.temperature}°C</div>
//                 </div>
//               ))}
//             </div>

//             {/* Bottom Grid View - latest 7 days, 3x3 */}
//             <h2
//               style={{
//                 textAlign: "center",
//                 marginTop: "30px",
//                 marginBottom: "20px",
//                 fontSize: "1.5rem",
//                 fontWeight: "600",
//                 color: "#1b3d1a",
//               }}
//             >
//               🌤️ Latest 7-Day Highlights
//             </h2>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//                 gap: "20px",
//                 justifyItems: "center",
//               }}
//             >
//               {latest7Days.map((day, i) => (
//                 <div
//                   key={i}
//                   onClick={() => openModal(day)}
//                   style={{
//                     background: "rgba(200, 230, 200, 0.3)",
//                     backdropFilter: "blur(8px)",
//                     borderRadius: "20px",
//                     padding: "25px",
//                     textAlign: "center",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "scale(1.05)";
//                     e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "scale(1)";
//                     e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
//                   }}
//                 >
//                   <div style={{ fontSize: "48px", animation: "float 2s ease-in-out infinite" }}>
//                     {getWeatherIcon(day.weather || day.recommendation)}
//                   </div>
//                   <div style={{ fontWeight: "600", marginTop: "10px" }}>{day.date}</div>
//                   <div style={{ fontSize: "14px", margin: "5px 0" }}>🌡️ {day.temperature}°C</div>
//                   <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
//                   <div style={{ fontSize: "14px" }}>💧 {day.predictedMoisture}%</div>
//                   <div
//                     style={{
//                       marginTop: "8px",
//                       fontWeight: "500",
//                       color: day.recommendation?.includes("🟢")
//                         ? "#4caf50"
//                         : day.recommendation?.includes("🟡")
//                         ? "#ffeb3b"
//                         : "#ff8a80",
//                     }}
//                   >
//                     {day.recommendation}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Modal Popup for details */}
//         <Modal show={showModal} onHide={closeModal} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>🌤️ {selectedDay?.date}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body style={{ textAlign: "center", fontSize: "16px" }}>
//             <div style={{ fontSize: "50px" }}>
//               {getWeatherIcon(selectedDay?.weather || selectedDay?.recommendation)}
//             </div>
//             <p>Temperature: 🌡️ {selectedDay?.temperature}°C</p>
//             <p>Rainfall: 🌧️ {selectedDay?.rainfall} mm</p>
//             <p>Moisture: 💧 {selectedDay?.predictedMoisture}%</p>
//             <p style={{ color: selectedDay?.recommendation?.includes("🟢") ? "#4caf50" : selectedDay?.recommendation?.includes("🟡") ? "#ffeb3b" : "#ff8a80", fontWeight: "600" }}>
//               {selectedDay?.recommendation}
//             </p>
//           </Modal.Body>
//         </Modal>

//         <style>{`
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-6px); }
//             100% { transform: translateY(0px); }
//           }

//           @media (max-width: 768px) {
//             h1 { font-size: 1.6rem; }
//             h2 { font-size: 1.3rem; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }

// export default IrrigationPlanner;








// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";
// import { motion, AnimatePresence } from "framer-motion";

// function IrrigationPlanner() {
//   const [forecast, setForecast] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);

//   // Fetch forecast data
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `http://localhost:1000/forecast?lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setForecast(data.forecast || []);
//         } catch (error) {
//           console.error("Error fetching forecast:", error);
//         }
//       },
//       (err) => console.error("Geolocation error:", err)
//     );
//   }, []);

//   // Weather icon mapping
//   const getWeatherIcon = (weather) => {
//     const condition = weather?.toLowerCase() || "";
//     if (condition.includes("rain")) return "🌧️";
//     if (condition.includes("cloud")) return "☁️";
//     if (condition.includes("sun") || condition.includes("clear")) return "☀️";
//     if (condition.includes("storm")) return "⛈️";
//     if (condition.includes("wind")) return "💨";
//     if (condition.includes("snow")) return "❄️";
//     return "🌤️";
//   };

//   // Dynamic background
//   const getBackground = (weather) => {
//     if (!weather) return "linear-gradient(160deg, #f3f8ee 0%, #e9f5dc 100%)";
//     if (weather.includes("rain"))
//       return "linear-gradient(160deg, #a2c4fc 0%, #d9e9ff 100%)";
//     if (weather.includes("cloud"))
//       return "linear-gradient(160deg, #cfd8dc 0%, #e0e0e0 100%)";
//     if (weather.includes("sun") || weather.includes("clear"))
//       return "linear-gradient(160deg, #fff9c4 0%, #fffde7 100%)";
//     return "linear-gradient(160deg, #f3f8ee 0%, #e9f5dc 100%)";
//   };

//   return (
//     <>
      
//       <div
//         style={{
//           minHeight: "100vh",
//           background: getBackground(forecast[0]?.weather),
//           fontFamily: "Poppins, sans-serif",
//           padding: "40px 20px",
//           overflowX: "hidden",
//           transition: "background 0.5s ease",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             fontSize: "2rem",
//             fontWeight: "700",
//             marginBottom: "30px",
//             letterSpacing: "1px",
//           }}
//         >
//           🌾 Smart Irrigation Planner — 15-Day Forecast
//         </h1>

//         {forecast.length === 0 ? (
//           <p
//             style={{
//               textAlign: "center",
//               fontSize: "18px",
//               marginTop: "50px",
//             }}
//           >
//             Fetching your local forecast... 🌍
//           </p>
//         ) : (
//           <>
//             {/* Top horizontal scroll for all 15 days */}
//             <div
//               style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 gap: "20px",
//                 padding: "10px 10px 30px",
//                 scrollbarWidth: "thin",
//               }}
//             >
//               {forecast.map((day, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: i * 0.05 }}
//                   style={{
//                     minWidth: "200px",
//                     flexShrink: 0,
//                     background: "rgba(255, 255, 255, 0.15)",
//                     backdropFilter: "blur(8px)",
//                     borderRadius: "18px",
//                     padding: "20px",
//                     boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
//                     textAlign: "center",
//                     cursor: "pointer",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   }}
//                   onClick={() => setSelectedDay(day)}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-8px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 6px 30px rgba(0,0,0,0.35)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 25px rgba(0,0,0,0.2)";
//                   }}
//                 >
//                   <div style={{ fontSize: "40px", animation: "float 2s ease-in-out infinite" }}>
//                     {getWeatherIcon(day.weather || day.recommendation)}
//                   </div>
//                   <div style={{ fontWeight: "600", marginTop: "10px" }}>{day.date}</div>
//                   <div style={{ fontSize: "14px", margin: "5px 0" }}>
//                     🌡️ {day.temperature}°C
//                   </div>
//                   <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
//                   <div style={{ fontSize: "14px" }}>💧 {day.predictedMoisture}%</div>
//                   <div
//                     style={{
//                       marginTop: "10px",
//                       fontWeight: "500",
//                       color: day.recommendation?.includes("🟢")
//                         ? "#90ee90"
//                         : day.recommendation?.includes("🟡")
//                         ? "#ffeb3b"
//                         : "#ff8a80",
//                     }}
//                   >
//                     {day.recommendation}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Latest 6-7 day highlights in 3x2 grid */}
//            {/* Latest 6-Day Highlights in 3x2 grid */}
// <h2
//   style={{
//     textAlign: "center",
//     marginTop: "30px",
//     marginBottom: "20px",
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   }}
// >
//   🌤️ Latest 6-Day Highlights
// </h2>
// <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
//     gridTemplateRows: "repeat(2, auto)",  // 2 rows
//     gap: "20px",
//     justifyContent: "center",
//   }}
// >
//   {forecast.slice(0, 6).map((day, i) => (
//     <motion.div
//       key={i}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: i * 0.05 }}
//       style={{
//         background: "rgba(255, 255, 255, 0.15)",
//         backdropFilter: "blur(10px)",
//         borderRadius: "20px",
//         padding: "25px",
//         textAlign: "center",
//         boxShadow: "0 5px 25px rgba(0,0,0,0.25)",
//         cursor: "pointer",
//         transition: "all 0.3s ease",
//       }}
//       onClick={() => setSelectedDay(day)}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "scale(1.05)";
//         e.currentTarget.style.boxShadow = "0 10px 35px rgba(0,0,0,0.4)";
//         e.currentTarget.style.background = "rgba(255,255,255,0.25)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "scale(1)";
//         e.currentTarget.style.boxShadow = "0 5px 25px rgba(0,0,0,0.25)";
//         e.currentTarget.style.background = "rgba(255,255,255,0.15)";
//       }}
//     >
//       <div style={{ fontSize: "48px", animation: "float 2s ease-in-out infinite" }}>
//         {getWeatherIcon(day.weather || day.recommendation)}
//       </div>
//       <div style={{ fontWeight: "600", fontSize: "1rem", marginTop: "8px" }}>
//         {day.date}
//       </div>
//       <div style={{ fontSize: "14px", margin: "6px 0" }}>🌡️ {day.temperature}°C</div>
//       <div style={{ fontSize: "14px" }}>🌧️ {day.rainfall} mm</div>
//       <div style={{ fontSize: "14px" }}>💧 {day.predictedMoisture}%</div>
//       <div
//         style={{
//           marginTop: "10px",
//           fontWeight: "500",
//           color: day.recommendation?.includes("🟢")
//             ? "#90ee90"
//             : day.recommendation?.includes("🟡")
//             ? "#ffeb3b"
//             : "#ff8a80",
//         }}
//       >
//         {day.recommendation}
//       </div>
//     </motion.div>
//   ))}
// </div>

//           </>
//         )}

//         {/* Popup modal */}
//         <AnimatePresence>
//           {selectedDay && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 background: "rgba(0,0,0,0.5)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 9999,
//               }}
//               onClick={() => setSelectedDay(null)}
//             >
//               <motion.div
//                 onClick={(e) => e.stopPropagation()}
//                 style={{
//                   background: "#fff",
//                   padding: "25px 35px",
//                   borderRadius: "20px",
//                   maxWidth: "400px",
//                   width: "90%",
//                   textAlign: "center",
//                   color: "#333",
//                   boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
//                 }}
//               >
//                 <h2 style={{ marginBottom: "15px" }}>{selectedDay.date}</h2>
//                 <div style={{ fontSize: "50px" }}>
//                   {getWeatherIcon(selectedDay.weather || selectedDay.recommendation)}
//                 </div>
//                 <p style={{ margin: "10px 0" }}>🌡️ {selectedDay.temperature}°C</p>
//                 <p style={{ margin: "5px 0" }}>🌧️ {selectedDay.rainfall} mm</p>
//                 <p style={{ margin: "5px 0" }}>💧 {selectedDay.predictedMoisture}%</p>
//                 <p
//                   style={{
//                     marginTop: "10px",
//                     fontWeight: "500",
//                     color: selectedDay.recommendation?.includes("🟢")
//                       ? "#90ee90"
//                       : selectedDay.recommendation?.includes("🟡")
//                       ? "#ffeb3b"
//                       : "#ff8a80",
//                   }}
//                 >
//                   {selectedDay.recommendation}
//                 </p>
//                 <button
//                   onClick={() => setSelectedDay(null)}
//                   style={{
//                     marginTop: "15px",
//                     padding: "8px 18px",
//                     borderRadius: "10px",
//                     border: "none",
//                     background: "#2D6A4F",
//                     color: "#fff",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Close
//                 </button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <style>{`
//           /* Scrollbar styling */
//           ::-webkit-scrollbar {
//             height: 8px;
//           }
//           ::-webkit-scrollbar-thumb {
//             background: rgba(0,0,0,0.3);
//             border-radius: 10px;
//           }

//           /* Floating animation for weather icons */
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-6px); }
//             100% { transform: translateY(0px); }
//           }

//           /* Responsive adjustments */
//           @media (max-width: 768px) {
//             h1 { font-size: 1.6rem; }
//             h2 { font-size: 1.3rem; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }

// export default IrrigationPlanner;







import React, { useEffect, useState } from "react";
import Snav from "./sidenav";
import { motion, AnimatePresence } from "framer-motion";

function IrrigationPlanner() {
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Fetch forecast data
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

  // Weather icon mapping
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

  // Dynamic background
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

  // 🌧️ Dynamic irrigation advice (non-logic enhancement)
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
            {/* Scrollable 15-day preview */}
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

            {/* 6-day grid highlights */}
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

        {/* Popup Modal */}
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

        {/* Styles */}
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
