// import React, { useMemo, useRef, useState } from "react";

// const API_BASE = "https://crop.kindwise.com";
// const IDENTIFY_ENDPOINT = "/api/v1/identification";

// const REMEDY_DB = [
//   { match: ["leaf blight", "early blight"], crop: ["tomato", "potato", "solanaceae"], remedies: [
//     "Remove heavily infected leaves.",
//     "Avoid overhead watering; water soil-level in mornings.",
//     "Rotate crops 2–3 years.",
//     "Use copper or chlorothalonil per label.",
//     "Improve spacing and airflow.",
//   ]},
//   { match: ["late blight"], crop: ["tomato", "potato"], remedies: [
//     "Destroy infected plants; do not compost.",
//     "Apply mancozeb or metalaxyl per guidance.",
//     "Stake/prune for airflow; reduce leaf wetness.",
//     "Use certified seed/transplants.",
//   ]},
//   { match: ["powdery mildew"], crop: ["cucumber", "squash", "grape", "rose", "mango"], remedies: [
//     "Spray potassium bicarbonate or sulfur fungicides.",
//     "Increase spacing and sunlight; prune canopy.",
//     "Avoid excess nitrogen; balance fertilization.",
//     "Remove worst-affected leaves early.",
//   ]},
//   { match: ["rust"], crop: ["wheat", "bean", "coffee"], remedies: [
//     "Use triazole or strobilurin fungicides per label.",
//     "Grow resistant cultivars.",
//     "Remove alternate hosts and residue.",
//     "Maintain balanced nutrition.",
//   ]},
//   { match: ["bacterial spot", "bacterial blight"], crop: ["tomato", "pepper", "rice"], remedies: [
//     "Copper-based bactericides; rotate MOA.",
//     "Avoid working plants when wet.",
//     "Use certified clean seed and resistant varieties.",
//     "Remove debris and sanitize tools.",
//   ]},
//   { match: ["healthy"], crop: ["any"], remedies: [
//     "Plant appears healthy — monitor.",
//     "Clean tools and remove debris.",
//     "Maintain balanced NPK and irrigation.",
//     "Mulch to reduce splash-borne pathogens.",
//   ]},
// ];

// function findRemedies(label = "", crop = "") {
//   const a = label.toLowerCase();
//   const c = crop.toLowerCase();
//   let best = null;
//   for (const e of REMEDY_DB) {
//     const hit = e.match.some((m) => a.includes(m));
//     if (!hit) continue;
//     const boost = c && e.crop?.some((x) => c.includes(x) || x === "any");
//     if (!best) best = { e, s: boost ? 2 : 1 }; else if (boost && best.s < 2) best = { e, s: 2 };
//   }
//   return best?.e?.remedies ?? [
//     "Remove affected parts.",
//     "Improve airflow; avoid overhead irrigation.",
//     "Use appropriate crop protection per local guidance.",
//     "Rotate crops and sanitize tools.",
//   ];
// }

// const formatPct = (n) => `${(n * 100).toFixed(1)}%`;

// function useObjectUrl(file) {
//   const [url, setUrl] = useState(null);
//   React.useEffect(() => {
//     if (!file) return setUrl(null);
//     const u = URL.createObjectURL(file);
//     setUrl(u);
//     return () => URL.revokeObjectURL(u);
//   }, [file]);
//   return url;
// }

// async function copyToClipboard(text) {
//   if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
//     try { await navigator.clipboard.writeText(text); return { ok: true, via: "navigator.clipboard" }; } catch {}
//   }
//   try {
//     const ta = document.createElement("textarea");
//     ta.value = text || "";
//     ta.setAttribute("readonly", "");
//     ta.style.position = "fixed";
//     ta.style.top = "-1000px";
//     document.body.appendChild(ta);
//     ta.select();
//     const ok = document.execCommand("copy");
//     document.body.removeChild(ta);
//     if (ok) return { ok: true, via: "execCommand" };
//   } catch {}
//   return { ok: false };
// }

// async function callKindwise({ apiKey, file, cropName }) {
//   if (!apiKey) throw new Error("Missing API key");
//   if (!file) throw new Error("Please add an image");
//   const form = new FormData();
//   form.append("images", file);
// //   if (cropName) form.append("custom_id", cropName);
// if (cropName && /^\d+$/.test(cropName)) form.append("custom_id", cropName);

//   const url = `${API_BASE}${IDENTIFY_ENDPOINT}`;
//   const res = await fetch(url, { method: "POST", headers: { "Api-Key": apiKey }, body: form });
//   if (!res.ok) { const t = await res.text().catch(() => ""); throw new Error(`API error ${res.status}: ${t || res.statusText}`); }
//   return await res.json();
// }

// export default function App() {
//   const [apiKey, setApiKey] = useState("");
//   const [file, setFile] = useState(null);
//   const [cropName, setCropName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);
//   const [copyMsg, setCopyMsg] = useState("");
//   const inputRef = useRef(null);
//   const previewUrl = useObjectUrl(file);

