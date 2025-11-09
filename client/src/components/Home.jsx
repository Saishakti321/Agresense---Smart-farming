// import React from "react";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.page}>
      

//       {/* Hero Section */}
//       <section style={styles.hero}>
//         <Container>
//           <Row className="align-items-center">
//             <Col md={6}>
//               <h1 style={styles.heroTitle}>Welcome to AgriSense 🌾</h1>
//               <p style={styles.heroText}>
//                 A smart farming platform that empowers farmers with technology-driven
//                 tools — weather insights, irrigation planning, soil monitoring,
//                 and data-based crop analysis — to increase yield and sustainability.
//               </p>
         
//             </Col>
//             <Col md={6} className="text-center">
//               <img
//                 src="https://img.freepik.com/premium-vector/smart-farm-interactive-management-agricultural-production-processes-village-equipment-tillage-vector-illustration_273828-959.jpg?w=2000"
//                 alt="Smart farming illustration"
//                 style={styles.heroImg}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* About Section */}
//       <section style={styles.about}>
//         <Container>
//           <h2 style={styles.sectionTitle}>About AgriSense</h2>
//           <p style={styles.aboutText}>
//             AgriSense is a next-generation digital platform designed to bridge the gap
//             between traditional farming and modern agricultural technology.
//             It provides farmers with data-driven insights to make informed
//             decisions for improved crop health, water management, and productivity.
//           </p>
//         </Container>
//       </section>

//       {/* Feature Section */}
//       <section style={styles.features}>
//         <Container>
//           <h2 style={styles.sectionTitle}>Our Key Features</h2>
//           <Row>
//             {[
//               {
//                 title: "🌦️ Weather Forecasting",
//                 desc: "Accurate daily and weekly forecasts to help farmers plan irrigation and crop protection.",
//               },
//               {
//                 title: "💧 Smart Irrigation Planner",
//                 desc: "AI-based recommendations to optimize water usage and save resources.",
//               },
//               {
//                 title: "🌱 Soil Health Monitoring",
//                 desc: "Real-time tracking of soil moisture, pH, and nutrients to ensure better yield.",
//               },
//               {
//                 title: "📊 Crop Growth Analysis",
//                 desc: "Predictive crop analytics using AI and weather data to select suitable crops.",
//               },
//               {
//                 title: "🚜 Smart Farming Tools",
//                 desc: "Access modern agricultural tools and technologies to boost efficiency.",
//               },
//               {
//                 title: "📢 Farmer Helpdesk",
//                 desc: "Raise complaints and get instant support from agricultural experts.",
//               },
//             ].map((feature, i) => (
//               <Col key={i} xs={12} md={4} style={{ marginBottom: "25px" }}>
//                 <Card style={styles.featureCard}>
//                   <Card.Body>
//                     <Card.Title style={styles.featureTitle}>
//                       {feature.title}
//                     </Card.Title>
//                     <Card.Text style={styles.featureDesc}>
//                       {feature.desc}
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Vision Section */}
//       <section style={styles.vision}>
//         <Container>
//           <Row className="align-items-center">
//             <Col md={6}>
//               <img
//                 src="https://www.gktoday.in/wp-content/uploads/2023/02/smart-agriculture.png"
//                 alt="Farm field"
//                 style={styles.visionImg}
//               />
//             </Col>
//             <Col md={6}>
//               <h2 style={styles.sectionTitle}>Our Vision</h2>
//               <p style={styles.visionText}>
//                 We aim to create a sustainable and tech-driven agricultural ecosystem
//                 where farmers use data and automation to make better decisions,
//                 save natural resources, and achieve higher profits with less effort.
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* CTA Section */}
//       <section style={styles.cta}>
//         <Container className="text-center">
//           <h2 style={{ color: "white" }}>
//             Join AgriSense and Experience Smart Farming 🚀
//           </h2>
//           <Button
//             variant="light"
//             size="lg"
//             style={styles.ctaBtn}
//             onClick={() => navigate("/register")}
//           >
//             Register Now
//           </Button>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <p>
//           © {new Date().getFullYear()} <strong>AgriSense</strong> | Empowering
//           Farmers with Technology 🌿
//         </p>
//       </footer>
//     </div>
//   );
// }

