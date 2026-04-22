


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import farmerAnimation from "../assets/farmer.json"; // 🌾 Lottie animation

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    if (!username || !password) {
      setError("⚠️ Please enter both Email and Password.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:1000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!data.isAuth || !data.user) {
        setError("❌ Incorrect Email or Password.");
        setLoading(false);
        return;
      }
      const { id, name, role } = data.user;
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      localStorage.setItem("Auth", "true");
      if (["Researcher", "Admin", "Expert"].includes(role))
        navigate("/RoleDashboard", { state: { message: role } });
      else navigate("/Dashboard");
    } catch {
      setError("🌐 Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      {/* Popup animated card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.card}
      >
        <Lottie animationData={farmerAnimation} loop={true} style={styles.animation} />
        <h1 style={styles.heading}>🌿 Welcome Back to AgriSense</h1>
        <p style={styles.tagline}>Empowering farmers with smart agricultural insights</p>

        <form onSubmit={login} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={styles.error}>{error}</p>}

          <p onClick={() => navigate("/forgot")} style={styles.forgotLink}>
            Forgot Password?
          </p>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              ...styles.button,
              background: loading
                ? "linear-gradient(90deg, #a5d6a7, #81c784)"
                : "linear-gradient(135deg, #4caf50, #2e7d32)",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <p style={styles.registerText}>
            Don’t have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/register")}>
              Register here
            </span>
          </p>
        </form>
      </motion.div>

      {/* Animations */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 8px rgba(76,175,80,0.6);
          border-color: #4caf50;
          background-color: rgba(255,255,255,0.8);
        }

        @media (max-width: 600px) {
          h1 { font-size: 1.8rem !important; }
          .card { padding: 45px 30px !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(-45deg, #d8f3dc, #b7e4c7, #95d5b2, #fefae0)",
    backgroundSize: "400% 400%",
    animation: "gradientFlow 12s ease infinite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
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
    opacity: 0.35,
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "25px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 12px 45px rgba(0,0,0,0.3)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  animation: {
    width: "200px",
    margin: "0 auto 15px",
  },
  heading: {
    color: "#1b5e20",
    fontSize: "2.3rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  tagline: {
    color: "#33691e",
    fontSize: "1.05rem",
    marginBottom: "30px",
    fontStyle: "italic",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "30px",
    padding: "15px 22px",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    transition: "all 0.3s ease",
  },
  forgotLink: {
    color: "#33691e",
    textAlign: "right",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  button: {
    border: "none",
    borderRadius: "35px",
    padding: "16px",
    fontSize: "1.15rem",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(76,175,80,0.35)",
  },
  error: {
    color: "#d32f2f",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  registerText: {
    marginTop: "22px",
    color: "#1b5e20",
    fontSize: "0.95rem",
  },
  link: {
    color: "#2e7d32",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