//   const topPrediction = useMemo(() => {
//     const p = result?.result?.disease?.suggestions || result?.predictions || [];
//     if (!p.length) return null;
//     return [...p].sort((a, b) => (b.probability ?? b.confidence ?? 0) - (a.probability ?? a.confidence ?? 0))[0];
//   }, [result]);

//   function onDrop(e) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) setFile(f); }
//   function onPick(e) { const f = e.target.files?.[0]; if (f) setFile(f); }

//   async function onPredict() {
//     setError("");
//     setResult(null);
//     try {
//       setLoading(true);
//       const data = await callKindwise({ apiKey, file, cropName });
//       setResult(data);
//       const top = (data?.result?.disease?.suggestions || data?.predictions || [])[0] || null;
//       setHistory((h) => [
//         { ts: new Date().toISOString(), crop: data?.result?.crop?.suggestions?.[0]?.name || cropName || "", imageName: file?.name || "image", top: top },
//         ...h,
//       ].slice(0, 8));
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally { setLoading(false); }
//   }

//   function clearAll() { setFile(null); setResult(null); setError(""); }

//   async function handleCopyKey() {
//     const { ok, via } = await copyToClipboard(apiKey);
//     if (ok) { setCopyMsg(`API key copied (${via}).`); setTimeout(() => setCopyMsg(""), 2000); }
//     else { setCopyMsg("Clipboard blocked by browser policy. Manually select and copy the key."); setTimeout(() => setCopyMsg(""), 4000); }
//   }

//   async function runClipboardSelfTest() {
//     const r = await copyToClipboard("clipboard-self-test");
//     alert(r.ok ? `Clipboard OK via ${r.via}` : "Clipboard copy failed due to permissions policy. Try HTTPS or different host.");
//   }

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <header className="sticky top-0 z-10 border-b border-black/10 bg-white/70 backdrop-blur">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 rounded-full border border-black/20 bg-gradient-to-br from-black to-black/60" />
//             <h1 className="text-xl font-semibold tracking-tight">Kindwise Crop Disease Detector</h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="password" placeholder="Paste Kindwise API key" className="w-64 rounded-xl border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
//             <button onClick={handleCopyKey} className="rounded-xl border border-black/20 px-3 py-2 text-xs hover:bg-black hover:text-white" title="Copy API key (with fallback)">Copy</button>
//           </div>
//         </div>
//         {copyMsg && (<div className="mx-auto max-w-6xl px-4 pb-2 text-xs text-black/70">{copyMsg}</div>)}
//       </header>

//       <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3">
//         <section className="md:col-span-2">
//           <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className="relative flex min-h-[260px] items-center justify-center rounded-3xl border-2 border-dashed border-black/20 p-6">
//             {!previewUrl ? (
//               <div className="pointer-events-none flex flex-col items-center gap-3 text-center">
//                 <div className="h-16 w-16 rounded-2xl border border-black/20" />
//                 <p className="text-lg font-medium">Drag & drop a crop/leaf image here</p>
//                 <p className="text-sm text-black/60">or click the button below to choose a file</p>
//               </div>
//             ) : (
//               <img src={previewUrl} alt="preview" className="max-h-[360px] rounded-2xl object-contain" />
//             )}
//             <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
//             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//               <button onClick={() => inputRef.current?.click()} className="rounded-2xl border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white">Choose Image</button>
//               {file && (<button onClick={() => setFile(null)} className="rounded-2xl border border-black/40 px-4 py-2 text-sm hover:bg-black/90 hover:text-white">Remove</button>)}
//             </div>
//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <input type="text" placeholder="Crop name (optional, e.g., Tomato)" value={cropName} onChange={(e) => setCropName(e.target.value)} className="rounded-2xl border border-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black" />
//             <button onClick={onPredict} disabled={loading || !file || !apiKey} className="rounded-2xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:border-black/20 disabled:bg-black/20">
//               {loading ? (<span className="inline-flex items-center gap-2"> <Spinner /> Predicting…</span>) : ("Predict")}
//             </button>
//           </div>

//           {error && (<div className="mt-4 rounded-2xl border border-red-400 bg-red-50 p-4 text-sm text-red-700">{error}</div>)}

//           {result && (
//             <div className="mt-6 space-y-4">
//               <ResultCard result={result} />
//               <RemediesCard label={topPrediction?.name || topPrediction?.label} crop={result?.result?.crop?.suggestions?.[0]?.name || cropName} />
//               <button onClick={clearAll} className="rounded-2xl border border-black/30 px-4 py-2 text-sm hover:bg-black hover:text-white">New Prediction</button>
//             </div>
//           )}
//         </section>

