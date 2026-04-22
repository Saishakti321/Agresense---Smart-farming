
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






