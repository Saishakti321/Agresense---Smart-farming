// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import { FaSeedling, FaCloudSun, FaFlask, FaTint } from "react-icons/fa";
// import Snav from "./sidenav";

// export default function AISuggestion() {
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soilPh, setSoilPh] = useState("");
//   const [aiResult, setAiResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🌍 Auto-fetch Location, Weather, and Soil data
//   useEffect(() => {
//     const fetchEnvironmentData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // 🌦️ Fetch weather data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=64ec4e8adf69cb9be080f0c6d813f56d
// &units=metric`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temp: weatherData.main.temp,
//             humidity: weatherData.main.humidity,
//           });

//           // 🌱 Fetch soil pH from SoilGrids API
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const ph =
//             soilData?.properties?.phh2o?.layers?.[0]?.values?.mean?.toFixed(2) ||
//             6.5;
//           setSoilPh(ph);

//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchEnvironmentData();
//   }, []);

//   // 🧠 Fetch AI prediction
//   const getAiPrediction = async () => {
//     try {
//       const response = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           N: 90,
//           P: 42,
//           K: 43,
//           temperature: weather.temp || 28,
//           humidity: weather.humidity || 70,
//           ph: soilPh || 6.5,
//           rainfall: 150,
//         }),
//       });

//       const data = await response.json();
//       setAiResult(data);
//     } catch (error) {
//       console.error("AI Fetch Error:", error);
//       alert("Error connecting to AI service.");
//     }
//   };

//   if (loading) {
//     return (
//       <h3 style={{ textAlign: "center", marginTop: "50px", color: "#283c86" }}>
//         🌍 Fetching environmental data...
//       </h3>
//     );
//   }

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           minHeight: "100vh",
//           padding: "40px 20px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <h1
//           style={{
//             color: "#283c86",
//             fontWeight: "bold",
//             fontSize: "2rem",
//             marginBottom: "20px",
//           }}
//         >
//           🌾 AI Crop Suggestion
//         </h1>

//         {/* Environment Summary */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "20px",
//             width: "90%",
//             maxWidth: "900px",
//             marginBottom: "30px",
//           }}
//         >
//           <div className="card">
//             <h4><FaCloudSun /> Weather</h4>
//             <p>Temperature: {weather.temp} °C</p>
//             <p>Humidity: {weather.humidity}%</p>
//           </div>

//           <div className="card">
//             <h4><FaFlask /> Soil</h4>
//             <p>pH Level: {soilPh}</p>
//           </div>

//           <div className="card">
//             <h4><FaTint /> Location</h4>
//             <p>Latitude: {lat.toFixed(3)}</p>
//             <p>Longitude: {lon.toFixed(3)}</p>
//           </div>
//         </div>

//         <Button
//           onClick={getAiPrediction}
//           style={{
//             backgroundColor: "#45a247",
//             border: "none",
//             padding: "10px 30px",
//             borderRadius: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           🧠 Get AI Suggestion
//         </Button>

//         {aiResult && (
//           <div
//             style={{
//               marginTop: "30px",
//               width: "90%",
//               maxWidth: "800px",
//               backgroundColor: "#fff",
//               padding: "25px",
//               borderRadius: "12px",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3 style={{ color: "#283c86" }}>AI Recommendation</h3>
//             <p><b>🌾 Recommended Crop:</b> {aiResult.recommended_crop}</p>
//             <p><b>🌱 Fertilizer Suggestion:</b> {aiResult.fertilizer}</p>
//             <p><b>💧 Irrigation Plan:</b> {aiResult.irrigation}</p>
//             <p><b>📜 Summary:</b> {aiResult.recommendation}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

//64ec4e8adf69cb9be080f0c6d813f56d



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// import "./User.css";
// import Snav from "./sidenav";

// function User() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Auto-fetch location, weather & soil data quickly
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦️ Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d
// `
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data (SoilGrids)
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
//           );
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.phh2o?.values?.[0]?.value ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };

//     fetchData();
//   }, []);

//   // 🧠 Fetch AI prediction manually (button)
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         latitude: lat,
//         longitude: lon,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//         soil_ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         crop,
//       };

//       const aiRes = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#f4f4f4",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "serif",
//             color: "#283c86",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "20px",
//             backgroundColor: "#ffffff",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             maxWidth: "650px",
//             margin: "0 auto",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* ✅ Personal Info */}
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   First Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   Last Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             {/* ✅ Email */}
//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Email Address
//               </h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             {/* ✅ Auto-fetched Table */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f7f5f5" }}>
//                     <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Latitude
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {lat || "Fetching..."}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Longitude
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {lon || "Fetching..."}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Temperature (°C)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.temperature}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Humidity (%)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.humidity}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Rainfall (mm)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.rainfall}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Soil pH
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {soil.ph}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* ✅ Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* ✅ AI Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#45a247",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "bold",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {/* ✅ AI Output */}
//             {aiAdvice && (
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "bold",
//                 backgroundColor: "#283c86",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default User;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// // import "./User.css";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         navigator.geolocation.getCurrentPosition(async (pos) => {
// //           const latitude = pos.coords.latitude;
// //           const longitude = pos.coords.longitude;
// //           setLat(latitude.toFixed(4));
// //           setLon(longitude.toFixed(4));

// //           const weatherRes = await fetch(
// //             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
// //           );
// //           const weatherData = await weatherRes.json();
// //           setWeather({
// //             temperature: weatherData.main?.temp ?? "Unavailable",
// //             humidity: weatherData.main?.humidity ?? "Unavailable",
// //             rainfall:
// //               weatherData.rain?.["1h"] ??
// //               weatherData.rain?.["3h"] ??
// //               "No rain detected",
// //           });

// //         //   const soilRes = await fetch(
// //         //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
// //         //   );
// //         //   const soilData = await soilRes.json();
// //         //   const phValue =
// //         //     soilData?.properties?.phh2o?.values?.[0]?.value ?? null;
// //         //   setSoil({
// //         //     ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
// //         //   });
// //         // 🌱 Soil Data (SoilGrids)
// // // const soilRes = await fetch(
// // //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
// // //   );
// // //   const soilData = await soilRes.json();
// // //   console.log("🌱 Soil Data:", soilData);

  
// // // //   const phValue =
// // // //     soilData?.properties?.phh2o?.values?.[0]?.value ??
// // // //     soilData?.properties?.phh2o?.mean ??
// // // //     null;
// // // const phValue =
// // //   soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

  
// // //   setSoil({
// // //     ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
// // //   });
  

