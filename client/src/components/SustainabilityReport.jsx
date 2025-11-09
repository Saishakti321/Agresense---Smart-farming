// import React, { useState } from "react";
// import {
//   Leaf,
//   Droplets,
//   CloudRain,
//   Thermometer,
//   Recycle,
//   Sprout,
// } from "lucide-react";

// export default function SustainabilityReport() {
//   const [data, setData] = useState({
//     N: "",
//     P: "",
//     K: "",
//     ph: "",
//     rainfall: "",
//     humidity: "",
//     temperature: "",
//   });

//   const [report, setReport] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const calculateReport = () => {
//     const { N, P, K, ph, rainfall, humidity, temperature } = data;
//     if (!N || !P || !K || !ph) {
//       alert("Please fill all soil parameters!");
//       return;
//     }

//     // 🌿 Simple sustainability scoring logic
//     const npkScore =
//       Math.min(100, (parseFloat(N) + parseFloat(P) + parseFloat(K)) / 5);
//     const phScore = ph >= 6 && ph <= 7.5 ? 100 : 60;
//     const rainScore =
//       rainfall < 50 ? 60 : rainfall < 150 ? 80 : rainfall < 300 ? 90 : 100;
//     const humidityScore = humidity >= 60 && humidity <= 80 ? 100 : 70;
//     const tempScore =
//       temperature >= 20 && temperature <= 32 ? 100 : 70;

//     const avgScore = Math.round(
//       (npkScore + phScore + rainScore + humidityScore + tempScore) / 5
//     );

//     // 🌱 Generate sustainability insights
//     let advice = [];
//     if (ph < 6)
//       advice.push("Soil is acidic — apply lime or organic compost.");
//     if (ph > 7.5)
//       advice.push("Soil is alkaline — add organic matter or gypsum.");
//     if (rainfall < 50)
//       advice.push("Low rainfall — adopt drip irrigation or water harvesting.");
//     if (humidity < 50)
//       advice.push("Low humidity — use mulching to retain moisture.");
//     if (temperature > 35)
//       advice.push("High temperature — provide shading or irrigation buffer.");

//     if (advice.length === 0)
//       advice.push("Your field conditions look ideal for sustainable growth! 🌿");

//     setReport({ avgScore, advice });
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "850px",
//         margin: "30px auto",
//         backgroundColor: "#fff",
//         borderRadius: "16px",
//         boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//         padding: "30px",
//         fontFamily: "Poppins, sans-serif",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#000" }}>
//         🌍 Sustainability Report Dashboard
//       </h2>

//       <p style={{ textAlign: "center", marginBottom: "30px", color: "#444" }}>
//         Analyze your farm’s sustainability using soil and climate parameters.
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "15px",
//           marginBottom: "20px",
//         }}
//       >
//         {[
//           { name: "N", label: "Nitrogen (N)", icon: <Leaf size={18} /> },
//           { name: "P", label: "Phosphorus (P)", icon: <Sprout size={18} /> },
//           { name: "K", label: "Potassium (K)", icon: <Recycle size={18} /> },
//           { name: "ph", label: "Soil pH", icon: <Droplets size={18} /> },
//           { name: "rainfall", label: "Rainfall (mm)", icon: <CloudRain size={18} /> },
//           { name: "humidity", label: "Humidity (%)", icon: <Droplets size={18} /> },
//           { name: "temperature", label: "Temperature (°C)", icon: <Thermometer size={18} /> },
//         ].map((field) => (
//           <div key={field.name}>
//             <label style={{ fontWeight: "600", color: "#333" }}>
//               {field.icon} {field.label}
//             </label>
//             <input
//               type="number"
//               name={field.name}
//               value={data[field.name]}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 marginTop: "5px",
//                 outline: "none",
//               }}
//               placeholder={`Enter ${field.label}`}
//             />
//           </div>
//         ))}
//       </div>

//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <button
//           onClick={calculateReport}
//           style={{
//             backgroundColor: "#000",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             padding: "10px 20px",
//             cursor: "pointer",
//             fontWeight: "600",
//           }}
//         >
//           Generate Report
//         </button>
//       </div>

//       {report && (
//         <div>
//           <h3 style={{ color: "#000", textAlign: "center" }}>
//             🌱 Sustainability Score:{" "}
//             <span style={{ color: "#0a8" }}>{report.avgScore}%</span>
//           </h3>

//           <div
//             style={{
//               height: "20px",
//               width: "100%",
//               backgroundColor: "#eee",
//               borderRadius: "10px",
//               margin: "10px 0 25px 0",
//             }}
//           >
//             <div
//               style={{
//                 height: "100%",
//                 width: `${report.avgScore}%`,
//                 backgroundColor: report.avgScore > 80 ? "#0a8" : "#ff9800",
//                 borderRadius: "10px",
//                 transition: "width 0.4s ease",
//               }}
//             ></div>
//           </div>

//           <h4 style={{ color: "#000" }}>🌾 Sustainability Recommendations:</h4>
//           <ul style={{ color: "#444", lineHeight: "1.6" }}>
//             {report.advice.map((item, idx) => (
//               <li key={idx}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import Papa from "papaparse";
// import jsPDF from "jspdf";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const SustainabilityReport = () => {
//   const [data, setData] = useState([]);
//   const [report, setReport] = useState(null);
//   const [error, setError] = useState("");
//   const [mode, setMode] = useState("manual");
//   const [manualData, setManualData] = useState({
//     month: "",
//     water: "",
//     fertilizer: "",
//     yield: "",
//   });

//   // Handle manual inputs
//   const handleInputChange = (e) => {
//     setManualData({ ...manualData, [e.target.name]: e.target.value });
//   };

//   const addManualData = () => {
//     const { month, water, fertilizer, yield: cropYield } = manualData;
//     if (!month || !water || !fertilizer || !cropYield) {
//       setError("⚠️ Please fill all fields before adding data.");
//       return;
//     }
//     const newData = [
//       ...data,
//       { month, water: +water, fertilizer: +fertilizer, yield: +cropYield },
//     ];
//     setData(newData);
//     setManualData({ month: "", water: "", fertilizer: "", yield: "" });
//     generateReport(newData);
//     setError("");
//   };

//   // Handle CSV upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.name.endsWith(".csv")) {
//       setError("❌ Please upload a valid CSV file.");
//       return;
//     }
//     Papa.parse(file, {
//       header: true,
//       dynamicTyping: true,
//       skipEmptyLines: true,
//       complete: (result) => {
//         if (result.errors.length) {
//           setError("⚠️ CSV parsing error. Check file format.");
//           return;
//         }
//         const parsedData = result.data.map((row) => ({
//           month: row.month || row.Month || "Unknown",
//           water: Number(row.water || row.Water || 0),
//           fertilizer: Number(row.fertilizer || row.Fertilizer || 0),
//           yield: Number(row.yield || row.Yield || 0),
//         }));
//         setData(parsedData);
//         generateReport(parsedData);
//         setError("");
//       },
//     });
//   };

