


import React, { useState, useRef, useEffect } from "react";
import Snav from "./sidenav"; // Your navigation component

require('dotenv').config();

const API_KEY = process.env.API_KEY;
export default function VoiceAssistant() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "🌾 Hello! I’m Agriverse — your intelligent agricultural assistant. Click the mic to speak, then click Send.",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState("en-IN");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const el = document.getElementById("chat-box");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const getRecognition = () => {
    if (recognitionRef.current) return recognitionRef.current;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return null;
    }

    const rec = new SpeechRecognition();
    rec.lang = language;
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (event) => {
      try {
        const spoken = event.results[0][0].transcript;
        setInput(spoken); 
      } catch (e) {
        console.error("Recognition result error", e);
      }
    };

    rec.onerror = (evt) => {
      if (evt.error === "no-speech") {
        alert("No speech detected. Please try again.");
      } else {
        console.error("Speech recognition error:", evt);
      }
    };

    rec.onend = () => {
      setListening(false);
    };

    recognitionRef.current = rec;
    return rec;
  };

  const startListening = () => {
    const rec = getRecognition();
    if (!rec) {
      alert("Speech recognition not supported. Please use Chrome/Edge.");
      return;
    }

    try {
      setListening(true);
      rec.start();
    } catch (e) {
      console.warn("Could not start recognition", e);
      setListening(false);
    }
  };


  const stopListening = () => {
    const rec = recognitionRef.current;
    if (rec && listening) {
      try {
        rec.stop();
        setListening(false);
      } catch (e) {
        console.warn("Error stopping recognition", e);
      }
    }
  };



  const cancelSpeech = () => {
    try {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    } catch (e) {
      console.warn("cancelSpeech error", e);
    }
  };


  const speak = (text) => {
    if (!voiceEnabled) return; 
    cancelSpeech();
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = language;
      u.onstart = () => {
        if (!voiceEnabled) cancelSpeech();
      };
      synthRef.current.speak(u);
    } catch (e) {
      console.warn("Speak error", e);
    }
  };


  const toggleVoice = () => {
    const newVal = !voiceEnabled;
    setVoiceEnabled(newVal);
    if (!newVal) cancelSpeech(); 
  };

  const callGemini = async (promptText) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const body = {
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
        topP: 0.95,
      },
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      throw new Error(`AI API error ${r.status}: ${txt}`);
    }
    const json = await r.json();
    const reply =
      json?.candidates?.[0]?.content?.parts?.[0]?.text ||
      json?.output?.[0]?.content?.[0]?.text ||
      "Sorry, the assistant couldn't produce an answer.";

    return reply;
  };

  const buildPrompt = (userText) => {
    return `You are Agriverse — a professional agricultural assistant for Indian farmers.
Respond in short, professional paragraphs. Do not use bullet markers like "*" or "-" or "•".
If the user asks about fertilizers, irrigation, or soil, give practical actionable advice.
Match user's language preference (Hindi for hi-IN, English for en-IN).
User: ${userText}`;
  };

  const handleSend = async (text = input) => {
    if (!text || !text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    setMessages((m) => [...m, { from: "bot", text: "⏳ Thinking..." }]);

    try {
      stopListening();
      const prompt = buildPrompt(text);
      const reply = await callGemini(prompt);

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
        return [...filtered, { from: "bot", text: reply }];
      });


      if (voiceEnabled) speak(reply);
    } catch (err) {
      console.error("AI error", err);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
        return [
          ...filtered,
          { from: "bot", text: "⚠️ Sorry, I couldn't reach the AI service. Check console." },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div style={{ maxWidth: 760, margin: "18px auto", fontFamily: "Poppins, sans-serif" }}>
        <div style={{ background: "#000", color: "#fff", padding: 14, borderRadius: 8, textAlign: "center", fontWeight: 600 }}>
          🤖 Agriverse Voice Assistant
        </div>

        <div
          id="chat-box"
          style={{
            height: 420,
            overflowY: "auto",
            padding: 16,
            border: "1px solid #ddd",
            borderTop: 0,
            background: "#fff",
            marginTop: 6,
          }}
        >
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div
                style={{
                  background: m.from === "user" ? "#000" : "#f2f2f2",
                  color: m.from === "user" ? "#fff" : "#000",
                  padding: "10px 14px",
                  borderRadius: 14,
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.45,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
          <button
            onClick={() => (listening ? stopListening() : startListening())}
            title="Click to speak (fills the input)"
            style={{
              background: listening ? "#ff4444" : "#000",
              color: "#fff",
              border: "none",
              width: 48,
              height: 48,
              borderRadius: 24,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            🎙
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak and the text will fill here — then click Send"
            style={{ flex: 1, padding: 19 , borderRadius: 24, border: "1px solid #ccc", outline: "none" }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={() => handleSend()}
            disabled={loading}
            style={{ background: "#000", color: "#fff", border: "none", padding: "10px 10px", borderRadius: 24, cursor: "pointer" }}
          >
            Send
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
          <div>
            <label style={{ marginRight: 8 }}>🌐 Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: 6, borderRadius: 6 }}
            >
              <option value="en-IN">English (India)</option>
              <option value="hi-IN">Hindi (हिन्दी)</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label>🔊 Voice:</label>
            <button
              onClick={toggleVoice}
              style={{
                background: voiceEnabled ? "#0a8" : "#ccc",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {voiceEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <div style={{ color: "#777", fontSize: 12, marginTop: 8 }}>
          Tip: Grant microphone permission, use Chrome for best results. If the assistant speaks after toggling OFF, refresh — the toggle cancels ongoing speech immediately.
        </div>
      </div>
    </>
  );
}