// // // 🌱 Soil Data (SoilGrids)
// // const soilRes = await fetch(
// //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
// //   );
// //   const soilData = await soilRes.json();
// //   console.log("🌍 Full Soil Data:", soilData); // 👀 Debug log
  
// //   // ✅ Extract correct pH value safely
// //   let phValue = "Unavailable";
// //   try {
// //     phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean;
// //     if (phValue) phValue = (phValue / 10).toFixed(2);
// //   } catch (err) {
// //     console.error("Error reading soil pH:", err);
// //   }
  
// //   setSoil({ ph: phValue });
  
// //         });
// //       } catch (err) {
// //         console.error("Error fetching data:", err);
// //         setError("Failed to fetch location or environmental data.");
// //       }
// //     };

// //     fetchData();
// //   }, []);


// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));
  
//           // 🌦️ Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });
  
//           // 🌱 Soil Data (SoilGrids)



//           const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`;
//           const soilRes = await fetch(soilUrl, {
//             method: "GET",
//             headers: {
//               "Accept": "application/json",
//               "User-Agent": "AgriSense/1.0",
//             },
//           });
//           const soilData = await soilRes.json();
//           alert(soilData);
  
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
  
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
          
//         //   const soilRes = await fetch(
//         //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`

//         //     // `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
//         //   );
//         //   const soilData = await soilRes.json();
  
//         //   console.log("🌍 Full Soil Data:", soilData); // 👀 check browser console
  
//         //   // ✅ Proper extraction (as per your Thunder Client output)
//         //   const phValue =
//         //     soilData?.properties?.layers?.find((layer) => layer.name === "phh2o")
//         //       ?.depths?.[0]?.values?.mean ?? null;
  
//         //   if (phValue) {
//         //     setSoil({ ph: (phValue / 10).toFixed(2) });
//         //   } else {
//         //     setSoil({ ph: "Unavailable" });
//         //   }
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };
  
//     fetchData();
//   }, []);
  
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         latitude: lat,
//         longitude: lon,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//         soil_ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         crop,
//       };

//       const aiRes = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#ffffff",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #000000",
//             borderRadius: "10px",
//             padding: "25px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* Personal Info */}
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>First Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>Last Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             {/* Email */}
//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             {/* Table */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>🌍 Environment Data</h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color:"black"
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f9f9f9" }}>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>Parameter</th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* AI Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {aiAdvice && (
//               <div style={{ marginTop: "25px", textAlign: "left", color: "#fff" }}>
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦 Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data (through free ISRIC endpoint)
//           const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`;
//           const soilRes = await fetch(soilUrl, { method: "GET" });
//           if (!soilRes.ok) throw new Error("Failed to fetch soil data");
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };

//     fetchData();
//   }, []);

//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//       };

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#fff",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #000",
//             borderRadius: "10px",
//             padding: "25px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>First Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>Last Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color: "#000",
//                   textAlign: "center",
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f5f5f5" }}>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {aiAdvice && (
//               <div
//                 style={{
//                   marginTop: "25px",
//                   textAlign: "left",
//                   color: "#000",
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: "8px",
//                   padding: "15px",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Auto fetch weather & soil data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦 Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch weather or soil data.");
//       }
//     };
//     fetchData();
//   }, []);

//   // 🧠 Get AI Suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//       };

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been submitted successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       {/* <Snav /> */}
//       <div
//         style={{
//           backgroundColor: "#fff",
//           minHeight: "100vh",
//           padding: "40px 20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "'Poppins', sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense AI Farming Advisor
//         </h2>

//         <div
//           style={{
//             border: "1px solid #000",
//             borderRadius: "10px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//             padding: "25px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* ✅ Email */}
//             {/* <Form.Group className="mb-3">
//               {/* <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4> */}
//               {/* <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>  */}

//             {/* ✅ Auto-Fetched Environment Data */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color: "#000",
//                   textAlign: "center",
//                 }}
//               >
//                 <thead style={{ backgroundColor: "#f0f0f0" }}>
//                   <tr>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* ✅ Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* ✅ Get Suggestion Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {/* ✅ AI Output */}
//             {aiAdvice && (
//               <div
//                 style={{
//                   marginTop: "25px",
//                   color: "#000",
//                   backgroundColor: "#f9f9f9",
//                   border: "1px solid #000",
//                   borderRadius: "8px",
//                   padding: "15px",
//                 }}
//               >
//                 <h5 style={{ fontWeight: "600" }}>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             {/* ✅ Submit */}
//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
// //   const [fertilizer, setFertilizer] = useState({});
// // const [pesticide, setPesticide] = useState({});


//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // 🌍 Auto Fetch Location + Data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // Reverse Geocode
//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           // Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           // Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // 📍 Manual Location Fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       // Weather Data
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       // Soil Data
//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // 🧠 AI Suggestion
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //       rainfall: weather.rainfall === "No rain detected" ? 0 : weather.rainfall, // Rainfall (set to 0 if no rain detected)
//   //     };

//   //     console.log("📤 Sending:", inputData);

//   //     const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });

//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);

//   //     setAiAdvice(aiData.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.sustainability || "No sustainability tip.");
//   //     setPesticide(aiData.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //     };
  
//   //     console.log("📤 Sending:", inputData);
  
//   //     const aiRes = await fetch("http://127.0.0.1:1000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });
  
//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);
  
//   //     // Set the responses to respective states
//   //     setAiAdvice(aiData.data.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.data.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.data.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.data.sustainability_tip || "No sustainability tip.");
//   //     setPesticide(aiData.data.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };
  
//       console.log("📤 Sending:", inputData);
  
//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });
  
//       if (!aiRes.ok) throw new Error("Server error");
  
//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);
  
//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         // setFertilizer(
//         //   `${aiData.data.fertilizer.name} (${aiData.data.fertilizer.amount_kg} kg)`
//         // );
//         // setPesticide(
//         //   `${aiData.data.pesticide.name} (${aiData.data.pesticide.amount_kg} kg)`
//         // );
//         setFertilizer(aiData.data.fertilizer || {});
// setPesticide(aiData.data.pesticide || {});

