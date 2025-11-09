// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBrain, FaComments, FaTint, FaLeaf, FaChartLine } from "react-icons/fa";
// import Snav from "./sidenav";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "AI Crop Suggestion",
//       icon: <FaBrain size={40} color="#283c86" />,
//       description: "Get the best crop for your soil & weather",
//       onClick: () => navigate("/ai-suggestion"),
//     },
//     {
//       title: "Chatbot Assistant",
//       icon: <FaComments size={40} color="#283c86" />,
//       description: "Ask AgriSense anything about farming",
//       onClick: () => navigate("/chatbot"),
//     },
//     {
//       title: "Irrigation Planner",
//       icon: <FaTint size={40} color="#283c86" />,
//       description: "Plan watering schedules smartly",
//       onClick: () => navigate("/irrigationplan"),
//     },
//     {
//       title: "Fertilizer Advisor",
//       icon: <FaLeaf size={40} color="#283c86" />,
//       description: "Get balanced fertilizer usage info",
//       onClick: () => navigate("/fertilizer-advice"),
//     },
//     {
//       title: "Sustainability Report",
//       icon: <FaChartLine size={40} color="#283c86" />,
//       description: "View eco impact & carbon footprint",
//       onClick: () => navigate("/report"),
//     },
//   ];

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to right, #f9f9f9, #eef2f3)",
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
//             fontSize: "2.5rem",
//             marginBottom: "30px",
//           }}
//         >
//           🌾 AgriSense Smart Dashboard
//         </h1>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "25px",
//             width: "90%",
//             maxWidth: "1000px",
//           }}
//         >
//           {features.map((f, index) => (
//             <div
//               key={index}
//               onClick={f.onClick}
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: "15px",
//                 padding: "25px",
//                 textAlign: "center",
//                 cursor: "pointer",
//                 boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
//                 transition: "transform 0.2s, box-shadow 0.2s",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.2)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.1)";
//               }}
//             >
//               <div>{f.icon}</div>
//               <h3 style={{ color: "#283c86", marginTop: "10px" }}>{f.title}</h3>
//               <p style={{ color: "#555", marginTop: "10px" }}>{f.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;



// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaBrain,
//   FaComments,
//   FaTint,
//   FaLeaf,
//   FaChartLine,
//   FaCloudSun,
// } from "react-icons/fa";
// import Snav from "./sidenav";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "AI Crop Suggestion",
//       icon: <FaBrain size={48} color="#355E3B" />,
//       description: "Get the best crop for your soil & weather",
//       onClick: () => navigate("/ai-suggestion"),
//     },
//     {
//       title: "Chatbot Assistant",
//       icon: <FaComments size={48} color="#355E3B" />,
//       description: "Ask AgriSense anything about farming",
//       onClick: () => navigate("/chatbot"),
//     },
//     {
//       title: "Irrigation Planner",
//       icon: <FaTint size={48} color="#355E3B" />,
//       description: "Plan watering schedules smartly",
//       onClick: () => navigate("/irrigationplan"),
//     },
//     {
//       title: "Fertilizer Advisor",
//       icon: <FaLeaf size={48} color="#355E3B" />,
//       description: "Get balanced fertilizer usage info",
//       onClick: () => navigate("/fertilizer-advice"),
//     },
//     {
//       title: "Sustainability Report",
//       icon: <FaChartLine size={48} color="#355E3B" />,
//       description: "View eco impact & carbon footprint",
//       onClick: () => navigate("/report"),
//     },
//     {
//       title: "Weather Updates",
//       icon: <FaCloudSun size={48} color="#355E3B" />,
//       description: "Check current weather and forecast",
//       onClick: () => navigate("/weather"),
//     },
//   ];

//   // Add animated floating crop shapes
//   useEffect(() => {
//     const container = document.getElementById("crop-background");
//     for (let i = 0; i < 15; i++) {
//       const crop = document.createElement("div");
//       crop.className = "crop";
//       crop.style.left = `${Math.random() * 100}%`;
//       crop.style.animationDelay = `${Math.random() * 10}s`;
//       crop.style.animationDuration = `${8 + Math.random() * 10}s`;
//       container.appendChild(crop);
//     }
//   }, []);

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           position: "relative",
//           minHeight: "100vh",
//           overflow: "hidden",
//           background: "linear-gradient(to bottom, #f3f8ee, #e9f5dc)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "40px 20px",
//         }}
//       >
//         {/* Floating crops background */}
//         <div
//           id="crop-background"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             overflow: "hidden",
//             zIndex: 0,
//           }}
//         ></div>

