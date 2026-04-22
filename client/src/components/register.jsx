
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import farmingAnimation from "../assets/register.json";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || !phone || !role || !name) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(username)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = { username, password, phone, role, name };

    try {
      const response = await fetch("http://localhost:1000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Welcome to AgriSense.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Registration failed.");
        setError(errorData.error);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <Lottie animationData={farmingAnimation} loop={true} style={styles.animation} />
        <h1 style={styles.heading}>🌾 AgriSense Registration</h1>
        <p style={styles.tagline}>
          Empowering Farmers with Smart Agricultural Insights
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name (e.g., Ramesh Kumar)"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create a Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            style={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Your Role</option>
            <option value="Farmer">👨‍🌾 Farmer</option>
            <option value="Agri Expert">🌱 Agriculture Expert</option>
            <option value="Researcher">🔬 Researcher</option>
            <option value="Distributor">🚜 Distributor</option>
          </select>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Register Now
          </button>

          <p style={styles.loginText}>
            Already a member?{" "}
            <span style={styles.link} onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 35%, #95d5b2 70%, #fefae0 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
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
    opacity: 0.25,
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // reduced opacity
    borderRadius: "20px",
    padding: "50px 40px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.25)", // subtle border
  },
  animation: {
    width: "180px",
    margin: "0 auto 10px",
  },
  heading: {
    color: "#2e7d32",
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  tagline: {
    color: "#4f6f52",
    fontSize: "1rem",
    marginBottom: "30px",
    fontStyle: "italic",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "30px",
    padding: "14px 20px",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // reduced opacity
    outline: "none",
    backdropFilter: "blur(10px)",
    color: "#1b3d1a",
  },
  select: {
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "30px",
    padding: "14px 20px",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // reduced opacity
    outline: "none",
    backdropFilter: "blur(10px)",
    color: "#1b3d1a",
  },
  button: {
    background: "linear-gradient(135deg, #4caf50, #2e7d32)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "14px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  error: {
    color: "#d32f2f",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  loginText: {
    marginTop: "22px",
    color: "#333",
    fontSize: "0.95rem",
  },
  link: {
    color: "#2e7d32",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