//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };
  
  
//   return (
//     <>
    
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e3f2fd, #f1f8e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "750px",
//             borderRadius: "20px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//             backgroundColor: "#fff",
//             fontFamily: "'Poppins', sans-serif",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "25px",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             {/* Location Selector */}
//             <Form>
//               <Form.Group>
//                 <h5 style={{ fontWeight: "600" }}>📍 Location Mode</h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Location Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Delhi)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && (
//                 <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
//               )}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Data Card */}
//               {!loading && weather.temperature && (
//                 <div
//                   style={{
//                     backgroundColor: "#f9fbe7",
//                     borderLeft: "6px solid #81c784",
//                     borderRadius: "10px",
//                     padding: "15px",
//                     marginTop: "20px",
//                     animation: "fadeInUp 1s",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e" }}>🌍 Environment Data</h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </div>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "600" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "10px",
//                   fontWeight: "600",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {/* {aiAdvice && (
//                 <div
//                   style={{
//                     marginTop: "25px",
//                     background: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
//                   <p><b>Advice:</b> {aiAdvice}</p>
//                   <p><b>Fertilizer:</b> {fertilizer}</p>
//                   <p><b>Pesticide:</b> {pesticide}</p>
//                   <p><b>Irrigation:</b> {irrigation}</p>
//                   <p><b>Sustainability Tip:</b> {sustainability}</p>
//                 </div>
//               )} */}
//               {/* AI Result */}
// {aiAdvice && (
//   <div
//     style={{
//       marginTop: "25px",
//       background: "#f1f8e9",
//       borderLeft: "6px solid #66bb6a",
//       padding: "20px",
//       borderRadius: "12px",
//       animation: "fadeIn 0.8s ease-in",
//     }}
//   >
//     <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
    
//     <div>
//       <b>🌱 Advice:</b>
//       <p>{aiAdvice}</p>
//     </div>
    
//     <div>
//       <b>💧 Fertilizer:</b>
//       <p>{fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>🧴 Pesticide:</b>
//       <p>{pesticide.name} ({pesticide.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>💦 Irrigation:</b>
//       <p>{irrigation}</p>
//     </div>
    
//     <div>
//       <b>🌍 Sustainability Tip:</b>
//       <p>{sustainability}</p>
//     </div>
//   </div>
// )}

//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
// //   const [fertilizer, setFertilizer] = useState({});
// // const [pesticide, setPesticide] = useState({});


//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // 🌍 Auto Fetch Location + Data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // Reverse Geocode
//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           // Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           // Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // 📍 Manual Location Fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       // Weather Data
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       // Soil Data
//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // 🧠 AI Suggestion
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //       rainfall: weather.rainfall === "No rain detected" ? 0 : weather.rainfall, // Rainfall (set to 0 if no rain detected)
//   //     };

//   //     console.log("📤 Sending:", inputData);

//   //     const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });

//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);

//   //     setAiAdvice(aiData.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.sustainability || "No sustainability tip.");
//   //     setPesticide(aiData.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //     };
  
//   //     console.log("📤 Sending:", inputData);
  
//   //     const aiRes = await fetch("http://127.0.0.1:1000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });
  
//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);
  
//   //     // Set the responses to respective states
//   //     setAiAdvice(aiData.data.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.data.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.data.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.data.sustainability_tip || "No sustainability tip.");
//   //     setPesticide(aiData.data.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };
  
//       console.log("📤 Sending:", inputData);
  
//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });
  
//       if (!aiRes.ok) throw new Error("Server error");
  
//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);
  
//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         // setFertilizer(
//         //   `${aiData.data.fertilizer.name} (${aiData.data.fertilizer.amount_kg} kg)`
//         // );
//         // setPesticide(
//         //   `${aiData.data.pesticide.name} (${aiData.data.pesticide.amount_kg} kg)`
//         // );
//         setFertilizer(aiData.data.fertilizer || {});
// setPesticide(aiData.data.pesticide || {});

//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };
  
  
//   return (
//     <>
//       {/* <Snav /> */}
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e3f2fd, #f1f8e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "750px",
//             borderRadius: "20px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//             backgroundColor: "#fff",
//             fontFamily: "'Poppins', sans-serif",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "25px",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             {/* Location Selector */}
//             <Form>
//               <Form.Group>
//                 <h5 style={{ fontWeight: "600" }}>📍 Location Mode</h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Location Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Delhi)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && (
//                 <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
//               )}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Data Card */}
//               {!loading && weather.temperature && (
//                 <div
//                   style={{
//                     backgroundColor: "#f9fbe7",
//                     borderLeft: "6px solid #81c784",
//                     borderRadius: "10px",
//                     padding: "15px",
//                     marginTop: "20px",
//                     animation: "fadeInUp 1s",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e" }}>🌍 Environment Data</h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </div>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "600" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "10px",
//                   fontWeight: "600",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {/* {aiAdvice && (
//                 <div
//                   style={{
//                     marginTop: "25px",
//                     background: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
//                   <p><b>Advice:</b> {aiAdvice}</p>
//                   <p><b>Fertilizer:</b> {fertilizer}</p>
//                   <p><b>Pesticide:</b> {pesticide}</p>
//                   <p><b>Irrigation:</b> {irrigation}</p>
//                   <p><b>Sustainability Tip:</b> {sustainability}</p>
//                 </div>
//               )} */}
//               {/* AI Result */}
// {aiAdvice && (
//   <div
//     style={{
//       marginTop: "25px",
//       background: "#f1f8e9",
//       borderLeft: "6px solid #66bb6a",
//       padding: "20px",
//       borderRadius: "12px",
//       animation: "fadeIn 0.8s ease-in",
//     }}
//   >
//     <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
    
//     <div>
//       <b>🌱 Advice:</b>
//       <p>{aiAdvice}</p>
//     </div>
    
//     <div>
//       <b>💧 Fertilizer:</b>
//       <p>{fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>🧴 Pesticide:</b>
//       <p>{pesticide.name} ({pesticide.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>💦 Irrigation:</b>
//       <p>{irrigation}</p>
//     </div>
    
//     <div>
//       <b>🌍 Sustainability Tip:</b>
//       <p>{sustainability}</p>
//     </div>
//   </div>
// )}

//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // Auto fetch location data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // Manual location fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // AI suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };

//       console.log("📤 Sending:", inputData);

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       if (!aiRes.ok) throw new Error("Server error");

//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);