// const styles = {
//   page: { backgroundColor: "#f8fdf8" },
//   hero: {
//     padding: "80px 0",
//     background: "linear-gradient(120deg, #40916c, #2d6a4f)",
//     color: "white",
//   },
//   heroTitle: { fontSize: "2.8em", fontWeight: "800" },
//   heroText: { fontSize: "1.2em", margin: "20px 0" },
//   heroBtn: {
//     backgroundColor: "#95d5b2",
//     border: "none",
//     color: "#1b4332",
//     fontWeight: "700",
//     padding: "10px 25px",
//     borderRadius: "25px",
//   },
//   heroImg: { maxWidth: "100%", borderRadius: "20px" },

//   about: {
//     padding: "60px 0",
//     backgroundColor: "#ffffff",
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: "2.2em",
//     color: "#1b4332",
//     marginBottom: "20px",
//     fontWeight: "700",
//   },
//   aboutText: {
//     maxWidth: "800px",
//     margin: "0 auto",
//     color: "#081c15",
//     lineHeight: "1.7",
//   },

//   features: {
//     padding: "70px 0",
//     backgroundColor: "#f6fff8",
//   },
//   featureCard: {
//     border: "none",
//     borderRadius: "15px",
//     padding: "20px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff",
//     height: "100%",
//   },
//   featureTitle: {
//     fontSize: "1.2em",
//     color: "#1b4332",
//     fontWeight: "700",
//   },
//   featureDesc: { fontSize: "1em", color: "#333" },

//   vision: {
//     padding: "70px 0",
//     backgroundColor: "#e9f5ec",
//   },
//   visionImg: { maxWidth: "100%", borderRadius: "20px" },
//   visionText: { fontSize: "1.1em", color: "#081c15", lineHeight: "1.6" },

//   cta: {
//     background: "linear-gradient(135deg, #2d6a4f, #1b4332)",
//     padding: "60px 0",
//   },
//   ctaBtn: {
//     borderRadius: "25px",
//     padding: "10px 30px",
//     color: "#1b4332",
//     fontWeight: "700",
//   },

//   footer: {
//     textAlign: "center",
//     padding: "20px 0",
//     backgroundColor: "#1b4332",
//     color: "white",
//   },
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./sidenav";
// import { useTranslation, initReactI18next } from "react-i18next";
// import i18n from "i18next";