//         <aside className="md:col-span-1">
//           <div className="sticky top-20 rounded-3xl border border-black/10 p-4">
//             <h2 className="mb-3 text-base font-semibold">Recent Predictions</h2>
//             {history.length === 0 ? (
//               <p className="text-sm text-black/60">No predictions yet.</p>
//             ) : (
//               <ul className="space-y-3">
//                 {history.map((h, i) => (
//                   <li key={i} className="rounded-2xl border border-black/10 p-3">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="font-medium">{h.top?.name || h.top?.label || "—"}</span>
//                       <span className="text-black/60">{new Date(h.ts).toLocaleString()}</span>
//                     </div>
//                     <div className="mt-1 text-xs text-black/60">{h.crop || "Unknown crop"} • {h.imageName}</div>
//                     {h.top && (h.top.probability != null || h.top.confidence != null) && (
//                       <div className="mt-1 text-xs">Confidence: {formatPct(h.top.probability ?? h.top.confidence)}</div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <div className="mt-6 rounded-2xl border border-black/10 p-3">
//               <div className="text-sm font-medium">Clipboard self‑test</div>
//               <p className="mt-1 text-xs text-black/60">Some hosts block clipboard in iframes or without HTTPS.</p>
//               <button onClick={runClipboardSelfTest} className="mt-2 rounded-xl border border-black/30 px-3 py-1 text-xs hover:bg-black hover:text-white">Run Clipboard Self‑Test</button>
//             </div>
//           </div>
//         </aside>
//       </main>

//       <footer className="mx-auto max-w-6xl px-4 pb-8">
//         <div className="rounded-3xl border border-black/10 p-4 text-center text-xs text-black/60">
//           <p>If the copy button is blocked, use HTTPS or a different host.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function ResultCard({ result }) {
//   const preds = [...(result?.result?.disease?.suggestions || result?.predictions || [])].sort(
//     (a, b) => (b.probability ?? b.confidence ?? 0) - (a.probability ?? a.confidence ?? 0)
//   );
//   return (
//     <div className="rounded-3xl border border-black/10 p-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-base font-semibold">Prediction</h3>
//         {result?.result?.crop?.suggestions?.[0]?.name && (
//           <span className="text-sm text-black/60">Crop: {result.result.crop.suggestions[0].name}</span>
//         )}
//       </div>
//       <div className="mt-3 divide-y divide-black/5 rounded-2xl border border-black/10">
//         {preds.map((p, idx) => (
//           <div key={idx} className="flex items-center justify-between p-3">
//             <div className="flex flex-col">
//               <span className="font-medium">{p.name || p.label}</span>
//               {p.scientific_name && (
//                 <span className="text-xs text-black/60">{p.scientific_name}</span>
//               )}
//             </div>
//             <span className="rounded-full border border-black/10 px-3 py-1 text-xs">{formatPct(p.probability ?? p.confidence ?? 0)}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function RemediesCard({ label, crop }) {
//   const remedies = findRemedies(label, crop);
//   return (
//     <div className="rounded-3xl border border-black/10 p-4">
//       <h3 className="text-base font-semibold">Recommended Remedies</h3>
//       <p className="mt-1 text-sm text-black/60">Based on: <span className="font-medium text-black">{label || "Unknown"}</span>{crop ? ` • Crop: ${crop}` : ""}</p>
//       <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
//         {remedies.map((r, i) => (<li key={i}>{r}</li>))}
//       </ul>
//       <div className="mt-3 text-xs text-black/60">Follow local guidance and labels.</div>
//     </div>
//   );
// }

// function Spinner() {
//   return (
//     <svg className="-ml-1 mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//     </svg>
//   );
// }












// import React, { useMemo, useRef, useState, useEffect } from "react";

// // Logic same — UI refined clean premium green
// const API_BASE = "https://crop.kindwise.com";
// const IDENTIFY_ENDPOINT = "/api/v1/identification";

// const REMEDY_DB = [
//   { match:["leaf blight","early blight"], remedies:["Remove infected leaves","Avoid overhead watering","Use copper fungicide"]},
//   { match:["late blight"], remedies:["Destroy infected plants","Certified seeds only"]},
//   { match:["powdery mildew"], remedies:["Use sulfur spray","Increase sunlight"]},
//   { match:["rust"], remedies:["Use resistant variety","Use fungicide if severe"]},
//   { match:["bacterial"], remedies:["Copper spray","Avoid touching wet leaves"]},
//   { match:["healthy"], remedies:["Healthy — keep monitoring"]},
// ];
// const findRemedies = (l="")=>{l=l.toLowerCase();for(const r of REMEDY_DB)if(r.match.some(m=>l.includes(m)))return r.remedies;return["Improve hygiene","Remove affected parts"]};
// const useObjectUrl=f=>{const[u,s]=useState(null);useEffect(()=>{if(!f)return s(null);const a=URL.createObjectURL(f);s(a);return()=>URL.revokeObjectURL(a)},[f]);return u};
// async function callKindwise({apiKey,file,cropName}){if(!apiKey)throw Error("Missing API Key");if(!file)throw Error("Upload image");const fd=new FormData();fd.append("images",file);if(cropName && /^\d+$/.test(cropName))fd.append("custom_id",cropName);const r=await fetch(API_BASE+IDENTIFY_ENDPOINT,{method:"POST",headers:{"Api-Key":apiKey},body:fd});if(!r.ok)throw Error("Server error");return r.json()}