//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         setFertilizer(aiData.data.fertilizer || {});
//         setPesticide(aiData.data.pesticide || {});
//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e0f7fa, #e8f5e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             borderRadius: "20px",
//             boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
//             backgroundColor: "#ffffff",
//             fontFamily: "'Poppins', sans-serif",
//             padding: "25px",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "30px",
//                 fontSize: "1.9rem",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             <Form>
//               {/* Location Mode */}
//               <Form.Group>
//                 <h5 style={{ fontWeight: "700", color: "#2e7d32" }}>
//                   📍 Location Mode
//                 </h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Bhubaneswar)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                   style={{ borderRadius: "12px", padding: "12px" }}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px", fontWeight: "600" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px", fontWeight: "600" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Environment Data */}
//               {!loading && weather.temperature && (
//                 <Card
//                   style={{
//                     backgroundColor: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     borderRadius: "12px",
//                     padding: "18px",
//                     marginTop: "20px",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e", fontWeight: "700" }}>
//                     🌍 Environment Data
//                   </h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </Card>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "700", color: "#2e7d32" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "12px", padding: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* AI Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   fontWeight: "700",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                   padding: "12px",
//                   fontSize: "1rem",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {aiAdvice && (
//                 <Card
//                   style={{
//                     marginTop: "25px",
//                     background: "#e8f5e9",
//                     borderLeft: "6px solid #43a047",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32", fontWeight: "700" }}>🧠 AI Recommendation</h5>

//                   <div style={{ marginTop: "10px" }}>
//                     <p><b>🌱 Advice:</b> {aiAdvice}</p>
//                     {fertilizer.name && (
//                       <p><b>💧 Fertilizer:</b> {fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//                     )}
//                     {pesticide.name && (
//                       <p><b>🧴 Pesticide:</b> {pesticide.name} ({pesticide.amount_kg} kg)</p>
//                     )}
//                     <p><b>💦 Irrigation:</b> {irrigation}</p>
//                     <p><b>🌍 Sustainability Tip:</b> {sustainability}</p>
//                   </div>
//                 </Card>
//               )}
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }

//         @media (max-width: 768px) {
//           h2 { font-size: 1.6rem; }
//           Button { font-size: 0.95rem; padding: 10px; }
//           .card-body { padding: 15px; }
//         }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;








// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";
// // 5b966ddef50370f78a15f7f0f8544ea6
//   const WEATHER_API = "5b966ddef50370f78a15f7f0f8544ea6";

//   // Auto fetch location
//   useEffect(() => {
//     if (locationMode !== "auto") return;
//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city = locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall: weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };
//     fetchAutoData();
//   }, [locationMode]);

//   // Manual location fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationName)}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(locationName)}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall: weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // AI suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture: weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature: weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall: weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };

//       console.log("📤 Sending:", inputData);

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       if (!aiRes.ok) throw new Error("Server error");

//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);

//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         setFertilizer(aiData.data.fertilizer || {});
//         setPesticide(aiData.data.pesticide || {});
//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #a8e6cf, #dcedc1)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: "850px",
//           borderRadius: "25px",
//           boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
//           backgroundColor: "#ffffff",
//           fontFamily: "'Poppins', sans-serif",
//           padding: "30px",
//           animation: "fadeIn 1s ease-in-out",
//         }}
//       >
//         <Card.Body>
//           <h2
//             style={{
//               fontWeight: "800",
//               textAlign: "center",
//               color: "#1b5e20",
//               marginBottom: "35px",
//               fontSize: "2rem",
//               textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
//             }}
//           >
//             🌾 AgriSense Smart Farming Advisor
//           </h2>

//           <Form>
//             {/* Location Mode */}
//             <Form.Group>
//               <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>
//                 📍 Location Mode
//               </h5>
//               <div>
//                 <Form.Check
//                   inline
//                   label="Auto Fetch"
//                   type="radio"
//                   value="auto"
//                   checked={locationMode === "auto"}
//                   onChange={() => setLocationMode("auto")}
//                 />
//                 <Form.Check
//                   inline
//                   label="Manual Entry"
//                   type="radio"
//                   value="manual"
//                   checked={locationMode === "manual"}
//                   onChange={() => setLocationMode("manual")}
//                 />
//               </div>
//             </Form.Group>

//             {/* Manual Input */}
//             <Form.Group className="mt-3">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter city (e.g., Bhubaneswar)"
//                 value={locationName}
//                 onChange={(e) => setLocationName(e.target.value)}
//                 disabled={locationMode === "auto"}
//                 style={{
//                   borderRadius: "15px",
//                   padding: "14px",
//                   fontWeight: "500",
//                   fontSize: "0.95rem",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                 }}
//               />
//               {locationMode === "manual" && (
//                 <Button
//                   onClick={fetchManualData}
//                   className="mt-2"
//                   variant="success"
//                   style={{
//                     borderRadius: "12px",
//                     fontWeight: "700",
//                     padding: "10px 20px",
//                     boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
//                     transition: "0.3s",
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//                   onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                 >
//                   Fetch Data
//                 </Button>
//               )}
//             </Form.Group>

//             {/* Error */}
//             {error && <p style={{ color: "red", marginTop: "10px", fontWeight: "600" }}>{error}</p>}

//             {/* Spinner */}
//             {loading && (
//               <div style={{ textAlign: "center", marginTop: "25px" }}>
//                 <Spinner animation="border" variant="success" />
//                 <p style={{ color: "#2e7d32", marginTop: "12px", fontWeight: "600" }}>
//                   Fetching live farm data...
//                 </p>
//               </div>
//             )}

//             {/* Environment Data */}
//             {!loading && weather.temperature && (
//               <Card
//                 style={{
//                   backgroundColor: "#e8f5e9",
//                   borderLeft: "8px solid #43a047",
//                   borderRadius: "15px",
//                   padding: "20px",
//                   marginTop: "25px",
//                   boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//                   transition: "0.3s",
//                 }}
//               >
//                 <h5 style={{ color: "#2e7d32", fontWeight: "800" }}>🌍 Environment Data</h5>
//                 <p><b>Location:</b> {locationName}</p>
//                 <p><b>Temperature:</b> {weather.temperature} °C</p>
//                 <p><b>Humidity:</b> {weather.humidity} %</p>
//                 <p><b>Rainfall:</b> {weather.rainfall}</p>
//                 <p><b>Soil pH:</b> {soil.ph}</p>
//               </Card>
//             )}

