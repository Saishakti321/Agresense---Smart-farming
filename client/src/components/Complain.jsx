

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./complaints.css";

export default function FarmerComplaint() {
  const [form, setForm] = useState({
    farmer_name: "",
    phone: "",
    email: "",
    complaint_type: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const complaintOptions = [
    "Website Issue",
    "Wrong Crop Suggestion",
    "Fertilizer Problem",
    "Disease Detection Error",
    "Manual Help Request",
    "Other",
  ];



  const API_BASE = "http://localhost:1000";

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_BASE}/complaints`);
      setComplaints(res.data);
    } catch (err) {
      console.log("🔴 Server not responding");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE}/complaints`, form);

      setForm({
        farmer_name: "",
        phone: "",
        email: "",
        complaint_type: "",
        description: "",
      });

      fetchComplaints();

      document.querySelector(".success-popup").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".success-popup").style.display = "none";
      }, 2500);
    } catch (err) {
      alert(" Failed to submit. Backend error!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="complaint-wrapper">
      <div className="success-popup"> Complaint Submitted Successfully!</div>

      <div className="glass-card">
        <h2 className="title"> Farmer Support & Complaint Center</h2>
        <p className="subtitle">Your issue matters. We are here to help!</p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <input
            className="input-box"
            placeholder=" Farmer Name"
            value={form.farmer_name}
            onChange={(e) => setForm({ ...form, farmer_name: e.target.value })}
            required
          />

          <input
            className="input-box"
            placeholder=" Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="input-box"
            placeholder="✉ Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="input-box"
            value={form.complaint_type}
            onChange={(e) =>
              setForm({ ...form, complaint_type: e.target.value })
            }
            required
          >
            <option value=""> Select Complaint Category</option>
            {complaintOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <textarea
            className="input-box textarea"
            placeholder=" Describe your problem clearly..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button className="btn" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : " Submit Complaint"}
          </button>
        </form>
      </div>

      <div className="list-card">
        <h3 className="list-title">📋 Previous Complaints</h3>
        <div className="list-box">
          {complaints.length === 0 && (
            <p className="no-data">No complaints yet</p>
          )}

          {complaints.map((c) => (
            <div key={c.id} className="list-item">
              <div><b>👤 {c.farmer_name}</b></div>
              <div> {c.complaint_type}</div>
              <div> Status: {c.status}</div>
              <div className="small">{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
