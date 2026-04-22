

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminComplaints.css";

const API = "http://localhost:1000";

export default function AdminComplaints() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(false);

  const statuses = ["Pending", "In Progress", "Resolved", "Rejected"];

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.username === "admin" && login.password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Invalid admin credentials");
    }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/complaints`);
      setComplaints(res.data);
    } catch (err) {
      alert("Server error fetching complaints");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn) fetchComplaints();
  }, [loggedIn]);

  const updateStatus = async (id, status, admin_notes) => {
    try {
      await axios.post(`${API}/complaints/update`, { id, status, admin_notes });
      fetchComplaints();
      alert(" Complaint updated");
    } catch {
      alert(" Error updating");
    }
  };

  const filtered = complaints.filter((c) =>
    c.farmer_name.toLowerCase().includes(search.toLowerCase()) ||
    c.complaint_type.toLowerCase().includes(search.toLowerCase()) ||
    (c.complaint_code && c.complaint_code.toLowerCase().includes(search.toLowerCase()))
  ).filter((c) =>
    statusFilter ? c.status === statusFilter : true
  );

  if (!loggedIn) {
    return (
      <div className="admin-login-wrapper">
        <form className="admin-login-box" onSubmit={handleLogin}>
          <h2> Admin Login</h2>
          <input
            placeholder="Username"
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <h2> Complaint Management Dashboard</h2>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </div>

      <div className="filters">
        <input
          className="search-box"
          placeholder="Search by name, type, code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button className="refresh-btn" onClick={fetchComplaints}>⟳ Refresh</button>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Farmer</th>
                <th>Type</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.complaint_code}</td>
                  <td>{c.farmer_name}</td>
                  <td>{c.complaint_type}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value, c.admin_notes)
                      }
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="notes-box"
                      defaultValue={c.admin_notes || ""}
                      onBlur={(e) =>
                        updateStatus(c.id, c.status, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="update-btn"
                      onClick={() => updateStatus(c.id, c.status, c.admin_notes)}
                    >
                       Save
                    </button>
                  </td>

                  <td>{new Date(c.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