//             {/* Crop Selector */}
//             <Form.Group className="mt-4">
//               <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>🌱 Select Crop</h5>
//               <Form.Select
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//                 style={{
//                   borderRadius: "15px",
//                   padding: "12px",
//                   fontWeight: "500",
//                   fontSize: "0.95rem",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <option value="">-- Select a Crop --</option>
//                 {[
//                   "Rice","Wheat","Maize","Barley","Sugarcane","Cotton",
//                   "Soybean","Groundnut","Mustard","Potato","Tomato","Onion",
//                   "Pulses","Millet","Banana","Sorghum","Bajra","Chili","Tea","Coffee"
//                 ].map((c) => (
//                   <option key={c} value={c.toLowerCase()}>{c}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* AI Button */}
//             <Button
//               onClick={getAISuggestion}
//               className="mt-4"
//               style={{
//                 width: "100%",
//                 borderRadius: "15px",
//                 fontWeight: "800",
//                 backgroundColor: "#1b5e20",
//                 border: "none",
//                 padding: "14px",
//                 fontSize: "1rem",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//               onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//             </Button>

//             {/* AI Result */}
//             {aiAdvice && (
//               <Card
//                 style={{
//                   marginTop: "30px",
//                   background: "#dcedc1",
//                   borderLeft: "8px solid #689f38",
//                   padding: "20px",
//                   borderRadius: "15px",
//                   boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//                   animation: "fadeIn 0.8s ease-in",
//                 }}
//               >
//                 <h5 style={{ color: "#33691e", fontWeight: "800" }}>🧠 AI Recommendation</h5>

//                 <div style={{ marginTop: "12px", lineHeight: "1.6" }}>
//                   <p><b>🌱 Advice:</b> {aiAdvice}</p>
//                   {fertilizer.name && <p><b>💧 Fertilizer:</b> {fertilizer.name} ({fertilizer.amount_kg} kg)</p>}
//                   {pesticide.name && <p><b>🧴 Pesticide:</b> {pesticide.name} ({pesticide.amount_kg} kg)</p>}
//                   <p><b>💦 Irrigation:</b> {irrigation}</p>
//                   <p><b>🌍 Sustainability Tip:</b> {sustainability}</p>
//                 </div>
//               </Card>
//             )}
//           </Form>
//         </Card.Body>
//       </Card>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0; transform:translateY(15px);} to {opacity:1; transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }

//         @media (max-width: 768px) {
//           h2 { font-size: 1.6rem; }
//           Button { font-size: 0.95rem; padding: 10px; }
//           .card-body { padding: 15px; }
//         }
//       `}
//       </style>
//     </div>
//   );
// }

// export default AISuggestion;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("manual"); // Start with Manual mode
//   const [locationName, setLocationName] = useState(""); // Manual location name
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const WEATHER_API = "5b966ddef50370f78a15f7f0f8544ea6";

//   // 🗺 Auto Fetch Location + Data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         navigator.geolocation.getCurrentPosition(
//           async (pos) => {
//             const latitude = pos.coords.latitude;
//             const longitude = pos.coords.longitude;
//             setLat(latitude);
//             setLon(longitude);

//             // 🌆 Reverse Geocode
//             const locRes = await fetch(
//               `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//             );
//             const locData = await locRes.json();
//             const city =
//               locData.city ||
//               locData.locality ||
//               locData.principalSubdivision ||
//               "Unknown Location";
//             setLocationName(city);

//             // 🌦 Weather
//             const weatherRes = await fetch(
//              ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//             );
//             const weatherData = await weatherRes.json();

//             setWeather({
//               temperature: weatherData.main?.temp ?? "N/A",
//               humidity: weatherData.main?.humidity ?? "N/A",
//               rainfall:
//                 weatherData.rain?.["1h"] ??
//                 weatherData.rain?.["3h"] ??
//                 "No rain detected",
//             });

//             // 🌱 Soil pH
//             try {
//               const soilRes = await fetchWithTimeout(
//                 `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`,
//                 10000 // Set timeout to 10 seconds
//               );
//               const soilData = await soilRes.json();
//               const phValue =
//                 soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ??
//                 null;
//               setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });
//             } catch (err) {
//               console.error("Soil fetch failed:", err);
//               setSoil({ ph: "Unavailable" });
//             }

//             setLoading(false);
//           },
//           (err) => {
//             console.error(err);
//             setError("⚠ Unable to access location. Please allow permission.");
//             setLoading(false);
//           }
//         );
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // Function to add timeout for fetch request
//   const fetchWithTimeout = (url, timeout) => {
//     return new Promise((resolve, reject) => {
//       const timeoutId = setTimeout(() => reject("Request timed out"), timeout);

//       fetch(url)
//         .then(resolve)
//         .catch(reject)
//         .finally(() => clearTimeout(timeoutId));
//     });
//   };

//   // 🏙 Manual City Mode
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       // 🌎 Get Coordinates from OpenWeather Geocoding
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         // fallback to OpenStreetMap
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       // 🌦 Weather
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ??
//           weatherData.rain?.["3h"] ??
//           "No rain detected",
//       });

//       // 🌱 Soil pH
//       const soilRes = await fetchWithTimeout(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`,
//         10000 // Set timeout to 10 seconds
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // 🧠 AI Suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable"
//             ? 30
//             : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable"
//             ? 25
//             : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected"
//             ? 0
//             : parseFloat(weather.rainfall),
//       };

//       console.log("📤 Sending:", inputData);

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       if (!aiRes.ok) throw new Error("Server error");

//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);

//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         setFertilizer(aiData.data.fertilizer || {});
//         setPesticide(aiData.data.pesticide || {});
//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert(
//         "⚠ Could not connect to AI server. Please ensure Flask is running at port 5000."
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #a8e6cf, #dcedc1)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: "850px",
//           borderRadius: "25px",
//           boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
//           backgroundColor: "#ffffff",
//           fontFamily: "'Poppins', sans-serif",
//           padding: "30px",
//         }}
//       >
//         <Card.Body>
//           <h2
//             style={{
//               fontWeight: "800",
//               textAlign: "center",
//               color: "#1b5e20",
//               marginBottom: "35px",
//               fontSize: "2rem",
//             }}
//           >
//             🌾 AgriSense Smart Farming Advisor
//           </h2>

//           <Form>
//             {/* Location Mode */}
//             <Form.Group>
//               <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>
//                 📍 Location Mode
//               </h5>
//               <div>
//                 <Form.Check
//                   inline
//                   label="Auto Fetch"
//                   type="radio"
//                   value="auto"
//                   checked={locationMode === "auto"}
//                   onChange={() => setLocationMode("auto")}
//                 />
//                 <Form.Check
//                   inline
//                   label="Manual Entry"
//                   type="radio"
//                   value="manual"
//                   checked={locationMode === "manual"}
//                   onChange={() => setLocationMode("manual")}
//                 />
//               </div>
//             </Form.Group>