// // ========== INLINE i18n SETUP ==========
// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: {
//           heroTitle: "Empowering Farmers with Smart Agriculture 🌾",
//           heroDesc:
//             "AgriSense helps farmers boost productivity with AI-driven insights, irrigation planning, and real-time soil data.",
//           heroCTA: "Explore Features",
//           featuresTitle: "Smart Farming Features",
//           feature_weather_title: "🌦️ Weather Forecasting",
//           feature_weather_desc:
//             "Get accurate forecasts to plan your crops and irrigation efficiently.",
//           feature_irrigation_title: "💧 Smart Irrigation Planner",
//           feature_irrigation_desc:
//             "Optimize water usage with AI-powered irrigation schedules.",
//           feature_soil_title: "🌱 Soil Health Monitoring",
//           feature_soil_desc:
//             "Analyze soil moisture, nutrients, and fertility in real-time.",
//           feature_crop_title: "📊 Crop Growth Insights",
//           feature_crop_desc:
//             "AI analyzes crop growth and predicts yield for better planning.",
//           galleryTitle: "Our Farming Community",
//           testimonialsTitle: "What Farmers Say",
//           faqTitle: "Frequently Asked Questions",
//           faq_q1: "How can I use AgriSense?",
//           faq_a1:
//             "Just sign up, add your crops and land info, and start receiving smart insights.",
//           faq_q2: "Is the app available offline?",
//           faq_a2:
//             "Yes, some features like crop data and soil info are available offline.",
//           faq_q3: "Can I use this in local language?",
//           faq_a3:
//             "Absolutely! AgriSense supports multiple Indian languages for your comfort.",
//           ctaJoin: "Join AgriSense Today 🚀",
//           aboutDesc:
//             "A next-generation smart farming platform helping farmers make data-driven decisions.",
//           contactCTA: "Contact Us",
//           footerNote: "© {{year}} AgriSense | Empowering Farmers 🌿",
//           sampleYieldLabel: "Average yield:"
//         },
//       },
//       hi: {
//         translation: {
//           heroTitle: "स्मार्ट कृषि के साथ किसानों को सशक्त बनाएं 🌾",
//           heroDesc:
//             "AgriSense किसानों को AI आधारित जानकारी, सिंचाई योजना और मिट्टी के डेटा के साथ मदद करता है।",
//           heroCTA: "फ़ीचर्स देखें",
//           featuresTitle: "स्मार्ट कृषि सुविधाएँ",
//           feature_weather_title: "🌦️ मौसम पूर्वानुमान",
//           feature_weather_desc:
//             "सटीक मौसम पूर्वानुमान से अपनी फसलों और सिंचाई की योजना बनाएं।",
//           feature_irrigation_title: "💧 स्मार्ट सिंचाई योजनाकार",
//           feature_irrigation_desc:
//             "AI आधारित शेड्यूल से पानी की खपत को अनुकूल बनाएं।",
//           feature_soil_title: "🌱 मिट्टी स्वास्थ्य निगरानी",
//           feature_soil_desc:
//             "वास्तविक समय में मिट्टी की नमी और पोषक तत्वों की जांच करें।",
//           feature_crop_title: "📊 फसल वृद्धि विश्लेषण",
//           feature_crop_desc: "AI आपकी फसलों की वृद्धि और उत्पादन की भविष्यवाणी करता है।",
//           galleryTitle: "हमारा किसान समुदाय",
//           testimonialsTitle: "किसान क्या कहते हैं",
//           faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
//           faq_q1: "मैं AgriSense का उपयोग कैसे कर सकता हूँ?",
//           faq_a1:
//             "बस साइन अप करें, अपनी फसलें जोड़ें और स्मार्ट सुझाव प्राप्त करें।",
//           faq_q2: "क्या ऐप ऑफलाइन काम करता है?",
//           faq_a2: "हाँ, कुछ फ़ीचर्स ऑफलाइन भी उपलब्ध हैं।",
//           faq_q3: "क्या मैं इसे अपनी भाषा में उपयोग कर सकता हूँ?",
//           faq_a3: "हाँ! AgriSense कई भारतीय भाषाओं में उपलब्ध है।",
//           ctaJoin: "आज ही AgriSense से जुड़ें 🚀",
//           aboutDesc:
//             "एक स्मार्ट कृषि प्लेटफ़ॉर्म जो किसानों को डेटा आधारित निर्णय लेने में मदद करता है।",
//           contactCTA: "संपर्क करें",
//           footerNote: "© {{year}} AgriSense | किसानों को सशक्त बना रहा है 🌿",
//           sampleYieldLabel: "औसत उत्पादन:"
//         },
//       },
//       or: {
//         translation: {
//           heroTitle: "ସ୍ମାର୍ଟ କୃଷି ସହିତ କୃଷକଙ୍କୁ ସଶକ୍ତ କରନ୍ତୁ 🌾",
//           heroDesc:
//             "AgriSense କୃଷକଙ୍କୁ AI ଆଧାରିତ ସୂଚନା, ସିଚାଇ ପରିକଳ୍ପନା ଏବଂ ମାଟି ତଥ୍ୟ ସହାୟତା ପ୍ରଦାନ କରେ।",
//           heroCTA: "ବିଶେଷତାଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
//           featuresTitle: "ସ୍ମାର୍ଟ କୃଷି ବିଶେଷତା",
//           feature_weather_title: "🌦️ ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
//           feature_weather_desc:
//             "ନିଶ୍ଚିତ ପୂର୍ବାନୁମାନ ସହ ଫସଲ ଏବଂ ସିଚାଇ ଯୋଜନା କରନ୍ତୁ।",
//           feature_irrigation_title: "💧 ସ୍ମାର୍ଟ ସିଚାଇ ପରିକଳ୍ପନାକାରୀ",
//           feature_irrigation_desc:
//             "AI ସହିତ ପାଣି ବ୍ୟବହାରକୁ ଅପ୍ଟିମାଇଜ୍ କରନ୍ତୁ।",
//           feature_soil_title: "🌱 ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ",
//           feature_soil_desc: "ସମୟ ସାଥିରେ ମାଟିର ଆର୍ଦ୍ରତା ଓ ପୋଷକତା ଯାଞ୍ଚ କରନ୍ତୁ।",
//           feature_crop_title: "📊 ଫସଲ ବିଶ୍ଳେଷଣ",
//           feature_crop_desc: "AI ଫସଲ ଗୋଡ଼ିବା ଏବଂ ଉତ୍ପାଦନ ଅନୁମାନ କରେ।",
//           galleryTitle: "ଆମ କୃଷକ ସମୁଦାୟ",
//           testimonialsTitle: "କୃଷକମାନେ କହୁଛନ୍ତି",
//           faqTitle: "ସାଧାରଣ ପ୍ରଶ୍ନ",
//           faq_q1: "ମୁଁ AgriSense କିପରି ବ୍ୟବହାର କରିପାରିବି?",
//           faq_a1: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ ଏବଂ ସ୍ମାର୍ଟ ସୁପାରିଶ ପାଆନ୍ତୁ।",
//           faq_q2: "ଏହା ଅଫଲାଇନ୍ ଚାଲିବ କି?",
//           faq_a2: "ହଁ, କିଛି ବିଶେଷତା ଅଫଲାଇନ୍ ଉପଲବ୍ଧ।",
//           faq_q3: "ମୁଁ ମୋ ଭାଷାରେ ବ୍ୟବହାର କରିପାରିବି କି?",
//           faq_a3: "ନିଶ୍ଚିତ! AgriSense ଅନେକ ଭାରତୀୟ ଭାଷା ସମର୍ଥନ କରେ।",
//           ctaJoin: "ଆଜି AgriSense ସହ ଯୋଗଦିଅନ୍ତୁ 🚀",
//           aboutDesc:
//             "ଏକ ସ୍ମାର୍ଟ କୃଷି ପ୍ଲାଟଫର୍ମ ଯାହା କୃଷକଙ୍କୁ ତଥ୍ୟ ଆଧାରିତ ନିଷ୍ପତ୍ତି ନେବାରେ ସହାୟତା କରେ।",
//           contactCTA: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
//           footerNote: "© {{year}} AgriSense | କୃଷକଙ୍କୁ ସଶକ୍ତ କରୁଛି 🌿",
//           sampleYieldLabel: "ଔସତ ଉତ୍ପାଦନ:"
//         },
//       },
//     },
//     lng: localStorage.getItem("lang") || "en",
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//   });