//         {/* Heading section */}
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "40px",
//             zIndex: 2,
//             position: "relative",
//           }}
//         >
//           <h1
//             style={{
//               background:
//                 "linear-gradient(90deg, #2e7d32, #81c784, #4caf50, #2e7d32)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: "3rem",
//               fontWeight: "800",
//               letterSpacing: "1px",
//               textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
//               marginBottom: "15px",
//             }}
//           >
//             🌾 AgriSense Smart Dashboard
//           </h1>

//           <p
//             style={{
//               fontSize: "1.1rem",
//               color: "#3a4d2d",
//               background:
//                 "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
//               padding: "10px 15px",
//               borderRadius: "10px",
//               display: "inline-block",
//               lineHeight: "1.6",
//               maxWidth: "700px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             Empowering farmers and professionals with AI-driven insights to
//             cultivate smarter, conserve resources, and grow sustainably.
//           </p>
//         </div>

//         {/* Cards grid */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gap: "35px",
//             width: "90%",
//             maxWidth: "1200px",
//             zIndex: 2,
//           }}
//         >
//           {features.map((f, index) => (
//             <div
//               key={index}
//               onClick={f.onClick}
//               style={{
//                 background: "rgba(255, 255, 255, 0.85)",
//                 borderRadius: "20px",
//                 padding: "35px 25px",
//                 textAlign: "center",
//                 cursor: "pointer",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255, 255, 255, 0.7)",
//                 boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "translateY(-8px)";
//                 e.currentTarget.style.boxShadow =
//                   "0 14px 25px rgba(0,0,0,0.2)";
//                 e.currentTarget.querySelector(".icon-ring").style.transform =
//                   "rotate(10deg)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow =
//                   "0 8px 22px rgba(0,0,0,0.12)";
//                 e.currentTarget.querySelector(".icon-ring").style.transform =
//                   "rotate(0deg)";
//               }}
//             >
//               <div
//                 className="icon-ring"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "50%",
//                   background:
//                     "radial-gradient(circle, #cde8b1 20%, #a5d6a7 100%)",
//                   boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
//                   transition: "transform 0.3s ease",
//                   marginBottom: "15px",
//                 }}
//               >
//                 {f.icon}
//               </div>
//               <h3
//                 style={{
//                   color: "#1b3d1a",
//                   marginTop: "10px",
//                   fontSize: "1.3rem",
//                   fontWeight: "700",
//                 }}
//               >
//                 {f.title}
//               </h3>
//               <p
//                 style={{
//                   color: "#4a4a4a",
//                   marginTop: "12px",
//                   fontSize: "1rem",
//                   lineHeight: "1.5",
//                 }}
//               >
//                 {f.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Crop animation CSS */}
//         <style>{`
//           .crop {
//             position: absolute;
//             bottom: -40px;
//             width: 20px;
//             height: 20px;
//             background: radial-gradient(circle, #8bc34a 40%, #558b2f 100%);
//             border-radius: 50% 50% 0 0;
//             opacity: 0.9;
//             animation: floatUp linear infinite;
//           }
//           @keyframes floatUp {
//             0% { transform: translateY(0) scale(1); opacity: 0.8; }
//             50% { opacity: 1; transform: translateY(-50vh) scale(1.1); }
//             100% { transform: translateY(-100vh) scale(1); opacity: 0; }
//           }
//           @media (max-width: 768px) {
//             h1 { font-size: 2rem; }
//             p { font-size: 0.9rem; }
//             .icon-ring { width: 65px; height: 65px; }
//             .crop { width: 14px; height: 14px; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default Dashboard;



// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaBrain,
//   FaComments,
//   FaTint,
//   FaLeaf,
//   FaChartLine,
//   FaCloudSun,
// } from "react-icons/fa";
// import { useTranslation } from "react-i18next";
// import Snav from "./sidenav";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   // Force re-render when language changes
//   const language = i18n.language;

