






// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";

// export default function MyPlans() {
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const navigate = useNavigate();

//   // Fetch user plans
//   const fetchPlans = async () => {
//     const id = localStorage.getItem("id");
//     if (!id) {
//       navigate("/User");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:1000/plans?user_id=${id}`);
//       const data = await res.json();
//       if (!Array.isArray(data)) {
//         setError("Invalid server response.");
//         return;
//       }
//       setPlans(data);
//     } catch {
//       setError("Failed to fetch plans.");
//     }
//   };

//   // Delete plan
//   const deletePlan = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     try {
//       const res = await fetch(`http://localhost:1000/plans/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setMessage("✅ Plan deleted successfully");
//         fetchPlans();
//       } else {
//         setError(data.error || "Failed to delete plan");
//       }
//     } catch {
//       setError("Error deleting plan");
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const openPlanModal = (plan) => {
//     try {
//       const parsed = typeof plan === "string" ? JSON.parse(plan) : plan || [];
//       setSelectedPlan(parsed);
//     } catch {
//       alert("⚠️ Invalid plan data format.");
//     }
//   };

//   const closePlanModal = () => setSelectedPlan(null);

//   return (
//     <>
//       <Snav />
//       <div
//         className="p-4"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #e8f5e9, #f9fbe7)",
//         }}
//       >
//         {/* HEADER */}
//         <div
//           className="d-flex justify-content-between align-items-center mb-4 p-3 rounded"
//           style={{
//             background: "linear-gradient(90deg, #2e7d32, #66bb6a)",
//             color: "white",
//             boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
//           }}
//         >
//           <h3 className="fw-bold m-0">🌱 My Fertilizer & Pesticide Plans</h3>
//           <Button
//             variant="light"
//             className="fw-semibold shadow-sm"
//             onClick={() => navigate("/fertilizer-advice")}
//           >
//             ➕ New Plan
//           </Button>
//         </div>

//         {message && (
//           <div className="alert alert-success text-center fw-bold py-2">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="alert alert-danger text-center fw-bold py-2">
//             {error}
//           </div>
//         )}

//         {/* PLAN CARDS */}
//         {plans.length === 0 ? (
//           <div
//             className="text-center text-muted fw-semibold"
//             style={{ marginTop: "50px" }}
//           >
//             No plans yet. Create your first plan!
//           </div>
//         ) : (
//           <div className="row g-4">
//             {plans.map((p, i) => (
//               <div className="col-lg-6 col-md-12" key={i}>
//                 <div
//                   className="p-3 rounded shadow-sm hover-shadow"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.85)",
//                     backdropFilter: "blur(10px)",
//                     borderLeft: "6px solid #4caf50",
//                     transition: "all 0.2s ease-in-out",
//                   }}
//                 >
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <h5 className="fw-bold mb-1 text-success">
//                         🌾 {p.crop || "—"}
//                       </h5>
//                       <p className="text-muted small mb-2">
//                         🗓 {p.created_at
//                           ? new Date(p.created_at).toLocaleDateString()
//                           : "—"}{" "}
//                         | 📍 {p.city || "—"} | 🧱 {p.soil || "—"}
//                       </p>
//                     </div>
//                     <div className="d-flex flex-column align-items-end">
//                       <Button
//                         variant="outline-info"
//                         size="sm"
//                         className="mb-2 px-3 py-1"
//                         onClick={() => openPlanModal(p.plan_json)}
//                       >
//                         👁 View
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         className="px-3 py-1"
//                         onClick={() => deletePlan(p.id)}
//                       >
//                         🗑 Delete
//                       </Button>
//                     </div>
//                   </div>

//                   <hr className="my-2" />

//                   <div className="d-flex justify-content-between">
//                     <div>
//                       <span
//                         className="badge bg-success"
//                         style={{ fontSize: "0.75rem" }}
//                       >
//                         {p.fertilizer_type}
//                       </span>
//                       <h6 className="fw-semibold mt-1 mb-0">
//                         {p.fertilizer_name}
//                       </h6>
//                       <p className="text-muted small mb-0">
//                         {p.fertilizer_amount_kg_per_acre} kg/acre
//                       </p>
//                     </div>

//                     <div className="text-end">
//                       <span
//                         className="badge bg-warning text-dark"
//                         style={{ fontSize: "0.75rem" }}
//                       >
//                         {p.pesticide_type}
//                       </span>
//                       <h6 className="fw-semibold mt-1 mb-0">
//                         {p.pesticide_name}
//                       </h6>
//                       <p className="text-muted small mb-0">
//                         {p.pesticide_amount_kg_per_acre} kg/acre
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MODAL VIEW */}
//       <Modal
//         show={!!selectedPlan}
//         onHide={closePlanModal}
//         centered
//         size="lg"
//         backdrop="static"
//       >
//         <Modal.Header
//           closeButton
//           style={{
//             background: "linear-gradient(90deg, #43a047, #66bb6a)",
//             color: "white",
//           }}
//         >
//           <Modal.Title>📋 Smart 10-Day Schedule</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             background: "#f9f9f9",
//           }}
//         >
//           {selectedPlan && selectedPlan.length > 0 ? (
//             selectedPlan.map((day, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 mb-3 rounded"
//                 style={{
//                   background: "white",
//                   borderLeft: "4px solid #4caf50",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <h6 className="fw-bold text-success mb-2">📆 {day.date}</h6>
//                 {day.actions.map((a, j) => (
//                   <div key={j} className="mb-2 small">
//                     <span className="badge bg-info text-dark me-2">
//                       {a.kind}
//                     </span>
//                     <strong>{a.action}</strong>
//                     <div className="text-muted">{a.note}</div>
//                   </div>
//                 ))}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted small">
//               No schedule data available.
//             </p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closePlanModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }





// import React, { useState, useEffect } from "react";
// import { Button, Modal, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";

// export default function MyPlans() {
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const navigate = useNavigate();

//   // 🔄 Fetch plans
//   const fetchPlans = async () => {
//     const id = localStorage.getItem("id");
//     if (!id) {
//       navigate("/User");
//       return;
//     }
//     try {
//       const res = await fetch(`http://localhost:1000/plans?user_id=${id}`);
//       const data = await res.json();
//       if (!Array.isArray(data)) {
//         setError("Invalid server response.");
//         return;
//       }
//       setPlans(data);
//     } catch {
//       setError("Failed to fetch plans.");
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   // ❌ Delete plan
//   const deletePlan = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     try {
//       const res = await fetch(`http://localhost:1000/plans/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setMessage("✅ Plan deleted successfully");
//         fetchPlans();
//       } else {
//         setError(data.error || "Failed to delete plan");
//       }
//     } catch {
//       setError("Error deleting plan");
//     }
//   };

//   // 📋 View plan in modal
//   const openPlanModal = (plan) => {
//     try {
//       const parsed = typeof plan === "string" ? JSON.parse(plan) : plan || [];
//       setSelectedPlan(parsed);
//     } catch {
//       alert("⚠️ Invalid plan data format.");
//     }
//   };

//   const closePlanModal = () => setSelectedPlan(null);

//   return (
//     <>
  
//       <div
//         className="p-4"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #f1f8e9, #ffffff)",
//         }}
//       >
//         {/* Header */}
//         <div
//           className="d-flex justify-content-between align-items-center mb-4 p-3 rounded shadow-sm fade-in"
//           style={{
//             background: "linear-gradient(90deg, #2e7d32, #66bb6a)",
//             color: "white",
//           }}
//         >
//           <h3 className="fw-bold m-0">🌱 My Fertilizer & Pesticide Plans</h3>
//           <Button
//             variant="light"
//             className="fw-semibold smooth-btn"
//             onClick={() => navigate("/fertilizer-advice")}
//           >
//             ➕ New Plan
//           </Button>
//         </div>

//         {/* Alerts */}
//         {message && (
//           <div className="alert alert-success text-center fw-bold py-2 fade-in">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="alert alert-danger text-center fw-bold py-2 fade-in">
//             {error}
//           </div>
//         )}

