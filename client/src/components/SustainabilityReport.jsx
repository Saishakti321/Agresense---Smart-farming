

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import * as XLSX from "xlsx"; // ✅ For Excel export

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

function SustainabilityReport() {
  const initialData = JSON.parse(localStorage.getItem("farmReports")) || [];

  const [reports, setReports] = useState(initialData);
  const [formData, setFormData] = useState({
    crop: "",
    yield: "",
    waterUsed: "",
    fertilizerUsed: "",
    carbon: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("farmReports", JSON.stringify(reports));
  }, [reports]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {

      const updatedReports = reports.map((r) =>
        r.id === editId ? { ...formData, id: editId } : r
      );
      setReports(updatedReports);
      setEditId(null);
    } else {

      const newReport = { ...formData, id: Date.now() };
      setReports([...reports, newReport]);
    }
    setFormData({ crop: "", yield: "", waterUsed: "", fertilizerUsed: "", carbon: "" });
  };

  const handleEdit = (report) => {
    setFormData(report);
    setEditId(report.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setReports([]);
      localStorage.removeItem("farmReports");
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sustainability Report");
    XLSX.writeFile(wb, "Sustainability_Report.xlsx");
  };


  const lineData = reports.map((r, idx) => ({ month: `M${idx + 1}`, yield: Number(r.yield) || 0 }));
  const totalWater = reports.reduce((sum, r) => sum + (Number(r.waterUsed) || 0), 0);
  const totalFertilizer = reports.reduce((sum, r) => sum + (Number(r.fertilizerUsed) || 0), 0);
  const totalCarbon = reports.reduce((sum, r) => sum + (Number(r.carbon) || 0), 0);

  const pieData = [
    { name: "Water", value: totalWater },
    { name: "Fertilizer", value: totalFertilizer },
    { name: "Carbon", value: totalCarbon },
  ];

  const barData = reports.map((r) => ({ crop: r.crop, carbon: Number(r.carbon) || 0 }));

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .fade-in { animation: fadeInUp 0.6s forwards; }
        `}
      </style>

      <h1 style={styles.header}>🌱 Sustainability & Carbon Footprint Report</h1>


      <div style={styles.topButtons}>
        <button style={styles.downloadBtn} onClick={handleDownloadExcel}>📥 Download Excel</button>
        <button style={styles.resetBtn} onClick={handleReset}>♻️ Reset All</button>
      </div>


      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Crops</p>
          <p style={styles.cardValue}>{reports.length}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Water Used (L)</p>
          <p style={styles.cardValue}>{totalWater}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Fertilizer Used (kg)</p>
          <p style={styles.cardValue}>{totalFertilizer}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Carbon (kg CO₂)</p>
          <p style={styles.cardValue}>{totalCarbon}</p>
        </div>
      </div>

      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Crop Yield Over Time</h2>
          <LineChart width={400} height={250} data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="yield" stroke="#00C49F" strokeWidth={3} />
          </LineChart>
        </div>

        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Resource Usage</h2>
          <PieChart width={400} height={250}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Carbon Footprint per Crop</h2>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="carbon" fill="#FF8042" />
          </BarChart>
        </div>
      </div>


      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>{editId ? "✏️ Edit Report" : "➕ Add New Report"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="crop" placeholder="Crop Name" value={formData.crop} onChange={handleInputChange} style={styles.input} required />
          <input type="number" name="yield" placeholder="Yield (kg)" value={formData.yield} onChange={handleInputChange} style={styles.input} required />
          <input type="number" name="waterUsed" placeholder="Water Used (L)" value={formData.waterUsed} onChange={handleInputChange} style={styles.input} />
          <input type="number" name="fertilizerUsed" placeholder="Fertilizer Used (kg)" value={formData.fertilizerUsed} onChange={handleInputChange} style={styles.input} />
          <input type="number" name="carbon" placeholder="Carbon Footprint (kg CO₂)" value={formData.carbon} onChange={handleInputChange} style={styles.input} />
          <button type="submit" style={styles.button}>{editId ? "Update Report" : "Submit Report"}</button>
        </form>
      </div>


      <div style={styles.tableContainer}>
        <h2 style={styles.sectionHeader}>All Reports</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Crop</th>
              <th style={styles.th}>Yield (kg)</th>
              <th style={styles.th}>Water (L)</th>
              <th style={styles.th}>Fertilizer (kg)</th>
              <th style={styles.th}>Carbon (kg CO₂)</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td style={styles.td}>{r.crop}</td>
                <td style={styles.td}>{r.yield}</td>
                <td style={styles.td}>{r.waterUsed}</td>
                <td style={styles.td}>{r.fertilizerUsed}</td>
                <td style={styles.td}>{r.carbon}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(r)}>✏️</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SustainabilityReport;


const styles = {
  container: { minHeight: "100vh", padding: "20px", backgroundColor: "#e6f4ea", fontFamily: "Arial, sans-serif" },
  header: { textAlign: "center", fontSize: "2.5rem", color: "#2e7d32", marginBottom: "30px", animation: "fadeIn 1s ease forwards" },
  topButtons: { display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" },
  downloadBtn: { backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontSize: "1rem" },
  resetBtn: { backgroundColor: "#c62828", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontSize: "1rem" },
  cardsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" },
  card: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 200px", textAlign: "center" },
  cardTitle: { color: "#555", marginBottom: "10px", fontSize: "1.1rem" },
  cardValue: { color: "#2e7d32", fontSize: "2rem", fontWeight: "bold" },
  chartsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginBottom: "40px" },
  chartCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", flex: "1 1 400px", textAlign: "center" },
  chartTitle: { color: "#2e7d32", marginBottom: "10px" },
  formCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", maxWidth: "500px", margin: "0 auto 50px auto", textAlign: "center" },
  formTitle: { color: "#2e7d32", marginBottom: "15px", fontSize: "1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #a5d6a7", outline: "none", fontSize: "1rem", transition: "0.3s" },
  button: { padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#2e7d32", color: "#fff", fontSize: "1.2rem", cursor: "pointer" },
  tableContainer: { marginTop: "50px", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "center" },
  th: { borderBottom: "2px solid #2e7d32", padding: "10px", color: "#2e7d32" },
  td: { borderBottom: "1px solid #ccc", padding: "10px" },
  editBtn: { backgroundColor: "#0288d1", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", marginRight: "5px", cursor: "pointer" },
  deleteBtn: { backgroundColor: "#c62828", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" },
};