//   const features = [
//     {
//       title: t("AI Crop Suggestion"),
//       icon: <FaBrain size={48} color="#355E3B" />,
//       description: t("Get the best crop for your soil & weather"),
//       onClick: () => navigate("/ai-suggestion"),
//     },
//     {
//       title: t("Chatbot Assistant"),
//       icon: <FaComments size={48} color="#355E3B" />,
//       description: t("Ask AgriSense anything about farming"),
//       onClick: () => navigate("/chatbot"),
//     },
//     {
//       title: t("Irrigation Planner"),
//       icon: <FaTint size={48} color="#355E3B" />,
//       description: t("Plan watering schedules smartly"),
//       onClick: () => navigate("/irrigationplan"),
//     },
//     {
//       title: t("Fertilizer Advisor"),
//       icon: <FaLeaf size={48} color="#355E3B" />,
//       description: t("Get balanced fertilizer usage info"),
//       onClick: () => navigate("/fertilizer-advice"),
//     },
//     {
//       title: t("Sustainability Report"),
//       icon: <FaChartLine size={48} color="#355E3B" />,
//       description: t("View eco impact & carbon footprint"),
//       onClick: () => navigate("/report"),
//     },
//     {
//       title: t("Market Analysis"),
//       icon: <FaCloudSun size={48} color="#355E3B" />,
//       description: t("Check current market "),
//       onClick: () => navigate("/market"),
//     },
//   ];

//   useEffect(() => {
//     const container = document.getElementById("crop-background");
//     if (!container) return;
//     for (let i = 0; i < 15; i++) {
//       const crop = document.createElement("div");
//       crop.className = "crop";
//       crop.style.left = `${Math.random() * 100}%`;
//       crop.style.animationDelay = `${Math.random() * 10}s`;
//       crop.style.animationDuration = `${8 + Math.random() * 10}s`;
//       container.appendChild(crop);
//     }
//   }, []);

//   return (
//     <>
      
//       <div
//         style={{
//           position: "relative",
//           minHeight: "100vh",
//           overflow: "hidden",
//           background: "linear-gradient(to bottom, #f3f8ee, #e9f5dc)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "40px 20px",
//         }}
//       >
//         {/* Floating crops */}
//         <div
//           id="crop-background"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             overflow: "hidden",
//             zIndex: 0,
//           }}
//         ></div>

//         {/* Heading */}
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "40px",
//             zIndex: 2,
//             position: "relative",
//           }}
//         >
//           <h1
//             style={{
//               background:
//                 "linear-gradient(90deg, #2e7d32, #81c784, #4caf50, #2e7d32)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: "3rem",
//               fontWeight: "800",
//               letterSpacing: "1px",
//               textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
//               marginBottom: "15px",
//             }}
//           >
//             🌾 {t("AgriSense Smart Dashboard")}
//           </h1>

//           <p
//             style={{
//               fontSize: "1.1rem",
//               color: "#3a4d2d",
//               background:
//                 "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
//               padding: "10px 15px",
//               borderRadius: "10px",
//               display: "inline-block",
//               lineHeight: "1.6",
//               maxWidth: "700px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             {t(
//               "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably."
//             )}
//           </p>
//         </div>

//         {/* Feature cards */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gap: "35px",
//             width: "90%",
//             maxWidth: "1200px",
//             zIndex: 2,
//           }}
//         >
//           {features.map((f, index) => (
//             <div
//               key={index}
//               onClick={f.onClick}
//               style={{
//                 background: "rgba(255, 255, 255, 0.85)",
//                 borderRadius: "20px",
//                 padding: "35px 25px",
//                 textAlign: "center",
//                 cursor: "pointer",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255, 255, 255, 0.7)",
//                 boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <div
//                 className="icon-ring"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "50%",
//                   background:
//                     "radial-gradient(circle, #cde8b1 20%, #a5d6a7 100%)",
//                   boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
//                   transition: "transform 0.3s ease",
//                   marginBottom: "15px",
//                 }}
//               >
//                 {f.icon}
//               </div>
//               <h3
//                 style={{
//                   color: "#1b3d1a",
//                   marginTop: "10px",
//                   fontSize: "1.3rem",
//                   fontWeight: "700",
//                 }}
//               >
//                 {f.title}
//               </h3>
//               <p
//                 style={{
//                   color: "#4a4a4a",
//                   marginTop: "12px",
//                   fontSize: "1rem",
//                   lineHeight: "1.5",
//                 }}
//               >
//                 {f.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Crop animation */}
//         <style>{`
//           .crop {
//             position: absolute;
//             bottom: -40px;
//             width: 20px;
//             height: 20px;
//             background: radial-gradient(circle, #8bc34a 40%, #558b2f 100%);
//             border-radius: 50% 50% 0 0;
//             opacity: 0.9;
//             animation: floatUp linear infinite;
//           }
//           @keyframes floatUp {
//             0% { transform: translateY(0) scale(1); opacity: 0.8; }
//             50% { opacity: 1; transform: translateY(-50vh) scale(1.1); }
//             100% { transform: translateY(-100vh) scale(1); opacity: 0; }
//           }
//           @media (max-width: 768px) {
//             h1 { font-size: 2rem; }
//             p { font-size: 0.9rem; }
//             .icon-ring { width: 65px; height: 65px; }
//             .crop { width: 14px; height: 14px; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default Dashboard;








// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaBrain,
//   FaComments,
//   FaTint,
//   FaLeaf,
//   FaChartLine,
//   FaCloudSun,
// } from "react-icons/fa";
// import { FaPlusSquare } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const language = i18n.language; // Force re-render on language change

//   const features = [
//     {
//       title: t("AI Crop Suggestion"),
//       icon: <FaBrain size={48} color="#355E3B" />,
//       description: t("Get the best crop for your soil & weather"),
//       onClick: () => navigate("/ai-suggestion"),
//     },
//     {
//       title: t("Chatbot Assistant"),
//       icon: <FaComments size={48} color="#355E3B" />,
//       description: t("Ask AgriSense anything about farming"),
//       onClick: () => navigate("/chatbot"),
//     },
//     {
//       title: t("Irrigation Planner"),
//       icon: <FaTint size={48} color="#355E3B" />,
//       description: t("Plan watering schedules smartly"),
//       onClick: () => navigate("/irrigationplan"),
//     },
//     {
//       title: t("Fertilizer Advisor"),
//       icon: <FaLeaf size={48} color="#355E3B" />,
//       description: t("Get balanced fertilizer usage info"),
//       onClick: () => navigate("/fertilizer-advice"),
//     },
//     {
//       title: t("Sustainability Report"),
//       icon: <FaChartLine size={48} color="#355E3B" />,
//       description: t("View eco impact & carbon footprint"),
//       onClick: () => navigate("/report"),
//     },
//     {
//       title: t("AI Plant Doctor"),
//       icon: <FaPlusSquare size={48} color="#355E3B" />,
//       description: t("Check Crop Desease "),
//       onClick: () => navigate("/desease"),
//     },
//   ];

//   // Floating crops effect
//   useEffect(() => {
//     const container = document.getElementById("crop-background");
//     if (!container) return;
//     for (let i = 0; i < 15; i++) {
//       const crop = document.createElement("div");
//       crop.className = "crop";
//       crop.style.left = `${Math.random() * 100}%`;
//       crop.style.animationDelay = `${Math.random() * 10}s`;
//       crop.style.animationDuration = `${8 + Math.random() * 10}s`;
//       container.appendChild(crop);
//     }
//   }, []);

//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100vh",
//         overflow: "hidden",
//         background: "linear-gradient(to bottom, #f3f8ee, #e9f5dc)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       {/* Floating crops */}
//       <div
//         id="crop-background"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           overflow: "hidden",
//           zIndex: 0,
//         }}
//       ></div>

//       {/* Heading */}
//       <div
//         style={{
//           textAlign: "center",
//           marginBottom: "40px",
//           zIndex: 2,
//           position: "relative",
//         }}
//       >
//         <h1
//           style={{
//             background:
//               "linear-gradient(90deg, #2e7d32, #81c784, #4caf50, #2e7d32)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             fontSize: "3rem",
//             fontWeight: "800",
//             letterSpacing: "1px",
//             textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
//             marginBottom: "15px",
//           }}
//         >
//           🌾 {t("AgriSense Smart Dashboard")}
//         </h1>

//         <p
//           style={{
//             fontSize: "1.1rem",
//             color: "#3a4d2d",
//             background:
//               "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
//             padding: "10px 15px",
//             borderRadius: "10px",
//             display: "inline-block",
//             lineHeight: "1.6",
//             maxWidth: "700px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//           }}
//         >
//           {t(
//             "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably."
//           )}
//         </p>
//       </div>