//   // Generate AI simulated data
//   const generateAIReport = () => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//     const aiData = months.map((m) => ({
//       month: m,
//       water: Math.floor(Math.random() * 80) + 20,
//       fertilizer: Math.floor(Math.random() * 70) + 10,
//       yield: Math.floor(Math.random() * 90) + 10,
//     }));
//     setData(aiData);
//     generateReport(aiData);
//     setMode("ai");
//   };

//   // Generate sustainability report
//   const generateReport = (dataSet) => {
//     if (dataSet.length === 0) return;

//     const avg = (key) =>
//       dataSet.reduce((sum, item) => sum + (item[key] || 0), 0) / dataSet.length;

//     const avgWater = avg("water");
//     const avgFert = avg("fertilizer");
//     const avgYield = avg("yield");

//     const nextMonth = {
//       water: (avgWater * 0.95).toFixed(1),
//       yield: (avgYield * 1.05).toFixed(1),
//     };

//     const sustainabilityScore = Math.max(
//       0,
//       Math.min(100, 100 - (avgWater * 0.4 + avgFert * 0.3 - avgYield * 0.5))
//     );

//     const tips = [];
//     if (avgWater > 60) tips.push("💧 Optimize irrigation with smart water scheduling.");
//     if (avgFert > 60) tips.push("🌿 Consider using organic fertilizers.");
//     if (avgYield < 60) tips.push("🌾 Use better seed variety for yield improvement.");
//     if (sustainabilityScore > 85)
//       tips.push("✅ Excellent! Sustainable practices in place.");
//     else if (tips.length === 0)
//       tips.push("✨ Balanced input levels. Maintain this performance!");

//     setReport({
//       avgWater: avgWater.toFixed(1),
//       avgFert: avgFert.toFixed(1),
//       avgYield: avgYield.toFixed(1),
//       nextMonth,
//       score: sustainabilityScore.toFixed(1),
//       tips,
//     });
//   };