// // ========== INLINE CSS ==========
// const style = `
// .home-page{font-family:Poppins,system-ui,sans-serif;color:#08301f;}
// html{scroll-behavior:smooth;}
// .hero{padding:80px 0;background:linear-gradient(120deg,#2d6a4f,#40916c);color:#fff;}
// .hero-inner{display:flex;gap:30px;align-items:center;justify-content:space-between;flex-wrap:wrap;}
// .hero h1{font-size:2.6rem;margin-bottom:18px;text-shadow:0 6px 18px rgba(0,0,0,0.18);}
// .hero p{font-size:1.08rem;margin-bottom:20px;}
// .cta{background:#d8f3dc;color:#123b24;border-radius:26px;padding:12px 22px;font-weight:700;border:none;box-shadow:0 8px 30px rgba(0,0,0,0.12);cursor:pointer;transition:transform .22s ease;}
// .cta:hover{transform:translateY(-4px) scale(1.02);}
// .features{padding:60px 0;background:#f6fff8;}
// .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;}
// .feature-card{background:#fff;border-radius:14px;padding:18px;box-shadow:0 6px 18px rgba(7,28,15,0.07);transition:transform .25s ease,box-shadow .25s ease;}
// .feature-card:hover{transform:translateY(-8px);box-shadow:0 18px 40px rgba(7,28,15,0.12);}
// .gallery{padding:40px 0;}
// .gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;}
// .gallery-grid img{width:100%;height:140px;object-fit:cover;border-radius:8px;transition:transform .28s ease;cursor:pointer;}
// .gallery-grid img:hover{transform:scale(1.05);}
// .testimonials{padding:60px 0;}
// .test-card{background:#f8fff8;border-radius:12px;padding:18px;box-shadow:0 6px 20px rgba(7,28,15,0.06);}
// .faq{padding:40px 0;background:#fff;}
// .faq-item{margin-bottom:10px;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(7,28,15,0.04);}
// .faq-header{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:linear-gradient(90deg,#e9f5ec,#f6fffb);cursor:pointer;}
// .faq-body{padding:14px 18px;background:#ffffff;display:none;}
// .faq-body.open{display:block;}
// .footer{padding:24px 0;background:#123b24;color:#fff;text-align:center;}
// .lang-widget{position:fixed;top:18px;right:18px;z-index:9999;display:flex;gap:8px;align-items:center;background:rgba(0,0,0,0.4);padding:8px 10px;border-radius:999px;backdrop-filter:blur(6px);}
// .lang-select{background:transparent;border:none;color:#fff;outline:none;font-weight:600;}
// .reveal{opacity:0;transform:translateY(20px);transition:all .7s;}
// .reveal.visible{opacity:1;transform:translateY(0);}
// @media(max-width:768px){.hero h1{font-size:1.7rem;}.gallery-grid img{height:120px;}}
// `;
// const styleTag = document.createElement("style");
// styleTag.innerHTML = style;
// document.head.appendChild(styleTag);

