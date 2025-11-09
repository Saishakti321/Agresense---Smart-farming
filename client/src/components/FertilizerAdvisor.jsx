










// import React, { useState } from "react";

// export default function FertilizerAdvisor() {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     setError("");

//     try {
//       const query = new URLSearchParams(formData).toString();
//       const res = await fetch(`http://localhost:1000/fertilizer?${query}`);
//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResult(data);
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please ensure your backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🌾 Fertilizer Advisor</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         {Object.keys(formData).map((key) => (
//           <div key={key} style={styles.inputGroup}>
//             <label style={styles.label}>{key}</label>
//             <input
//               type="text"
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//               required
//               placeholder={`Enter ${key}`}
//               style={styles.input}
//             />
//           </div>
//         ))}

//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? "Predicting..." : "Get Fertilizer Plan"}
//         </button>
//       </form>

//       {error && <div style={styles.errorBox}>⚠️ {error}</div>}

//       {result && result.predicted_fertilizer && (
//         <div style={styles.resultBox}>
//           <h3 style={styles.subtitle}>
//             Recommended Fertilizer:{" "}
//             <span style={{ color: "#007BFF", fontWeight: "bold" }}>
//               {result.predicted_fertilizer}
//             </span>
//           </h3>

//           <h4 style={{ marginTop: "10px" }}>🌱 Next 10-Day Schedule:</h4>
//           <ul style={styles.scheduleList}>
//             {result.schedule.map((day, index) => (
//               <li key={index} style={styles.scheduleItem}>
//                 <strong>{day.date}</strong> —{" "}
//                 <span
//                   style={{
//                     color: day.action === "Apply" ? "green" : "#ff9800",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {day.action}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// // Inline CSS Styles
// const styles = {
//   container: {
//     maxWidth: "750px",
//     margin: "40px auto",
//     padding: "25px",
//     background: "linear-gradient(to bottom, #ffffff, #f3f9f6)",
//     borderRadius: "16px",
//     boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
//     fontFamily: "Inter, Arial, sans-serif",
//   },
//   title: {
//     textAlign: "center",
//     color: "#1b4332",
//     fontWeight: "700",
//     fontSize: "28px",
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "15px",
//     marginTop: "20px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     fontWeight: "600",
//     marginBottom: "5px",
//     color: "#333",
//     textTransform: "capitalize",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   },
//   button: {
//     gridColumn: "1 / span 2",
//     padding: "12px",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginTop: "10px",
//     fontWeight: "600",
//     transition: "background 0.3s",
//   },
//   resultBox: {
//     marginTop: "30px",
//     background: "#ffffff",
//     padding: "20px",
//     borderRadius: "10px",
//     border: "1px solid #e0e0e0",
//   },
//   subtitle: {
//     fontSize: "18px",
//     color: "#333",
//   },
//   scheduleList: {
//     listStyleType: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   scheduleItem: {
//     background: "#f1f1f1",
//     padding: "8px",
//     borderRadius: "5px",
//     marginBottom: "5px",
//   },
//   errorBox: {
//     background: "#ffe5e5",
//     color: "#d32f2f",
//     padding: "10px",
//     borderRadius: "6px",
//     marginTop: "15px",
//     textAlign: "center",
//   },
// };



// import React, { useState } from "react";

// export default function FertilizerAdvisor() {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("http://localhost:5002/predict_fertilizer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🌾 Smart Fertilizer Advisor</h2>
//       <p style={styles.subtitle}>
//         Enter your farm details to get the best fertilizer suggestion and 10-day plan.
//       </p>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label>🌡️ Temperature</label>
//         <input name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Enter temperature (°C)" required />

//         <label>💧 Humidity</label>
//         <input name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Enter humidity (%)" required />

//         <label>🌱 Moisture</label>
//         <input name="moisture" value={formData.moisture} onChange={handleChange} placeholder="Enter soil moisture (%)" required />

//         <label>🌾 Soil Type</label>
//         <input name="soil" value={formData.soil} onChange={handleChange} placeholder="e.g. Loamy, Sandy" required />

//         <label>🌿 Crop Type</label>
//         <select name="crop" value={formData.crop} onChange={handleChange} required>
//           <option value="">-- Select Crop --</option>
//           <option value="Wheat">Wheat</option>
//           <option value="Rice">Rice</option>
//           <option value="Maize">Maize</option>
//           <option value="Sugarcane">Sugarcane</option>
//           <option value="Cotton">Cotton</option>
//           <option value="Paddy">Paddy</option>
//           <option value="Tomato">Tomato</option>
//           <option value="Potato">Potato</option>
//           <option value="Pulses">Pulses</option>
//         </select>

//         <label>🌿 Nitrogen (N)</label>
//         <input name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="Enter nitrogen level" required />

//         <label>⚗️ Potassium (K)</label>
//         <input name="potassium" value={formData.potassium} onChange={handleChange} placeholder="Enter potassium level" required />

//         <label>🧪 Phosphorous (P)</label>
//         <input name="phosphorous" value={formData.phosphorous} onChange={handleChange} placeholder="Enter phosphorous level" required />

//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? "🔍 Checking..." : "🌾 Get Fertilizer Suggestion"}
//         </button>
//       </form>

//       {result && result.predicted_fertilizer && (
//         <div style={styles.resultBox}>
//           <h3>🌱 Recommended Fertilizer:</h3>
//           <p style={styles.fertName}>{result.predicted_fertilizer}</p>
//           <p style={styles.desc}>{result.description}</p>

//           <h4 style={{ marginTop: "10px" }}>📅 10-Day Action Plan:</h4>
//           <ul style={styles.scheduleList}>
//             {result.schedule.map((item, index) => (
//               <li key={index} style={styles.scheduleItem}>
//                 <strong>{item.date}</strong> — {item.action}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// // ✅ Simple, readable farmer-friendly style
// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "50px auto",
//     padding: "30px 40px",
//     background: "#ffffff",
//     borderRadius: "20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//     fontFamily: "'Poppins', sans-serif",
//   },
//   title: {
//     textAlign: "center",
//     color: "#1b5e20",
//     fontSize: "28px",
//     fontWeight: "700",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     textAlign: "center",
//     color: "#444",
//     fontSize: "16px",
//     marginBottom: "30px",
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     fontWeight: "600",
//     marginBottom: "6px",
//     color: "#2e7d32",
//     fontSize: "15px",
//   },
//   input: {
//     padding: "10px",
//     border: "1.5px solid #a5d6a7",
//     borderRadius: "8px",
//     fontSize: "15px",
//     outline: "none",
//     transition: "0.2s",
//   },
//   inputFocus: {
//     borderColor: "#43a047",
//     boxShadow: "0 0 5px rgba(67,160,71,0.3)",
//   },
//   button: {
//     gridColumn: "span 2",
//     backgroundColor: "#2e7d32",
//     color: "white",
//     padding: "14px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "17px",
//     fontWeight: "600",
//     marginTop: "10px",
//     transition: "0.2s ease-in-out",
//   },
//   buttonHover: {
//     backgroundColor: "#1b5e20",
//   },
//   resultBox: {
//     marginTop: "35px",
//     background: "#f9fff9",
//     padding: "25px",
//     borderRadius: "12px",
//     border: "1px solid #c8e6c9",
//     textAlign: "center",
//   },
//   fertName: {
//     fontSize: "22px",
//     color: "#1b5e20",
//     fontWeight: "bold",
//     marginBottom: "8px",
//   },
//   desc: {
//     color: "#333",
//     fontSize: "16px",
//     marginBottom: "20px",
//   },
//   scheduleList: {
//     listStyleType: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   scheduleItem: {
//     padding: "10px 12px",
//     borderRadius: "6px",
//     marginBottom: "8px",
//     fontSize: "15px",
//     fontWeight: "500",
//   },
//   applyDay: {
//     background: "#c8e6c9",
//     color: "#1b5e20",
//   },
//   monitorDay: {
//     background: "#f1f8e9",
//     color: "#333",
//   },
// };




// import React, { useState } from "react";
// import Snav from "./sidenav";

// export default function FertilizerAdvisor() {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("http://localhost:5002/predict_fertilizer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//    <>
//  <Snav />
//      <div style={styles.wrapper}>
//       <div style={styles.container}>
//         <h2 style={styles.title}>🌾 Smart Fertilizer Advisor</h2>
//         <p style={styles.subtitle}>
//           Get the best fertilizer suggestion and a detailed 10-day schedule tailored for your crop.
//         </p>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           {[
//             { label: "🌡️ Temperature (°C)", name: "temperature" },
//             { label: "💧 Humidity (%)", name: "humidity" },
//             { label: "🌱 Moisture (%)", name: "moisture" },
//             { label: "🌾 Soil Type", name: "soil" },
//           ].map((field) => (
//             <div key={field.name} style={styles.inputGroup}>
//               <label style={styles.label}>{field.label}</label>
//               <input
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${field.label.toLowerCase()}`}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           ))}

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>🌿 Crop Type</label>
//             <select
//               name="crop"
//               value={formData.crop}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             >
//               <option value="">-- Select Crop --</option>
//               <option value="Wheat">Wheat</option>
//               <option value="Rice">Rice</option>
//               <option value="Maize">Maize</option>
//               <option value="Sugarcane">Sugarcane</option>
//               <option value="Cotton">Cotton</option>
//               <option value="Paddy">Paddy</option>
//               <option value="Tomato">Tomato</option>
//               <option value="Potato">Potato</option>
//               <option value="Pulses">Pulses</option>
//             </select>
//           </div>

//           {[
//             { label: "🌿 Nitrogen (N)", name: "nitrogen" },
//             { label: "⚗️ Potassium (K)", name: "potassium" },
//             { label: "🧪 Phosphorous (P)", name: "phosphorous" },
//           ].map((field) => (
//             <div key={field.name} style={styles.inputGroup}>
//               <label style={styles.label}>{field.label}</label>
//               <input
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${field.label.toLowerCase()}`}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           ))}