//   // Export PDF
//   const downloadPDF = () => {
//     if (!report) return;
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.text("🌱 Sustainability Report", 20, 20);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Average Water: ${report.avgWater}`, 20, 35);
//     doc.text(`Average Fertilizer: ${report.avgFert}`, 20, 45);
//     doc.text(`Average Yield: ${report.avgYield}`, 20, 55);
//     doc.text(`Predicted Water: ${report.nextMonth.water}`, 20, 65);
//     doc.text(`Predicted Yield: ${report.nextMonth.yield}`, 20, 75);
//     doc.text(`Sustainability Score: ${report.score}`, 20, 85);
//     doc.text("Suggestions:", 20, 100);
//     report.tips.forEach((tip, i) => doc.text(`- ${tip}`, 25, 110 + i * 10));
//     doc.save("Sustainability_Report.pdf");
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🌾 Smart Sustainability Dashboard</h1>
//       <p style={styles.subtitle}>
//         Empowering Farmers with AI Insights & Sustainability Metrics
//       </p>

//       {/* Mode Buttons */}
//       <div style={styles.modeSwitch}>
//         <button
//           style={mode === "manual" ? styles.activeButton : styles.button}
//           onClick={() => setMode("manual")}
//         >
//           ✍️ Manual Mode
//         </button>
//         <button
//           style={mode === "ai" ? styles.activeButton : styles.button}
//           onClick={generateAIReport}
//         >
//           🤖 AI Mode
//         </button>
//       </div>

//       {/* Manual Input */}
//       {mode === "manual" && (
//         <div style={styles.inputSection}>
//           <input
//             name="month"
//             placeholder="Month"
//             value={manualData.month}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <input
//             name="water"
//             placeholder="Water"
//             type="number"
//             value={manualData.water}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <input
//             name="fertilizer"
//             placeholder="Fertilizer"
//             type="number"
//             value={manualData.fertilizer}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <input
//             name="yield"
//             placeholder="Yield"
//             type="number"
//             value={manualData.yield}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <button onClick={addManualData} style={styles.addButton}>
//             ➕ Add
//           </button>
//           <input type="file" accept=".csv" onChange={handleFileUpload} style={styles.fileInput} />
//         </div>
//       )}

//       {error && <p style={styles.error}>{error}</p>}

//       {/* Report Section */}
//       {report && (
//         <div style={styles.reportCard}>
//           <h2>📈 Sustainability Summary</h2>
//           <div style={styles.reportGrid}>
//             <div style={styles.statBox}>
//               <h3>💧 Water</h3>
//               <p>{report.avgWater}</p>
//             </div>
//             <div style={styles.statBox}>
//               <h3>🌿 Fertilizer</h3>
//               <p>{report.avgFert}</p>
//             </div>
//             <div style={styles.statBox}>
//               <h3>🌾 Yield</h3>
//               <p>{report.avgYield}</p>
//             </div>
//           </div>

//           <div style={styles.scoreBox}>
//             <h3>🌍 Sustainability Score</h3>
//             <p style={{ fontSize: "1.8rem", color: "#8FFF85" }}>{report.score}/100</p>
//           </div>

//           <h4>🔮 Prediction for Next Month</h4>
//           <p>Water: {report.nextMonth.water}</p>
//           <p>Yield: {report.nextMonth.yield}</p>

//           <h4>💡 Recommendations</h4>
//           <ul style={styles.tipList}>
//             {report.tips.map((tip, i) => (
//               <li key={i}>{tip}</li>
//             ))}
//           </ul>

//           <button onClick={downloadPDF} style={styles.downloadBtn}>
//             📄 Download PDF
//           </button>
//         </div>
//       )}

//       {/* Chart */}
//       {data.length > 0 && (
//         <div style={styles.chartSection}>
//           <h2>🌱 Performance Trends</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//               <XAxis dataKey="month" stroke="#ccc" />
//               <YAxis stroke="#ccc" />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="water" stroke="#00BFFF" />
//               <Line type="monotone" dataKey="fertilizer" stroke="#32CD32" />
//               <Line type="monotone" dataKey="yield" stroke="#FFD700" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Poppins, sans-serif",
//     background: "linear-gradient(180deg, #0b1a0b, #132c13)",
//     color: "#e9ffe6",
//     padding: "30px",
//     borderRadius: "20px",
//     maxWidth: "1000px",
//     margin: "40px auto",
//     boxShadow: "0 0 40px rgba(0,255,100,0.1)",
//     animation: "fadeIn 1.5s ease-in",
//   },
//   title: { fontSize: "2.5rem", color: "#9eff70", marginBottom: "10px" },
//   subtitle: { color: "#b5ccb5", marginBottom: "25px" },
//   modeSwitch: { display: "flex", justifyContent: "center", flexWrap: "wrap" },
//   button: {
//     background: "transparent",
//     color: "#9eff70",
//     border: "2px solid #58a85c",
//     margin: "5px",
//     padding: "10px 20px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//   },
//   activeButton: {
//     background: "#58a85c",
//     color: "#fff",
//     margin: "5px",
//     padding: "10px 20px",
//     borderRadius: "8px",
//   },
//   inputSection: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: "10px",
//     margin: "15px 0",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #58a85c",
//     background: "#1a2e1a",
//     color: "#fff",
//     width: "120px",
//   },
//   addButton: {
//     background: "#6ecf6e",
//     border: "none",
//     padding: "10px 18px",
//     color: "#0a1a0a",
//     borderRadius: "8px",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },
//   fileInput: { marginTop: "10px", color: "#9eff70" },
//   error: { color: "#ff6b6b", marginTop: "10px" },
//   reportCard: {
//     background: "rgba(20, 40, 20, 0.8)",
//     borderRadius: "15px",
//     padding: "25px",
//     marginTop: "25px",
//     boxShadow: "0 0 20px rgba(0,255,100,0.1)",
//   },
//   reportGrid: {
//     display: "flex",
//     justifyContent: "space-around",
//     flexWrap: "wrap",
//     marginBottom: "15px",
//   },
//   statBox: {
//     background: "#1d311d",
//     borderRadius: "12px",
//     padding: "15px 25px",
//     textAlign: "center",
//     margin: "5px",
//   },
//   scoreBox: {
//     background: "linear-gradient(90deg, #3e8c3e, #65bf65)",
//     borderRadius: "12px",
//     padding: "10px",
//     marginBottom: "20px",
//   },
//   tipList: {
//     textAlign: "left",
//     marginTop: "10px",
//     color: "#bfffbf",
//   },
//   downloadBtn: {
//     background: "#4caf50",
//     color: "#fff",
//     padding: "12px 20px",
//     border: "none",
//     borderRadius: "10px",
//     marginTop: "15px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   chartSection: {
//     marginTop: "35px",
//     background: "rgba(20, 40, 20, 0.7)",
//     padding: "20px",
//     borderRadius: "15px",
//   },
// };

// export default SustainabilityReport;


// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// /**
//  * SustainabilityReport.jsx
//  * - Responsive sustainability / carbon footprint overview
//  * - Charts: trend (Line) + breakdown (Doughnut)
//  * - Export CSV, simple calculations and recommendations
//  *
//  * Usage: <SustainabilityReport />
//  */

// const mockReport = {
//   lastUpdated: "2025-11-04T08:30:00Z",
//   totalCarbonKgCO2e: 12500, // yearly total (kg CO2e)
//   perField: [
//     { id: "field-1", name: "North Field (2.5 acres)", carbonKg: 4200, waterLiters: 120000, fertilizerKg: 180 },
//     { id: "field-2", name: "South Field (1.8 acres)", carbonKg: 3300, waterLiters: 90000, fertilizerKg: 100 },
//     { id: "field-3", name: "East Field (1.0 acres)", carbonKg: 2500, waterLiters: 60000, fertilizerKg: 60 },
//     { id: "field-4", name: "Orchard (0.6 acres)", carbonKg: 1500, waterLiters: 30000, fertilizerKg: 20 },
//   ],
//   monthlyTrendKg: [
//     // last 12 months carbon per month in kgCO2e
//     { month: "Nov 2024", value: 950 },
//     { month: "Dec 2024", value: 850 },
//     { month: "Jan 2025", value: 780 },
//     { month: "Feb 2025", value: 900 },
//     { month: "Mar 2025", value: 1100 },
//     { month: "Apr 2025", value: 1050 },
//     { month: "May 2025", value: 1200 },
//     { month: "Jun 2025", value: 1300 },
//     { month: "Jul 2025", value: 1400 },
//     { month: "Aug 2025", value: 1250 },
//     { month: "Sep 2025", value: 900 },
//     { month: "Oct 2025", value: 820 },
//   ],
//   energyKWh: 4200, // yearly
//   dieselLiters: 800, // yearly
//   waterTotalLiters: 300000,
// };

// export default function SustainabilityReport() {
//   const [report, setReport] = useState(null);
//   const [selectedField, setSelectedField] = useState(null);

//   useEffect(() => {
//     // replace with real API call if available
//     async function fetchReport() {
//       // Example: const r = await fetch('/api/sustainability'); const data = await r.json();
//       // For now we use mock data and small delay to show loader behaviour
//       await new Promise((res) => setTimeout(res, 300));
//       setReport(mockReport);
//       setSelectedField(mockReport.perField[0]);
//     }
//     fetchReport();
//   }, []);

//   const totalCarbon = report?.totalCarbonKgCO2e ?? 0;
//   const monthlyLabels = report?.monthlyTrendKg.map((m) => m.month) ?? [];
//   const monthlyValues = report?.monthlyTrendKg.map((m) => m.value) ?? [];

//   const doughnutData = useMemo(() => {
//     if (!report) return null;
//     const labels = report.perField.map((f) => f.name);
//     const data = report.perField.map((f) => f.carbonKg);
//     return {
//       labels,
//       datasets: [
//         {
//           data,
//           backgroundColor: ["#4caf50", "#66bb6a", "#a5d6a7", "#c8e6c9"],
//           borderWidth: 0,
//         },
//       ],
//     };
//   }, [report]);

//   const lineData = {
//     labels: monthlyLabels,
//     datasets: [
//       {
//         label: "Monthly CO₂ (kg)",
//         data: monthlyValues,
//         fill: false,
//         borderColor: "#2d6a4f",
//         backgroundColor: "#2d6a4f",
//         tension: 0.25,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const lineOptions = {
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         ticks: { beginAtZero: true },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: { mode: "index", intersect: false },
//     },
//   };

//   const estimatePerAcre = (field) => {
//     // naive estimate: carbon per acre (if user needs)
//     // extract acres from name if present
//     const match = field.name.match(/([\d.]+)\s*acre/);
//     if (!match) return null;
//     const acres = parseFloat(match[1]);
//     return (field.carbonKg / acres).toFixed(0);
//   };

//   const downloadCSV = () => {
//     if (!report) return;
//     const headers = ["field", "carbonKgCO2e", "waterLiters", "fertilizerKg"];
//     const rows = report.perField.map((f) => [f.name, f.carbonKg, f.waterLiters, f.fertilizerKg]);
//     const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `sustainability_report_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const recommendationsForField = (field) => {
//     // simple rule-based recs — extendable
//     if (!field) return [];
//     const recs = [];
//     if (field.fertilizerKg > 100) {
//       recs.push("Reduce synthetic fertilizer and apply split doses; consider organic compost to improve soil carbon.");
//     }
//     if (field.waterLiters > 100000) {
//       recs.push("Switch to drip or micro-sprinkler irrigation and schedule irrigation in early morning to reduce evaporation.");
//     }
//     if (field.carbonKg / Math.max(1, field.waterLiters / 1000) > 0.05) {
//       recs.push("Adopt cover cropping and minimal tillage to increase soil carbon sequestration.");
//     }
//     if (recs.length === 0) recs.push("Maintain current practices and monitor changes; consider planting trees/hedges for on-farm carbon sinks.");
//     return recs;
//   };

//   if (!report) {
//     return (
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.title}>Sustainability Report</h2>
//           <p style={{ color: "#666" }}>Loading report…</p>
//         </div>
//       </div>
//     );
//   }