// // ========== COMPONENT ==========
// export default function Home() {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [openFaq, setOpenFaq] = useState(null);

//   useEffect(() => {
//     const els = document.querySelectorAll(".reveal");
//     const io = new IntersectionObserver(
//       (entries) => entries.forEach((en) => {
//         if (en.isIntersecting) {
//           en.target.classList.add("visible");
//           io.unobserve(en.target);
//         }
//       }),
//       { threshold: 0.12 }
//     );
//     els.forEach((el) => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   const gallery = [
//     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
//     "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
//     "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200",
//     "https://images.unsplash.com/photo-1542038784456-5d7bf2c2f1f8?w=1200",
//   ];

//   return (
//     <div className="home-page">
//       <div className="lang-widget">
//         🌐
//         <select
//           className="lang-select"
//           value={i18n.language}
//           onChange={(e) => {
//             i18n.changeLanguage(e.target.value);
//             localStorage.setItem("lang", e.target.value);
//           }}
//         >
//           <option value="en">EN</option>
//           <option value="hi">हिन्दी</option>
//           <option value="or">ଓଡ଼ିଆ</option>
//         </select>
//       </div>

//       {/* HERO */}
//       <section className="hero">
//         <div className="container hero-inner reveal">
//           <div>
//             <h1>{t("heroTitle")}</h1>
//             <p>{t("heroDesc")}</p>
//             <button className="cta" onClick={() => document.getElementById("features").scrollIntoView({behavior:"smooth"})}>{t("heroCTA")}</button>
//           </div>
//           <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200" alt="farm" style={{maxWidth:400,borderRadius:12}}/>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" className="features reveal">
//         <h2 style={{textAlign:"center",marginBottom:20}}>{t("featuresTitle")}</h2>
//         <div className="features-grid">
//           <div className="feature-card"><h4>{t("feature_weather_title")}</h4><p>{t("feature_weather_desc")}</p></div>
//           <div className="feature-card"><h4>{t("feature_irrigation_title")}</h4><p>{t("feature_irrigation_desc")}</p></div>
//           <div className="feature-card"><h4>{t("feature_soil_title")}</h4><p>{t("feature_soil_desc")}</p></div>
//           <div className="feature-card"><h4>{t("feature_crop_title")}</h4><p>{t("feature_crop_desc")}</p></div>
//         </div>
//       </section>

//       {/* GALLERY */}
//       <section id="gallery" className="gallery reveal">
//         <h2 style={{textAlign:"center"}}>{t("galleryTitle")}</h2>
//         <div className="gallery-grid">
//           {gallery.map((src,i)=><img key={i} src={src+"&auto=format"} alt="farm" loading="lazy"/>)}
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="faq reveal">
//         <h2 style={{textAlign:"center"}}>{t("faqTitle")}</h2>
//         {[1,2,3].map(i=>(
//           <div className="faq-item" key={i}>
//             <div className="faq-header" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
//               <div>{t(`faq_q${i}`)}</div>
//               <div>{openFaq===i?"−":"+"}</div>
//             </div>
//             <div className={`faq-body ${openFaq===i?"open":""}`}>
//               {t(`faq_a${i}`)}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* CTA */}
//       <section style={{textAlign:"center",padding:"40px",background:"linear-gradient(135deg,#1b4332,#2d6a4f)",color:"#fff"}} className="reveal">
//         <h3>{t("ctaJoin")}</h3>
//         <p>{t("aboutDesc")}</p>
//         <button className="cta" onClick={()=>navigate("/register")}>{t("ctaJoin")}</button>
//       </section>

//       <footer className="footer reveal">
//         <p>{t("footerNote",{year:new Date().getFullYear()})}</p>
//       </footer>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidenav";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