//           <button type="submit" style={styles.button} disabled={loading}>
//             {loading ? "🔍 Analyzing..." : "🌿 Get Fertilizer Suggestion"}
//           </button>
//         </form>

//         {result && result.predicted_fertilizer && (
//           <div style={styles.resultBox}>
//             <h3>🌱 Recommended Fertilizer</h3>
//             <p style={styles.fertName}>{result.predicted_fertilizer}</p>
//             <p style={styles.desc}>{result.description}</p>

//             <h4 style={{ marginTop: "15px", color: "#1b5e20" }}>📅 10-Day Action Plan</h4>
//             <ul style={styles.scheduleList}>
//               {result.schedule.map((item, index) => (
//                 <li key={index} style={styles.scheduleItem}>
//                   <strong>{item.date}</strong> — {item.action}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }

// // 🌾 Elegant Modern Styling
// const styles = {
//   wrapper: {
//     background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
//     minHeight: "100vh",
//     padding: "40px 10px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "750px",
//     background: "white",
//     padding: "40px 50px",
//     borderRadius: "25px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//     fontFamily: "'Poppins', sans-serif",
//     transition: "0.3s ease-in-out",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: "30px",
//     fontWeight: "700",
//     color: "#1b5e20",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: "16px",
//     marginBottom: "35px",
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px 25px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     fontWeight: "600",
//     color: "#2e7d32",
//     marginBottom: "6px",
//   },
//   input: {
//     padding: "12px 14px",
//     borderRadius: "10px",
//     border: "1.8px solid #c8e6c9",
//     fontSize: "15px",
//     outline: "none",
//     transition: "all 0.2s ease-in-out",
//   },
//   button: {
//     gridColumn: "span 2",
//     background: "linear-gradient(135deg, #43a047, #2e7d32)",
//     color: "white",
//     padding: "15px",
//     fontSize: "17px",
//     fontWeight: "600",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//     marginTop: "10px",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },
//   buttonHover: {
//     transform: "scale(1.05)",
//     boxShadow: "0 6px 20px rgba(46,125,50,0.3)",
//   },
//   resultBox: {
//     color:"green",
//     marginTop: "40px",
//     background: "#f9fff9",
//     border: "1px solid #c8e6c9",
//     borderRadius: "15px",
//     padding: "25px 30px",
//     textAlign: "center",
//     boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
//   },
//   fertName: {
//     fontSize: "24px",
//     color: "#1b5e20",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   desc: {
//     color: "#444",
//     fontSize: "16px",
//     marginBottom: "20px",
//     lineHeight: "1.6",
//   },
//   scheduleList: {
//     listStyleType: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   scheduleItem: {
//     background: "#e8f5e9",
//     margin: "8px 0",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "500",
//     color: "#2e7d32",
//   },
//   "@media (max-width: 600px)": {
//     form: { gridTemplateColumns: "1fr" },
//     container: { padding: "25px 20px" },
//   },
// };




// import React, { useState } from "react";
// import Snav from "./sidenav";

// export default function FertilizerAdvisor() {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     // ✅ Correct key names and numeric conversions
//     const formattedData = {
//       temperature: parseFloat(formData.temperature),
//       humidity: parseFloat(formData.humidity),
//       moisture: parseFloat(formData.moisture),
//       soil_Type: formData.soil.trim(),
//       crop_Type: formData.crop.trim(),
//       nitrogen: parseFloat(formData.nitrogen),
//       potassium: parseFloat(formData.potassium),
//       phosphorous: parseFloat(formData.phosphorous),
//     };

//     try {
//       const res = await fetch("http://localhost:5002/predict_fertilizer", {  // assuming Node runs on 5000
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedData),
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Failed to connect to the server. Please check Flask backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Snav />
//       <div style={styles.wrapper}>
//         <div style={styles.container}>
//           <h2 style={styles.title}>🌾 Smart Fertilizer Advisor</h2>
//           <p style={styles.subtitle}>
//             Get the best fertilizer suggestion and a detailed 10-day schedule tailored for your crop.
//           </p>

//           <form onSubmit={handleSubmit} style={styles.form}>
//             {[
//               { label: "🌡️ Temperature (°C)", name: "temperature" },
//               { label: "💧 Humidity (%)", name: "humidity" },
//               { label: "🌱 Moisture (%)", name: "moisture" },
//               { label: "🌾 Soil Type", name: "soil" },
//             ].map((field) => (
//               <div key={field.name} style={styles.inputGroup}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//             ))}

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>🌿 Crop Type</label>
//               <select
//                 name="crop"
//                 value={formData.crop}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               >
//                 <option value="">-- Select Crop --</option>
//                 <option value="Wheat">Wheat</option>
//                 <option value="Rice">Rice</option>
//                 <option value="Maize">Maize</option>
//                 <option value="Sugarcane">Sugarcane</option>
//                 <option value="Cotton">Cotton</option>
//                 <option value="Paddy">Paddy</option>
//                 <option value="Tomato">Tomato</option>
//                 <option value="Potato">Potato</option>
//                 <option value="Pulses">Pulses</option>
//               </select>
//             </div>

//             {[
//               { label: "🌿 Nitrogen (N)", name: "nitrogen" },
//               { label: "⚗️ Potassium (K)", name: "potassium" },
//               { label: "🧪 Phosphorous (P)", name: "phosphorous" },
//             ].map((field) => (
//               <div key={field.name} style={styles.inputGroup}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//             ))}

//             <button type="submit" style={styles.button} disabled={loading}>
//               {loading ? "🔍 Analyzing..." : "🌿 Get Fertilizer Suggestion"}
//             </button>
//           </form>

//           {result && result.predicted_fertilizer && (
//             <div style={styles.resultBox}>
//               <h3>🌱 Recommended Fertilizer</h3>
//               <p style={styles.fertName}>{result.predicted_fertilizer}</p>
//               <p style={styles.desc}>{result.description}</p>