// export default function App(){
//   const[apiKey,setApiKey]=useState("");const[file,setFile]=useState(null);
//   const[cropName,setCropName]=useState("");const[result,setResult]=useState(null);
//   const[error,setError]=useState("");const[loading,setLoading]=useState(false);
//   const preview=useObjectUrl(file);const inputRef=useRef();
//   const top=useMemo(()=>{const p=result?.result?.disease?.suggestions||[];return p.length?[...p].sort((a,b)=>b.probability-a.probability)[0]:null},[result]);

//   async function predict(){setError("");setResult(null);setLoading(true);try{setResult(await callKindwise({apiKey,file,cropName}))}catch(e){setError(e.message)}finally{setLoading(false)}}
//   function reset(){setFile(null);setResult(null);setError("")}

//   return(
// <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100 font-[Inter]">
// <header className="py-4 shadow bg-white/80 backdrop-blur-sm">
//   <div className="max-w-3xl mx-auto flex flex-col gap-2 items-center">
//     <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2"><span>🌿</span>Crop AI Doctor</h1>
//     <input type="password" placeholder="Enter API Key" value={apiKey} onChange={e=>setApiKey(e.target.value)} className="w-72 px-3 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500"/>
//   </div>
// </header>

// <main className="flex-1 grid place-items-center p-4">
//   <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-5 space-y-5">

//     {/* Upload box */}
//     <div onDragOver={e=>e.preventDefault()} onDrop={e=>{const f=e.dataTransfer.files[0];if(f)setFile(f)}} className="border-2 border-green-400 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-green-50">
//       {!preview?(<>
//         <span className="text-5xl mb-2">🍃</span>
//         <p className="text-green-700 font-semibold">Drop or Upload Leaf Image</p>
//       </>):(<img src={preview} className="max-h-48 rounded-lg shadow-lg"/>) }
//       <input type="file" ref={inputRef} onChange={e=>setFile(e.target.files[0])} className="hidden"/>
//       <button onClick={()=>inputRef.current.click()} className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Choose Image</button>
//     </div>

//     {/* Controls */}
//     <div className="flex gap-2">
//       <input placeholder="Crop name (optional)" value={cropName} onChange={e=>setCropName(e.target.value)} className="flex-1 border px-3 py-2 rounded-lg"/>
//       <button disabled={loading||!file||!apiKey} onClick={predict} className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold disabled:bg-gray-300">{loading?"Analyzing…":"Predict"}</button>
//     </div>

//     {error && <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</div>}

//     {result && top && (
//       <div className="bg-green-50 p-4 rounded-xl border border-green-200">
//         <h2 className="font-bold text-green-800 text-lg mb-1">Disease: {top.name}</h2>
//         <p className="text-sm mb-3 text-gray-700">Confidence: {(top.probability*100).toFixed(1)}%</p>
//         <h3 className="font-semibold text-green-700 mb-2">Remedies:</h3>
//         <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">{findRemedies(top.name).map((r,i)=>(<li key={i}>{r}</li>))}</ul>
//         <button onClick={reset} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-black">New</button>
//       </div>
//     )}

//     {/* Tips */}
//     <div className="text-center text-sm text-gray-600">
//       <p>Upload clear leaf close‑up.</p>
//       <p>Avoid blur. Use natural light.</p>
//     </div>

//   </div>
// </main>

// <footer className="text-center py-4 text-xs text-gray-600">© {new Date().getFullYear()} Smart Agri AI 🌱</footer>
// </div>
// )}

















// import React, { useMemo, useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const API_BASE = "https://crop.kindwise.com";
// const IDENTIFY_ENDPOINT = "/api/v1/identification";

// const REMEDY_DB = [
//   { match: ["leaf blight", "early blight"], remedies: ["Remove infected leaves", "Avoid overhead watering", "Use copper fungicide"] },
//   { match: ["late blight"], remedies: ["Destroy infected plants", "Certified seeds only"] },
//   { match: ["powdery mildew"], remedies: ["Use sulfur spray", "Increase sunlight"] },
//   { match: ["rust"], remedies: ["Use resistant variety", "Use fungicide if severe"] },
//   { match: ["bacterial"], remedies: ["Copper spray", "Avoid touching wet leaves"] },
//   { match: ["healthy"], remedies: ["Healthy — keep monitoring"] },
// ];

// const findRemedies = (l = "") => {
//   l = l.toLowerCase();
//   for (const r of REMEDY_DB)
//     if (r.match.some((m) => l.includes(m))) return r.remedies;
//   return ["Improve hygiene", "Remove affected parts"];
// };