//   const topFields = [...report.perField].sort((a, b) => b.carbonKg - a.carbonKg);
//   const selectedRecs = recommendationsForField(selectedField);

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <header style={styles.header}>
//           <h1 style={styles.title}>Sustainability Report</h1>
//           <div style={styles.headerRight}>
//             <div style={styles.smallText}>Last updated</div>
//             <div style={{ fontWeight: 700 }}>{new Date(report.lastUpdated).toLocaleString()}</div>
//           </div>
//         </header>

//         {/* Top metrics */}
//         <section style={styles.metricsRow}>
//           <div style={styles.metricCard}>
//             <div style={styles.metricTitle}>Total CO₂ (kg/year)</div>
//             <div style={styles.metricValue}>{totalCarbon.toLocaleString()} kg</div>
//             <div style={styles.metricNote}>Annual greenhouse gas emissions (estimated)</div>
//           </div>

//           <div style={styles.metricCard}>
//             <div style={styles.metricTitle}>Energy (kWh)</div>
//             <div style={styles.metricValue}>{report.energyKWh.toLocaleString()}</div>
//             <div style={styles.metricNote}>On-farm electricity use</div>
//           </div>

//           <div style={styles.metricCard}>
//             <div style={styles.metricTitle}>Diesel (L)</div>
//             <div style={styles.metricValue}>{report.dieselLiters.toLocaleString()} L</div>
//             <div style={styles.metricNote}>Fuel used for machinery</div>
//           </div>

//           <div style={styles.metricCard}>
//             <div style={styles.metricTitle}>Water (L/year)</div>
//             <div style={styles.metricValue}>{report.waterTotalLiters.toLocaleString()} L</div>
//             <div style={styles.metricNote}>Irrigation water use</div>
//           </div>
//         </section>

//         {/* Charts & Field list */}
//         <section style={styles.contentRow}>
//           <div style={styles.leftColumn}>
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <strong>Monthly Carbon Trend</strong>
//                 <button style={styles.smallButton} onClick={downloadCSV}>
//                   Export CSV
//                 </button>
//               </div>
//               <div style={{ height: 260 }}>
//                 <Line data={lineData} options={lineOptions} />
//               </div>
//               <div style={styles.cardFooter}>
//                 Trend shows monthly variation — target lower peaks during irrigation-intensive months.
//               </div>
//             </div>

//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}>
//                 <strong>Top emitting fields</strong>
//                 <div style={{ fontSize: 13, color: "#666" }}>Sorted by carbon (kg CO₂e)</div>
//               </div>

//               <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
//                 {topFields.map((f) => (
//                   <div
//                     key={f.id}
//                     onClick={() => setSelectedField(f)}
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: 10,
//                       padding: 12,
//                       background: selectedField?.id === f.id ? "#e8f5e9" : "#fff",
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
//                       minWidth: 220,
//                       flex: "1 1 220px",
//                     }}
//                   >
//                     <div style={{ fontWeight: 700 }}>{f.name}</div>
//                     <div style={{ marginTop: 6, color: "#333" }}>
//                       Carbon: <strong>{f.carbonKg} kg</strong>
//                     </div>
//                     <div style={{ marginTop: 4, color: "#666", fontSize: 13 }}>
//                       Water: {f.waterLiters.toLocaleString()} L • Fertilizer: {f.fertilizerKg} kg
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <aside style={styles.rightColumn}>
//             <div style={styles.card}>
//               <div style={styles.cardHeader}><strong>Field Carbon Breakdown</strong></div>
//               <div style={{ height: 220 }}>
//                 <Doughnut data={doughnutData} />
//               </div>
//               <div style={{ marginTop: 12 }}>
//                 {report.perField.map((f) => (
//                   <div key={f.id} style={styles.breakdownRow}>
//                     <div style={{ fontWeight: 700 }}>{f.name}</div>
//                     <div style={{ color: "#333" }}>{((f.carbonKg / totalCarbon) * 100).toFixed(1)}%</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}><strong>Selected Field — Details</strong></div>
//               {selectedField ? (
//                 <>
//                   <div style={{ marginTop: 8 }}>
//                     <div style={{ fontWeight: 700 }}>{selectedField.name}</div>
//                     <div style={{ color: "#333", marginTop: 6 }}>Carbon: <strong>{selectedField.carbonKg} kg CO₂e</strong></div>
//                     <div style={{ color: "#333", marginTop: 4 }}>Water: {selectedField.waterLiters.toLocaleString()} L</div>
//                     <div style={{ color: "#333", marginTop: 4 }}>Fertilizer: {selectedField.fertilizerKg} kg</div>
//                     <div style={{ color: "#666", marginTop: 8 }}>
//                       Carbon per acre (estimate): {estimatePerAcre(selectedField) ?? "—"} kg/acre
//                     </div>

//                     <div style={{ marginTop: 12 }}>
//                       <div style={{ fontWeight: 700 }}>Recommendations</div>
//                       <ul style={{ marginTop: 8, paddingLeft: 18 }}>
//                         {selectedRecs.map((r, idx) => (
//                           <li key={idx} style={{ marginBottom: 6 }}>{r}</li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div style={{ marginTop: 12 }}>
//                       <div style={{ fontWeight: 700 }}>Quick actions</div>
//                       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                         <button style={styles.actionButton} onClick={() => alert("Open irrigation planner for " + selectedField.name)}>Open Planner</button>
//                         <button style={{ ...styles.actionButton, background: "#fff", color: "#2d6a4f", border: "1px solid #2d6a4f" }} onClick={() => alert("Schedule soil test")}>Schedule Soil Test</button>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ color: "#666" }}>Select a field to view details and recommendations.</div>
//               )}
//             </div>

//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}><strong>Summary & Actions</strong></div>
//               <div style={{ marginTop: 8, color: "#333" }}>
//                 <p>Overall annual emissions: <strong>{totalCarbon.toLocaleString()} kg CO₂e</strong>. Focus on the top 2 fields to reduce 50% of farm emissions.</p>
//                 <p style={{ marginTop: 6 }}>Suggested farm-level actions:</p>
//                 <ol style={{ marginTop: 6 }}>
//                   <li>Switch to drip irrigation where possible to reduce water and energy use.</li>
//                   <li>Use split fertilizer application and integrate organic compost to lower synthetic fertilizer dependence.</li>
//                   <li>Replace older diesel equipment with efficient engines or shared machinery to lower fuel consumption.</li>
//                 </ol>
//               </div>
//             </div>
//           </aside>
//         </section>
//       </div>
//     </div>
//   );
// }

// /* ---------- styles ---------- */
// const styles = {
//   page: {
//     padding: 18,
//     background: "#f3faf3",
//     minHeight: "100vh",
//   },
//   container: {
//     maxWidth: 1200,
//     margin: "0 auto",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 14,
//     gap: 12,
//   },
//   title: {
//     margin: 0,
//     color: "#1b4332",
//     fontSize: 28,
//   },
//   headerRight: {
//     textAlign: "right",
//     color: "#2d6a4f",
//   },
//   metricsRow: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: 12,
//     marginBottom: 18,
//   },
//   metricCard: {
//     background: "#fff",
//     borderRadius: 12,
//     padding: 14,
//     boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
//   },
//   metricTitle: { fontSize: 13, color: "#666" },
//   metricValue: { fontSize: 20, fontWeight: 800, marginTop: 6, color: "#1b4332" },
//   metricNote: { marginTop: 8, fontSize: 13, color: "#777" },