//               <h4 style={{ marginTop: "15px", color: "#1b5e20" }}>📅 10-Day Action Plan</h4>
//               <ul style={styles.scheduleList}>
//                 {result.schedule.map((item, index) => (
//                   <li key={index} style={styles.scheduleItem}>
//                     <strong>{item.date}</strong> — {item.action}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// // 🌾 Elegant Modern Styling
// const styles = {
//   wrapper: {
//     background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
//     minHeight: "100vh",
//     padding: "40px 10px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "750px",
//     background: "white",
//     padding: "40px 50px",
//     borderRadius: "25px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//     fontFamily: "'Poppins', sans-serif",
//     transition: "0.3s ease-in-out",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: "30px",
//     fontWeight: "700",
//     color: "#1b5e20",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: "16px",
//     marginBottom: "35px",
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px 25px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     fontWeight: "600",
//     color: "#2e7d32",
//     marginBottom: "6px",
//   },
//   input: {
//     padding: "12px 14px",
//     borderRadius: "10px",
//     border: "1.8px solid #c8e6c9",
//     fontSize: "15px",
//     outline: "none",
//     transition: "all 0.2s ease-in-out",
//   },
//   button: {
//     gridColumn: "span 2",
//     background: "linear-gradient(135deg, #43a047, #2e7d32)",
//     color: "white",
//     padding: "15px",
//     fontSize: "17px",
//     fontWeight: "600",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//     marginTop: "10px",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },
//   resultBox: {
//     color: "green",
//     marginTop: "40px",
//     background: "#f9fff9",
//     border: "1px solid #c8e6c9",
//     borderRadius: "15px",
//     padding: "25px 30px",
//     textAlign: "center",
//     boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
//   },
//   fertName: {
//     fontSize: "24px",
//     color: "#1b5e20",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   desc: {
//     color: "#444",
//     fontSize: "16px",
//     marginBottom: "20px",
//     lineHeight: "1.6",
//   },
//   scheduleList: {
//     listStyleType: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   scheduleItem: {
//     background: "#e8f5e9",
//     margin: "8px 0",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "500",
//     color: "#2e7d32",
//   },
//   "@media (max-width: 600px)": {
//     form: { gridTemplateColumns: "1fr" },
//     container: { padding: "25px 20px" },
//   },
// };





// import React, { useState } from "react";
// import Snav from "./sidenav";

// const FertilizerAdvisor = () => {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soil: "",
//     crop: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: "",
//   });

//   const [result, setResult] = useState(null);
//   // const [result, setResult] = useState(null);
//  const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🧩 Handle form field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // 🧠 Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5002/predict_fertilizer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           temperature: parseFloat(formData.temperature),
//           humidity: parseFloat(formData.humidity),
//           moisture: parseFloat(formData.moisture),
//           soil: formData.soil,
//           crop: formData.crop,
//           nitrogen: parseFloat(formData.nitrogen),
//           potassium: parseFloat(formData.potassium),
//           phosphorus: parseFloat(formData.phosphorous),
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Server returned an error");
//         return;
//       }

//       setResult(data);
//     } catch (err) {
//       setError("Error connecting to backend");
//       console.error("❌ Fetch error:", err);
//     }
//   };

//   return (
//     <>
//       {/* <Snav /> */}
//       <div style={styles.wrapper}>
//         <div style={styles.container}>
//           <h2 style={styles.title}>🌾 Smart Fertilizer Advisor</h2>
//           <p style={styles.subtitle}>
//             Get the best fertilizer suggestion and a detailed 10-day schedule tailored for your crop.
//           </p>

//           <form onSubmit={handleSubmit} style={styles.form}>
//             {[
//               { label: "🌡️ Temperature (°C)", name: "temperature" },
//               { label: "💧 Humidity (%)", name: "humidity" },
//               { label: "🌱 Moisture (%)", name: "moisture" },
//               { label: "🌾 Soil Type", name: "soil" },
//             ].map((field) => (
//               <div key={field.name} style={styles.inputGroup}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//             ))}

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>🌿 Crop Type</label>
//               <select
//                 name="crop"
//                 value={formData.crop}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               >
//                 <option value="">-- Select Crop --</option>
//                 <option value="Wheat">Wheat</option>
//                 <option value="Rice">Rice</option>
//                 <option value="Maize">Maize</option>
//                 <option value="Sugarcane">Sugarcane</option>
//                 <option value="Cotton">Cotton</option>
//                 <option value="Paddy">Paddy</option>
//                 <option value="Tomato">Tomato</option>
//                 <option value="Potato">Potato</option>
//                 <option value="Pulses">Pulses</option>
//               </select>
//             </div>

//             {[
//               { label: "🌿 Nitrogen (N)", name: "nitrogen" },
//               { label: "⚗️ Potassium (K)", name: "potassium" },
//               { label: "🧪 Phosphorous (P)", name: "phosphorous" },
//             ].map((field) => (
//               <div key={field.name} style={styles.inputGroup}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//             ))}

//             <button type="submit" style={styles.button} disabled={loading}>
//               {loading ? "🔍 Analyzing..." : "🌿 Get Fertilizer Suggestion"}
//             </button>
//           </form>

//           {result && result.predicted_fertilizer && (
//             <div style={styles.resultBox}>
//               <h3>🌱 Recommended Fertilizer</h3>
//               <p style={styles.fertName}>{result.predicted_fertilizer}</p>
//               <p style={styles.desc}>{result.description}</p>

//               <h4 style={{ marginTop: "15px", color: "#1b5e20" }}>📅 10-Day Action Plan</h4>
//               <ul style={styles.scheduleList}>
//                 {result.schedule.map((item, index) => (
//                   <li key={index} style={styles.scheduleItem}>
//                     <strong>{item.date}</strong> — {item.action}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// // 🌾 Elegant Modern Styling
// const styles = {
//   wrapper: {
//     background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
//     minHeight: "100vh",
//     padding: "40px 10px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "750px",
//     background: "white",
//     padding: "40px 50px",
//     borderRadius: "25px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//     fontFamily: "'Poppins', sans-serif",
//     transition: "0.3s ease-in-out",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: "30px",
//     fontWeight: "700",
//     color: "#1b5e20",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: "16px",
//     marginBottom: "35px",
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px 25px",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     fontWeight: "600",
//     color: "#2e7d32",
//     marginBottom: "6px",
//   },
//   input: {
//     padding: "12px 14px",
//     borderRadius: "10px",
//     border: "1.8px solid #c8e6c9",
//     fontSize: "15px",
//     outline: "none",
//     transition: "all 0.2s ease-in-out",
//   },
//   button: {
//     gridColumn: "span 2",
//     background: "linear-gradient(135deg, #43a047, #2e7d32)",
//     color: "white",
//     padding: "15px",
//     fontSize: "17px",
//     fontWeight: "600",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//     marginTop: "10px",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },
//   resultBox: {
//     color: "green",
//     marginTop: "40px",
//     background: "#f9fff9",
//     border: "1px solid #c8e6c9",
//     borderRadius: "15px",
//     padding: "25px 30px",
//     textAlign: "center",
//     boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
//   },
//   fertName: {
//     fontSize: "24px",
//     color: "#1b5e20",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   desc: {
//     color: "#444",
//     fontSize: "16px",
//     marginBottom: "20px",
//     lineHeight: "1.6",
//   },
//   scheduleList: {
//     listStyleType: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   scheduleItem: {
//     background: "#e8f5e9",
//     margin: "8px 0",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "500",
//     color: "#2e7d32",
//   },
//   "@media (max-width: 600px)": {
//     form: { gridTemplateColumns: "1fr" },
//     container: { padding: "25px 20px" },
//   },
// };

// export default FertilizerAdvisor;





// import React, { useState, useEffect } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual", // manual or auto
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:5002/get_plans");
//       const data = await res.json();
//       setPlans(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.warn("Could not fetch plans", err);
//     }
//   };

//   // 🌍 Auto Mode - Fetch Weather using GPS
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // replace this
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();

//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else {
//           setError("Unable to get weather from location.");
//         }
//       } catch {
//         setError("Error fetching auto weather.");
//       }
//     });
//   };

//   // 🏙️ Manual Mode - Fetch Weather using city
//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError("Please enter a city or district name.");
//       return;
//     }
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // replace this
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();

//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else {
//         setError("City not found.");
//       }
//     } catch {
//       setError("Failed to fetch weather for city.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`Please provide ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5002/generate_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) setError(data.error);
//       else setResult(data);
//     } catch {
//       setError("Network error: Could not reach backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePlan = async () => {
//     if (!result) return;
//     try {
//       await fetch("http://127.0.0.1:5002/save_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result),
//       });
//       alert("✅ Plan saved successfully!");
//       fetchPlans();
//     } catch {
//       alert("Failed to save plan.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     await fetch(`http://127.0.0.1:5002/delete_plan/${id}`, { method: "DELETE" });
//     fetchPlans();
//   };

//   return (
//     <>
//     <Snav/>
//     <div className="fa-page">
//       <div className="fa-header">
//         <div>
//           <h1>🌾 Smart Farm Scheduler</h1>
//           <p className="sub">
//             AI-powered Fertilizer & Pesticide Recommendation
//           </p>
//         </div>
       
//       </div>

//       <div className="fa-grid">
//         {/* ---------- Form ---------- */}
//         <form className="fa-card form" onSubmit={handleSubmit}>
//           <h2>Farm Inputs</h2>
//           {error && <div className="error">{error}</div>}