// const useObjectUrl = (f) => {
//   const [u, s] = useState(null);
//   useEffect(() => {
//     if (!f) return s(null);
//     const a = URL.createObjectURL(f);
//     s(a);
//     return () => URL.revokeObjectURL(a);
//   }, [f]);
//   return u;
// };

// async function callKindwise({ apiKey, file, cropName }) {
//   if (!apiKey) throw Error("Missing API Key");
//   if (!file) throw Error("Upload image");
//   const fd = new FormData();
//   fd.append("images", file);
//   if (cropName && /^\d+$/.test(cropName)) fd.append("custom_id", cropName);
//   const r = await fetch(API_BASE + IDENTIFY_ENDPOINT, {
//     method: "POST",
//     headers: { "Api-Key": apiKey },
//     body: fd,
//   });
//   if (!r.ok) throw Error("Server error");
//   return r.json();
// }

// export default function App() {
//   const [apiKey, setApiKey] = useState("");
//   const [file, setFile] = useState(null);
//   const [cropName, setCropName] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const preview = useObjectUrl(file);
//   const inputRef = useRef();

//   const top = useMemo(() => {
//     const p = result?.result?.disease?.suggestions || [];
//     return p.length ? [...p].sort((a, b) => b.probability - a.probability)[0] : null;
//   }, [result]);

//   async function predict() {
//     setError("");
//     setResult(null);
//     setLoading(true);
//     try {
//       setResult(await callKindwise({ apiKey, file, cropName }));
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function reset() {
//     setFile(null);
//     setResult(null);
//     setError("");
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-green-200 font-[Inter] overflow-hidden">
//       {/* Header */}
//       <motion.header
//         className="py-5 shadow bg-white/80 backdrop-blur-sm sticky top-0 z-20"
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 60 }}
//       >
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-center px-5">
//           <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
//             <span>🌿</span> Crop AI Doctor
//           </h1>
//           <input
//             type="password"
//             placeholder="🔑 Enter API Key"
//             value={apiKey}
//             onChange={(e) => setApiKey(e.target.value)}
//             className="w-72 px-3 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 transition-all"
//           />
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="flex-1 flex justify-center items-center p-4">
//         <motion.div
//           className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-2xl p-6 space-y-6 backdrop-blur-sm border border-green-100"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Upload Section */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="border-2 border-green-400 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-green-50 transition"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();
//               const f = e.dataTransfer.files[0];
//               if (f) setFile(f);
//             }}
//           >
//             {!preview ? (
//               <>
//                 <span className="text-6xl mb-2 animate-bounce">🍃</span>
//                 <p className="text-green-700 font-semibold">Drop or Upload a Leaf Image</p>
//               </>
//             ) : (
//               <motion.img
//                 src={preview}
//                 alt="Preview"
//                 className="max-h-60 rounded-lg shadow-md object-cover"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             )}
//             <input
//               type="file"
//               ref={inputRef}
//               onChange={(e) => setFile(e.target.files[0])}
//               className="hidden"
//             />
//             <motion.button
//               onClick={() => inputRef.current.click()}
//               className="mt-4 px-5 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-all"
//               whileTap={{ scale: 0.95 }}
//             >
//               {preview ? "Change Image" : "Choose Image"}
//             </motion.button>
//           </motion.div>

//           {/* Inputs */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <input
//               placeholder="🌾 Crop name (optional)"
//               value={cropName}
//               onChange={(e) => setCropName(e.target.value)}
//               className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
//             />
//             <motion.button
//               disabled={loading || !file || !apiKey}
//               onClick={predict}
//               className={`px-6 py-2 rounded-lg font-semibold text-white transition-all ${
//                 loading || !file || !apiKey
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-700 hover:bg-green-800 shadow-md"
//               }`}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? "🔍 Analyzing…" : "🚀 Predict"}
//             </motion.button>
//           </div>

//           {/* Error */}
//           {error && (
//             <motion.div
//               className="bg-red-100 text-red-700 p-3 rounded-md text-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {error}
//             </motion.div>
//           )}

//           {/* Result */}
//           {result && top && (
//             <motion.div
//               className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-inner"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="font-bold text-green-800 text-lg mb-1">
//                 🩺 Disease: {top.name}
//               </h2>
//               <p className="text-sm mb-3 text-gray-700">
//                 Confidence: {(top.probability * 100).toFixed(1)}%
//               </p>
//               <h3 className="font-semibold text-green-700 mb-2">🌱 Remedies:</h3>
//               <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
//                 {findRemedies(top.name).map((r, i) => (
//                   <motion.li
//                     key={i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     {r}
//                   </motion.li>
//                 ))}
//               </ul>
//               <motion.button
//                 onClick={reset}
//                 className="mt-5 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-black transition-all"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 🔄 New
//               </motion.button>
//             </motion.div>
//           )}