//   contentRow: {
//     display: "grid",
//     gridTemplateColumns: "1fr 340px",
//     gap: 16,
//     alignItems: "start",
//   },
//   leftColumn: {},
//   rightColumn: {},

//   card: {
//     background: "#fff",
//     borderRadius: 12,
//     padding: 12,
//     boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   smallButton: {
//     border: "none",
//     background: "#2d6a4f",
//     color: "#fff",
//     padding: "6px 10px",
//     borderRadius: 8,
//     cursor: "pointer",
//     fontSize: 13,
//   },
//   cardFooter: { fontSize: 13, color: "#666", marginTop: 8 },

//   breakdownRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 8,
//     paddingTop: 6,
//     borderTop: "1px dashed #eee",
//   },

//   msg: {},

//   actionButton: {
//     background: "#2d6a4f",
//     color: "#fff",
//     border: "none",
//     padding: "8px 12px",
//     borderRadius: 8,
//     cursor: "pointer",
//   },

//   controls: {},

//   /* responsive */
//   "@media (max-width: 980px)": {
//     contentRow: { gridTemplateColumns: "1fr" },
//     rightColumn: { order: 2 },
//     leftColumn: { order: 1 },
//   },
// };






// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const mockReport = {
//   lastUpdated: "2025-11-04T08:30:00Z",
//   totalCarbonKgCO2e: 12500,
//   perField: [
//     { id: "field-1", name: "North Field (2.5 acres)", carbonKg: 4200, waterLiters: 120000, fertilizerKg: 180 },
//     { id: "field-2", name: "South Field (1.8 acres)", carbonKg: 3300, waterLiters: 90000, fertilizerKg: 100 },
//     { id: "field-3", name: "East Field (1.0 acres)", carbonKg: 2500, waterLiters: 60000, fertilizerKg: 60 },
//     { id: "field-4", name: "Orchard (0.6 acres)", carbonKg: 1500, waterLiters: 30000, fertilizerKg: 20 },
//   ],
//   monthlyTrendKg: [
//     { month: "Nov 2024", value: 950 },
//     { month: "Dec 2024", value: 850 },
//     { month: "Jan 2025", value: 780 },
//     { month: "Feb 2025", value: 900 },
//     { month: "Mar 2025", value: 1100 },
//     { month: "Apr 2025", value: 1050 },
//     { month: "May 2025", value: 1200 },
//     { month: "Jun 2025", value: 1300 },
//     { month: "Jul 2025", value: 1400 },
//     { month: "Aug 2025", value: 1250 },
//     { month: "Sep 2025", value: 900 },
//     { month: "Oct 2025", value: 820 },
//   ],
//   energyKWh: 4200,
//   dieselLiters: 800,
//   waterTotalLiters: 300000,
// };

// export default function SustainabilityReport() {
//   const [report, setReport] = useState(null);
//   const [selectedField, setSelectedField] = useState(null);
//   const [manualField, setManualField] = useState({
//     name: "",
//     carbonKg: "",
//     waterLiters: "",
//     fertilizerKg: "",
//   });

//   useEffect(() => {
//     async function fetchReport() {
//       await new Promise((res) => setTimeout(res, 300));
//       setReport(mockReport);
//       setSelectedField(mockReport.perField[0]);
//     }
//     fetchReport();
//   }, []);

//   const addManualField = (e) => {
//     e.preventDefault();
//     if (!manualField.name || !manualField.carbonKg) {
//       alert("Please enter at least a field name and carbon value.");
//       return;
//     }

//     const newField = {
//       id: `field-${Date.now()}`,
//       name: manualField.name,
//       carbonKg: parseFloat(manualField.carbonKg) || 0,
//       waterLiters: parseFloat(manualField.waterLiters) || 0,
//       fertilizerKg: parseFloat(manualField.fertilizerKg) || 0,
//     };

//     const updatedReport = {
//       ...report,
//       perField: [...report.perField, newField],
//       totalCarbonKgCO2e:
//         report.totalCarbonKgCO2e + (parseFloat(manualField.carbonKg) || 0),
//       waterTotalLiters:
//         report.waterTotalLiters + (parseFloat(manualField.waterLiters) || 0),
//     };

//     setReport(updatedReport);
//     setManualField({ name: "", carbonKg: "", waterLiters: "", fertilizerKg: "" });
//     alert("Manual data added successfully!");
//   };

//   const totalCarbon = report?.totalCarbonKgCO2e ?? 0;
//   const monthlyLabels = report?.monthlyTrendKg.map((m) => m.month) ?? [];
//   const monthlyValues = report?.monthlyTrendKg.map((m) => m.value) ?? [];

//   const doughnutData = useMemo(() => {
//     if (!report) return null;
//     const labels = report.perField.map((f) => f.name);
//     const data = report.perField.map((f) => f.carbonKg);
//     return {
//       labels,
//       datasets: [
//         {
//           data,
//           backgroundColor: ["#4caf50", "#66bb6a", "#a5d6a7", "#c8e6c9", "#81c784", "#388e3c"],
//           borderWidth: 0,
//         },
//       ],
//     };
//   }, [report]);

//   const lineData = {
//     labels: monthlyLabels,
//     datasets: [
//       {
//         label: "Monthly CO₂ (kg)",
//         data: monthlyValues,
//         fill: false,
//         borderColor: "#2d6a4f",
//         backgroundColor: "#2d6a4f",
//         tension: 0.25,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const lineOptions = {
//     maintainAspectRatio: false,
//     scales: { y: { ticks: { beginAtZero: true } } },
//     plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
//   };

//   const estimatePerAcre = (field) => {
//     const match = field.name.match(/([\d.]+)\s*acre/);
//     if (!match) return null;
//     const acres = parseFloat(match[1]);
//     return (field.carbonKg / acres).toFixed(0);
//   };

//   const recommendationsForField = (field) => {
//     if (!field) return [];
//     const recs = [];
//     if (field.fertilizerKg > 100) recs.push("Reduce fertilizer use and adopt organic compost.");
//     if (field.waterLiters > 100000) recs.push("Switch to drip irrigation to save water.");
//     if (recs.length === 0) recs.push("Maintain current practices and monitor changes.");
//     return recs;
//   };

//   if (!report) {
//     return (
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.title}>Sustainability Report</h2>
//           <p style={{ color: "#666" }}>Loading report…</p>
//         </div>
//       </div>
//     );
//   }

//   const selectedRecs = recommendationsForField(selectedField);
//   const topFields = [...report.perField].sort((a, b) => b.carbonKg - a.carbonKg);

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <header style={styles.header}>
//           <h1 style={styles.title}>Sustainability Report</h1>
//           <div style={styles.headerRight}>
//             <div style={styles.smallText}>Last updated</div>
//             <div style={{ fontWeight: 700 }}>{new Date(report.lastUpdated).toLocaleString()}</div>
//           </div>
//         </header>