//           {/* 🌎 Toggle between Auto / Manual */}
//           <div className="mode-toggle">
//             <label className="toggle-label">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="manual"
//                 checked={form.mode === "manual"}
//                 onChange={handleChange}
//               />
//               Manual Mode
//             </label>
//             <label className="toggle-label">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="auto"
//                 checked={form.mode === "auto"}
//                 onChange={(e) => {
//                   setForm({ ...form, mode: e.target.value });
//                   if (e.target.value === "auto") fetchWeatherAuto();
//                 }}
//               />
//               Auto Mode
//             </label>
//           </div>

//           {form.mode === "manual" ? (
//             <div className="row">
//               <label>🏙️ City / District</label>
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 placeholder="Enter your city name"
//               />
//               <button
//                 type="button"
//                 className="btn mini"
//                 onClick={fetchWeatherManual}
//               >
//                 🔄 Fetch Weather
//               </button>
//             </div>
//           ) : (
//             <div className="muted small-text">
//               📡 Auto mode enabled — using your GPS location for weather.
//             </div>
//           )}

//           <div className="row">
//             <label>🌡 Temperature (°C)</label>
//             <input
//               name="temperature"
//               value={form.temperature}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//             <label>💧 Humidity (%)</label>
//             <input
//               name="humidity"
//               value={form.humidity}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//           </div>

//           <div className="row">
//             <label>🌱 Moisture (%)</label>
//             <input
//               name="moisture"
//               value={form.moisture}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//             <label>🌾 Soil Type</label>
//             <select name="soil" value={form.soil} onChange={handleChange}>
//               <option value="">-- Select --</option>
//               <option>Loamy</option>
//               <option>Clay</option>
//               <option>Sandy</option>
//               <option>Silty</option>
//               <option>Peaty</option>
//               <option>Chalky</option>
//             </select>
//           </div>

//           <div className="row">
//             <label>🌿 Crop</label>
//             <select name="crop" value={form.crop} onChange={handleChange}>
//               <option value="">-- Select --</option>
//               <option>Wheat</option>
//               <option>Rice</option>
//               <option>Maize</option>
//               <option>Sugarcane</option>
//               <option>Cotton</option>
//               <option>Paddy</option>
//               <option>Tomato</option>
//               <option>Potato</option>
//               <option>Pulses</option>
//             </select>
//           </div>

//           <div className="form-actions">
//             <button className="btn primary" type="submit" disabled={loading}>
//               {loading ? "Analyzing..." : "Generate Plan"}
//             </button>
//             <button
//               type="button"
//               className="btn ghost"
//               onClick={() => setForm(initialForm)}
//             >
//               Reset
//             </button>
//           </div>
//         </form>

//         {/* ---------- Sticky AI Preview ---------- */}
//         <div className="fa-card preview sticky">
//           <h2>🤖 AI Recommendation</h2>

//           {!result && (
//             <div className="muted">
//               Fill inputs or auto-detect location to see recommendations.
//             </div>
//           )}

//           {result && (
//             <>
//               <div className="summary">
//                 <div className="card mini">
//                   <h4>Fertilizer</h4>
//                   <div className="big">
//                     {result.fertilizer?.predicted_fertilizer || "—"}
//                   </div>
//                 </div>

//                 <div className="card mini">
//                   <h4>Pesticide</h4>
//                   <div className="big">
//                     {result.pesticide?.predicted_pesticide || "—"}
//                   </div>
//                 </div>
//               </div>

//               <div className="plan-actions">
//                 <button className="btn success" onClick={handleSavePlan}>
//                   💾 Save Plan
//                 </button>
//                 <button
//                   className="btn ghost"
//                   onClick={() => setResult(null)}
//                 >
//                   Close
//                 </button>
//               </div>

//               <div className="merged-schedule scrollable">
//                 <h4>📅 Smart 10-Day Schedule</h4>
//                 <div className="table">
//                   {result.merged_schedule?.map((day, idx) => (
//                     <div key={idx} className="table-row">
//                       <div className="date">{day.date}</div>
//                       <div className="actions">
//                         {day.actions.map((a, j) => (
//                           <div key={j} className={`action-pill ${a.kind}`}>
//                             <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                             <div className="note">{a.note}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <footer className="fa-footer">
//         🌿 AI + Weather powered Smart Farming Assistant
//       </footer>
//     </div>
//     </>
//   );
// }



// import React, { useState, useEffect } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual",
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:5002/get_plans");
//       const data = await res.json();
//       setPlans(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.warn("Could not fetch plans", err);
//     }
//   };

//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();

//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else setError("Unable to get weather from location.");
//       } catch {
//         setError("Error fetching auto weather.");
//       }
//     });
//   };

//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError("Please enter a city or district name.");
//       return;
//     }
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();

//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else setError("City not found.");
//     } catch {
//       setError("Failed to fetch weather for city.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`Please provide ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5002/generate_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) setError(data.error);
//       else setResult(data);
//     } catch {
//       setError("Network error: Could not reach backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePlan = async () => {
//     if (!result) return;
//     try {
//       await fetch("http://127.0.0.1:5002/save_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result),
//       });
//       alert("✅ Plan saved successfully!");
//       fetchPlans();
//     } catch {
//       alert("Failed to save plan.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     await fetch(`http://127.0.0.1:5002/delete_plan/${id}`, { method: "DELETE" });
//     fetchPlans();
//   };

//   return (
//     <>
//       <Snav />
//       <div className="fa-page">
//         <div className="fa-header">
//           <div>
//             <h1>🌾 Smart Farm Scheduler</h1>
//             <p className="sub">
//               <strong>AI-powered</strong> Fertilizer & Pesticide Recommendation
//             </p>
//           </div>
//         </div>

//         <div className="fa-grid">
//           {/* ---------- Left Form ---------- */}
//           <form className="fa-card form" onSubmit={handleSubmit}>
//             <h2>Farm Inputs</h2>
//             {error && <div className="error">{error}</div>}

//             {/* Mode Toggle */}
//             <div className="mode-toggle">
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />
//                 Manual Mode
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />
//                 Auto Mode
//               </label>
//             </div>

//             {form.mode === "manual" ? (
//               <div className="row">
//                 <label>🏙️ City / District</label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city name"
//                 />
//                 <button
//                   type="button"
//                   className="btn mini"
//                   onClick={fetchWeatherManual}
//                 >
//                   🔄 Fetch Weather
//                 </button>
//               </div>
//             ) : (
//               <div className="muted small-text">
//                 📡 Auto mode enabled — using your GPS location.
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 Temperature (°C)</label>
//               <input
//                 name="temperature"
//                 value={form.temperature}
//                 onChange={handleChange}
//                 type="number"
//               />
//               <label>💧 Humidity (%)</label>
//               <input
//                 name="humidity"
//                 value={form.humidity}
//                 onChange={handleChange}
//                 type="number"
//               />
//             </div>

//             <div className="row">
//               <label>🌱 Moisture (%)</label>
//               <input
//                 name="moisture"
//                 value={form.moisture}
//                 onChange={handleChange}
//                 type="number"
//               />
//               <label>🌾 Soil Type</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 Crop</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Wheat</option>
//                 <option>Rice</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Cotton</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Generate Plan"}
//               </button>
//               <button
//                 type="button"
//                 className="btn ghost"
//                 onClick={() => setForm(initialForm)}
//               >
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* ---------- Right AI Panel ---------- */}
//           <div className="fa-card preview sticky scroll-smooth">
//             <h2>🤖 AI Recommendation</h2>

//             {!result && (
//               <div className="muted">
//                 Fill inputs or enable auto-detect to see AI insights.
//               </div>
//             )}

//             {result && (
//               <>
//                 <div className="summary">
//                   <div className="card mini">
//                     <h4>Fertilizer</h4>
//                     <div className="big highlight">
//                       {result.fertilizer?.predicted_fertilizer || "—"}
//                     </div>
//                   </div>
//                   <div className="card mini">
//                     <h4>Pesticide</h4>
//                     <div className="big highlight">
//                       {result.pesticide?.predicted_pesticide || "—"}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="plan-actions">
//                   <button className="btn success" onClick={handleSavePlan}>
//                     💾 Save Plan
//                   </button>
//                   <button
//                     className="btn ghost"
//                     onClick={() => setResult(null)}
//                   >
//                     Close
//                   </button>
//                 </div>

