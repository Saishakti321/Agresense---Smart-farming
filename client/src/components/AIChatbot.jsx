
// import React, { useState, useRef, useEffect } from "react";

// // const API_KEY = "YOUR_GOOGLE_API_KEY"; // 🔑 Replace with your Gemini API key
// const API_KEY = "AIzaSyDuZhZZiyfaH16RZGbi_C6qswWKT8OFKto"; // <<-- replace this


// export default function VoiceAssistant() {
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "🌾 Hello! I’m Agriverse — your intelligent agricultural assistant. How can I support your farm today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [listening, setListening] = useState(false);
//   const [voiceEnabled, setVoiceEnabled] = useState(true);
//   const [language, setLanguage] = useState("en-IN");
//   const synth = useRef(window.speechSynthesis);

//   useEffect(() => {
//     const chatBox = document.getElementById("chat-box");
//     if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
//   }, [messages]);

//   // 🎙️ Voice Input (Speech → Text)
//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Your browser doesn’t support voice recognition. Please use Chrome.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = language;
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (event) => {
//       const spoken = event.results[0][0].transcript;
//       setInput(spoken); // Fill input box
//     };

//     recognition.start();
//   };

//   // 🔊 Speak AI Response
//   const speak = (text) => {
//     if (!voiceEnabled) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = language;
//     utter.rate = 1.05;
//     synth.current.cancel(); // stop any ongoing speech
//     synth.current.speak(utter);
//   };

//   // 🚀 Send message to Gemini API
//   const handleSend = async (text = input) => {
//     if (!text.trim()) return;

//     const newMsgs = [...messages, { from: "user", text }];
//     setMessages(newMsgs);
//     setInput("");

//     setMessages((prev) => [...prev, { from: "bot", text: "⏳ Thinking..." }]);

//     const systemPrompt = `
// You are Agriverse — an expert, professional AI assistant for Indian farmers.
// Your communication style is:
// - Clear, confident, and professional.
// - Use short sentences and modern formatting.
// - Always give direct, practical advice.
// - No bullets or asterisks.
// - Be empathetic and natural in tone.

// If the user asks about soil, fertilizer, or irrigation, give scientifically correct suggestions.
// If the user speaks Hindi, reply in Hindi.
//     `;

//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 role: "user",
//                 parts: [{ text: `${systemPrompt}\nUser: ${text}` }],
//               },
//             ],
//           }),
//         }
//       );

//       const data = await res.json();
//       const reply =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "Sorry, I’m unable to process that at the moment.";

//       setMessages((prev) => [
//         ...prev.filter((m) => m.text !== "⏳ Thinking..."),
//         { from: "bot", text: reply },
//       ]);

//       speak(reply);
//     } catch (err) {
//       console.error("AI Error:", err);
//       setMessages((prev) => [
//         ...prev.filter((m) => m.text !== "⏳ Thinking..."),
//         {
//           from: "bot",
//           text: "⚠️ I'm having trouble connecting right now. Please try again shortly.",
//         },
//       ]);
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Poppins, sans-serif",
//         maxWidth: "700px",
//         margin: "30px auto",
//         border: "1px solid #ddd",
//         borderRadius: "12px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         background: "#fff",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           background: "#000",
//           color: "#fff",
//           textAlign: "center",
//           padding: "15px",
//           fontSize: "1.3rem",
//           borderRadius: "12px 12px 0 0",
//           fontWeight: "600",
//         }}
//       >
//         🤖 Agriverse AI Assistant
//       </div>

//       {/* Chat Window */}
//       <div
//         id="chat-box"
//         style={{
//           height: "420px",
//           overflowY: "auto",
//           padding: "15px",
//           background: "#fafafa",
//         }}
//       >
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               justifyContent: m.from === "user" ? "flex-end" : "flex-start",
//               marginBottom: "12px",
//             }}
//           >
//             <div
//               style={{
//                 background: m.from === "user" ? "#000" : "#e6e6e6",
//                 color: m.from === "user" ? "#fff" : "#000",
//                 padding: "12px 16px",
//                 borderRadius: "20px",
//                 maxWidth: "80%",
//                 fontSize: "1rem",
//                 lineHeight: "1.5",
//                 whiteSpace: "pre-wrap",
//                 boxShadow:
//                   m.from === "bot"
//                     ? "0 2px 6px rgba(0,0,0,0.1)"
//                     : "0 2px 6px rgba(0,0,0,0.3)",
//               }}
//             >
//               {m.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Section */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           borderTop: "1px solid #ddd",
//           padding: "10px",
//           background: "#fff",
//         }}
//       >
//         <button
//           onClick={startListening}
//           style={{
//             background: listening ? "#ff4444" : "#000",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: "45px",
//             height: "45px",
//             fontSize: "1.3rem",
//             marginRight: "10px",
//             cursor: "pointer",
//           }}
//           title="Speak to Agriverse"
//         >
//           🎤
//         </button>

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Speak or type your question..."
//           style={{
//             flex: 1,
//             borderRadius: "25px",
//             border: "1px solid #ccc",
//             padding: "10px 15px",
//             outline: "none",
//             fontSize: "1rem",
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />

//         <button
//           onClick={() => handleSend()}
//           style={{
//             background: "#000",
//             color: "#fff",
//             border: "none",
//             borderRadius: "25px",
//             padding: "10px 20px",
//             marginLeft: "10px",
//             fontWeight: "600",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>

//       {/* Footer Settings */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "10px 15px",
//           alignItems: "center",
//         }}
//       >
//         <div>
//           🌐 Language:{" "}
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             style={{
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="en-IN">English (India)</option>
//             <option value="hi-IN">Hindi (हिन्दी)</option>
//           </select>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           🔊 Voice:{" "}
//           <button
//             onClick={() => setVoiceEnabled(!voiceEnabled)}
//             style={{
//               background: voiceEnabled ? "#0a8" : "#ccc",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               padding: "5px 10px",
//               cursor: "pointer",
//             }}
//           >
//             {voiceEnabled ? "ON" : "OFF"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import Snav from "./sidenav";

// /**
//  * VoiceAssistant.jsx
//  * - Paste into client/src/components/
//  * - Replace API_KEY with your Gemini API key
//  * - Chrome works best for speech recognition
//  */

// const API_KEY = "AIzaSyDuZhZZiyfaH16RZGbi_C6qswWKT8OFKto"; // <<-- replace this

// export default function VoiceAssistant() {
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text:
//         "🌾 Hello! I’m Agriverse — your intelligent agricultural assistant. Click the mic to speak, then click Send.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [listening, setListening] = useState(false);
//   const [voiceEnabled, setVoiceEnabled] = useState(true);
//   const [language, setLanguage] = useState("en-IN");
//   const [loading, setLoading] = useState(false);

//   // refs to keep recognition and synth persistent
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);

//   // auto-scroll chat
//   useEffect(() => {
//     const el = document.getElementById("chat-box");
//     if (el) el.scrollTop = el.scrollHeight;
//   }, [messages, loading]);

//   // Create or return existing recognition instance
//   const getRecognition = () => {
//     if (recognitionRef.current) return recognitionRef.current;
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return null;

//     const rec = new SpeechRecognition();
//     rec.lang = language;
//     rec.continuous = false;
//     rec.interimResults = false;

//     // On result fill input (do NOT auto-send)
//     rec.onresult = (event) => {
//       try {
//         const spoken = event.results[0][0].transcript;
//         setInput(spoken); // fill input box
//       } catch (e) {
//         console.warn("Recognition result error", e);
//       }
//     };

//     rec.onerror = (evt) => {
//       console.warn("Recognition error", evt);
//     };

//     rec.onend = () => {
//       setListening(false);
//     };

//     recognitionRef.current = rec;
//     return rec;
//   };

//   // Start listening (fills input). toggles listening state.
//   const startListening = () => {
//     const rec = getRecognition();
//     if (!rec) {
//       alert("Speech recognition not supported. Use Chrome/Edge.");
//       return;
//     }

//     // ensure recognition language updated
//     try {
//       rec.lang = language;
//     } catch (e) {}

//     try {
//       setListening(true);
//       rec.start();
//     } catch (e) {
//       console.warn("Could not start recognition", e);
//       setListening(false);
//     }
//   };

//   // Stop listening if running
//   const stopListening = () => {
//     const rec = recognitionRef.current;
//     if (rec && listening) {
//       try {
//         rec.stop();
//       } catch (e) {}
//       setListening(false);
//     }
//   };

//   // Cancel any speech currently playing
//   const cancelSpeech = () => {
//     try {
//       if (synthRef.current && synthRef.current.speaking) {
//         synthRef.current.cancel();
//       }
//     } catch (e) {
//       console.warn("cancelSpeech error", e);
//     }
//   };

//   // Speak text only if voiceEnabled. Also cancel if toggled OFF mid-speak.
//   const speak = (text) => {
//     if (!voiceEnabled) return; // strict guard
//     cancelSpeech();
//     try {
//       const u = new SpeechSynthesisUtterance(text);
//       u.lang = language;
//       // if toggle turned off while speaking, cancel inside onboundary check
//       u.onstart = () => {
//         if (!voiceEnabled) cancelSpeech();
//       };
//       synthRef.current.speak(u);
//     } catch (e) {
//       console.warn("Speak error", e);
//     }
//   };

//   // Toggle voice ON/OFF — ensure any ongoing audio stops immediately
//   const toggleVoice = () => {
//     const newVal = !voiceEnabled;
//     setVoiceEnabled(newVal);
//     if (!newVal) cancelSpeech(); // stop speaking immediately when turned off
//   };

//   // Call Gemini REST API (simple wrapper). Replace model+endpoint if needed.
//   const callGemini = async (promptText) => {
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

//     const body = {
//       contents: [
//         {
//           parts: [{ text: promptText }],
//         },
//       ],
//       generationConfig: {
//         temperature: 0.3,
//         maxOutputTokens: 500,
//         topP: 0.95,
//       },
//     };

//     const r = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     if (!r.ok) {
//       const txt = await r.text().catch(() => "");
//       throw new Error(`AI API error ${r.status}: ${txt}`);
//     }
//     const json = await r.json();
//     // defensive parsing of possible shapes
//     const reply =
//       json?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       json?.output?.[0]?.content?.[0]?.text ||
//       "Sorry, the assistant couldn't produce an answer.";

//     return reply;
//   };

//   // Build the system prompt (no asterisks; professional tone)
//   const buildPrompt = (userText) => {
//     return `You are Agriverse — a professional agricultural assistant for Indian farmers.
// Respond in short, professional paragraphs. Do not use bullet markers like "*" or "-" or "•".
// If the user asks about fertilizers, irrigation, or soil, give practical actionable advice.
// Match user's language preference (Hindi for hi-IN, English for en-IN).
// User: ${userText}`;
//   };

//   // Send (called when user clicks Send or presses Enter)
//   const handleSend = async (text = input) => {
//     if (!text || !text.trim()) return;

//     // push user message
//     setMessages((m) => [...m, { from: "user", text }]);
//     setInput("");
//     setLoading(true);

//     // show thinking indicator
//     setMessages((m) => [...m, { from: "bot", text: "⏳ Thinking..." }]);

//     try {
//       // ensure we stop listening before calling API
//       stopListening();

//       const prompt = buildPrompt(text);
//       const reply = await callGemini(prompt);

//       // replace thinking message with actual reply
//       setMessages((prev) => {
//         const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
//         return [...filtered, { from: "bot", text: reply }];
//       });

//       // speak if allowed
//       if (voiceEnabled) speak(reply);
//     } catch (err) {
//       console.error("AI error", err);
//       setMessages((prev) => {
//         const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
//         return [
//           ...filtered,
//           { from: "bot", text: "⚠️ Sorry, I couldn't reach the AI service. Check console." },
//         ];
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
    
//     <div style={{ maxWidth: 760, margin: "18px auto", fontFamily: "Poppins, sans-serif" }}>
//       <div style={{ background: "#000", color: "#fff", padding: 14, borderRadius: 8, textAlign: "center", fontWeight: 600 }}>
//         🤖 Agriverse Voice Assistant
//       </div>

//       <div
//         id="chat-box"
//         style={{
//           height: 420,
//           overflowY: "auto",
//           padding: 16,
//           border: "1px solid #ddd",
//           borderTop: 0,
//           background: "#fff",
//           marginTop: 6,
//         }}
//       >
//         {messages.map((m, i) => (
//           <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
//             <div
//               style={{
//                 background: m.from === "user" ? "#000" : "#f2f2f2",
//                 color: m.from === "user" ? "#fff" : "#000",
//                 padding: "10px 14px",
//                 borderRadius: 14,
//                 maxWidth: "80%",
//                 whiteSpace: "pre-wrap",
//                 lineHeight: 1.45,
//               }}
//             >
//               {m.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
//         <button
//           onClick={() => (listening ? stopListening() : startListening())}
//           title="Click to speak (fills the input)"
//           style={{
//             background: listening ? "#ff4444" : "#000",
//             color: "#fff",
//             border: "none",
//             width: 48,
//             height: 48,
//             borderRadius: 24,
//             fontSize: 18,
//             cursor: "pointer",
//           }}
//         >
//           🎙
//         </button>

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Speak and the text will fill here — then click Send"
//           style={{ flex: 1, padding: 12, borderRadius: 24, border: "1px solid #ccc", outline: "none" }}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />

//         <button
//           onClick={() => handleSend()}
//           disabled={loading}
//           style={{ background: "#000", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 24, cursor: "pointer" }}
//         >
//           Send
//         </button>
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
//         <div>
//           <label style={{ marginRight: 8 }}>🌐 Language:</label>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             style={{ padding: 6, borderRadius: 6 }}
//           >
//             <option value="en-IN">English (India)</option>
//             <option value="hi-IN">Hindi (हिन्दी)</option>
//           </select>
//         </div>

//         <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//           <label>🔊 Voice:</label>
//           <button
//             onClick={toggleVoice}
//             style={{
//               background: voiceEnabled ? "#0a8" : "#ccc",
//               color: "#fff",
//               border: "none",
//               padding: "6px 12px",
//               borderRadius: 8,
//               cursor: "pointer",
//             }}
//           >
//             {voiceEnabled ? "ON" : "OFF"}
//           </button>
//         </div>
//       </div>

//       <div style={{ color: "#777", fontSize: 12, marginTop: 8 }}>
//         Tip: Grant microphone permission, use Chrome for best results. If the assistant speaks after toggling OFF, refresh — the toggle cancels ongoing speech immediately.
//       </div>
//     </div>
//     </>
//   );
// }












// import React, { useState, useRef, useEffect } from "react";
// import Snav from "./sidenav";

// const API_KEY = "AIzaSyDuZhZZiyfaH16RZGbi_C6qswWKT8OFKto";

// export default function VoiceAssistant() {
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "🌾 नमस्ते! I’m Agriverse — your farming assistant. Speak or type your question about crops, weather, or fertilizers.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [listening, setListening] = useState(false);
//   const [voiceEnabled, setVoiceEnabled] = useState(true);
//   const [language, setLanguage] = useState("en-IN");
//   const [voiceGender, setVoiceGender] = useState("female"); // 🌟 gender switch
//   const [loading, setLoading] = useState(false);

//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);

//   useEffect(() => {
//     const el = document.getElementById("chat-box");
//     if (el) el.scrollTop = el.scrollHeight;
//   }, [messages, loading]);

//   // === SPEECH RECOGNITION ===
//   const getRecognition = () => {
//     if (recognitionRef.current) return recognitionRef.current;
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return null;

//     const rec = new SpeechRecognition();
//     rec.lang = language;
//     rec.continuous = false;
//     rec.interimResults = false;

//     rec.onresult = (event) => {
//       const spoken = event.results[0][0].transcript;
//       setInput(spoken);
//       // add user voice input to chat
//       setMessages((prev) => [...prev, { from: "user", text: `You said: ${spoken}` }]);
//     };

//     rec.onerror = (e) => console.warn("Recognition error:", e);
//     rec.onend = () => setListening(false);
//     recognitionRef.current = rec;
//     return rec;
//   };

//   const startListening = () => {
//     const rec = getRecognition();
//     if (!rec) {
//       alert("Speech recognition not supported. Use Chrome/Edge.");
//       return;
//     }
//     rec.lang = language;
//     setListening(true);
//     rec.start();
//   };

//   const stopListening = () => {
//     const rec = recognitionRef.current;
//     if (rec && listening) rec.stop();
//     setListening(false);
//   };

//   // === SPEECH SYNTHESIS ===
//   const cancelSpeech = () => {
//     if (synthRef.current && synthRef.current.speaking) synthRef.current.cancel();
//   };

//   const cleanTextForSpeech = (text) => {
//     return text
//       .replace(/[*•-]+/g, "")
//       .replace(/\n+/g, ". ")
//       .replace(/\s\s+/g, " ")
//       .trim();
//   };

//   const speak = (text) => {
//     if (!voiceEnabled) return;
//     cancelSpeech();
//     const utter = new SpeechSynthesisUtterance(cleanTextForSpeech(text));
//     utter.lang = language;

//     // Select voice (male/female)
//     const voices = synthRef.current.getVoices();
//     const selectedVoice = voices.find(
//       (v) =>
//         (voiceGender === "female"
//           ? v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("hema")
//           : v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("ravish") || v.name.toLowerCase().includes("raj"))
//         && v.lang.includes(language.split("-")[0])
//     );
//     if (selectedVoice) utter.voice = selectedVoice;

//     utter.rate = 1;
//     utter.pitch = voiceGender === "female" ? 1.1 : 0.9;
//     synthRef.current.speak(utter);
//   };

//   const toggleVoice = () => {
//     setVoiceEnabled((v) => {
//       if (v) cancelSpeech();
//       return !v;
//     });
//   };

//   // === GEMINI API ===
//   const callGemini = async (promptText) => {
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
//     const body = {
//       contents: [{ parts: [{ text: promptText }] }],
//       generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
//     };
//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     const data = await res.json();
//     const text =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       " Sorry, I couldn’t process that. Please try again.";
//     return text;
//   };

//   // === PROMPT BUILDER ===
//   const buildPrompt = (userText) => {
//     return `You are Agriverse, a friendly and knowledgeable AI assistant for Indian farmers.
// Your goal: reply with 3–6 short, clear, numbered points.
// Use natural tone, simple words.
// If language is Hindi, respond completely in Hindi.
// User asked: ${userText}`;
//   };

//   // === SEND MESSAGE ===
//   const handleSend = async (text = input) => {
//     if (!text.trim()) return;

//     setMessages((m) => [...m, { from: "user", text }]);
//     setInput("");
//     setLoading(true);
//     setMessages((m) => [...m, { from: "bot", text: "⏳ Thinking..." }]);

//     try {
//       stopListening();
//       const prompt = buildPrompt(text);
//       const reply = await callGemini(prompt);

//       setMessages((prev) => {
//         const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
//         return [...filtered, { from: "bot", text: reply }];
//       });

//       speak(reply);
//     } catch (err) {
//       setMessages((m) => [
//         ...m,
//         { from: "bot", text: " Network error. Please try again later." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatText = (text) => {
//     const lines = text.split(/\n+/);
//     return lines.map((line, i) => (
//       <div key={i} style={{ marginBottom: "6px" }}>
//         {line}
//       </div>
//     ));
//   };

//   return (
//     <>
      
//       <div style={styles.wrapper}>
//         <div style={styles.header}> Agriverse Voice Assistant</div>

//         <div id="chat-box" style={styles.chatBox}>
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               style={{
//                 ...styles.msg,
//                 alignSelf: m.from === "user" ? "flex-end" : "flex-start",
//                 background: m.from === "user" ? "#2d6a4f" : "#f0fdf4",
//                 color: m.from === "user" ? "#fff" : "#1b4332",
//               }}
//             >
//               {formatText(m.text)}
//             </div>
//           ))}
//         </div>

//         <div style={styles.controls}>
//           <button
//             onClick={() => (listening ? stopListening() : startListening())}
//             style={{
//               ...styles.micButton,
//               background: listening ? "#e63946" : "#2d6a4f",
//             }}
//             title="Click to speak"
//           >
//             🎙
//           </button>

//           <input
//             style={styles.input}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Speak or type your question..."
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />

//           <button onClick={() => handleSend()} style={styles.sendButton}>
//             ➤
//           </button>
//         </div>

//         <div style={styles.bottomBar}>
//           <div>
//             🌐 <b>Language:</b>{" "}
//             <select
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               style={styles.select}
//             >
//               <option value="en-IN">English</option>
//               <option value="hi-IN">हिन्दी</option>
//             </select>
//           </div>

//           <div>
//             👤 <b>Voice:</b>{" "}
//             <select
//               value={voiceGender}
//               onChange={(e) => setVoiceGender(e.target.value)}
//               style={styles.select}
//             >
//               <option value="female">Female</option>
//               <option value="male">Male</option>
//             </select>
//           </div>

//           <div>
//             🔊 <b>Speech:</b>{" "}
//             <button onClick={toggleVoice} style={styles.voiceToggle}>
//               {voiceEnabled ? "ON" : "OFF"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   wrapper: {
//     maxWidth: "750px",
//     margin: "30px auto",
//     fontFamily: "'Poppins', sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     background: "#f7fff7",
//     borderRadius: "12px",
//     boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//     padding: "10px",
//   },
//   header: {
//     background: "linear-gradient(90deg, #1b4332, #2d6a4f, #40916c)",
//     color: "#fff",
//     textAlign: "center",
//     padding: "14px",
//     borderRadius: "10px",
//     fontSize: "1.3rem",
//     fontWeight: 600,
//   },
//   chatBox: {
//     display: "flex",
//     flexDirection: "column",
//     height: "430px",
//     overflowY: "auto",
//     padding: "12px",
//     marginTop: "10px",
//     background: "#fff",
//     borderRadius: "10px",
//     border: "1px solid #ddd",
//   },
//   msg: {
//     padding: "10px 14px",
//     borderRadius: "16px",
//     marginBottom: "8px",
//     maxWidth: "80%",
//     fontSize: "0.95rem",
//     whiteSpace: "pre-wrap",
//     lineHeight: "1.4",
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     marginTop: "10px",
//     gap: "8px",
//   },
//   micButton: {
//     border: "none",
//     color: "#fff",
//     borderRadius: "50%",
//     width: "44px",
//     height: "44px",
//     fontSize: "18px",
//     cursor: "pointer",
//   },
//   input: {
//     flex: 1,
//     padding: "12px",
//     borderRadius: "22px",
//     border: "1px solid #ccc",
//     outline: "none",
//   },
//   sendButton: {
//     background: "#2d6a4f",
//     color: "#fff",
//     border: "none",
//     borderRadius: "50%",
//     width: "44px",
//     height: "44px",
//     fontSize: "18px",
//     cursor: "pointer",
//   },
//   bottomBar: {
//     marginTop: "12px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "8px 10px",
//     borderTop: "1px solid #ddd",
//     fontSize: "0.9rem",
//     flexWrap: "wrap",
//     gap: "8px",
//   },
//   select: {
//     borderRadius: "8px",
//     padding: "4px 6px",
//     border: "1px solid #ccc",
//   },
//   voiceToggle: {
//     background: "#2d6a4f",
//     color: "#fff",
//     border: "none",
//     padding: "4px 10px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };






























import React, { useState, useRef, useEffect } from "react";
import Snav from "./sidenav"; // Your navigation component

const API_KEY = "AIzaSyDuZhZZiyfaH16RZGbi_C6qswWKT8OFKto"; // Replace this with your Gemini API key

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

  // refs to keep recognition and synth persistent
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // auto-scroll chat
  useEffect(() => {
    const el = document.getElementById("chat-box");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // Create or return existing recognition instance
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

    // On result fill input (do NOT auto-send)
    rec.onresult = (event) => {
      try {
        const spoken = event.results[0][0].transcript;
        setInput(spoken); // fill input box
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

  // Start listening (fills input). toggles listening state.
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

  // Stop listening if running
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

  // Cancel any speech currently playing
  const cancelSpeech = () => {
    try {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    } catch (e) {
      console.warn("cancelSpeech error", e);
    }
  };

  // Speak text only if voiceEnabled. Also cancel if toggled OFF mid-speak.
  const speak = (text) => {
    if (!voiceEnabled) return; // strict guard
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

  // Toggle voice ON/OFF — ensure any ongoing audio stops immediately
  const toggleVoice = () => {
    const newVal = !voiceEnabled;
    setVoiceEnabled(newVal);
    if (!newVal) cancelSpeech(); // stop speaking immediately when turned off
  };

  // Call Gemini REST API (simple wrapper)
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

  // Build the system prompt
  const buildPrompt = (userText) => {
    return `You are Agriverse — a professional agricultural assistant for Indian farmers.
Respond in short, professional paragraphs. Do not use bullet markers like "*" or "-" or "•".
If the user asks about fertilizers, irrigation, or soil, give practical actionable advice.
Match user's language preference (Hindi for hi-IN, English for en-IN).
User: ${userText}`;
  };

  // Send (called when user clicks Send or presses Enter)
  const handleSend = async (text = input) => {
    if (!text || !text.trim()) return;

    // push user message
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    // show thinking indicator
    setMessages((m) => [...m, { from: "bot", text: "⏳ Thinking..." }]);

    try {
      stopListening();
      const prompt = buildPrompt(text);
      const reply = await callGemini(prompt);

      // replace thinking message with actual reply
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.text !== "⏳ Thinking...");
        return [...filtered, { from: "bot", text: reply }];
      });

      // speak if allowed
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