//         {/* Metrics */}
//         <section style={styles.metricsRow}>
//           <Metric title="Total CO₂ (kg/year)" value={totalCarbon.toLocaleString()} note="Annual greenhouse gas emissions" />
//           <Metric title="Energy (kWh)" value={report.energyKWh.toLocaleString()} note="Electricity used" />
//           <Metric title="Diesel (L)" value={report.dieselLiters.toLocaleString()} note="Fuel consumption" />
//           <Metric title="Water (L/year)" value={report.waterTotalLiters.toLocaleString()} note="Irrigation usage" />
//         </section>

//         {/* Charts + Details */}
//         <section style={styles.contentRow}>
//           <div style={styles.leftColumn}>
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <strong>Monthly Carbon Trend</strong>
//               </div>
//               <div style={{ height: 260 }}>
//                 <Line data={lineData} options={lineOptions} />
//               </div>
//             </div>

//             {/* 🔹 Manual Input Form */}
//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}><strong>Manual Input</strong></div>
//               <form onSubmit={addManualField} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 <input
//                   type="text"
//                   placeholder="Field name (e.g., West Field 2 acres)"
//                   value={manualField.name}
//                   onChange={(e) => setManualField({ ...manualField, name: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Carbon (kg)"
//                   value={manualField.carbonKg}
//                   onChange={(e) => setManualField({ ...manualField, carbonKg: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Water (L)"
//                   value={manualField.waterLiters}
//                   onChange={(e) => setManualField({ ...manualField, waterLiters: e.target.value })}
//                   style={styles.input}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Fertilizer (kg)"
//                   value={manualField.fertilizerKg}
//                   onChange={(e) => setManualField({ ...manualField, fertilizerKg: e.target.value })}
//                   style={styles.input}
//                 />
//                 <button type="submit" style={styles.actionButton}>Add Field</button>
//               </form>
//             </div>

//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}><strong>Top Emitting Fields</strong></div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
//                 {topFields.map((f) => (
//                   <div
//                     key={f.id}
//                     onClick={() => setSelectedField(f)}
//                     style={{
//                       padding: 10,
//                       borderRadius: 10,
//                       background: selectedField?.id === f.id ? "#e8f5e9" : "#fff",
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
//                       cursor: "pointer",
//                       minWidth: 200,
//                       flex: "1 1 200px",
//                     }}
//                   >
//                     <div style={{ fontWeight: 700 }}>{f.name}</div>
//                     <div style={{ marginTop: 4 }}>CO₂: <strong>{f.carbonKg}</strong> kg</div>
//                     <div style={{ fontSize: 13, color: "#555" }}>Water: {f.waterLiters} L</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <aside style={styles.rightColumn}>
//             <div style={styles.card}>
//               <div style={styles.cardHeader}><strong>Field Breakdown</strong></div>
//               <div style={{ height: 220 }}>
//                 <Doughnut data={doughnutData} />
//               </div>
//               <div style={{ marginTop: 12 }}>
//                 {report.perField.map((f) => (
//                   <div key={f.id} style={styles.breakdownRow}>
//                     <div style={{ fontWeight: 700 }}>{f.name}</div>
//                     <div>{((f.carbonKg / totalCarbon) * 100).toFixed(1)}%</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div style={{ ...styles.card, marginTop: 18 }}>
//               <div style={styles.cardHeader}><strong>Selected Field — Details</strong></div>
//               {selectedField ? (
//                 <>
//                   <div style={{ fontWeight: 700 }}>{selectedField.name}</div>
//                   <div>Carbon: <strong>{selectedField.carbonKg}</strong> kg</div>
//                   <div>Water: {selectedField.waterLiters}</div>
//                   <div>Fertilizer: {selectedField.fertilizerKg}</div>
//                   <div style={{ marginTop: 8, fontWeight: 700 }}>Recommendations</div>
//                   <ul style={{ marginTop: 4, paddingLeft: 18 }}>
//                     {selectedRecs.map((r, i) => <li key={i}>{r}</li>)}
//                   </ul>
//                 </>
//               ) : <p>Select a field to view details.</p>}
//             </div>
//           </aside>
//         </section>
//       </div>
//     </div>
//   );
// }

// const Metric = ({ title, value, note }) => (
//   <div style={styles.metricCard}>
//     <div style={{ fontWeight: "bold", color: "#2d6a4f" }}>{title}</div>
//     <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
//     <div style={{ fontSize: 13, color: "#555" }}>{note}</div>
//   </div>
// );

// const styles = {
//   page: { padding: 18, background: "#f3faf3", minHeight: "100vh" },
//   container: { maxWidth: 1200, margin: "0 auto" },
//   header: {
//     display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
//   },
//   title: { fontSize: 28, color: "#1b4332", margin: 0 },
//   headerRight: { textAlign: "right", color: "#2d6a4f" },
//   metricsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 18 },
//   metricCard: { background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 3px 10px rgba(0,0,0,0.06)" },
//   contentRow: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" },
//   card: { background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 4px 18px rgba(0,0,0,0.05)" },
//   cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
//   input: { padding: 8, borderRadius: 8, border: "1px solid #ccc", fontSize: 14 },
//   actionButton: {
//     background: "#2d6a4f", color: "#fff", border: "none", padding: "8px 12px",
//     borderRadius: 8, cursor: "pointer", fontWeight: 600,
//   },
//   breakdownRow: {
//     display: "flex", justifyContent: "space-between", borderTop: "1px solid #eee", paddingTop: 6, marginTop: 6,
//   },
// };





// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

// const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

// function SustainabilityReport() {
//   // Fetch initial data from localStorage
//   const initialData = JSON.parse(localStorage.getItem("farmReports")) || [];

//   const [reports, setReports] = useState(initialData);
//   const [formData, setFormData] = useState({
//     crop: "",
//     yield: "",
//     waterUsed: "",
//     fertilizerUsed: "",
//     carbon: "",
//   });

//   // Save data to localStorage whenever reports change
//   useEffect(() => {
//     localStorage.setItem("farmReports", JSON.stringify(reports));
//   }, [reports]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newReport = { ...formData, id: Date.now() };
//     setReports([...reports, newReport]);
//     setFormData({ crop: "", yield: "", waterUsed: "", fertilizerUsed: "", carbon: "" });
//   };

//   // Prepare chart data dynamically
//   const lineData = reports.map((r, idx) => ({ month: `M${idx + 1}`, yield: Number(r.yield) || 0 }));
//   const totalWater = reports.reduce((sum, r) => sum + (Number(r.waterUsed) || 0), 0);
//   const totalFertilizer = reports.reduce((sum, r) => sum + (Number(r.fertilizerUsed) || 0), 0);
//   const totalCarbon = reports.reduce((sum, r) => sum + (Number(r.carbon) || 0), 0);