//       {/* Feature cards */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "35px",
//           width: "90%",
//           maxWidth: "1200px",
//           zIndex: 2,
//         }}
//       >
//         {features.map((f, index) => (
//           <div
//             key={index}
//             onClick={f.onClick}
//             style={{
//               background: "rgba(255, 255, 255, 0.85)",
//               borderRadius: "20px",
//               padding: "35px 25px",
//               textAlign: "center",
//               cursor: "pointer",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.7)",
//               boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
//               transition: "all 0.3s ease-in-out",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05) rotate(-1deg)";
//               e.currentTarget.style.boxShadow =
//                 "0 12px 30px rgba(0,0,0,0.25)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1) rotate(0deg)";
//               e.currentTarget.style.boxShadow =
//                 "0 8px 22px rgba(0,0,0,0.12)";
//             }}
//           >
//             <div
//               className="icon-ring"
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "80px",
//                 height: "80px",
//                 borderRadius: "50%",
//                 background: "radial-gradient(circle, #cde8b1 20%, #a5d6a7 100%)",
//                 boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
//                 transition: "transform 0.3s ease-in-out",
//                 marginBottom: "15px",
//                 animation: "icon-bounce 2s infinite alternate",
//               }}
//             >
//               {f.icon}
//             </div>
//             <h3
//               style={{
//                 color: "#1b3d1a",
//                 marginTop: "10px",
//                 fontSize: "1.3rem",
//                 fontWeight: "700",
//               }}
//             >
//               {f.title}
//             </h3>
//             <p
//               style={{
//                 color: "#4a4a4a",
//                 marginTop: "12px",
//                 fontSize: "1rem",
//                 lineHeight: "1.5",
//               }}
//             >
//               {f.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Crop animation & general styles */}
//       <style>{`
//         .crop {
//           position: absolute;
//           bottom: -40px;
//           width: 20px;
//           height: 20px;
//           background: radial-gradient(circle, #8bc34a 40%, #558b2f 100%);
//           border-radius: 50% 50% 0 0;
//           opacity: 0.9;
//           animation: floatUp linear infinite;
//         }

//         @keyframes floatUp {
//           0% { transform: translateY(0) scale(1); opacity: 0.8; }
//           50% { opacity: 1; transform: translateY(-50vh) scale(1.1); }
//           100% { transform: translateY(-100vh) scale(1); opacity: 0; }
//         }

//         @keyframes icon-bounce {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//           100% { transform: translateY(0); }
//         }

//         @media (max-width: 768px) {
//           h1 { font-size: 2rem; }
//           p { font-size: 0.9rem; }
//           .icon-ring { width: 65px; height: 65px; }
//           .crop { width: 14px; height: 14px; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaComments,
  FaTint,
  FaLeaf,
  FaChartLine,
  FaPlusSquare,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";



