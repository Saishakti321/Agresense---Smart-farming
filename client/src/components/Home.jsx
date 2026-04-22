
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidenav";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

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