//                 <div className="merged-schedule scrollable smooth-scroll">
//                   <h4>📅 Smart 10-Day Schedule</h4>
//                   <div className="table">
//                     {result.merged_schedule?.map((day, idx) => (
//                       <div key={idx} className="table-row">
//                         <div className="date">{day.date}</div>
//                         <div className="actions">
//                           {day.actions.map((a, j) => (
//                             <div key={j} className={`action-pill ${a.kind}`}>
//                               <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                               <div className="note">{a.note}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <footer className="fa-footer">
//           🌿 Smart AI + Weather Integrated Farm Planner
//         </footer>
//       </div>
//     </>
//   );
// }








// import React, { useState, useEffect } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual", // manual or auto
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:5002/get_plans");
//       const data = await res.json();
//       setPlans(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.warn("Could not fetch plans", err);
//     }
//   };

//   // 🌍 Auto Mode - Fetch Weather using GPS
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // replace this
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();

//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else {
//           setError("Unable to get weather from location.");
//         }
//       } catch {
//         setError("Error fetching auto weather.");
//       }
//     });
//   };

//   // 🏙️ Manual Mode - Fetch Weather using city
//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError("Please enter a city or district name.");
//       return;
//     }
//     const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // replace this
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();

//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else {
//         setError("City not found.");
//       }
//     } catch {
//       setError("Failed to fetch weather for city.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`Please provide ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5002/generate_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) setError(data.error);
//       else setResult(data);
//     } catch {
//       setError("Network error: Could not reach backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePlan = async () => {
//     if (!result) return;
//     try {
//       await fetch("http://127.0.0.1:5002/save_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result),
//       });
//       alert("✅ Plan saved successfully!");
//       fetchPlans();
//     } catch {
//       alert("Failed to save plan.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     await fetch(`http://127.0.0.1:5002/delete_plan/${id}`, { method: "DELETE" });
//     fetchPlans();
//   };

//   return (
//     <>
    
//     <div className="fa-page">
//       <div className="fa-header">
//         <div>
//           <h1>🌾 Smart Farm Scheduler</h1>
//           <p className="sub">
//             AI-powered Fertilizer & Pesticide Recommendation
//           </p>
//         </div>
       
//       </div>

//       <div className="fa-grid">
//         {/* ---------- Form ---------- */}
//         <form className="fa-card form" onSubmit={handleSubmit}>
//           <h2>Farm Inputs</h2>
//           {error && <div className="error">{error}</div>}

//           {/* 🌎 Toggle between Auto / Manual */}
//           <div className="mode-toggle">
//             <label className="toggle-label">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="manual"
//                 checked={form.mode === "manual"}
//                 onChange={handleChange}
//               />
//               Manual Mode
//             </label>
//             <label className="toggle-label">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="auto"
//                 checked={form.mode === "auto"}
//                 onChange={(e) => {
//                   setForm({ ...form, mode: e.target.value });
//                   if (e.target.value === "auto") fetchWeatherAuto();
//                 }}
//               />
//               Auto Mode
//             </label>
//           </div>

//           {form.mode === "manual" ? (
//             <div className="row">
//               <label>🏙️ City / District</label>
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 placeholder="Enter your city name"
//               />
//               <button
//                 type="button"
//                 className="btn mini"
//                 onClick={fetchWeatherManual}
//               >
//                 🔄 Fetch Weather
//               </button>
//             </div>
//           ) : (
//             <div className="muted small-text">
//               📡 Auto mode enabled — using your GPS location for weather.
//             </div>
//           )}

//           <div className="row">
//             <label>🌡 Temperature (°C)</label>
//             <input
//               name="temperature"
//               value={form.temperature}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//             <label>💧 Humidity (%)</label>
//             <input
//               name="humidity"
//               value={form.humidity}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//           </div>

//           <div className="row">
//             <label>🌱 Moisture (%)</label>
//             <input
//               name="moisture"
//               value={form.moisture}
//               onChange={handleChange}
//               type="number"
//               step="0.1"
//             />
//             <label>🌾 Soil Type</label>
//             <select name="soil" value={form.soil} onChange={handleChange}>
//               <option value="">-- Select --</option>
//               <option>Loamy</option>
//               <option>Clay</option>
//               <option>Sandy</option>
//               <option>Silty</option>
//               <option>Peaty</option>
//               <option>Chalky</option>
//             </select>
//           </div>

//           <div className="row">
//             <label>🌿 Crop</label>
//             <select name="crop" value={form.crop} onChange={handleChange}>
//               <option value="">-- Select --</option>
//               <option>Wheat</option>
//               <option>Rice</option>
//               <option>Maize</option>
//               <option>Sugarcane</option>
//               <option>Cotton</option>
//               <option>Paddy</option>
//               <option>Tomato</option>
//               <option>Potato</option>
//               <option>Pulses</option>
//             </select>
//           </div>

//           <div className="form-actions">
//             <button className="btn primary" type="submit" disabled={loading}>
//               {loading ? "Analyzing..." : "Generate Plan"}
//             </button>
//             <button
//               type="button"
//               className="btn ghost"
//               onClick={() => setForm(initialForm)}
//             >
//               Reset
//             </button>
//           </div>
//         </form>

//         {/* ---------- Sticky AI Preview ---------- */}
//         <div className="fa-card preview sticky">
//           <h2>🤖 AI Recommendation</h2>

//           {!result && (
//             <div className="muted">
//               Fill inputs or auto-detect location to see recommendations.
//             </div>
//           )}

//           {result && (
//             <>
//               <div className="summary">
//                 <div className="card mini">
//                   <h4>Fertilizer</h4>
//                   <div className="big">
//                     {result.fertilizer?.predicted_fertilizer || "—"}
//                   </div>
//                 </div>

//                 <div className="card mini">
//                   <h4>Pesticide</h4>
//                   <div className="big">
//                     {result.pesticide?.predicted_pesticide || "—"}
//                   </div>
//                 </div>
//               </div>

//               <div className="plan-actions">
//                 <button className="btn success" onClick={handleSavePlan}>
//                   💾 Save Plan
//                 </button>
//                 <button
//                   className="btn ghost"
//                   onClick={() => setResult(null)}
//                 >
//                   Close
//                 </button>
//               </div>

//               <div className="merged-schedule scrollable">
//                 <h4>📅 Smart 10-Day Schedule</h4>
//                 <div className="table">
//                   {result.merged_schedule?.map((day, idx) => (
//                     <div key={idx} className="table-row">
//                       <div className="date">{day.date}</div>
//                       <div className="actions">
//                         {day.actions.map((a, j) => (
//                           <div key={j} className={`action-pill ${a.kind}`}>
//                             <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                             <div className="note">{a.note}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <footer className="fa-footer">
//         🌿 AI + Weather powered Smart Farming Assistant
//       </footer>
//     </div>
//     </>
//   );
// }




// import React, { useState, useEffect } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";
// import { useTranslation } from "react-i18next"; // ✅ added for multi-language

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual",
// };

// export default function FertilizerAdvisor() {
//   const { t } = useTranslation(); // ✅ translation hook
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:5002/get_plans");
//       const data = await res.json();
//       setPlans(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.warn("Could not fetch plans", err);
//     }
//   };

//   // 🌍 Auto Mode
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError(t("Geolocation not supported by your browser."));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();
//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else {
//           setError(t("Unable to get weather from location."));
//         }
//       } catch {
//         setError(t("Error fetching auto weather."));
//       }
//     });
//   };

//   // 🏙️ Manual Mode
//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError(t("Please enter a city or district name."));
//       return;
//     }
//     const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();
//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else {
//         setError(t("City not found."));
//       }
//     } catch {
//       setError(t("Failed to fetch weather for city."));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`${t("Please provide")} ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5002/generate_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) setError(data.error);
//       else setResult(data);
//     } catch {
//       setError(t("Network error: Could not reach backend."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePlan = async () => {
//     if (!result) return;
//     try {
//       await fetch("http://127.0.0.1:5002/save_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result),
//       });
//       alert(t("✅ Plan saved successfully!"));
//       fetchPlans();
//     } catch {
//       alert(t("Failed to save plan."));
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm(t("Delete this plan?"))) return;
//     await fetch(`http://127.0.0.1:5002/delete_plan/${id}`, { method: "DELETE" });
//     fetchPlans();
//   };

//   return (
//     <>
//       {/* ✅ include navbar with language switch */}
//       <div className="fa-page">
//         <div className="fa-header">
//           <div>
//             <h1>{t("SmartFarmScheduler")}</h1>
//             <p className="sub">{t("FertilizerAdvisor")}</p>
//           </div>
//         </div>

