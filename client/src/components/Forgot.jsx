
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Forgot() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newP, setNewP] = useState("");
  const [error, setError] = useState("");

  const changeP = async (event) => {
    event.preventDefault();
    setError("");

    const formData = { username, password, newP };
    if (!username || !password || !newP) {
      alert("Please enter all fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1000/changePass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Password changed successfully");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h1 style={styles.heading}>🌾 AgriSense</h1>
        <p style={styles.tagline}>Reset Your Password</p>

        <Form style={styles.form}>
          <Form.Group className="mb-3">
            <h4 style={styles.label}>Email Address:</h4>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />

            <h4 style={styles.label}>Old Password:</h4>
            <Form.Control
              type="password"
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <h4 style={styles.label}>New Password:</h4>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newP}
              onChange={(e) => setNewP(e.target.value)}
              style={styles.input}
              required
            />
          </Form.Group>

          {error && <p style={styles.error}>{error}</p>}

          <Button
            onClick={changeP}
            style={styles.button}
          >
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #f0f9f0 0%, #d7f0d7 50%, #f0f9f0 100%)", // light background
    position: "relative",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1, // light overlay
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "rgba(255, 255, 255, 0.25)", // glass effect
    borderRadius: "20px",
    padding: "40px 30px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    color: "#2e7d32",
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  tagline: {
    color: "#3a4d2d",
    fontSize: "1rem",
    marginBottom: "30px",
    fontStyle: "italic",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    textAlign: "center",
    color: "#2e7d32",
    margin: "15px 0 10px",
    fontWeight: "600",
  },
  input: {
    border: "1px solid rgba(46,125,50,0.4)",
    borderRadius: "30px",
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    outline: "none",
    backdropFilter: "blur(8px)",
    color: "#1b3d1a",
  },
  button: {
    background: "linear-gradient(135deg, #4caf50, #2e7d32)",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "12px 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
    marginTop: "15px",
  },
  error: {
    color: "#d32f2f",
    fontWeight: "500",
    fontSize: "0.95rem",
    marginTop: "10px",
  },
};
