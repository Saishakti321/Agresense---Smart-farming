

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, RefreshCw, ImagePlus, CheckCircle } from "lucide-react";

const API_BASE = "https://crop.kindwise.com";
const IDENTIFY_ENDPOINT = "/api/v1/identification";

const REMEDY_DB = [
  { match: ["leaf blight", "early blight"], remedies: ["Remove infected leaves", "Avoid overhead watering", "Use copper fungicide"] },
  { match: ["late blight"], remedies: ["Destroy infected plants", "Use certified seeds only"] },
  { match: ["powdery mildew"], remedies: ["Use sulfur spray", "Increase sunlight"] },
  { match: ["rust"], remedies: ["Use resistant variety", "Apply fungicide if severe"] },
  { match: ["bacterial"], remedies: ["Use copper spray", "Avoid touching wet leaves"] },
  { match: ["healthy"], remedies: ["Healthy — keep monitoring"] },
];

const findRemedies = (label = "") => {
  label = label.toLowerCase();
  for (const r of REMEDY_DB)
    if (r.match.some((m) => label.includes(m))) return r.remedies;
  return ["Improve hygiene", "Remove affected parts"];
};

const useObjectUrl = (f) => {
  const [u, s] = useState(null);
  useEffect(() => {
    if (!f) return s(null);
    const a = URL.createObjectURL(f);
    s(a);
    return () => URL.revokeObjectURL(a);
  }, [f]);
  return u;
};

async function callKindwise({ apiKey, file, cropName }) {
  if (!apiKey) throw Error("Missing API Key");
  if (!file) throw Error("Upload image");
  const fd = new FormData();
  fd.append("images", file);
  if (cropName && /^\d+$/.test(cropName)) fd.append("custom_id", cropName);
  const r = await fetch(API_BASE + IDENTIFY_ENDPOINT, {
    method: "POST",
    headers: { "Api-Key": apiKey },
    body: fd,
  });
  if (!r.ok) throw Error("Server error");
  return r.json();
}

export default function CropAIDoctor() {
  const [apiKey, setApiKey] = useState("");
  const [file, setFile] = useState(null);
  const [cropName, setCropName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const preview = useObjectUrl(file);
  const inputRef = useRef();

  const top = useMemo(() => {
    const p = result?.result?.disease?.suggestions || [];
    return p.length ? [...p].sort((a, b) => b.probability - a.probability)[0] : null;
  }, [result]);

  async function predict() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await callKindwise({ apiKey, file, cropName }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError("");
  }

  return (
    <div className="container">
      {/* Internal CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(to bottom, #eaf8f1, #cce3d3);
        }

        .header {
          background: rgba(255, 255, 255, 0.8);
          padding: 15px 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(10px);
          border-bottom: 2px solid #a7d7b8;
          z-index: 100;
        }

        .header h1 {
          color: #064e3b;
          font-weight: 700;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-key {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #86efac;
          outline: none;
          width: 230px;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.7);
        }

        .input-key:focus {
          border: 2px solid #10b981;
        }

        .card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 30px;
          margin: 40px auto;
          max-width: 600px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(8px);
        }

        .upload {
          border: 2px dashed #10b981;
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          transition: 0.3s;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        .upload:hover {
          background: #bbf7d0;
          transform: scale(1.01);
        }

        .btn {
          background: linear-gradient(90deg, #064e3b, #065f46, #047857);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .btn:hover {
          transform: scale(1.05);
          background: linear-gradient(90deg, #065f46, #047857, #064e3b);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .predict-btn {
          margin-left: 10px;
        }

        .disabled {
          background: #a7a7a7 !important;
          cursor: not-allowed;
        }

        .result {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          padding: 20px;
          border-radius: 15px;
          margin-top: 20px;
          border: 1px solid #10b981;
        }

        .footer {
          text-align: center;
          padding: 10px;
          font-size: 0.8rem;
          color: white;
          background: linear-gradient(90deg, #064e3b, #065f46);
          border-top: 3px solid #10b981;
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <h1>
          <Leaf size={28} color="#10b981" /> Crop AI Doctor
        </h1>
        <input
          type="password"
          placeholder="🔑 Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="input-key"
        />
      </header>

      {/* Main Section */}
      <main>
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="upload"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) setFile(f);
            }}
          >
            {!preview ? (
              <>
                <ImagePlus className="text-green-600 mb-3" size={40} />
                <p>Drop or Upload Leaf Image</p>
                <p style={{ fontSize: "0.8rem", color: "#555" }}>
                  JPEG, PNG under 5MB
                </p>
              </>
            ) : (
              <motion.img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-xl shadow-lg border border-green-100 object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className="btn" onClick={() => inputRef.current.click()}>
              {preview ? "Change Image" : "Choose Image"}
            </button>
          </div>

          {/* Crop Input + Predict */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <input
              placeholder="🌾 Crop name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="input-key"
              style={{ width: "50%", marginRight: "10px" }}
            />
            <button
              className={`btn predict-btn ${loading || !file || !apiKey ? "disabled" : ""}`}
              onClick={predict}
              disabled={loading || !file || !apiKey}
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} /> Analyzing…
                </>
              ) : (
                <>
                  <CheckCircle size={16} /> Predict
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error}
            </p>
          )}

          {/* Result */}
          {result && top && (
            <motion.div
              className="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>🩺 Disease: {top.name}</h3>
              <p>Confidence: {(top.probability * 100).toFixed(1)}%</p>
              <h4>🌱 Recommended Actions:</h4>
              <ul>
                {findRemedies(top.name).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <button className="btn" onClick={reset}>
                🔄 New Analysis
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Smart Agri AI 🌿 — Designed for Farmers
      </footer>
    </div>
  );
}