//         <div className="fa-grid">
//           {/* ---------- Form ---------- */}
//           <form className="fa-card form" onSubmit={handleSubmit}>
//             <h2>{t("Farm Inputs")}</h2>
//             {error && <div className="error">{error}</div>}

//             {/* 🌎 Toggle between Auto / Manual */}
//             <div className="mode-toggle">
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />
//                 {t("Manual Mode")}
//               </label>
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />
//                 {t("Auto Mode")}
//               </label>
//             </div>

//             {form.mode === "manual" ? (
//               <div className="row">
//                 <label>🏙️ {t("City / District")}</label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder={t("Enter your city name")}
//                 />
//                 <button
//                   type="button"
//                   className="btn mini"
//                   onClick={fetchWeatherManual}
//                 >
//                   🔄 {t("Fetch Weather")}
//                 </button>
//               </div>
//             ) : (
//               <div className="muted small-text">
//                 📡 {t("Auto mode enabled — using your GPS location for weather.")}
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 {t("Temperature (°C)")}</label>
//               <input
//                 name="temperature"
//                 value={form.temperature}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>💧 {t("Humidity (%)")}</label>
//               <input
//                 name="humidity"
//                 value={form.humidity}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//             </div>

//             <div className="row">
//               <label>🌱 {t("Moisture (%)")}</label>
//               <input
//                 name="moisture"
//                 value={form.moisture}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>🌾 {t("Soil Type")}</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">{t("-- Select --")}</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 {t("Crop")}</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">{t("-- Select --")}</option>
//                 <option>Wheat</option>
//                 <option>Rice</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Cotton</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary" type="submit" disabled={loading}>
//                 {loading ? t("Analyzing...") : t("Generate Plan")}
//               </button>
//               <button
//                 type="button"
//                 className="btn ghost"
//                 onClick={() => setForm(initialForm)}
//               >
//                 {t("Reset")}
//               </button>
//             </div>
//           </form>

//           {/* ---------- AI Preview ---------- */}
//           <div className="fa-card preview sticky">
//             <h2>🤖 {t("AI Recommendation")}</h2>

//             {!result && (
//               <div className="muted">
//                 {t("Fill inputs or auto-detect location to see recommendations.")}
//               </div>
//             )}

//             {result && (
//               <>
//                 <div className="summary">
//                   <div className="card mini">
//                     <h4>{t("Fertilizer")}</h4>
//                     <div className="big">
//                       {result.fertilizer?.predicted_fertilizer || "—"}
//                     </div>
//                   </div>
//                   <div className="card mini">
//                     <h4>{t("Pesticide")}</h4>
//                     <div className="big">
//                       {result.pesticide?.predicted_pesticide || "—"}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="plan-actions">
//                   <button className="btn success" onClick={handleSavePlan}>
//                     💾 {t("Save Plan")}
//                   </button>
//                   <button
//                     className="btn ghost"
//                     onClick={() => setResult(null)}
//                   >
//                     {t("Close")}
//                   </button>
//                 </div>

//                 <div className="merged-schedule scrollable">
//                   <h4>📅 {t("Smart 10-Day Schedule")}</h4>
//                   <div className="table">
//                     {result.merged_schedule?.map((day, idx) => (
//                       <div key={idx} className="table-row">
//                         <div className="date">{day.date}</div>
//                         <div className="actions">
//                           {day.actions.map((a, j) => (
//                             <div key={j} className={`action-pill ${a.kind}`}>
//                               <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                               <div className="note">{a.note}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <footer className="fa-footer">
//           🌿 {t("AI + Weather powered Smart Farming Assistant")}
//         </footer>
//       </div>
//     </>
//   );
// }






// import React, { useState } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual", // manual or auto
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   // 🌍 Auto Mode - Fetch Weather using GPS
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // 🔑 Replace with your API key
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();

//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else {
//           setError("Unable to get weather from location.");
//         }
//       } catch {
//         setError("Error fetching auto weather.");
//       }
//     });
//   };

//   // 🏙️ Manual Mode - Fetch Weather using city
//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError("Please enter a city or district name.");
//       return;
//     }
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // 🔑 Replace with your key
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();

//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else {
//         setError("City not found.");
//       }
//     } catch {
//       setError("Failed to fetch weather for city.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`Please provide ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   // 🚀 Handle Submit → Call Flask API /predict_plan
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5002/predict_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) setError(data.error);
//       else setResult(data);
//     } catch {
//       setError("⚠️ Network error: Could not reach backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
      
//       <div className="fa-page">
//         <div className="fa-header">
//           <div>
//             <h1>🌾 Smart Farm Scheduler</h1>
//             <p className="sub">AI-powered Fertilizer & Pesticide Recommendation</p>
//           </div>
//         </div>

//         <div className="fa-grid">
//           {/* ---------- Form Section ---------- */}
//           <form className="fa-card form" onSubmit={handleSubmit}>
//             <h2>Farm Inputs</h2>
//             {error && <div className="error">{error}</div>}

//             {/* Toggle Mode */}
//             <div className="mode-toggle">
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />
//                 Manual Mode
//               </label>
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />
//                 Auto Mode
//               </label>
//             </div>

//             {form.mode === "manual" ? (
//               <div className="row">
//                 <label>🏙️ City / District</label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city name"
//                 />
//                 <button type="button" className="btn mini" onClick={fetchWeatherManual}>
//                   🔄 Fetch Weather
//                 </button>
//               </div>
//             ) : (
//               <div className="muted small-text">
//                 📡 Auto mode enabled — using GPS location for weather.
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 Temperature (°C)</label>
//               <input
//                 name="temperature"
//                 value={form.temperature}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>💧 Humidity (%)</label>
//               <input
//                 name="humidity"
//                 value={form.humidity}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//             </div>

//             <div className="row">
//               <label>🌱 Moisture (%)</label>
//               <input
//                 name="moisture"
//                 value={form.moisture}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>🌾 Soil Type</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 Crop</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Wheat</option>
//                 <option>Rice</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Cotton</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Generate Plan"}
//               </button>
//               <button type="button" className="btn ghost" onClick={() => setForm(initialForm)}>
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* ---------- AI Recommendation ---------- */}
//           <div className="fa-card preview sticky">
//             <h2>🤖 AI Recommendation</h2>

//             {!result && (
//               <div className="muted">
//                 Fill inputs or auto-detect location to see recommendations.
//               </div>
//             )}

//             {result && (
//               <>
//                 <div className="summary">
//                   <div className="card mini">
//                     <h4>Fertilizer</h4>
//                     <div className="big">
//                       {result.fertilizer?.name} — {result.fertilizer?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>

//                   <div className="card mini">
//                     <h4>Pesticide</h4>
//                     <div className="big">
//                       {result.pesticide?.name} — {result.pesticide?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                 </div>

//                 {/* ---------- 10-Day Plan ---------- */}
//                 <div className="merged-schedule scrollable">
//                   <h4>📅 Smart 10-Day Schedule</h4>
//                   <div className="table">
//                     {result.plan?.map((day, idx) => (
//                       <div key={idx} className="table-row">
//                         <div className="date">{day.date}</div>
//                         <div className="actions">
//                           {day.actions.map((a, j) => (
//                             <div key={j} className={`action-pill ${a.kind.toLowerCase()}`}>
//                               <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                               <div className="note">{a.note}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <footer className="fa-footer">
//           🌿 AI + Weather powered Smart Farming Assistant
//         </footer>
//       </div>
//     </>
//   );
// }







// import React, { useState } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual", // manual or auto
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [saveMessage, setSaveMessage] = useState("");

//   // 🌍 Auto Mode - Fetch Weather using GPS
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // 🔑 Replace with your API key
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();

//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else {
//           setError("Unable to get weather from location.");
//         }
//       } catch {
//         setError("Error fetching auto weather.");
//       }
//     });
//   };

//   // 🏙️ Manual Mode - Fetch Weather using city
//   const fetchWeatherManual = async () => {
//     if (!form.city) {
//       setError("Please enter a city or district name.");
//       return;
//     }
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d"; // 🔑 Replace with your key
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();

//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else {
//         setError("City not found.");
//       }
//     } catch {
//       setError("Failed to fetch weather for city.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let k of required) {
//       if (!form[k]) {
//         setError(`Please provide ${k}`);
//         return false;
//       }
//     }
//     setError("");
//     return true;
//   };

//   // 🚀 Handle Submit → Call Flask API /predict_plan & /add_data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setResult(null);
//     setSaveMessage("");