//           {/* Tips */}
//           <motion.div
//             className="text-center text-sm text-gray-600"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <p>📸 Upload a clear leaf close-up photo.</p>
//             <p>☀️ Avoid blur and use natural light.</p>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-xs text-gray-600 bg-white/50 backdrop-blur-sm">
//         © {new Date().getFullYear()} Smart Agri AI 🌱
//       </footer>
//     </div>
//   );
// }















// import React, { useMemo, useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const API_BASE = "https://crop.kindwise.com";
// const IDENTIFY_ENDPOINT = "/api/v1/identification";

// const REMEDY_DB = [
//   { match: ["leaf blight", "early blight"], remedies: ["Remove infected leaves", "Avoid overhead watering", "Use copper fungicide"] },
//   { match: ["late blight"], remedies: ["Destroy infected plants", "Use certified seeds only"] },
//   { match: ["powdery mildew"], remedies: ["Use sulfur spray", "Increase sunlight"] },
//   { match: ["rust"], remedies: ["Use resistant variety", "Use fungicide if severe"] },
//   { match: ["bacterial"], remedies: ["Apply copper spray", "Avoid touching wet leaves"] },
//   { match: ["healthy"], remedies: ["Healthy — keep monitoring regularly"] },
// ];

// const findRemedies = (label = "") => {
//   label = label.toLowerCase();
//   for (const r of REMEDY_DB)
//     if (r.match.some((m) => label.includes(m))) return r.remedies;
//   return ["Improve plant hygiene", "Remove affected parts"];
// };

// const useObjectUrl = (f) => {
//   const [u, s] = useState(null);
//   useEffect(() => {
//     if (!f) return s(null);
//     const a = URL.createObjectURL(f);
//     s(a);
//     return () => URL.revokeObjectURL(a);
//   }, [f]);
//   return u;
// };

// async function callKindwise({ apiKey, file, cropName }) {
//   if (!apiKey) throw Error("Missing API Key");
//   if (!file) throw Error("Upload image");
//   const fd = new FormData();
//   fd.append("images", file);
//   if (cropName && /^\d+$/.test(cropName)) fd.append("custom_id", cropName);
//   const r = await fetch(API_BASE + IDENTIFY_ENDPOINT, {
//     method: "POST",
//     headers: { "Api-Key": apiKey },
//     body: fd,
//   });
//   if (!r.ok) throw Error("Server error");
//   return r.json();
// }

// export default function CropAIDoctor() {
//   const [apiKey, setApiKey] = useState("");
//   const [file, setFile] = useState(null);
//   const [cropName, setCropName] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const preview = useObjectUrl(file);
//   const inputRef = useRef();

//   const top = useMemo(() => {
//     const p = result?.result?.disease?.suggestions || [];
//     return p.length ? [...p].sort((a, b) => b.probability - a.probability)[0] : null;
//   }, [result]);

//   async function predict() {
//     setError("");
//     setResult(null);
//     setLoading(true);
//     try {
//       setResult(await callKindwise({ apiKey, file, cropName }));
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function reset() {
//     setFile(null);
//     setResult(null);
//     setError("");
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-green-200 font-[Inter] overflow-hidden">
//       {/* Header */}
//       <motion.header
//         className="py-5 shadow bg-white/80 backdrop-blur-sm sticky top-0 z-20"
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 60 }}
//       >
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-center px-5">
//           <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
//             <span>🌿</span> Crop AI Doctor
//           </h1>

//           {/* Smaller, styled API key input */}
//           <div className="relative">
//             <input
//               type="password"
//               placeholder="🔑 API Key"
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//               className="w-56 md:w-64 px-3 py-1.5 rounded-xl text-sm border border-green-300 bg-white/60 backdrop-blur-sm shadow-sm
//                          placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-400 outline-none transition-all"
//             />
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="flex-1 flex justify-center items-center p-4">
//         <motion.div
//           className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-2xl p-6 space-y-6 backdrop-blur-sm border border-green-100"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Upload Section */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="border-2 border-green-400 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-green-50 transition"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();
//               const f = e.dataTransfer.files[0];
//               if (f) setFile(f);
//             }}
//           >
//             {!preview ? (
//               <>
//                 <span className="text-6xl mb-2 animate-bounce">🍃</span>
//                 <p className="text-green-700 font-semibold">Drop or Upload a Leaf Image</p>
//               </>
//             ) : (
//               <motion.img
//                 src={preview}
//                 alt="Preview"
//                 className="max-h-60 rounded-lg shadow-md object-cover"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             )}
//             <input
//               type="file"
//               ref={inputRef}
//               onChange={(e) => setFile(e.target.files[0])}
//               className="hidden"
//             />
//             <motion.button
//               onClick={() => inputRef.current.click()}
//               className="mt-4 px-5 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-all"
//               whileTap={{ scale: 0.95 }}
//             >
//               {preview ? "Change Image" : "Choose Image"}
//             </motion.button>
//           </motion.div>