// ========== i18n SETUP ==========
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          heroTitle: "Empowering Farmers with Smart Agriculture 🌾",
          heroDesc:
            "AgriSense helps farmers boost productivity with AI-driven insights, irrigation planning, and real-time soil data.",
          heroCTA: "Explore Features",
          featuresTitle: "Smart Farming Features",
          feature_weather_title: "🌦️ Weather Forecasting",
          feature_weather_desc:
            "Get accurate forecasts to plan your crops and irrigation efficiently.",
          feature_irrigation_title: "💧 Smart Irrigation Planner",
          feature_irrigation_desc:
            "Optimize water usage with AI-powered irrigation schedules.",
          feature_soil_title: "🌱 Soil Health Monitoring",
          feature_soil_desc:
            "Analyze soil moisture, nutrients, and fertility in real-time.",
          feature_crop_title: "📊 Crop Growth Insights",
          feature_crop_desc:
            "AI analyzes crop growth and predicts yield for better planning.",
          galleryTitle: "Our Farming Community",
          faqTitle: "Frequently Asked Questions",
          faq_q1: "How can I use AgriSense?",
          faq_a1:
            "Just sign up, add your crops and land info, and start receiving smart insights.",
          faq_q2: "Is the app available offline?",
          faq_a2:
            "Yes, some features like crop data and soil info are available offline.",
          faq_q3: "Can I use this in local language?",
          faq_a3:
            "Absolutely! AgriSense supports multiple Indian languages for your comfort.",
          ctaJoin: "Join AgriSense Today 🚀",
          aboutDesc:
            "A next-generation smart farming platform helping farmers make data-driven decisions.",
          footerNote: "© {{year}} AgriSense | Empowering Farmers 🌿",
        },
      },
      hi: {
        translation: {
          heroTitle: "स्मार्ट कृषि के साथ किसानों को सशक्त बनाएं 🌾",
          heroDesc:
            "AgriSense किसानों को AI आधारित जानकारी, सिंचाई योजना और मिट्टी के डेटा के साथ मदद करता है।",
          heroCTA: "फ़ीचर्स देखें",
          featuresTitle: "स्मार्ट कृषि सुविधाएँ",
          feature_weather_title: "🌦️ मौसम पूर्वानुमान",
          feature_weather_desc:
            "सटीक मौसम पूर्वानुमान से अपनी फसलों और सिंचाई की योजना बनाएं।",
          feature_irrigation_title: "💧 स्मार्ट सिंचाई योजनाकार",
          feature_irrigation_desc:
            "AI आधारित शेड्यूल से पानी की खपत को अनुकूल बनाएं।",
          feature_soil_title: "🌱 मिट्टी स्वास्थ्य निगरानी",
          feature_soil_desc:
            "वास्तविक समय में मिट्टी की नमी और पोषक तत्वों की जांच करें।",
          feature_crop_title: "📊 फसल वृद्धि विश्लेषण",
          feature_crop_desc: "AI आपकी फसलों की वृद्धि और उत्पादन की भविष्यवाणी करता है।",
          galleryTitle: "हमारा किसान समुदाय",
          faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
          faq_q1: "मैं AgriSense का उपयोग कैसे कर सकता हूँ?",
          faq_a1:
            "बस साइन अप करें, अपनी फसलें जोड़ें और स्मार्ट सुझाव प्राप्त करें।",
          faq_q2: "क्या ऐप ऑफलाइन काम करता है?",
          faq_a2: "हाँ, कुछ फ़ीचर्स ऑफलाइन भी उपलब्ध हैं।",
          faq_q3: "क्या मैं इसे अपनी भाषा में उपयोग कर सकता हूँ?",
          faq_a3: "हाँ! AgriSense कई भारतीय भाषाओं में उपलब्ध है।",
          ctaJoin: "आज ही AgriSense से जुड़ें 🚀",
          aboutDesc:
            "एक स्मार्ट कृषि प्लेटफ़ॉर्म जो किसानों को डेटा आधारित निर्णय लेने में मदद करता है।",
          footerNote: "© {{year}} AgriSense | किसानों को सशक्त बना रहा है 🌿",
        },
      },
      or: {
        translation: {
          heroTitle: "ସ୍ମାର୍ଟ କୃଷି ସହିତ କୃଷକଙ୍କୁ ସଶକ୍ତ କରନ୍ତୁ 🌾",
          heroDesc:
            "AgriSense କୃଷକଙ୍କୁ AI ଆଧାରିତ ସୂଚନା, ସିଚାଇ ପରିକଳ୍ପନା ଏବଂ ମାଟି ତଥ୍ୟ ସହାୟତା ପ୍ରଦାନ କରେ।",
          heroCTA: "ବିଶେଷତାଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
          featuresTitle: "ସ୍ମାର୍ଟ କୃଷି ବିଶେଷତା",
          feature_weather_title: "🌦️ ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
          feature_weather_desc:
            "ନିଶ୍ଚିତ ପୂର୍ବାନୁମାନ ସହ ଫସଲ ଏବଂ ସିଚାଇ ଯୋଜନା କରନ୍ତୁ।",
          feature_irrigation_title: "💧 ସ୍ମାର୍ଟ ସିଚାଇ ପରିକଳ୍ପନାକାରୀ",
          feature_irrigation_desc:
            "AI ସହିତ ପାଣି ବ୍ୟବହାରକୁ ଅପ୍ଟିମାଇଜ୍ କରନ୍ତୁ।",
          feature_soil_title: "🌱 ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ",
          feature_soil_desc: "ସମୟ ସାଥିରେ ମାଟିର ଆର୍ଦ୍ରତା ଓ ପୋଷକତା ଯାଞ୍ଚ କରନ୍ତୁ।",
          feature_crop_title: "📊 ଫସଲ ବିଶ୍ଳେଷଣ",
          feature_crop_desc: "AI ଫସଲ ଗୋଡ଼ିବା ଏବଂ ଉତ୍ପାଦନ ଅନୁମାନ କରେ।",
          galleryTitle: "ଆମ କୃଷକ ସମୁଦାୟ",
          faqTitle: "ସାଧାରଣ ପ୍ରଶ୍ନ",
          faq_q1: "ମୁଁ AgriSense କିପରି ବ୍ୟବହାର କରିପାରିବି?",
          faq_a1: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ ଏବଂ ସ୍ମାର୍ଟ ସୁପାରିଶ ପାଆନ୍ତୁ।",
          faq_q2: "ଏହା ଅଫଲାଇନ୍ ଚାଲିବ କି?",
          faq_a2: "ହଁ, କିଛି ବିଶେଷତା ଅଫଲାଇନ୍ ଉପଲବ୍ଧ।",
          faq_q3: "ମୁଁ ମୋ ଭାଷାରେ ବ୍ୟବହାର କରିପାରିବି କି?",
          faq_a3: "ନିଶ୍ଚିତ! AgriSense ଅନେକ ଭାରତୀୟ ଭାଷା ସମର୍ଥନ କରେ।",
          ctaJoin: "ଆଜି AgriSense ସହ ଯୋଗଦିଅନ୍ତୁ 🚀",
          aboutDesc:
            "ଏକ ସ୍ମାର୍ଟ କୃଷି ପ୍ଲାଟଫର୍ମ ଯାହା କୃଷକଙ୍କୁ ତଥ୍ୟ ଆଧାରିତ ନିଷ୍ପତ୍ତି ନେବାରେ ସହାୟତା କରେ।",
          footerNote: "© {{year}} AgriSense | କୃଷକଙ୍କୁ ସଶକ୍ତ କରୁଛି 🌿",
        },
      },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// ========== CSS (aligned & responsive) ==========