//     const payload = {
//       temperature: Number(form.temperature),
//       humidity: Number(form.humidity),
//       moisture: Number(form.moisture),
//       soil: form.soil,
//       crop: form.crop,
//       city: form.city,
//     };

//     try {
//       // 1️⃣ Predict plan
//       const res = await fetch("http://127.0.0.1:5002/predict_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (data.error) setError(data.error);
//       else setResult(data);

//       // 2️⃣ Save data in MySQL
//       const saveRes = await fetch("http://127.0.0.1:5002/add_data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const saveData = await saveRes.json();
//       if (saveData.message) setSaveMessage(saveData.message);
//       else setError(saveData.error || "Error saving data.");
//     } catch {
//       setError("⚠️ Network error: Could not reach backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="fa-page">
//         <div className="fa-header">
//           <h1>🌾 Smart Farm Scheduler</h1>
//           <p className="sub">AI-powered Fertilizer & Pesticide Recommendation</p>
//         </div>

//         <div className="fa-grid">
//           {/* ---------- Form Section ---------- */}
//           <form className="fa-card form" onSubmit={handleSubmit}>
//             <h2>Farm Inputs</h2>
//             {error && <div className="error">{error}</div>}
//             {saveMessage && <div className="success">{saveMessage}</div>}

//             {/* Mode Toggle */}
//             <div className="mode-toggle">
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />
//                 Manual Mode
//               </label>
//               <label className="toggle-label">
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />
//                 Auto Mode
//               </label>
//             </div>

//             {form.mode === "manual" ? (
//               <div className="row">
//                 <label>🏙️ City / District</label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city name"
//                 />
//                 <button
//                   type="button"
//                   className="btn mini"
//                   onClick={fetchWeatherManual}
//                 >
//                   🔄 Fetch Weather
//                 </button>
//               </div>
//             ) : (
//               <div className="muted small-text">
//                 📡 Auto mode enabled — using GPS location for weather.
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 Temperature (°C)</label>
//               <input
//                 name="temperature"
//                 value={form.temperature}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>💧 Humidity (%)</label>
//               <input
//                 name="humidity"
//                 value={form.humidity}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//             </div>

//             <div className="row">
//               <label>🌱 Moisture (%)</label>
//               <input
//                 name="moisture"
//                 value={form.moisture}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.1"
//               />
//               <label>🌾 Soil Type</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 Crop</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Wheat</option>
//                 <option>Rice</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Cotton</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Generate Plan"}
//               </button>
//               <button
//                 type="button"
//                 className="btn ghost"
//                 onClick={() => setForm(initialForm)}
//               >
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* ---------- AI Recommendation ---------- */}
//           <div className="fa-card preview sticky">
//             <h2>🤖 AI Recommendation</h2>
//             {!result && (
//               <div className="muted">
//                 Fill inputs or auto-detect location to see recommendations.
//               </div>
//             )}

//             {result && (
//               <>
//                 <div className="summary">
//                   <div className="card mini">
//                     <h4>Fertilizer</h4>
//                     <div className="big">
//                       {result.fertilizer?.name} —{" "}
//                       {result.fertilizer?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>

//                   <div className="card mini">
//                     <h4>Pesticide</h4>
//                     <div className="big">
//                       {result.pesticide?.name} —{" "}
//                       {result.pesticide?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                 </div>

//                 <div className="merged-schedule scrollable">
//                   <h4>📅 Smart 10-Day Schedule</h4>
//                   <div className="table">
//                     {result.plan?.map((day, idx) => (
//                       <div key={idx} className="table-row">
//                         <div className="date">{day.date}</div>
//                         <div className="actions">
//                           {day.actions.map((a, j) => (
//                             <div key={j} className={`action-pill ${a.kind.toLowerCase()}`}>
//                               <strong>{a.kind.toUpperCase()}</strong>: {a.action}
//                               <div className="note">{a.note}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <footer className="fa-footer">
//           🌿 AI + Weather powered Smart Farming Assistant
//         </footer>
//       </div>
//     </>
//   );
// }






// import React, { useState } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual",
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [savedMsg, setSavedMsg] = useState("");

//   // 🌍 Auto Mode (GPS)
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();
//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else setError("Unable to fetch location weather");
//       } catch {
//         setError("Error fetching weather.");
//       }
//     });
//   };

//   // 🏙 Manual Mode
//   const fetchWeatherManual = async () => {
//     if (!form.city) return setError("Enter city name first");
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();
//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else setError("City not found");
//     } catch {
//       setError("Error fetching weather");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let f of required) if (!form[f]) return setError(`Please provide ${f}`);
//     setError("");
//     return true;
//   };

//   // 🚀 Submit: Predict (Flask) + Save (Express)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSavedMsg("");
//     if (!validate()) return;
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       // Step 1: Call Flask ML API
//       const flaskRes = await fetch("http://127.0.0.1:5002/predict_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           temperature: Number(form.temperature),
//           humidity: Number(form.humidity),
//           moisture: Number(form.moisture),
//           soil: form.soil,
//           crop: form.crop,
//         }),
//       });
//       const data = await flaskRes.json();
//       if (data.error) throw new Error(data.error);
//       setResult(data);

//       // Step 2: Save to MySQL via Express
//       const user_id = localStorage.getItem("id");
//       if (user_id) {
//         const saveRes = await fetch("http://localhost:1000/save_plan", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user_id,
//             city: form.city,
//             temperature: form.temperature,
//             humidity: form.humidity,
//             moisture: form.moisture,
//             soil: form.soil,
//             crop: form.crop,
//             fertilizer: {
//               name: data.fertilizer.name,
//               amount_kg_per_acre: data.fertilizer.amount_kg_per_acre,
//               type: "Primary", // optional future data
//               note: "Recommended by ML model",
//             },
//             pesticide: {
//               name: data.pesticide.name,
//               amount_kg_per_acre: data.pesticide.amount_kg_per_acre,
//               type: "Preventive",
//               note: "AI generated pest control plan",
//             },
//             plan: data.plan,
//           }),
//         });
//         const saveData = await saveRes.json();
//         if (saveData.success) setSavedMsg("✅ Plan saved successfully!");
//         else setError(saveData.error || "Failed to save plan");
//       } else {
//         setSavedMsg("⚠️ Login required to save plan!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error generating plan.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm(initialForm);
//     setResult(null);
//     setError("");
//     setSavedMsg("");
//   };

//   return (
//     <>
      
//       <div className="fa-page">
//         <div className="fa-header">
//           <h1>🌾 Smart Farm Fertilizer Advisor</h1>
//           <p className="sub">AI-based Fertilizer, Pesticide & Schedule Generator</p>
//         </div>

//         <div className="fa-grid">
//           <form className="fa-card form" onSubmit={handleSubmit}>
//             <h2>Farm Inputs</h2>
//             {error && <div className="error">{error}</div>}
//             {savedMsg && <div className="success">{savedMsg}</div>}

//             {/* Toggle Mode */}
//             <div className="mode-toggle">
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />{" "}
//                 Manual
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />{" "}
//                 Auto
//               </label>
//             </div>

//             {form.mode === "manual" && (
//               <div className="row">
//                 <label>🏙 City</label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city"
//                 />
//                 <button
//                   type="button"
//                   className="btn mini"
//                   onClick={fetchWeatherManual}
//                 >
//                   🔄 Fetch Weather
//                 </button>
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 Temperature (°C)</label>
//               <input
//                 name="temperature"
//                 type="number"
//                 value={form.temperature}
//                 onChange={handleChange}
//               />
//               <label>💧 Humidity (%)</label>
//               <input
//                 name="humidity"
//                 type="number"
//                 value={form.humidity}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="row">
//               <label>🌱 Moisture (%)</label>
//               <input
//                 name="moisture"
//                 type="number"
//                 value={form.moisture}
//                 onChange={handleChange}
//               />
//               <label>🧪 Soil Type</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 Crop</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Rice</option>
//                 <option>Wheat</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Generate Plan"}
//               </button>
//               <button type="button" className="btn ghost" onClick={resetForm}>
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* Right side preview */}
//           <div className="fa-card preview sticky">
//             <h2>🤖 AI Recommendation</h2>
//             {!result && <p className="muted">Enter inputs to view plan.</p>}

//             {result && (
//               <>
//                 <div className="summary">
//                   <div className="card mini">
//                     <h4>Fertilizer</h4>
//                     <div className="big">
//                       {result.fertilizer?.name} — {result.fertilizer?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                   <div className="card mini">
//                     <h4>Pesticide</h4>
//                     <div className="big">
//                       {result.pesticide?.name} — {result.pesticide?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                 </div>

