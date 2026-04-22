
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