//           {/* Inputs */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//             {/* Crop Name Input */}
//             <input
//               placeholder="🌾 Crop name"
//               value={cropName}
//               onChange={(e) => setCropName(e.target.value)}
//               className="flex-1 sm:w-1/2 md:w-2/5 border px-3 py-1.5 rounded-xl text-sm bg-white/70 backdrop-blur-sm 
//                          border-green-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-400 outline-none transition-all"
//             />

//             {/* Predict Button */}
//             <motion.button
//               disabled={loading || !file || !apiKey}
//               onClick={predict}
//               className={`px-6 py-2 rounded-lg font-semibold text-white transition-all text-sm ${
//                 loading || !file || !apiKey
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-700 hover:bg-green-800 shadow-md"
//               }`}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? "🔍 Analyzing…" : "🚀 Predict"}
//             </motion.button>
//           </div>

//           {/* Error */}
//           {error && (
//             <motion.div
//               className="bg-red-100 text-red-700 p-3 rounded-md text-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {error}
//             </motion.div>
//           )}

//           {/* Result */}
//           {result && top && (
//             <motion.div
//               className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-inner"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="font-bold text-green-800 text-lg mb-1">
//                 🩺 Disease: {top.name}
//               </h2>
//               <p className="text-sm mb-3 text-gray-700">
//                 Confidence: {(top.probability * 100).toFixed(1)}%
//               </p>
//               <h3 className="font-semibold text-green-700 mb-2">🌱 Remedies:</h3>
//               <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
//                 {findRemedies(top.name).map((r, i) => (
//                   <motion.li
//                     key={i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     {r}
//                   </motion.li>
//                 ))}
//               </ul>
//               <motion.button
//                 onClick={reset}
//                 className="mt-5 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-black transition-all"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 🔄 New
//               </motion.button>
//             </motion.div>
//           )}

//           {/* Tips */}
//           <motion.div
//             className="text-center text-sm text-gray-600"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <p>📸 Upload a clear leaf close-up photo.</p>
//             <p>☀️ Avoid blur and use natural sunlight for best results.</p>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-xs text-gray-600 bg-white/50 backdrop-blur-sm">
//         © {new Date().getFullYear()} Smart Agri AI 🌱
//       </footer>
//     </div>
//   );
// }



















// import React, { useMemo, useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Leaf, RefreshCw, ImagePlus, CheckCircle } from "lucide-react";

// const API_BASE = "https://crop.kindwise.com";
// const IDENTIFY_ENDPOINT = "/api/v1/identification";

// const REMEDY_DB = [
//   { match: ["leaf blight", "early blight"], remedies: ["Remove infected leaves", "Avoid overhead watering", "Use copper fungicide"] },
//   { match: ["late blight"], remedies: ["Destroy infected plants", "Use certified seeds only"] },
//   { match: ["powdery mildew"], remedies: ["Use sulfur spray", "Increase sunlight"] },
//   { match: ["rust"], remedies: ["Use resistant variety", "Apply fungicide if severe"] },
//   { match: ["bacterial"], remedies: ["Use copper spray", "Avoid touching wet leaves"] },
//   { match: ["healthy"], remedies: ["Healthy — keep monitoring"] },
// ];

// const findRemedies = (label = "") => {
//   label = label.toLowerCase();
//   for (const r of REMEDY_DB)
//     if (r.match.some((m) => label.includes(m))) return r.remedies;
//   return ["Improve hygiene", "Remove affected parts"];
// };

// const useObjectUrl = (f) => {
//   const [u, s] = useState(null);
//   useEffect(() => {
//     if (!f) return s(null);
//     const a = URL.createObjectURL(f);
//     s(a);
//     return () => URL.revokeObjectURL(a);
//   }, [f]);
//   return u;
// };

// async function callKindwise({ apiKey, file, cropName }) {
//   if (!apiKey) throw Error("Missing API Key");
//   if (!file) throw Error("Upload image");
//   const fd = new FormData();
//   fd.append("images", file);
//   if (cropName && /^\d+$/.test(cropName)) fd.append("custom_id", cropName);
//   const r = await fetch(API_BASE + IDENTIFY_ENDPOINT, {
//     method: "POST",
//     headers: { "Api-Key": apiKey },
//     body: fd,
//   });
//   if (!r.ok) throw Error("Server error");
//   return r.json();
// }

// export default function CropAIDoctor() {
//   const [apiKey, setApiKey] = useState("");
//   const [file, setFile] = useState(null);
//   const [cropName, setCropName] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const preview = useObjectUrl(file);
//   const inputRef = useRef();

//   const top = useMemo(() => {
//     const p = result?.result?.disease?.suggestions || [];
//     return p.length ? [...p].sort((a, b) => b.probability - a.probability)[0] : null;
//   }, [result]);