//                 <div className="merged-schedule scrollable">
//                   <h4>📅 Smart 10-Day Schedule</h4>
//                   {result.plan.map((day, i) => (
//                     <div key={i} className="table-row">
//                       <div className="date">{day.date}</div>
//                       <div className="actions">
//                         {day.actions.map((a, j) => (
//                           <div key={j} className={`action-pill ${a.kind.toLowerCase()}`}>
//                             <strong>{a.kind}</strong>: {a.action}
//                             <div className="note">{a.note}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }










// import React, { useState } from "react";
// import "./FertilizerAdvisor.css";
// import Snav from "./sidenav";
// import { FaSeedling, FaSyncAlt, FaFlask, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

// const initialForm = {
//   temperature: "",
//   humidity: "",
//   moisture: "",
//   soil: "",
//   crop: "",
//   city: "",
//   mode: "manual",
// };

// export default function FertilizerAdvisor() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [savedMsg, setSavedMsg] = useState("");

//   // 🌍 Auto Mode (GPS)
//   const fetchWeatherAuto = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//         const data = await res.json();
//         if (data.main) {
//           setForm((prev) => ({
//             ...prev,
//             temperature: data.main.temp,
//             humidity: data.main.humidity,
//             moisture: (data.main.humidity * 0.5).toFixed(1),
//             city: data.name,
//           }));
//           setError("");
//         } else setError("Unable to fetch location weather");
//       } catch {
//         setError("Error fetching weather.");
//       }
//     });
//   };

//   // 🏙 Manual Mode
//   const fetchWeatherManual = async () => {
//     if (!form.city) return setError("Enter city name first");
//     const apiKey = "64ec4e8adf69cb9be080f0c6d813f56d";
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();
//       if (data.main) {
//         setForm((prev) => ({
//           ...prev,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           moisture: (data.main.humidity * 0.5).toFixed(1),
//         }));
//         setError("");
//       } else setError("City not found");
//     } catch {
//       setError("Error fetching weather");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const required = ["temperature", "humidity", "moisture", "soil", "crop"];
//     for (let f of required) if (!form[f]) return setError(`Please provide ${f}`);
//     setError("");
//     return true;
//   };

//   // 🚀 Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSavedMsg("");
//     if (!validate()) return;
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const flaskRes = await fetch("http://127.0.0.1:5002/predict_plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           temperature: Number(form.temperature),
//           humidity: Number(form.humidity),
//           moisture: Number(form.moisture),
//           soil: form.soil,
//           crop: form.crop,
//         }),
//       });
//       const data = await flaskRes.json();
//       if (data.error) throw new Error(data.error);
//       setResult(data);

//       const user_id = localStorage.getItem("id");
//       if (user_id) {
//         const saveRes = await fetch("http://localhost:1000/save_plan", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user_id,
//             city: form.city,
//             temperature: form.temperature,
//             humidity: form.humidity,
//             moisture: form.moisture,
//             soil: form.soil,
//             crop: form.crop,
//             fertilizer: {
//               name: data.fertilizer.name,
//               amount_kg_per_acre: data.fertilizer.amount_kg_per_acre,
//               type: "Primary",
//               note: "Recommended by ML model",
//             },
//             pesticide: {
//               name: data.pesticide.name,
//               amount_kg_per_acre: data.pesticide.amount_kg_per_acre,
//               type: "Preventive",
//               note: "AI generated pest control plan",
//             },
//             plan: data.plan,
//           }),
//         });
//         const saveData = await saveRes.json();
//         if (saveData.success) setSavedMsg("✅ Plan saved successfully!");
//         else setError(saveData.error || "Failed to save plan");
//       } else {
//         setSavedMsg("⚠️ Login required to save plan!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error generating plan.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm(initialForm);
//     setResult(null);
//     setError("");
//     setSavedMsg("");
//   };

//   return (
//     <>
//       <Snav />
//       <div className="fa-page">
//         <header className="fa-header">
//           <h1 className="animated-title">
//             🌾 Smart Farm <span>Fertilizer Advisor</span>
//           </h1>
//           <p className="sub">
//             <FaFlask /> AI-powered Fertilizer, Pesticide & Smart Scheduling
//           </p>
//         </header>

//         <div className="fa-grid">
//           {/* LEFT: Form Section */}
//           <form className="fa-card form animated-card" onSubmit={handleSubmit}>
//             <h2>🌱 Farm Inputs</h2>
//             {error && <div className="error shake">{error}</div>}
//             {savedMsg && <div className="success fade-in">{savedMsg}</div>}

//             {/* Mode Toggle */}
//             <div className="mode-toggle">
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="manual"
//                   checked={form.mode === "manual"}
//                   onChange={handleChange}
//                 />{" "}
//                 Manual
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="mode"
//                   value="auto"
//                   checked={form.mode === "auto"}
//                   onChange={(e) => {
//                     setForm({ ...form, mode: e.target.value });
//                     if (e.target.value === "auto") fetchWeatherAuto();
//                   }}
//                 />{" "}
//                 Auto
//               </label>
//             </div>

//             {form.mode === "manual" && (
//               <div className="row">
//                 <label>
//                   <FaMapMarkerAlt /> City
//                 </label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city"
//                 />
//                 <button
//                   type="button"
//                   className="btn mini"
//                   onClick={fetchWeatherManual}
//                 >
//                   <FaSyncAlt /> Fetch Weather
//                 </button>
//               </div>
//             )}

//             <div className="row">
//               <label>🌡 Temperature (°C)</label>
//               <input
//                 name="temperature"
//                 type="number"
//                 value={form.temperature}
//                 onChange={handleChange}
//               />
//               <label>💧 Humidity (%)</label>
//               <input
//                 name="humidity"
//                 type="number"
//                 value={form.humidity}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="row">
//               <label>🌱 Moisture (%)</label>
//               <input
//                 name="moisture"
//                 type="number"
//                 value={form.moisture}
//                 onChange={handleChange}
//               />
//               <label>🧪 Soil Type</label>
//               <select name="soil" value={form.soil} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Loamy</option>
//                 <option>Clay</option>
//                 <option>Sandy</option>
//                 <option>Silty</option>
//                 <option>Peaty</option>
//                 <option>Chalky</option>
//               </select>
//             </div>

//             <div className="row">
//               <label>🌿 Crop</label>
//               <select name="crop" value={form.crop} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option>Rice</option>
//                 <option>Wheat</option>
//                 <option>Maize</option>
//                 <option>Sugarcane</option>
//                 <option>Paddy</option>
//                 <option>Tomato</option>
//                 <option>Potato</option>
//                 <option>Pulses</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn primary pulse" type="submit" disabled={loading}>
//                 {loading ? "Analyzing..." : "Generate Plan"}
//               </button>
//               <button type="button" className="btn ghost" onClick={resetForm}>
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* RIGHT: AI Recommendation */}
//           <div className="fa-card preview animated-card">
//             <h2>🤖 AI Recommendation</h2>
//             {!result && <p className="muted">Enter inputs to view plan.</p>}

//             {result && (
//               <>
//                 <div className="summary fade-in">
//                   <div className="card mini">
//                     <h4>🌾 Fertilizer</h4>
//                     <div className="big">
//                       {result.fertilizer?.name} —{" "}
//                       {result.fertilizer?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                   <div className="card mini">
//                     <h4>🛡 Pesticide</h4>
//                     <div className="big">
//                       {result.pesticide?.name} —{" "}
//                       {result.pesticide?.amount_kg_per_acre} kg/acre
//                     </div>
//                   </div>
//                 </div>

//                 <div className="merged-schedule scrollable fade-in">
//                   <h4>📅 Smart 10-Day Schedule</h4>
//                   {result.plan.map((day, i) => (
//                     <div key={i} className="table-row slide-up">
//                       <div className="date">{day.date}</div>
//                       <div className="actions">
//                         {day.actions.map((a, j) => (
//                           <div key={j} className={`action-pill ${a.kind.toLowerCase()}`}>
//                             <strong>{a.kind}</strong>: {a.action}
//                             <div className="note">{a.note}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }









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
          {/* FORM SIDE */}
          <form className="fa-card form fade-in" onSubmit={handleSubmit}>
            <h2>🌿 Enter Farm Details</h2>
            {error && <div className="error">{error}</div>}
            {savedMsg && <div className="success">{savedMsg}</div>}

            {/* Mode */}
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

          {/* RESULT SIDE */}
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