//   const pieData = [
//     { name: "Water", value: totalWater },
//     { name: "Fertilizer", value: totalFertilizer },
//     { name: "Carbon", value: totalCarbon },
//   ];

//   const barData = reports.map((r) => ({ crop: r.crop, carbon: Number(r.carbon) || 0 }));

//   return (
//     <div style={styles.container}>
//       {/* Add internal <style> for animations */}
//       <style>
//         {`
//           @keyframes fadeInUp {
//             0% { opacity: 0; transform: translateY(20px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes fadeIn {
//             0% { opacity: 0; }
//             100% { opacity: 1; }
//           }
//           .fade-in { animation: fadeInUp 0.6s forwards; }
//         `}
//       </style>

//       <h1 style={styles.header}>🌱 Sustainability & Carbon Footprint Report</h1>

//       {/* Dashboard Cards */}
//       <div style={styles.cardsContainer}>
//         <div style={{ ...styles.card, animationDelay: "0.1s" }}>
//           <p style={styles.cardTitle}>Total Crops</p>
//           <p style={styles.cardValue}>{reports.length}</p>
//         </div>
//         <div style={{ ...styles.card, animationDelay: "0.2s" }}>
//           <p style={styles.cardTitle}>Total Water Used (L)</p>
//           <p style={styles.cardValue}>{totalWater}</p>
//         </div>
//         <div style={{ ...styles.card, animationDelay: "0.3s" }}>
//           <p style={styles.cardTitle}>Total Fertilizer Used (kg)</p>
//           <p style={styles.cardValue}>{totalFertilizer}</p>
//         </div>
//         <div style={{ ...styles.card, animationDelay: "0.4s" }}>
//           <p style={styles.cardTitle}>Total Carbon (kg CO₂)</p>
//           <p style={styles.cardValue}>{totalCarbon}</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div style={styles.chartsContainer}>
//         <div style={styles.chartCard}>
//           <h2 style={styles.chartTitle}>Crop Yield Over Time</h2>
//           <LineChart width={400} height={250} data={lineData}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="yield" stroke="#00C49F" strokeWidth={3} />
//           </LineChart>
//         </div>

//         <div style={styles.chartCard}>
//           <h2 style={styles.chartTitle}>Resource Usage</h2>
//           <PieChart width={400} height={250}>
//             <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//               {pieData.map((entry, idx) => (
//                 <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div style={styles.chartCard}>
//           <h2 style={styles.chartTitle}>Carbon Footprint per Crop</h2>
//           <BarChart width={400} height={250} data={barData}>
//             <XAxis dataKey="crop" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="carbon" fill="#FF8042" />
//           </BarChart>
//         </div>
//       </div>

//       {/* Manual Data Entry Form */}
//       <div style={styles.formCard}>
//         <h2 style={styles.formTitle}>Add New Report</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input type="text" name="crop" placeholder="Crop Name" value={formData.crop} onChange={handleInputChange} style={styles.input} required />
//           <input type="number" name="yield" placeholder="Yield (kg)" value={formData.yield} onChange={handleInputChange} style={styles.input} required />
//           <input type="number" name="waterUsed" placeholder="Water Used (L)" value={formData.waterUsed} onChange={handleInputChange} style={styles.input} />
//           <input type="number" name="fertilizerUsed" placeholder="Fertilizer Used (kg)" value={formData.fertilizerUsed} onChange={handleInputChange} style={styles.input} />
//           <input type="number" name="carbon" placeholder="Carbon Footprint (kg CO₂)" value={formData.carbon} onChange={handleInputChange} style={styles.input} />
//           <button type="submit" style={styles.button}>Submit Report</button>
//         </form>
//       </div>

//       {/* How It Works Section */}
//       <div style={styles.howItWorksContainer}>
//         <h2 style={styles.sectionHeader}>How It Works</h2>
//         <div style={styles.stepsContainer}>
//           {[
//             { icon: "📝", title: "1. Record Data", desc: "Manually enter your crop, water, fertilizer, and carbon footprint information." },
//             { icon: "📊", title: "2. Analyze Trends", desc: "Charts display yield, resource usage, and carbon footprint trends." },
//             { icon: "🌱", title: "3. Improve Sustainability", desc: "Get insights to reduce water, fertilizer, and carbon emissions." },
//             { icon: "📤", title: "4. Export Reports", desc: "Download or share your report to track progress over time." },
//           ].map((step, idx) => (
//             <div key={idx} style={{ ...styles.stepCard, animationDelay: `${0.2 * idx}s` }} className="fade-in">
//               <div style={styles.stepIcon}>{step.icon}</div>
//               <h3 style={styles.stepTitle}>{step.title}</h3>
//               <p style={styles.stepDesc}>{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Data Table */}
//       <div style={styles.tableContainer}>
//         <h2 style={styles.sectionHeader}>All Reports</h2>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Crop</th>
//               <th style={styles.th}>Yield (kg)</th>
//               <th style={styles.th}>Water (L)</th>
//               <th style={styles.th}>Fertilizer (kg)</th>
//               <th style={styles.th}>Carbon (kg CO₂)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((r) => (
//               <tr key={r.id}>
//                 <td style={styles.td}>{r.crop}</td>
//                 <td style={styles.td}>{r.yield}</td>
//                 <td style={styles.td}>{r.waterUsed}</td>
//                 <td style={styles.td}>{r.fertilizerUsed}</td>
//                 <td style={styles.td}>{r.carbon}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SustainabilityReport;

// // ===================== Internal CSS =====================
// const styles = {
//   container: { minHeight: "100vh", padding: "20px", backgroundColor: "#e6f4ea", fontFamily: "Arial, sans-serif" },
//   header: { textAlign: "center", fontSize: "2.5rem", color: "#2e7d32", marginBottom: "30px", animation: "fadeIn 1s ease forwards" },
//   cardsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" },
//   card: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 200px", textAlign: "center", transform: "translateY(20px)", opacity: 0, animation: "fadeInUp 0.6s forwards" },
//   cardTitle: { color: "#555", marginBottom: "10px", fontSize: "1.1rem" },
//   cardValue: { color: "#2e7d32", fontSize: "2rem", fontWeight: "bold" },
//   chartsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginBottom: "40px" },
//   chartCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 400px", textAlign: "center" },
//   chartTitle: { color: "#2e7d32", marginBottom: "10px" },
//   formCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", maxWidth: "500px", margin: "0 auto 50px auto", textAlign: "center" },
//   formTitle: { color: "#2e7d32", marginBottom: "15px", fontSize: "1.5rem" },
//   form: { display: "flex", flexDirection: "column", gap: "15px" },
//   input: { padding: "12px", borderRadius: "10px", border: "1px solid #a5d6a7", outline: "none", fontSize: "1rem", transition: "0.3s" },
//   button: { padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#2e7d32", color: "#fff", fontSize: "1.2rem", cursor: "pointer", transition: "0.3s" },
//   howItWorksContainer: { marginTop: "50px", textAlign: "center" },
//   sectionHeader: { fontSize: "2rem", color: "#2e7d32", marginBottom: "30px" },
//   stepsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" },
//   stepCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", width: "250px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", opacity: 0, transform: "translateY(20px)", animation: "fadeInUp 0.6s forwards", textAlign: "center" },
//   stepIcon: { fontSize: "2.5rem", marginBottom: "10px" },
//   stepTitle: { fontSize: "1.2rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "10px" },
//   stepDesc: { color: "#555", fontSize: "1rem" },
//   tableContainer: { marginTop: "50px", overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", textAlign: "center" },
//   th: { borderBottom: "2px solid #2e7d32", padding: "10px", color: "#2e7d32" },
//   td: { borderBottom: "1px solid #ccc", padding: "10px" },
// };