//   async function predict() {
//     setError("");
//     setResult(null);
//     setLoading(true);
//     try {
//       setResult(await callKindwise({ apiKey, file, cropName }));
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function reset() {
//     setFile(null);
//     setResult(null);
//     setError("");
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-100 via-green-100 to-green-200 font-[Poppins] overflow-hidden">
//       {/* Header */}
//       <motion.header
//         className="py-5 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-20 border-b border-green-200"
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 70 }}
//       >
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-5">
//           <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2 tracking-tight">
//             <Leaf className="text-green-600" size={30} /> Crop AI Doctor
//           </h1>

//           {/* API Key Input */}
//           <input
//             type="password"
//             placeholder="🔑 Enter API Key"
//             value={apiKey}
//             onChange={(e) => setApiKey(e.target.value)}
//             className="w-60 md:w-72 px-3 py-2 rounded-xl text-sm border border-green-300 bg-white/70 backdrop-blur-sm 
//                        placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-400 outline-none transition-all shadow-sm"
//           />
//         </div>
//       </motion.header>

//       {/* Main Section */}
//       <main className="flex-1 flex justify-center items-center p-5">
//         <motion.div
//           className="max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 space-y-6 backdrop-blur-md border border-green-100"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Upload Area */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="border-2 border-dashed border-green-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-50 to-emerald-50 transition relative overflow-hidden"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();
//               const f = e.dataTransfer.files[0];
//               if (f) setFile(f);
//             }}
//           >
//             {!preview ? (
//               <>
//                 <ImagePlus className="text-green-600 mb-3 animate-pulse" size={42} />
//                 <p className="text-green-700 font-semibold text-lg">
//                   Drop or Upload Leaf Image
//                 </p>
//                 <p className="text-gray-500 text-sm mt-1">JPEG, PNG under 5MB</p>
//               </>
//             ) : (
//               <motion.img
//                 src={preview}
//                 alt="Preview"
//                 className="max-h-64 rounded-xl shadow-lg border border-green-100 object-cover"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             )}
//             <input
//               type="file"
//               ref={inputRef}
//               onChange={(e) => setFile(e.target.files[0])}
//               className="hidden"
//             />
//             <motion.button
//               onClick={() => inputRef.current.click()}
//               className="mt-4 px-6 py-2 bg-green-700 text-white rounded-full font-medium shadow hover:shadow-lg hover:bg-green-800 transition-all"
//               whileTap={{ scale: 0.95 }}
//             >
//               {preview ? "Change Image" : "Choose Image"}
//             </motion.button>
//           </motion.div>

//           {/* Inputs */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//             <input
//               placeholder="🌾 Crop name"
//               value={cropName}
//               onChange={(e) => setCropName(e.target.value)}
//               className="flex-1 sm:w-1/2 md:w-2/5 border px-3 py-2 rounded-lg text-sm bg-white/70 backdrop-blur-sm 
//                          border-green-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-400 outline-none transition-all"
//             />

//             <motion.button
//               disabled={loading || !file || !apiKey}
//               onClick={predict}
//               className={`px-6 py-2 rounded-full font-semibold text-white transition-all text-sm flex items-center gap-2 ${
//                 loading || !file || !apiKey
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-gradient-to-r from-green-600 to-emerald-700 hover:shadow-lg"
//               }`}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? (
//                 <>
//                   <RefreshCw className="animate-spin" size={18} /> Analyzing…
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle size={18} /> Predict
//                 </>
//               )}
//             </motion.button>
//           </div>

//           {/* Error */}
//           {error && (
//             <motion.div
//               className="bg-red-100 text-red-700 p-3 rounded-md text-sm border border-red-300"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {error}
//             </motion.div>
//           )}

//           {/* Result Card */}
//           {result && top && (
//             <motion.div
//               className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-inner"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="font-bold text-green-800 text-xl mb-2">
//                 🩺 Disease: {top.name}
//               </h2>
//               <p className="text-sm mb-3 text-gray-700">
//                 Confidence: {(top.probability * 100).toFixed(1)}%
//               </p>
//               <h3 className="font-semibold text-green-700 mb-2">🌱 Recommended Actions:</h3>
//               <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
//                 {findRemedies(top.name).map((r, i) => (
//                   <motion.li
//                     key={i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     {r}
//                   </motion.li>
//                 ))}
//               </ul>
//               <motion.button
//                 onClick={reset}
//                 className="mt-5 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-black transition-all shadow-sm"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 🔄 New Analysis
//               </motion.button>
//             </motion.div>
//           )}

//           {/* Tips */}
//           <motion.div
//             className="text-center text-sm text-gray-600"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <p>📸 Use clear, close-up leaf images.</p>
//             <p>☀️ Capture under natural daylight for best results.</p>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-xs text-gray-600 bg-white/60 backdrop-blur-sm border-t border-green-200">
//         © {new Date().getFullYear()} Smart Agri AI 🌱 — Designed with love for Farmers
//       </footer>
//     </div>
//   );
// }










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