const Dashboard = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // 👇 state to trigger re-render when language changes
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const features = [
    {
      title: t("AI Crop Suggestion"),
      icon: <FaBrain size={48} color="#355E3B" />,
      description: t("Get the best crop for your soil & weather"),
      onClick: () => navigate("/ai-suggestion"),
    },
    {
      title: t("Chatbot Assistant"),
      icon: <FaComments size={48} color="#355E3B" />,
      description: t("Ask AgriSense anything about farming"),
      onClick: () => navigate("/chatbot"),
    },
    {
      title: t("Irrigation Planner"),
      icon: <FaTint size={48} color="#355E3B" />,
      description: t("Plan watering schedules smartly"),
      onClick: () => navigate("/irrigationplan"),
    },
    {
      title: t("Fertilizer Advisor"),
      icon: <FaLeaf size={48} color="#355E3B" />,
      description: t("Get balanced fertilizer usage info"),
      onClick: () => navigate("/fertilizer-advice"),
    },
    {
      title: t("Sustainability Report"),
      icon: <FaChartLine size={48} color="#355E3B" />,
      description: t("View eco impact & carbon footprint"),
      onClick: () => navigate("/report"),
    },
    {
      title: t("AI Plant Doctor"),
      icon: <FaPlusSquare size={48} color="#355E3B" />,
      description: t("Check Plant Desease"),
      onClick: () => navigate("/desease"),
    },
  ];

  // Floating crops effect
  useEffect(() => {
    const container = document.getElementById("crop-background");
    if (!container) return;
    for (let i = 0; i < 15; i++) {
      const crop = document.createElement("div");
      crop.className = "crop";
      crop.style.left = `${Math.random() * 100}%`;
      crop.style.animationDelay = `${Math.random() * 10}s`;
      crop.style.animationDuration = `${8 + Math.random() * 10}s`;
      container.appendChild(crop);
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #f3f8ee, #e9f5dc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Floating crops */}
      <div
        id="crop-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      ></div>

      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h1
          style={{
            background:
              "linear-gradient(90deg, #2e7d32, #81c784, #4caf50, #2e7d32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "3rem",
            fontWeight: "800",
            letterSpacing: "1px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
            marginBottom: "15px",
          }}
        >
          🌾 {t("AgriSense Smart Dashboard")}
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#3a4d2d",
            background:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
            padding: "10px 15px",
            borderRadius: "10px",
            display: "inline-block",
            lineHeight: "1.6",
            maxWidth: "700px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {t(
            "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably."
          )}
        </p>
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "35px",
          width: "90%",
          maxWidth: "1200px",
          zIndex: 2,
        }}
      >
        {features.map((f, index) => (
          <div
            key={index}
            onClick={f.onClick}
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "20px",
              padding: "35px 25px",
              textAlign: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) rotate(-1deg)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow =
                "0 8px 22px rgba(0,0,0,0.12)";
            }}
          >
            <div
              className="icon-ring"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #cde8b1 20%, #a5d6a7 100%)",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                marginBottom: "15px",
                animation: "icon-bounce 2s infinite alternate",
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                color: "#1b3d1a",
                marginTop: "10px",
                fontSize: "1.3rem",
                fontWeight: "700",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                color: "#4a4a4a",
                marginTop: "12px",
                fontSize: "1rem",
                lineHeight: "1.5",
              }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Crop animation */}
      <style>{`
        .crop {
          position: absolute;
          bottom: -40px;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #8bc34a 40%, #558b2f 100%);
          border-radius: 50% 50% 0 0;
          opacity: 0.9;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 1; transform: translateY(-50vh) scale(1.1); }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }

        @keyframes icon-bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaBrain,
//   FaComments,
//   FaTint,
//   FaLeaf,
//   FaChartLine,
//   FaPlusSquare,
// } from "react-icons/fa";
// import i18n from "i18next";
// import { useTranslation, initReactI18next } from "react-i18next";

// // ✅ Inline translations (English, Hindi, Odia)
// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: {
//           "AgriSense Smart Dashboard": "AgriSense Smart Dashboard",
//           "AI Crop Suggestion": "AI Crop Suggestion",
//           "Chatbot Assistant": "Chatbot Assistant",
//           "Irrigation Planner": "Irrigation Planner",
//           "Fertilizer Advisor": "Fertilizer Advisor",
//           "Sustainability Report": "Sustainability Report",
//           "AI Plant Doctor": "AI Plant Doctor",
//           "Get the best crop for your soil & weather":
//             "Get the best crop for your soil & weather",
//           "Ask AgriSense anything about farming":
//             "Ask AgriSense anything about farming",
//           "Plan watering schedules smartly": "Plan watering schedules smartly",
//           "Get balanced fertilizer usage info":
//             "Get balanced fertilizer usage info",
//           "View eco impact & carbon footprint":
//             "View eco impact & carbon footprint",
//           "Check Crop Desease": "Check Crop Disease",
//           "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//             "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.",
//         },
//       },
//       hi: {
//         translation: {
//           "AgriSense Smart Dashboard": "एग्रीसेंस स्मार्ट डैशबोर्ड",
//           "AI Crop Suggestion": "एआई फसल सुझाव",
//           "Chatbot Assistant": "चैटबॉट सहायक",
//           "Irrigation Planner": "सिंचाई योजनाकार",
//           "Fertilizer Advisor": "उर्वरक सलाहकार",
//           "Sustainability Report": "सस्टेनेबिलिटी रिपोर्ट",
//           "AI Plant Doctor": "एआई पौधा डॉक्टर",
//           "Get the best crop for your soil & weather":
//             "अपनी मिट्टी और मौसम के अनुसार सबसे अच्छी फसल पाएं",
//           "Ask AgriSense anything about farming":
//             "खेती से जुड़ा कोई भी सवाल एग्रीसेंस से पूछें",
//           "Plan watering schedules smartly":
//             "स्मार्ट तरीके से पानी देने की योजना बनाएं",
//           "Get balanced fertilizer usage info":
//             "संतुलित उर्वरक उपयोग की जानकारी प्राप्त करें",
//           "View eco impact & carbon footprint":
//             "पर्यावरण प्रभाव और कार्बन फुटप्रिंट देखें",
//           "Check Crop Desease": "फसल रोग की पहचान करें",
//           "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//             "किसानों और विशेषज्ञों को एआई-आधारित जानकारी देकर समझदारी से खेती करने, संसाधन बचाने और टिकाऊ तरीके से बढ़ने के लिए सशक्त बनाना।",
//         },
//       },
//       or: {
//         translation: {
//           "AgriSense Smart Dashboard": "ଏଗ୍ରିସେନ୍ସ ସ୍ମାର୍ଟ ଡ୍ୟାସବୋର୍ଡ",
//           "AI Crop Suggestion": "ଏଆଇ ଫସଲ ପରାମର୍ଶ",
//           "Chatbot Assistant": "ଚାଟବୋଟ ସହାୟକ",
//           "Irrigation Planner": "ପାନିସେଚନ ଯୋଜନାକାରୀ",
//           "Fertilizer Advisor": "ସର ପରାମର୍ଶକାରୀ",
//           "Sustainability Report": "ସସ୍ଥିତି ରିପୋର୍ଟ",
//           "AI Plant Doctor": "ଏଆଇ ଗଛ ଡାକ୍ତର",
//           "Get the best crop for your soil & weather":
//             "ଆପଣଙ୍କ ମାଟି ଓ ପାଣିପାଗ ପାଇଁ ଭଲତମ ଫସଲ ଚୟନ କରନ୍ତୁ",
//           "Ask AgriSense anything about farming":
//             "କୃଷି ବିଷୟରେ ଏଗ୍ରିସେନ୍ସକୁ କିଛି ମଧ୍ୟ ପଚାରନ୍ତୁ",
//           "Plan watering schedules smartly":
//             "ପାନି ସେଚନ ସମୟସାରିଣୀ ସୁବିଚାରିତ ଭାବରେ ଯୋଜନା କରନ୍ତୁ",
//           "Get balanced fertilizer usage info":
//             "ସନ୍ତୁଳିତ ସର ବ୍ୟବହାର ସମ୍ବନ୍ଧୀୟ ସୂଚନା ପାଆନ୍ତୁ",
//           "View eco impact & carbon footprint":
//             "ପରିବେଶ ପ୍ରଭାବ ଓ କାର୍ବନ ଫୁଟପ୍ରିଣ୍ଟ ଦେଖନ୍ତୁ",
//           "Check Crop Desease": "ଫସଲ ରୋଗ ଯାଞ୍ଚ କରନ୍ତୁ",
//           "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//             "କୃଷକ ଓ ବିଶେଷଜ୍ଞମାନଙ୍କୁ ଏଆଇ ଆଧାରିତ ତଥ୍ୟ ସହିତ ସୁଦୃଢ କରି ସୁବୁଦ୍ଧି ଚାଷ, ସମ୍ପଦ ସଂରକ୍ଷଣ ଓ ସସ୍ଥିତିଶୀଳ ଉନ୍ନତି ପାଇଁ ସାହାଯ୍ୟ କରାଯାଉଛି।",
//         },
//       },
//     },
//     lng: localStorage.getItem("lang") || "en",
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//   });

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   // Force re-render when language changes
//   const [lang, setLang] = useState(i18n.language);
//   useEffect(() => {
//     const handleLangChange = (lng) => setLang(lng);
//     i18n.on("languageChanged", handleLangChange);
//     return () => i18n.off("languageChanged", handleLangChange);
//   }, [i18n]);

//   const features = [
//     {
//       title: t("AI Crop Suggestion"),
//       icon: <FaBrain size={48} color="#355E3B" />,
//       description: t("Get the best crop for your soil & weather"),
//       onClick: () => navigate("/ai-suggestion"),
//     },
//     {
//       title: t("Chatbot Assistant"),
//       icon: <FaComments size={48} color="#355E3B" />,
//       description: t("Ask AgriSense anything about farming"),
//       onClick: () => navigate("/chatbot"),
//     },
//     {
//       title: t("Irrigation Planner"),
//       icon: <FaTint size={48} color="#355E3B" />,
//       description: t("Plan watering schedules smartly"),
//       onClick: () => navigate("/irrigationplan"),
//     },
//     {
//       title: t("Fertilizer Advisor"),
//       icon: <FaLeaf size={48} color="#355E3B" />,
//       description: t("Get balanced fertilizer usage info"),
//       onClick: () => navigate("/fertilizer-advice"),
//     },
//     {
//       title: t("Sustainability Report"),
//       icon: <FaChartLine size={48} color="#355E3B" />,
//       description: t("View eco impact & carbon footprint"),
//       onClick: () => navigate("/report"),
//     },
//     {
//       title: t("AI Plant Doctor"),
//       icon: <FaPlusSquare size={48} color="#355E3B" />,
//       description: t("Check Crop Desease"),
//       onClick: () => navigate("/desease"),
//     },
//   ];

//   useEffect(() => {
//     const container = document.getElementById("crop-background");
//     if (!container) return;
//     container.innerHTML = "";
//     for (let i = 0; i < 15; i++) {
//       const crop = document.createElement("div");
//       crop.className = "crop";
//       crop.style.left = `${Math.random() * 100}%`;
//       crop.style.animationDelay = `${Math.random() * 10}s`;
//       crop.style.animationDuration = `${8 + Math.random() * 10}s`;
//       container.appendChild(crop);
//     }
//   }, []);

//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100vh",
//         overflow: "hidden",
//         background: "linear-gradient(to bottom, #f3f8ee, #e9f5dc)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       {/* 🌐 Language Switcher */}
//       <div
//         style={{
//           position: "absolute",
//           top: "20px",
//           right: "20px",
//           background: "rgba(0, 0, 0, 0.4)",
//           padding: "8px 12px",
//           borderRadius: "20px",
//           color: "white",
//           zIndex: 10,
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         🌐
//         <select
//           value={i18n.language}
//           onChange={(e) => {
//             i18n.changeLanguage(e.target.value);
//             localStorage.setItem("lang", e.target.value);
//           }}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "white",
//             fontWeight: "600",
//             cursor: "pointer",
//             outline: "none",
//           }}
//         >
//           <option value="en">EN</option>
//           <option value="hi">हिन्दी</option>
//           <option value="or">ଓଡ଼ିଆ</option>
//         </select>
//       </div>

//       {/* Floating crops */}
//       <div
//         id="crop-background"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           overflow: "hidden",
//           zIndex: 0,
//         }}
//       ></div>

//       {/* Header */}
//       <div style={{ textAlign: "center", marginBottom: "40px", zIndex: 2 }}>
//         <h1
//           style={{
//             background:
//               "linear-gradient(90deg, #2e7d32, #81c784, #4caf50, #2e7d32)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             fontSize: "3rem",
//             fontWeight: "800",
//             marginBottom: "15px",
//           }}
//         >
//           🌾 {t("AgriSense Smart Dashboard")}
//         </h1>
//         <p
//           style={{
//             fontSize: "1.1rem",
//             color: "#3a4d2d",
//             background:
//               "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
//             padding: "10px 15px",
//             borderRadius: "10px",
//             display: "inline-block",
//             maxWidth: "700px",
//           }}
//         >
//           {t(
//             "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably."
//           )}
//         </p>
//       </div>

//       {/* Feature cards */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "35px",
//           width: "90%",
//           maxWidth: "1200px",
//           zIndex: 2,
//         }}
//       >
//         {features.map((f, index) => (
//           <div
//             key={index}
//             onClick={f.onClick}
//             style={{
//               background: "rgba(255, 255, 255, 0.85)",
//               borderRadius: "20px",
//               padding: "35px 25px",
//               textAlign: "center",
//               cursor: "pointer",
//               boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
//               transition: "all 0.3s ease-in-out",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "80px",
//                 height: "80px",
//                 borderRadius: "50%",
//                 background: "radial-gradient(circle, #cde8b1, #a5d6a7)",
//                 marginBottom: "15px",
//               }}
//             >
//               {f.icon}
//             </div>
//             <h3 style={{ color: "#1b3d1a", fontWeight: "700" }}>{f.title}</h3>
//             <p style={{ color: "#4a4a4a", marginTop: "10px" }}>
//               {f.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Animation CSS */}
//       <style>{`
//         .crop {
//           position: absolute;
//           bottom: -40px;
//           width: 20px;
//           height: 20px;
//           background: radial-gradient(circle, #8bc34a 40%, #558b2f 100%);
//           border-radius: 50% 50% 0 0;
//           opacity: 0.9;
//           animation: floatUp linear infinite;
//         }
//         @keyframes floatUp {
//           0% { transform: translateY(0); opacity: 0.8; }
//           50% { transform: translateY(-50vh); opacity: 1; }
//           100% { transform: translateY(-100vh); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;