//             {/* Manual Input */}
//             {locationMode === "manual" && (
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Bhubaneswar)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   style={{
//                     borderRadius: "15px",
//                     padding: "14px",
//                     fontWeight: "500",
//                     fontSize: "0.95rem",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                   }}
//                 />
//                 <Button
//                   onClick={fetchManualData}
//                   className="mt-2"
//                   variant="success"
//                   style={{
//                     borderRadius: "12px",
//                     fontWeight: "700",
//                     padding: "10px 20px",
//                   }}
//                 >
//                   Fetch Data
//                 </Button>
//               </Form.Group>
//             )}

//             {/* Error */}
//             {error && (
//               <p style={{ color: "red", marginTop: "10px", fontWeight: "600" }}>
//                 {error}
//               </p>
//             )}

//             {/* Spinner */}
//             {loading && (
//               <div style={{ textAlign: "center", marginTop: "25px" }}>
//                 <Spinner animation="border" variant="success" />
//                 <p
//                   style={{
//                     color: "#2e7d32",
//                     marginTop: "12px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Fetching live farm data...
//                 </p>
//               </div>
//             )}

//             {/* Environment Data */}
//             {!loading && weather.temperature && (
//               <Card
//                 style={{
//                   backgroundColor: "#e8f5e9",
//                   borderLeft: "8px solid #43a047",
//                   borderRadius: "15px",
//                   padding: "20px",
//                   marginTop: "25px",
//                 }}
//               >
//                 <h5 style={{ color: "#2e7d32", fontWeight: "800" }}>
//                   🌍 Environment Data
//                 </h5>
//                 <p>
//                   <b>Location:</b> {locationName}
//                 </p>
//                 <p>
//                   <b>Temperature:</b> {weather.temperature} °C
//                 </p>
//                 <p>
//                   <b>Humidity:</b> {weather.humidity} %
//                 </p>
//                 <p>
//                   <b>Rainfall:</b> {weather.rainfall}
//                 </p>
//                 <p>
//                   <b>Soil pH:</b> {soil.ph}
//                 </p>
//               </Card>
//             )}

//             {/* Crop Selector */}
//             <Form.Group className="mt-4">
//               <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>
//                 🌱 Select Crop
//               </h5>
//               <Form.Select
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//                 style={{
//                   borderRadius: "15px",
//                   padding: "12px",
//                   fontWeight: "500",
//                   fontSize: "0.95rem",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <option value="">-- Select a Crop --</option>
//                 {[
//                   "Rice",
//                   "Wheat",
//                   "Maize",
//                   "Sugarcane",
//                   "Cotton",
//                   "Soybean",
//                   "Tomato",
//                   "Potato",
//                   "Banana",
//                   "Pulses",
//                 ].map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* AI Button */}
//             <Button
//               onClick={getAISuggestion}
//               className="mt-4"
//               style={{
//                 width: "100%",
//                 borderRadius: "15px",
//                 fontWeight: "800",
//                 backgroundColor: "#1b5e20",
//                 border: "none",
//                 padding: "14px",
//               }}
//             >
//               {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//             </Button>

//             {/* AI Result */}
//             {aiAdvice && (
//               <Card
//                 style={{
//                   marginTop: "30px",
//                   background: "#dcedc1",
//                   borderLeft: "8px solid #689f38",
//                   padding: "20px",
//                   borderRadius: "15px",
//                 }}
//               >
//                 <h5 style={{ color: "#33691e", fontWeight: "800" }}>
//                   🧠 AI Recommendation
//                 </h5>

//                 <div style={{ marginTop: "12px", lineHeight: "1.6" }}>
//                   <p>
//                     <b>🌱 Advice:</b> {aiAdvice}
//                   </p>
//                   {fertilizer.name && (
//                     <p>
//                       <b>💧 Fertilizer:</b> {fertilizer.name} (
//                       {fertilizer.amount_kg} kg)
//                     </p>
//                   )}
//                   {pesticide.name && (
//                     <p>
//                       <b>🧴 Pesticide:</b> {pesticide.name} (
//                       {pesticide.amount_kg} kg)
//                     </p>
//                   )}
//                   <p>
//                     <b>💦 Irrigation:</b> {irrigation}
//                   </p>
//                   <p>
//                     <b>🌍 Sustainability Tip:</b> {sustainability}
//                   </p>
//                 </div>
//               </Card>
//             )}
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default AISuggestion;







// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";

// export default function AISuggestion() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",  // This will hold the soil pH value (to be fetched)
//     crop: "",
//     city: "",
//     mode: "auto", // Default to auto
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const WEATHER_API = "5b966ddef50370f78a15f7f0f8544ea6"; // OpenWeatherMap API Key

//   // 🌍 AUTO — Fetch weather data and soil pH based on Geolocation
//   useEffect(() => {
//     if (form.mode !== "auto") return;

//     const fetchAutoData = async () => {
//       if (!navigator.geolocation) {
//         setError("Geolocation not supported");
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(async (pos) => {
//         const { latitude, longitude } = pos.coords;

//         try {
//           // Reverse geocode to get the city name from coordinates
//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();

//           // Check if locData is valid and contains city or locality information
//           if (!locData || !locData.city) {
//             throw new Error("Unable to retrieve city information from reverse geocoding.");
//           }

//           const city = locData.city || locData.locality || "Unknown";

//           // Fetch weather data using the obtained coordinates
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();

//           // Check if weather data is valid
//           if (!weatherData || !weatherData.main) {
//             throw new Error("Unable to retrieve weather information.");
//           }

//           // Simulate fetching Soil pH based on location (use a static value or predefined data)
//           const soilPh = await fetchSoilPh(latitude, longitude); // This function can be replaced with a real API call

//           setForm((prevState) => ({
//             ...prevState,
//             city: city,
//             temperature: weatherData.main?.temp,
//             humidity: weatherData.main?.humidity,
//             moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
//             soil: soilPh,  // Set the fetched soil pH value
//           }));

//         } catch (error) {
//           console.error("Error in fetching data:", error);
//           setError("Failed to fetch data: ${error.message}");
//         }
//       }, (err) => {
//         // Handle geolocation permission or other errors
//         console.error("Geolocation error:", err);
//         setError("❌ Geolocation access denied or unavailable.");
//       });
//     };

//     fetchAutoData();
//   }, [form.mode]);

//   // 📌 Simulate fetching Soil pH based on latitude and longitude (static value for now)
//   const fetchSoilPh = (latitude, longitude) => {
//     // This is a simulated function. Replace this with an actual API or predefined soil pH mapping.
//     return 6.5;  // Return a static value for simplicity
//   };

//   // 📌 MANUAL MODE — Fetch weather data based on User Input
//   const fetchManualData = async () => {
//     if (!form.city) return setError("Please enter a city");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${form.city}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();

//       setForm((prevState) => ({
//         ...prevState,
//         temperature: weatherData.main?.temp,
//         humidity: weatherData.main?.humidity,
//         moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
//       }));
//     } catch (error) {
//       setError("❌ Failed to fetch weather data.");
//     }
//   };

//   // 🧠 PREDICT - Send data to backend and get AI prediction
//   const getAISuggestion = async () => {
//     try {
//       const payload = {
//         ph: parseFloat(form.soil) || 6.5,  // Ensure soil is passed and default value is 6.5
//         soil_moisture: form.moisture || 30,  // Map moisture to Soil_Moisture
//         temperature: form.temperature || 25,  // Map temperature to Temperature_C
//         humidity: form.humidity || 60,  // Map humidity to Humidity
//       };

//       const res = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         throw new Error("Server error: ${res.statusText}");
//       }

//       const data = await res.json();
//       if (data.status !== "success") {
//         throw new Error("Prediction failed. Invalid response from server.");
//       }

//       setResult(data.ai_recommendation);
//       setShowModal(true);
//     } catch (e) {
//       console.error("Error in AI prediction:", e);
//       setError("AI server error: ${e.message}");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if all the required fields are filled
//     if (!form.temperature || !form.humidity || !form.moisture || !form.soil ) {
//       setError("❌ Please fill all fields.");
//       return;  // Stop further execution if any field is empty
//     }

//     // Clear any previous error message
//     setError("");

//     // Set loading state and call the prediction function
//     setLoading(true);
//     getAISuggestion();
//   };

//   return (
//     <>
      
//       <div className="container">
//         <Card>
//           <Card.Body>
//             <h2 className="text-center">🌾 Smart Farm AI Advisor</h2>

//             <Form onSubmit={handleSubmit}>
//               {/* Location Mode Selection */}
//               <div className="mb-2">
//                 <Form.Check
//                   inline
//                   label="Auto Mode"
//                   type="radio"
//                   checked={form.mode === "auto"}
//                   onChange={() => setForm({ ...form, mode: "auto" })}
//                 />
//                 <Form.Check
//                   inline
//                   label="Manual Mode"
//                   type="radio"
//                   checked={form.mode === "manual"}
//                   onChange={() => setForm({ ...form, mode: "manual" })}
//                 />
//               </div>

//               {/* Manual Mode - Input city */}
//               {form.mode === "manual" && (
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter city"
//                     value={form.city}
//                     onChange={(e) => setForm({ ...form, city: e.target.value })}
//                   />
//                   <Button onClick={fetchManualData} className="mt-2">
//                     Fetch Weather
//                   </Button>
//                 </Form.Group>
//               )}

//               {/* Form Inputs for Soil & Environmental Data */}
//               <Form.Group>
//                 <Form.Label>Temperature (°C)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={form.temperature}
//                   onChange={(e) => setForm({ ...form, temperature: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Humidity (%)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={form.humidity}
//                   onChange={(e) => setForm({ ...form, humidity: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Soil Moisture (%)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={form.moisture}
//                   onChange={(e) => setForm({ ...form, moisture: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Soil pH</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={form.soil}  // Soil pH (fetched or default)
//                   onChange={(e) => setForm({ ...form, soil: e.target.value })}
//                 />
//               </Form.Group>

            
//               <Button variant="success" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Get AI Suggestion"}
//               </Button>
//             </Form>

//             {/* Error Message */}
//             {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           </Card.Body>
//         </Card>
//       </div>

//       {/* AI Prediction Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>AI Farm Plan</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {result && (
//             <>
//               <p><b>🌱 Best Crop:</b> {result.best_crop}</p>
//               <p><b>🌾 Fertilizer:</b> {result.fertilizer.name} ({result.fertilizer.amount_kg_per_acre} kg/acre)</p>
//               <p><b>🛡 Pesticide:</b> {result.pesticide.name} ({result.pesticide.amount_kg_per_acre} kg/acre)</p>
//               <p><b>💧 Irrigation:</b> {result.irrigation.message}</p>
//               <p><b>♻ Sustainability Tip:</b> {result.sustainability_tip}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }













// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Card, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";
// import { FaSeedling, FaCloudSun, FaWater, FaThermometerHalf, FaLeaf } from "react-icons/fa";

// export default function AISuggestion() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     city: "",
//     mode: "auto",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const WEATHER_API = "5b966ddef50370f78a15f7f0f8544ea6";

//   // 🌍 AUTO FETCH
//   useEffect(() => {
//     if (form.mode !== "auto") return;

//     const fetchAutoData = async () => {
//       if (!navigator.geolocation) {
//         setError("Geolocation not supported");
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         async (pos) => {
//           const { latitude, longitude } = pos.coords;

//           try {
//             const locRes = await fetch(
//               `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//             );
//             const locData = await locRes.json();
//             if (!locData || !locData.city) throw new Error("Unable to get city info");

//             const city = locData.city || locData.locality || "Unknown";
//             const weatherRes = await fetch(
//               `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//             );
//             const weatherData = await weatherRes.json();
//             if (!weatherData || !weatherData.main) throw new Error("Weather unavailable");

//             const soilPh = await fetchSoilPh(latitude, longitude);

//             setForm((prev) => ({
//               ...prev,
//               city: city,
//               temperature: weatherData.main?.temp,
//               humidity: weatherData.main?.humidity,
//               moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
//               soil: soilPh,
//             }));
//           } catch (err) {
//             console.error(err);
//             setError(`⚠️ ${err.message}`);
//           }
//         },
//         (err) => {
//           setError("❌ Geolocation access denied or unavailable.");
//         }
//       );
//     };
//     fetchAutoData();
//   }, [form.mode]);

//   const fetchSoilPh = () => 6.5;

//   // MANUAL FETCH
//   const fetchManualData = async () => {
//     if (!form.city) return setError("Please enter a city");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${form.city}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();

//       setForm((prev) => ({
//         ...prev,
//         temperature: weatherData.main?.temp,
//         humidity: weatherData.main?.humidity,
//         moisture: (weatherData.main?.humidity * 0.5).toFixed(1),
//       }));
//     } catch (error) {
//       setError("❌ Failed to fetch weather data.");
//     }
//   };

//   // AI Suggestion
//   const getAISuggestion = async () => {
//     try {
//       const payload = {
//         ph: parseFloat(form.soil) || 6.5,
//         soil_moisture: form.moisture || 30,
//         temperature: form.temperature || 25,
//         humidity: form.humidity || 60,
//       };

//       const res = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Server Error");
//       const data = await res.json();
//       if (data.status !== "success") throw new Error("Invalid server response");

//       setResult(data.ai_recommendation);
//       setShowModal(true);
//     } catch (e) {
//       setError(`AI server error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.temperature || !form.humidity || !form.moisture || !form.soil)
//       return setError("❌ Please fill all fields.");

//     setError("");
//     setLoading(true);
//     getAISuggestion();
//   };

//   return (
//     <>
    
//       <div
//         className="min-vh-100 d-flex flex-column align-items-center justify-content-start py-5 px-3"
//         style={{
//           background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
//           fontFamily: "'Poppins', sans-serif",
//         }}
//       >
//         <Card
//           className="shadow-lg border-0"
//           style={{
//             width: "100%",
//             maxWidth: "700px",
//             borderRadius: "20px",
//             background: "white",
//             overflow: "hidden",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body className="p-4">
//             <div className="text-center mb-4">
//               <FaSeedling size={40} color="#2E7D32" className="mb-2 animate-pulse" />
//               <h3 className="fw-bold text-success">🌾 Smart Farm AI Advisor</h3>
//               <p className="text-muted small">
//                 Get instant AI-powered suggestions for fertilizer, irrigation & crop care
//               </p>
//             </div>

//             <Form onSubmit={handleSubmit}>
//               {/* Mode Selection */}
//               <div className="d-flex justify-content-center mb-3">
//                 <Form.Check
//                   inline
//                   label="Auto Mode"
//                   type="radio"
//                   checked={form.mode === "auto"}
//                   onChange={() => setForm({ ...form, mode: "auto" })}
//                 />
//                 <Form.Check
//                   inline
//                   label="Manual Mode"
//                   type="radio"
//                   checked={form.mode === "manual"}
//                   onChange={() => setForm({ ...form, mode: "manual" })}
//                 />
//               </div>

//               {/* Manual City Input */}
//               {form.mode === "manual" && (
//                 <div className="text-center mb-3">
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter city name"
//                     value={form.city}
//                     onChange={(e) => setForm({ ...form, city: e.target.value })}
//                     className="mb-2 rounded-3 shadow-sm"
//                   />
//                   <Button
//                     variant="outline-success"
//                     onClick={fetchManualData}
//                     size="sm"
//                   >
//                     Fetch Weather
//                   </Button>
//                 </div>
//               )}

//               {/* Input Fields */}
//               <div className="row g-3 mt-3">
//                 <div className="col-md-6">
//                   <Form.Group>
//                     <Form.Label>
//                       <FaThermometerHalf className="me-1 text-danger" /> Temperature (°C)
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={form.temperature}
//                       onChange={(e) => setForm({ ...form, temperature: e.target.value })}
//                       className="shadow-sm"
//                     />
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group>
//                     <Form.Label>
//                       <FaWater className="me-1 text-primary" /> Humidity (%)
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={form.humidity}
//                       onChange={(e) => setForm({ ...form, humidity: e.target.value })}
//                       className="shadow-sm"
//                     />
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group>
//                     <Form.Label>
//                       <FaCloudSun className="me-1 text-info" /> Soil Moisture (%)
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={form.moisture}
//                       onChange={(e) => setForm({ ...form, moisture: e.target.value })}
//                       className="shadow-sm"
//                     />
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group>
//                     <Form.Label>
//                       <FaLeaf className="me-1 text-success" /> Soil pH
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={form.soil}
//                       onChange={(e) => setForm({ ...form, soil: e.target.value })}
//                       className="shadow-sm"
//                     />
//                   </Form.Group>
//                 </div>
//               </div>

//               <div className="text-center mt-4">
//                 <Button
//                   variant="success"
//                   type="submit"
//                   className="px-5 py-2 fw-bold shadow-sm rounded-pill"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <Spinner
//                         as="span"
//                         animation="border"
//                         size="sm"
//                         role="status"
//                         aria-hidden="true"
//                         className="me-2"
//                       />
//                       Analyzing...
//                     </>
//                   ) : (
//                     "🧠 Get AI Suggestion"
//                   )}
//                 </Button>
//               </div>

//               {error && (
//                 <div className="alert alert-danger text-center mt-3 fw-semibold small">
//                   {error}
//                 </div>
//               )}
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header
//           closeButton
//           style={{ background: "linear-gradient(90deg, #43A047, #66BB6A)", color: "white" }}
//         >
//           <Modal.Title>🌿 AI Farm Plan</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ background: "#F9FFF9" }}>
//           {result ? (
//             <div className="p-2">
//               <p><b>🌱 Best Crop:</b> {result.best_crop}</p>
//               <p><b>🌾 Fertilizer:</b> {result.fertilizer.name} ({result.fertilizer.amount_kg_per_acre} kg/acre)</p>
//               <p><b>🛡 Pesticide:</b> {result.pesticide.name} ({result.pesticide.amount_kg_per_acre} kg/acre)</p>
//               <p><b>💧 Irrigation:</b> {result.irrigation.message}</p>
//               <p><b>♻ Sustainability Tip:</b> {result.sustainability_tip}</p>
//             </div>
//           ) : (
//             <p className="text-center text-muted">No data available.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="outline-success" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* CSS Animations */}
//       <style>{`
//         @keyframes fadeIn {
//           from {opacity: 0; transform: translateY(20px);}
//           to {opacity: 1; transform: translateY(0);}
//         }
//         .animate-pulse {
//           animation: pulse 1.5s infinite;
//         }
//         @keyframes pulse {
//           0% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.1); opacity: 0.8; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//       `}</style>
//     </>
//   );
// }












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