//         {/* Table */}
//         <div
//           className="table-container shadow-sm fade-in"
//           style={{
//             background: "white",
//             borderRadius: "10px",
//             overflow: "hidden",
//             animation: "slideUp 0.4s ease-in-out",
//           }}
//         >
//           <Table
//             hover
//             responsive
//             className="align-middle text-center mb-0"
//             style={{ fontSize: "0.9rem" }}
//           >
//             <thead
//               className="table-success"
//               style={{
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 2,
//                 fontWeight: 600,
//                 fontSize: "0.9rem",
//               }}
//             >
//               <tr>
//                 <th>ID</th>
//                 <th>Date</th>
//                 <th>Crop</th>
//                 <th>Soil</th>
//                 <th>City</th>
//                 <th>Fertilizer</th>
//                 <th>Pesticide</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {plans.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-muted py-4">
//                     No plans found. Click <b>New Plan</b> to create one.
//                   </td>
//                 </tr>
//               ) : (
//                 plans.map((p, i) => (
//                   <tr
//                     key={i}
//                     className="table-row-anim"
//                     style={{
//                       lineHeight: "1.1rem",
//                       transition: "all 0.2s ease-in-out",
//                     }}
//                   >
//                     <td>{p.id}</td>
//                     <td>
//                       {p.created_at
//                         ? new Date(p.created_at).toLocaleDateString()
//                         : "—"}
//                     </td>
//                     <td className="fw-semibold text-success">{p.crop}</td>
//                     <td>{p.soil}</td>
//                     <td>{p.city}</td>
//                     <td className="text-start">
//                       <span className="badge bg-success me-1">
//                         {p.fertilizer_type}
//                       </span>{" "}
//                       <strong>{p.fertilizer_name}</strong>
//                       <div className="text-muted small">
//                         {p.fertilizer_amount_kg_per_acre} kg/acre
//                       </div>
//                     </td>
//                     <td className="text-start">
//                       <span className="badge bg-warning text-dark me-1">
//                         {p.pesticide_type}
//                       </span>{" "}
//                       <strong>{p.pesticide_name}</strong>
//                       <div className="text-muted small">
//                         {p.pesticide_amount_kg_per_acre} kg/acre
//                       </div>
//                     </td>
//                     <td>
//                       <Button
//                         variant="outline-success"
//                         size="sm"
//                         className="me-2 smooth-btn"
//                         onClick={() => openPlanModal(p.plan_json)}
//                       >
//                         👁 View
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         className="smooth-btn"
//                         onClick={() => deletePlan(p.id)}
//                       >
//                         🗑 Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </div>

//       {/* Modal for Plan Details */}
//       <Modal
//         show={!!selectedPlan}
//         onHide={closePlanModal}
//         centered
//         size="lg"
//         backdrop="static"
//         className="fade-in"
//       >
//         <Modal.Header
//           closeButton
//           style={{
//             background: "linear-gradient(90deg, #43a047, #66bb6a)",
//             color: "white",
//           }}
//         >
//           <Modal.Title>📅 Smart 10-Day Schedule</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             background: "#fafafa",
//           }}
//         >
//           {selectedPlan && selectedPlan.length > 0 ? (
//             <div className="p-2">
//               {selectedPlan.map((day, idx) => (
//                 <div
//                   key={idx}
//                   className="p-3 mb-3 rounded fade-in"
//                   style={{
//                     background: "#fff",
//                     borderLeft: "4px solid #4CAF50",
//                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                     animation: "slideUp 0.3s ease-in-out",
//                   }}
//                 >
//                   <h6 className="fw-bold mb-2 text-success">📆 {day.date}</h6>
//                   {day.actions.map((a, j) => (
//                     <div key={j} className="mb-2 small">
//                       <span className="badge bg-info text-dark me-2">
//                         {a.kind}
//                       </span>
//                       <strong>{a.action}</strong>
//                       <div className="text-muted">{a.note}</div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted small">
//               No plan data available.
//             </p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closePlanModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ✨ Inline Styles & Animations */}
//       <style>{`
//         .fade-in {
//           animation: fadeIn 0.5s ease-in-out;
//         }

//         .smooth-btn {
//           transition: all 0.2s ease-in-out;
//         }

//         .smooth-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }

//         .table-row-anim:hover {
//           background-color: #f5fbe9 !important;
//           transform: scale(1.002);
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(5px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .table-container::-webkit-scrollbar {
//           height: 6px;
//         }

//         .table-container::-webkit-scrollbar-thumb {
//           background: #a5d6a7;
//           border-radius: 10px;
//         }
//       `}</style>
//     </>
//   );
// }








// import React, { useState, useEffect } from "react";
// import { Button, Modal, Table, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";
// import { FaEye, FaTrashAlt, FaPlusCircle, FaSeedling } from "react-icons/fa";

// export default function MyPlans() {
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // 🔄 Fetch plans
//   const fetchPlans = async () => {
//     const id = localStorage.getItem("id");
//     if (!id) {
//       navigate("/User");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:1000/plans?user_id=${id}`);
//       const data = await res.json();
//       if (!Array.isArray(data)) {
//         setError("Invalid server response.");
//         return;
//       }
//       setPlans(data);
//       setLoading(false);
//     } catch {
//       setError("Failed to fetch plans.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   // ❌ Delete plan
//   const deletePlan = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     try {
//       const res = await fetch(`http://localhost:1000/plans/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setMessage("✅ Plan deleted successfully");
//         fetchPlans();
//       } else {
//         setError(data.error || "Failed to delete plan");
//       }
//     } catch {
//       setError("Error deleting plan");
//     }
//   };

//   // 📋 View plan in modal
//   const openPlanModal = (plan) => {
//     try {
//       const parsed = typeof plan === "string" ? JSON.parse(plan) : plan || [];
//       setSelectedPlan(parsed);
//     } catch {
//       alert("⚠️ Invalid plan data format.");
//     }
//   };

//   const closePlanModal = () => setSelectedPlan(null);

//   return (
//     <>
//       <Snav />
//       <div
//         className="p-3 p-md-5 fade-in"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
//           fontFamily: "'Poppins', sans-serif",
//         }}
//       >
//         {/* Header Section */}
//         <div
//           className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-lg"
//           style={{
//             background: "linear-gradient(90deg, #2E7D32, #43A047, #66BB6A)",
//             color: "white",
//             animation: "slideDown 0.7s ease-in-out",
//           }}
//         >
//           <h3 className="fw-bold mb-3 mb-md-0 d-flex align-items-center">
//             <FaSeedling className="me-2" /> My Fertilizer & Pesticide Plans
//           </h3>
//           <Button
//             variant="light"
//             className="fw-semibold rounded-pill px-4 py-2 smooth-btn shadow-sm"
//             onClick={() => navigate("/fertilizer-advice")}
//           >
//             <FaPlusCircle className="me-2" /> New Plan
//           </Button>
//         </div>

//         {/* Alerts */}
//         {message && (
//           <div className="alert alert-success text-center fw-semibold py-2 fade-in rounded-3 shadow-sm">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="alert alert-danger text-center fw-semibold py-2 fade-in rounded-3 shadow-sm">
//             {error}
//           </div>
//         )}

//         {/* Loading Spinner */}
//         {loading && (
//           <div className="text-center py-5">
//             <Spinner animation="border" variant="success" />
//             <p className="mt-2 text-success fw-semibold">Loading plans...</p>
//           </div>
//         )}

//         {/* Table */}
//         {!loading && (
//           <div
//             className="table-responsive shadow-lg rounded-4 bg-white p-2 p-md-3 fade-in"
//             style={{
//               overflowX: "auto",
//               animation: "fadeInUp 1s ease-in-out",
//             }}
//           >
//             <Table
//               hover
//               responsive
//               className="align-middle text-center mb-0"
//               style={{ fontSize: "0.9rem" }}
//             >
//               <thead
//                 className="table-success sticky-top"
//                 style={{
//                   fontWeight: 700,
//                   fontSize: "0.95rem",
//                   borderBottom: "2px solid #C8E6C9",
//                 }}
//               >
//                 <tr>
//                   <th>#</th>
//                   <th>Date</th>
//                   <th>Crop</th>
//                   <th>Soil</th>
//                   <th>City</th>
//                   <th>Fertilizer</th>
//                   <th>Pesticide</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {plans.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="text-muted py-4">
//                       🌾 No plans found — click <b>New Plan</b> to create one.
//                     </td>
//                   </tr>
//                 ) : (
//                   plans.map((p, i) => (
//                     <tr
//                       key={i}
//                       className="table-row-anim"
//                       style={{
//                         lineHeight: "1.1rem",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <td>{p.id}</td>
//                       <td>
//                         {p.created_at
//                           ? new Date(p.created_at).toLocaleDateString()
//                           : "—"}
//                       </td>
//                       <td className="fw-semibold text-success">{p.crop}</td>
//                       <td>{p.soil}</td>
//                       <td>{p.city}</td>
//                       <td className="text-start">
//                         <span className="badge bg-success me-1">
//                           {p.fertilizer_type}
//                         </span>{" "}
//                         <strong>{p.fertilizer_name}</strong>
//                         <div className="text-muted small">
//                           {p.fertilizer_amount_kg_per_acre} kg/acre
//                         </div>
//                       </td>
//                       <td className="text-start">
//                         <span className="badge bg-warning text-dark me-1">
//                           {p.pesticide_type}
//                         </span>{" "}
//                         <strong>{p.pesticide_name}</strong>
//                         <div className="text-muted small">
//                           {p.pesticide_amount_kg_per_acre} kg/acre
//                         </div>
//                       </td>
//                       <td>
//                         <Button
//                           variant="outline-success"
//                           size="sm"
//                           className="me-2 smooth-btn rounded-pill"
//                           onClick={() => openPlanModal(p.plan_json)}
//                         >
//                           <FaEye className="me-1" /> View
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           className="smooth-btn rounded-pill"
//                           onClick={() => deletePlan(p.id)}
//                         >
//                           <FaTrashAlt className="me-1" /> Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       <Modal
//         show={!!selectedPlan}
//         onHide={closePlanModal}
//         centered
//         size="lg"
//         backdrop="static"
//         className="fade-in"
//       >
//         <Modal.Header
//           closeButton
//           style={{
//             background: "linear-gradient(90deg, #43A047, #66BB6A)",
//             color: "white",
//           }}
//         >
//           <Modal.Title>📅 Smart 10-Day Schedule</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             background: "#F9FFF9",
//           }}
//         >
//           {selectedPlan && selectedPlan.length > 0 ? (
//             <div className="p-2">
//               {selectedPlan.map((day, idx) => (
//                 <div
//                   key={idx}
//                   className="p-3 mb-3 rounded-4 shadow-sm plan-item"
//                   style={{
//                     background: "white",
//                     borderLeft: "6px solid #4CAF50",
//                     animation: "fadeInUp 0.6s ease-in-out",
//                   }}
//                 >
//                   <h6 className="fw-bold mb-2 text-success">📆 {day.date}</h6>
//                   {day.actions.map((a, j) => (
//                     <div key={j} className="mb-2 small">
//                       <span className="badge bg-info text-dark me-2">
//                         {a.kind}
//                       </span>
//                       <strong>{a.action}</strong>
//                       <div className="text-muted">{a.note}</div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted small">
//               No plan data available.
//             </p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" onClick={closePlanModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ✨ Animations & Styles */}
//       <style>{`
//         .fade-in { animation: fadeIn 0.7s ease-in-out; }
//         .table-row-anim:hover {
//           background-color: #F1F8E9 !important;
//           transform: scale(1.01);
//           box-shadow: 0 4px 8px rgba(0,0,0,0.05);
//         }
//         .smooth-btn { transition: all 0.25s ease; }
//         .smooth-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 3px 10px rgba(0,0,0,0.2);
//         }
//         .plan-item:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 5px 12px rgba(0,0,0,0.15);
//         }
//         @keyframes fadeIn {
//           from {opacity: 0; transform: translateY(10px);}
//           to {opacity: 1; transform: translateY(0);}
//         }
//         @keyframes fadeInUp {
//           from {opacity: 0; transform: translateY(20px);}
//           to {opacity: 1; transform: translateY(0);}
//         }
//         @keyframes slideDown {
//           from {opacity: 0; transform: translateY(-20px);}
//           to {opacity: 1; transform: translateY(0);}
//         }
//       `}</style>
//     </>
//   );
// }







import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Snav from "./sidenav";
import { FaEye, FaTrashAlt, FaPlusCircle, FaSeedling } from "react-icons/fa";

export default function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔄 Fetch plans
  const fetchPlans = async () => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/User");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:1000/plans?user_id=${id}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        setError("Invalid server response.");
        return;
      }
      setPlans(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch plans.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ❌ Delete plan
  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      const res = await fetch(`http://localhost:1000/plans/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Plan deleted successfully");
        fetchPlans();
      } else {
        setError(data.error || "Failed to delete plan");
      }
    } catch {
      setError("Error deleting plan");
    }
  };

  // 📋 View plan in modal
  const openPlanModal = (plan) => {
    try {
      const parsed = typeof plan === "string" ? JSON.parse(plan) : plan || [];
      setSelectedPlan(parsed);
    } catch {
      alert("⚠️ Invalid plan data format.");
    }
  };

  const closePlanModal = () => setSelectedPlan(null);

  return (
    <>
      
      <div
        className="p-3 p-md-5 fade-in"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Header Section */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-lg"
          style={{
            background: "linear-gradient(90deg, #2E7D32, #43A047, #66BB6A)",
            color: "white",
            animation: "slideDown 0.7s ease-in-out",
          }}
        >
          <h3 className="fw-bold mb-3 mb-md-0 d-flex align-items-center">
            <FaSeedling className="me-2" /> My Fertilizer & Pesticide Plans
          </h3>
          <Button
            variant="light"
            className="fw-semibold rounded-pill px-4 py-2 smooth-btn shadow-sm"
            onClick={() => navigate("/fertilizer-advice")}
          >
            <FaPlusCircle className="me-2" /> New Plan
          </Button>
        </div>

        {/* Alerts */}
        {message && (
          <div className="alert alert-success text-center fw-semibold py-2 fade-in rounded-3 shadow-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center fw-semibold py-2 fade-in rounded-3 shadow-sm">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2 text-success fw-semibold">Loading plans...</p>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div
            className="table-responsive shadow-lg rounded-4 bg-white p-2 p-md-3 fade-in"
            style={{
              overflowX: "auto",
              animation: "fadeInUp 1s ease-in-out",
            }}
          >
            <Table
              hover
              responsive
              className="align-middle text-center mb-0"
              style={{ fontSize: "0.9rem" }}
            >
              <thead
                className="table-success sticky-top"
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderBottom: "2px solid #C8E6C9",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Crop</th>
                  <th>Soil</th>
                  <th>City</th>
                  <th>Fertilizer</th>
                  <th>Pesticide</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-muted py-4">
                      🌾 No plans found — click <b>New Plan</b> to create one.
                    </td>
                  </tr>
                ) : (
                  plans.map((p, i) => (
                    /* use a stable key (p.id) so React preserves DOM nodes correctly */
                    <tr
                      key={p.id ?? i}
                      className="table-row-anim"
                      style={{
                        lineHeight: "1.1rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* Display serial number (1-based) so numbers remain contiguous after deletes */}
                      <td>{i + 1}</td>

                      {/* keep using p.created_at, p.crop, etc. — logic unchanged */}
                      <td>
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="fw-semibold text-success">{p.crop}</td>
                      <td>{p.soil}</td>
                      <td>{p.city}</td>
                      <td className="text-start">
                        <span className="badge bg-success me-1">
                          {p.fertilizer_type}
                        </span>{" "}
                        <strong>{p.fertilizer_name}</strong>
                        <div className="text-muted small">
                          {p.fertilizer_amount_kg_per_acre} kg/acre
                        </div>
                      </td>
                      <td className="text-start">
                        <span className="badge bg-warning text-dark me-1">
                          {p.pesticide_type}
                        </span>{" "}
                        <strong>{p.pesticide_name}</strong>
                        <div className="text-muted small">
                          {p.pesticide_amount_kg_per_acre} kg/acre
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2 smooth-btn rounded-pill"
                          onClick={() => openPlanModal(p.plan_json)}
                        >
                          <FaEye className="me-1" /> View
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="smooth-btn rounded-pill"
                          onClick={() => deletePlan(p.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        show={!!selectedPlan}
        onHide={closePlanModal}
        centered
        size="lg"
        backdrop="static"
        className="fade-in"
      >
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(90deg, #43A047, #66BB6A)",
            color: "white",
          }}
        >
          <Modal.Title>📅 Smart 10-Day Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            background: "#F9FFF9",
          }}
        >
          {selectedPlan && selectedPlan.length > 0 ? (
            <div className="p-2">
              {selectedPlan.map((day, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-3 rounded-4 shadow-sm plan-item"
                  style={{
                    background: "white",
                    borderLeft: "6px solid #4CAF50",
                    animation: "fadeInUp 0.6s ease-in-out",
                  }}
                >
                  <h6 className="fw-bold mb-2 text-success">📆 {day.date}</h6>
                  {day.actions.map((a, j) => (
                    <div key={j} className="mb-2 small">
                      <span className="badge bg-info text-dark me-2">
                        {a.kind}
                      </span>
                      <strong>{a.action}</strong>
                      <div className="text-muted">{a.note}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted small">
              No plan data available.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closePlanModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✨ Animations & Styles */}
      <style>{`
        .fade-in { animation: fadeIn 0.7s ease-in-out; }
        .table-row-anim:hover {
          background-color: #F1F8E9 !important;
          transform: scale(1.01);
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        .smooth-btn { transition: all 0.25s ease; }
        .smooth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        .plan-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 12px rgba(0,0,0,0.15);
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInUp {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        @keyframes slideDown {
          from {opacity: 0; transform: translateY(-20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
}