import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import * as XLSX from "xlsx"; // ✅ For Excel export

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

function SustainabilityReport() {
  const initialData = JSON.parse(localStorage.getItem("farmReports")) || [];

  const [reports, setReports] = useState(initialData);
  const [formData, setFormData] = useState({
    crop: "",
    yield: "",
    waterUsed: "",
    fertilizerUsed: "",
    carbon: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("farmReports", JSON.stringify(reports));
  }, [reports]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing report
      const updatedReports = reports.map((r) =>
        r.id === editId ? { ...formData, id: editId } : r
      );
      setReports(updatedReports);
      setEditId(null);
    } else {
      // Add new report
      const newReport = { ...formData, id: Date.now() };
      setReports([...reports, newReport]);
    }
    setFormData({ crop: "", yield: "", waterUsed: "", fertilizerUsed: "", carbon: "" });
  };

  const handleEdit = (report) => {
    setFormData(report);
    setEditId(report.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setReports([]);
      localStorage.removeItem("farmReports");
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sustainability Report");
    XLSX.writeFile(wb, "Sustainability_Report.xlsx");
  };

  // Chart data
  const lineData = reports.map((r, idx) => ({ month: `M${idx + 1}`, yield: Number(r.yield) || 0 }));
  const totalWater = reports.reduce((sum, r) => sum + (Number(r.waterUsed) || 0), 0);
  const totalFertilizer = reports.reduce((sum, r) => sum + (Number(r.fertilizerUsed) || 0), 0);
  const totalCarbon = reports.reduce((sum, r) => sum + (Number(r.carbon) || 0), 0);

  const pieData = [
    { name: "Water", value: totalWater },
    { name: "Fertilizer", value: totalFertilizer },
    { name: "Carbon", value: totalCarbon },
  ];

  const barData = reports.map((r) => ({ crop: r.crop, carbon: Number(r.carbon) || 0 }));

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .fade-in { animation: fadeInUp 0.6s forwards; }
        `}
      </style>

      <h1 style={styles.header}>🌱 Sustainability & Carbon Footprint Report</h1>

      {/* Top Buttons */}
      <div style={styles.topButtons}>
        <button style={styles.downloadBtn} onClick={handleDownloadExcel}>📥 Download Excel</button>
        <button style={styles.resetBtn} onClick={handleReset}>♻️ Reset All</button>
      </div>

      {/* Dashboard Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Crops</p>
          <p style={styles.cardValue}>{reports.length}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Water Used (L)</p>
          <p style={styles.cardValue}>{totalWater}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Fertilizer Used (kg)</p>
          <p style={styles.cardValue}>{totalFertilizer}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Carbon (kg CO₂)</p>
          <p style={styles.cardValue}>{totalCarbon}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Crop Yield Over Time</h2>
          <LineChart width={400} height={250} data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="yield" stroke="#00C49F" strokeWidth={3} />
          </LineChart>
        </div>

        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Resource Usage</h2>
          <PieChart width={400} height={250}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Carbon Footprint per Crop</h2>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="carbon" fill="#FF8042" />
          </BarChart>
        </div>
      </div>

      {/* Manual Entry Form */}
      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>{editId ? "✏️ Edit Report" : "➕ Add New Report"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="crop" placeholder="Crop Name" value={formData.crop} onChange={handleInputChange} style={styles.input} required />
          <input type="number" name="yield" placeholder="Yield (kg)" value={formData.yield} onChange={handleInputChange} style={styles.input} required />
          <input type="number" name="waterUsed" placeholder="Water Used (L)" value={formData.waterUsed} onChange={handleInputChange} style={styles.input} />
          <input type="number" name="fertilizerUsed" placeholder="Fertilizer Used (kg)" value={formData.fertilizerUsed} onChange={handleInputChange} style={styles.input} />
          <input type="number" name="carbon" placeholder="Carbon Footprint (kg CO₂)" value={formData.carbon} onChange={handleInputChange} style={styles.input} />
          <button type="submit" style={styles.button}>{editId ? "Update Report" : "Submit Report"}</button>
        </form>
      </div>

      {/* Data Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.sectionHeader}>All Reports</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Crop</th>
              <th style={styles.th}>Yield (kg)</th>
              <th style={styles.th}>Water (L)</th>
              <th style={styles.th}>Fertilizer (kg)</th>
              <th style={styles.th}>Carbon (kg CO₂)</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td style={styles.td}>{r.crop}</td>
                <td style={styles.td}>{r.yield}</td>
                <td style={styles.td}>{r.waterUsed}</td>
                <td style={styles.td}>{r.fertilizerUsed}</td>
                <td style={styles.td}>{r.carbon}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(r)}>✏️</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SustainabilityReport;

// ===================== Styles =====================
const styles = {
  container: { minHeight: "100vh", padding: "20px", backgroundColor: "#e6f4ea", fontFamily: "Arial, sans-serif" },
  header: { textAlign: "center", fontSize: "2.5rem", color: "#2e7d32", marginBottom: "30px", animation: "fadeIn 1s ease forwards" },
  topButtons: { display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" },
  downloadBtn: { backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontSize: "1rem" },
  resetBtn: { backgroundColor: "#c62828", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontSize: "1rem" },
  cardsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" },
  card: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 200px", textAlign: "center" },
  cardTitle: { color: "#555", marginBottom: "10px", fontSize: "1.1rem" },
  cardValue: { color: "#2e7d32", fontSize: "2rem", fontWeight: "bold" },
  chartsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginBottom: "40px" },
  chartCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 400px", textAlign: "center" },
  chartTitle: { color: "#2e7d32", marginBottom: "10px" },
  formCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", maxWidth: "500px", margin: "0 auto 50px auto", textAlign: "center" },
  formTitle: { color: "#2e7d32", marginBottom: "15px", fontSize: "1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #a5d6a7", outline: "none", fontSize: "1rem", transition: "0.3s" },
  button: { padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#2e7d32", color: "#fff", fontSize: "1.2rem", cursor: "pointer" },
  tableContainer: { marginTop: "50px", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "center" },
  th: { borderBottom: "2px solid #2e7d32", padding: "10px", color: "#2e7d32" },
  td: { borderBottom: "1px solid #ccc", padding: "10px" },
  editBtn: { backgroundColor: "#0288d1", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", marginRight: "5px", cursor: "pointer" },
  deleteBtn: { backgroundColor: "#c62828", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" },
};