const style = `
html{scroll-behavior:smooth;}
.home-page{font-family:Poppins,system-ui,sans-serif;color:#08301f;overflow-x:hidden;}
.hero{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:40px;padding:90px 5%;background:linear-gradient(135deg,#2d6a4f,#40916c);color:#fff;text-align:left;}
.hero h1{font-size:2.8rem;font-weight:800;margin-bottom:14px;}
.hero p{max-width:600px;font-size:1.2rem;margin-bottom:22px;}
.hero img{max-width:400px;width:90%;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);}
.cta{background:#d8f3dc;color:#123b24;border-radius:26px;padding:12px 24px;font-weight:700;border:none;cursor:pointer;transition:all .3s ease;}
.cta:hover{transform:translateY(-4px);background:#b7e4c7;}
.features{padding:70px 5%;background:#f6fff8;text-align:center;}
.features h2{font-size:2.2rem;margin-bottom:40px;}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;}
.feature-card{background:#fff;padding:24px;border-radius:14px;box-shadow:0 8px 22px rgba(7,28,15,0.08);transition:all .3s;}
.feature-card:hover{transform:translateY(-6px);box-shadow:0 14px 40px rgba(7,28,15,0.1);}
.gallery{padding:60px 5%;text-align:center;}
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:20px;}
.gallery-grid img{width:100%;height:180px;object-fit:cover;border-radius:10px;transition:transform .3s;}
.gallery-grid img:hover{transform:scale(1.05);}
.faq{padding:70px 5%;background:#fff;}
.faq-item{margin-bottom:16px;border-radius:12px;overflow:hidden;box-shadow:0 4px 14px rgba(7,28,15,0.05);}
.faq-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:linear-gradient(90deg,#e9f5ec,#f6fffb);cursor:pointer;font-weight:600;}
.faq-body{padding:16px 20px;display:none;background:#ffffff;line-height:1.6;}
.faq-body.open{display:block;}
.footer{text-align:center;padding:26px;background:#123b24;color:#fff;}
.lang-widget{position:fixed;top:18px;right:18px;z-index:9999;display:flex;gap:8px;align-items:center;background:rgba(0,0,0,0.4);padding:8px 10px;border-radius:999px;backdrop-filter:blur(6px);}
.lang-select{background:transparent;border:none;color:#fff;outline:none;font-weight:600;cursor:pointer;}
@media(max-width:768px){.hero{text-align:center;}.hero h1{font-size:2rem;}.hero p{font-size:1rem;}.hero img{max-width:300px;}}
`;
const tag = document.createElement("style");
tag.innerHTML = style;
document.head.appendChild(tag);

