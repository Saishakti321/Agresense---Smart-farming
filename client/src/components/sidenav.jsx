


import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Snav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  useEffect(() => {
    const handleLangChange = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", handleLangChange);

    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== currentLang) {
      i18n.changeLanguage(savedLang);
    }

    return () => i18n.off("languageChanged", handleLangChange);
  }, [currentLang]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setCurrentLang(lng);
  };

  const isAuth = localStorage.getItem("Auth") === "true";
  const userName = localStorage.getItem("name");

  const handleAuth = () => {
    if (isAuth) {
      localStorage.removeItem("Auth");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleAdminLogin = () => {
    navigate("/administrator");
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" style={styles.navbar} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" style={styles.brand}>
          🌱 AgriSense
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />

        <Navbar.Collapse id="responsive-navbar-nav">

          {/* LEFT NAV */}
          <Nav className="me-auto" style={styles.navLeft}>

            {/* Dashboard button only when NOT logged in */}
            {!isAuth && (
              <Link to="/dashboard" style={styles.dashboard}>
                📊 Dashboard
              </Link>
            )}

            <Link to="/complaints" style={styles.link}>
              {t("Complaints")}
            </Link>

            <Link to="/myplans" style={styles.link}>
              {t("Planning")}
            </Link>

            {isAuth && (
              <span style={styles.userName}>
                👩‍🌾 {userName || t("Farmer")}
              </span>
            )}

          </Nav>

          {/* RIGHT NAV */}
          <Nav className="ms-auto align-items-center" style={styles.navRight}>

            <NavDropdown
              title={
                currentLang === "en"
                  ? "English"
                  : currentLang === "hi"
                  ? "हिन्दी"
                  : "ଓଡ଼ିଆ"
              }
              align="end"
              menuVariant="light"
              style={styles.dropdown}
            >
              <NavDropdown.Item onClick={() => changeLanguage("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("hi")}>
                हिन्दी
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("or")}>
                ଓଡ଼ିଆ
              </NavDropdown.Item>
            </NavDropdown>

            {!isAuth ? (
              <>
                <Link to="/login" style={styles.button}>
                  {t("Login")}
                </Link>

                <Link to="/register" style={styles.signup}>
                  {t("Signup")}
                </Link>
              </>
            ) : (
              <button onClick={handleAuth} style={styles.logout}>
                {t("Logout")}
              </button>
            )}

            <button onClick={handleAdminLogin} style={styles.adminButton}>
              👨‍💼 {t("Admin Login")}
            </button>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const styles = {
  navbar: {
    background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
    padding: "10px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },

  brand: {
    fontSize: "2em",
    fontWeight: "800",
    color: "#E9F5DC",
    textTransform: "uppercase",
    textDecoration: "none",
  },

  link: {
    margin: "0 15px",
    color: "#E9F5DC",
    fontSize: "1.1em",
    fontWeight: "600",
    textTransform: "uppercase",
    textDecoration: "none",
  },

  dashboard: {
    marginRight: "15px",
    background: "linear-gradient(90deg, #74C69D, #52B788)",
    color: "#1B4332",
    padding: "6px 18px",
    borderRadius: "25px",
    fontWeight: "700",
    textTransform: "uppercase",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },

  userName: {
    color: "#D8F3DC",
    fontSize: "1.1em",
    fontWeight: "600",
    marginLeft: "15px",
  },

  button: {
    border: "2px solid #D8F3DC",
    borderRadius: "25px",
    color: "#D8F3DC",
    padding: "6px 18px",
    fontWeight: "600",
    textTransform: "uppercase",
    textDecoration: "none",
  },

  signup: {
    background: "linear-gradient(90deg, #95D5B2, #52B788)",
    borderRadius: "25px",
    color: "#1B4332",
    padding: "6px 18px",
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: "10px",
    textDecoration: "none",
  },

  logout: {
    background: "linear-gradient(90deg, #ff6b6b, #e63946)",
    borderRadius: "25px",
    color: "#fff",
    border: "none",
    padding: "6px 18px",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "10px",
  },

  adminButton: {
    background: "linear-gradient(90deg, #081C15, #1B4332)",
    borderRadius: "25px",
    color: "#E9F5DC",
    border: "2px solid #52B788",
    padding: "6px 20px",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "15px",
  },

  toggle: {
    borderColor: "#E9F5DC",
  },

  dropdown: {
    color: "#E9F5DC",
    fontWeight: "600",
  },

  navLeft: {
    display: "flex",
    alignItems: "center",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default Snav;