// ========== COMPONENT ==========
export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="home-page">
      <div className="lang-widget">
        🌐
        <select
          className="lang-select"
          value={i18n.language}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
            localStorage.setItem("lang", e.target.value);
          }}
        >
          <option value="en">EN</option>
          <option value="hi">हिन्दी</option>
          <option value="or">ଓଡ଼ିଆ</option>
        </select>
      </div>

      {/* HERO */}
      <section className="hero">
        <div>
          <h1>{t("heroTitle")}</h1>
          <p>{t("heroDesc")}</p>
          <button
            className="cta"
            onClick={() =>
              document.getElementById("features").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            {t("heroCTA")}
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200"
          alt="farm"
        />
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>{t("featuresTitle")}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h4>{t("feature_weather_title")}</h4>
            <p>{t("feature_weather_desc")}</p>
          </div>
          <div className="feature-card">
            <h4>{t("feature_irrigation_title")}</h4>
            <p>{t("feature_irrigation_desc")}</p>
          </div>
          <div className="feature-card">
            <h4>{t("feature_soil_title")}</h4>
            <p>{t("feature_soil_desc")}</p>
          </div>
          <div className="feature-card">
            <h4>{t("feature_crop_title")}</h4>
            <p>{t("feature_crop_desc")}</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <h2>{t("galleryTitle")}</h2>
        <div className="gallery-grid">
          {[
            "https://cdn.downtoearth.org.in/library/large/2019-09-06/0.75193500_1567782903_0.jpg",
            "https://img.freepik.com/premium-photo/beautiful-dramatic-portrait-indian-rural-happy-farmer-standing-field-wearing-shirt-pant-summer-time_181020-3983.jpg?w=2000",
            "https://img.freepik.com/premium-photo/harmony-fields-traditional-farming-methods-rural-india_1072731-466.jpg",
            "https://www.atlanticcouncil.org/wp-content/uploads/2020/09/An-Indian-farmer-in-a-field-scaled.jpg",
          ].map((src, i) => (
            <img key={i} src={src} alt="farm" />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {t("faqTitle")}
        </h2>
        {[1, 2, 3].map((i) => (
          <div className="faq-item" key={i}>
            <div
              className="faq-header"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div>{t(`faq_q${i}`)}</div>
              <div>{openFaq === i ? "−" : "+"}</div>
            </div>
            <div className={`faq-body ${openFaq === i ? "open" : ""}`}>
              {t(`faq_a${i}`)}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 5%",
          background: "linear-gradient(135deg,#1b4332,#2d6a4f)",
          color: "#fff",
        }}
      >
        <h3>{t("ctaJoin")}</h3>
        <p>{t("aboutDesc")}</p>
        <button className="cta" onClick={() => navigate("/register")}>
          {t("ctaJoin")}
        </button>
      </section>

      <footer className="footer">
        <p>{t("footerNote", { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}
