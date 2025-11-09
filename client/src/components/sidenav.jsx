
// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom';
// import Position from 'rsuite/esm/internals/Overlay/Position';

// function Snav(props) {
//   let x = localStorage.getItem('Auth');
//   let z = localStorage.getItem('name');
//   let y = false;
//   if (x === 'true') {
//     y = true;
//   }
//   function Auth(){
//     localStorage.removeItem('Auth');
//     localStorage.removeItem('id');

//   }

//   return (


// <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={styles.navbar}>
//   <Container>
//     <Navbar.Brand style={styles.brand}>AgriSense</Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//     <Navbar.Collapse id="responsive-navbar-nav">
//       <Nav className="me-auto">
//         <Link to="/MyComplain" style={styles.link}>Complains</Link>
//         <Link to="#pricing" style={styles.link}>{z}</Link>
//       </Nav>
//       <Nav>
//         {!y ? (
//           <>
//             <Link to="/login" style={styles.link}>Log In</Link>
//             <Link to="/register" style={styles.link}>Sign Up</Link>
//           </>
//         ) : (
//           <Link onClick={Auth} to="/login" style={styles.link}>Log Out</Link>
//         )}
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
//   )};
// const styles = {
//   navbar: {
//     background: 'linear-gradient(90deg, #141E30, #243B55)',
//     padding: '10px 20px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
//     borderBottom: '2px solid #1F487E',
//   },
//   brand: {
//     fontSize: '2.5em',
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textDecoration: 'none',
//     textTransform: 'uppercase',
//     letterSpacing: '2px',
//   },
//   toggle: {
//     borderColor: '#FFFFFF',
//   },
//   link: {
//     margin: '10px 10px',
//     color: '#FFFFFF',
//     textDecoration: 'none',
//     fontSize: '1.2em',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     transition: 'color 0.3s ease',
//   },
//   dropdown: {
//     color: '#FFFFFF',
//     fontSize: '1em',
//   },
//   dropdownItem: {
//     color: '#FFFFFF',
//     fontSize: '1em',
//   },
// };

// // Add this to ensure links have a hover effect
// styles.link[':hover'] = {
//   color: '#1F487E',
// };


// export default Snav;





// import React from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// function Snav() {
//   const navigate = useNavigate();
//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   function handleAuth() {
//   if (isAuth) {
//     localStorage.removeItem("Auth");
//     localStorage.removeItem("id");
//     localStorage.removeItem("name");
//     navigate("/");
//   } else {
//     navigate("/login");
//   }


//   }

//   return (
//     <Navbar
//       collapseOnSelect
//       expand="lg"
//       sticky="top"
//       style={styles.navbar}
//       variant="dark"
//     >
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="responsive-navbar-nav"
//           style={styles.toggle}
//         />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
//             <Link to="/MyComplain" style={styles.link}>
//               Complaints
//             </Link>
//             {isAuth && (
//               <span style={styles.userName}>
//                 👩‍🌾 {userName ? userName : "Farmer"}
//               </span>
//             )}
//           </Nav>
//           <Nav className="ms-auto" style={styles.navRight}>
//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>
//                   Log In
//                 </Link>
//                 <Link to="/register" style={styles.signup}>
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>
//                 Log Out
//               </button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>

//       {/* Inline CSS for hover animations */}
//       <style>{`
//         a:hover, button:hover {
//           transform: scale(1.05);
//         }
//         @media (max-width: 768px) {
//           .navbar {
//             text-align: center;
//           }
//           a, button {
//             display: block;
//             margin: 10px 0;
//           }
//         }
//       `}</style>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//     borderBottom: "2px solid rgba(255,255,255,0.15)",
//     transition: "all 0.3s ease-in-out",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//     letterSpacing: "1.5px",
//     textShadow: "0 0 8px rgba(255,255,255,0.3)",
//     transition: "color 0.3s ease",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     transition: "color 0.3s ease, transform 0.3s ease",
//   },
//   navLeft: {
//     alignItems: "center",
//   },
//   navRight: {
//     alignItems: "center",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     textDecoration: "none",
//     marginLeft: "10px",
//     transition: "all 0.3s ease",
//   },
//   signup: {
//     background:
//       "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     textDecoration: "none",
//     marginLeft: "15px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//     transition: "all 0.3s ease",
//   },
//   logout: {
//     background:
//       "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
// };

// export default Snav;



// import React from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// function Snav() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   const handleAuth = () => {
//     if (isAuth) {
//       localStorage.removeItem("Auth");
//       localStorage.removeItem("id");
//       localStorage.removeItem("name");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   // Language Change Handler
//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <Navbar
//       collapseOnSelect
//       expand="lg"
//       sticky="top"
//       style={styles.navbar}
//       variant="dark"
//     >
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
//             <Link to="/MyComplain" style={styles.link}>
//               {t("Complaints")}
//             </Link>
//             {isAuth && (
//               <span style={styles.userName}>
//                 👩‍🌾 {userName ? userName : t("Farmer")}
//               </span>
//             )}
//           </Nav>

//           <Nav className="ms-auto" style={styles.navRight}>
//             {/* 🌐 Language Dropdown */}
//             <NavDropdown
//               title="🌐 Language"
//               id="language-dropdown"
//               align="end"
//               style={styles.dropdown}
//             >
//               <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
//             </NavDropdown>

//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>
//                   {t("Login")}
//                 </Link>
//                 <Link to="/register" style={styles.signup}>
//                   {t("Signup")}
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>
//                 {t("Logout")}
//               </button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>

//       <style>{`
//         a:hover, button:hover {
//           transform: scale(1.05);
//         }
//         @media (max-width: 768px) {
//           .navbar {
//             text-align: center;
//           }
//           a, button {
//             display: block;
//             margin: 10px 0;
//           }
//         }
//       `}</style>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     marginLeft: "10px",
//   },
//   signup: {
//     background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//   },
//   logout: {
//     background: "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
//   dropdown: {
//     color: "#E9F5DC",
//     fontWeight: "600",
//   },
// };

// export default Snav;



// import React, { useEffect } from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";

// function Snav() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("lang", lng);
//   };

//   useEffect(() => {
//     const savedLang = localStorage.getItem("lang");
//     if (savedLang) i18n.changeLanguage(savedLang);
//   }, []);

//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   const handleAuth = () => {
//     if (isAuth) {
//       localStorage.removeItem("Auth");
//       localStorage.removeItem("id");
//       localStorage.removeItem("name");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <Navbar collapseOnSelect expand="lg" sticky="top" style={styles.navbar} variant="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
//             <Link to="/MyComplain" style={styles.link}>
//               {t("Complaints")}
//             </Link>
//             {isAuth && (
//               <span style={styles.userName}>
//                 👩‍🌾 {userName ? userName : t("Farmer")}
//               </span>
//             )}
//           </Nav>

//           <Nav className="ms-auto" style={styles.navRight}>
//             <NavDropdown title="🌐 Language" id="language-dropdown" align="end" style={styles.dropdown}>
//               <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
//             </NavDropdown>

//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>
//                   {t("Login")}
//                 </Link>
//                 <Link to="/register" style={styles.signup}>
//                   {t("Signup")}
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>
//                 {t("Logout")}
//               </button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     marginLeft: "10px",
//   },
//   signup: {
//     background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//   },
//   logout: {
//     background: "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
//   dropdown: {
//     color: "#E9F5DC",
//     fontWeight: "600",
//   },
// };

// export default Snav;








// import React, { useEffect, useState } from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";

// function Snav() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [currentLang, setCurrentLang] = useState(i18n.language || "en");

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("lang", lng);
//     setCurrentLang(lng); // Force re-render to update dropdown label
//   };

//   useEffect(() => {
//     const savedLang = localStorage.getItem("lang");
//     if (savedLang && savedLang !== currentLang) {
//       changeLanguage(savedLang);
//     }
//   }, []);

//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   const handleAuth = () => {
//     if (isAuth) {
//       localStorage.removeItem("Auth");
//       localStorage.removeItem("id");
//       localStorage.removeItem("name");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <Navbar collapseOnSelect expand="lg" sticky="top" style={styles.navbar} variant="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
//             <Link to="/MyComplain" style={styles.link}>
//               {t("Complaints")}
//             </Link>
//             {isAuth && (
//               <span style={styles.userName}>
//                 👩‍🌾 {userName || t("Farmer")}
//               </span>
//             )}
//           </Nav>

//           <Nav className="ms-auto align-items-center" style={styles.navRight}>


//             {/* Language dropdown */}
//             <NavDropdown
//               title={
//                 currentLang === "en"
//                   ? "English"
//                   : currentLang === "hi"
//                   ? "हिन्दी"
//                   : "ଓଡ଼ିଆ"
//               }
//               align="end"
//               menuVariant="dark"
//               style={styles.dropdown}
//             >
//               <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
//             </NavDropdown>

//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>{t("Login")}</Link>
//                 <Link to="/register" style={styles.signup}>{t("Signup")}</Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>{t("Logout")}</button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     marginLeft: "10px",
//   },
//   signup: {
//     background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//   },
//   logout: {
//     background: "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
//   dropdown: {
//     color: "#E9F5DC",
//     fontWeight: "600",
//   },
//   navLeft: {
//     display: "flex",
//     alignItems: "center",
//   },
//   navRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
// };

// export default Snav;





// import React, { useEffect, useState } from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";

// function Snav() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [currentLang, setCurrentLang] = useState(i18n.language || "en");

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("lang", lng);
//     setCurrentLang(lng);
//   };

//   useEffect(() => {
//     const savedLang = localStorage.getItem("lang");
//     if (savedLang && savedLang !== currentLang) {
//       changeLanguage(savedLang);
//     }
//   }, []);

//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   const handleAuth = () => {
//     if (isAuth) {
//       localStorage.removeItem("Auth");
//       localStorage.removeItem("id");
//       localStorage.removeItem("name");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <Navbar collapseOnSelect expand="lg" sticky="top" style={styles.navbar} variant="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
            
//             {/* Complaints */}
//             <Link to="/MyComplain" style={styles.link}>
//               {t("Complaints")}
//             </Link>

//             {/* 👇 Added Planning link */}
//             <Link to="/myplans" style={styles.link}>
//               {t("Planning")}
//             </Link>

//             {isAuth && (
//               <span style={styles.userName}>
//                 👩‍🌾 {userName || t("Farmer")}
//               </span>
//             )}
//           </Nav>

//           <Nav className="ms-auto align-items-center" style={styles.navRight}>
//             {/* Language Dropdown */}
//             <NavDropdown
//               title={
//                 currentLang === "en"
//                   ? "English"
//                   : currentLang === "hi"
//                   ? "हिन्दी"
//                   : "ଓଡ଼ିଆ"
//               }
//               align="end"
//               menuVariant="dark"
//               style={styles.dropdown}
//             >
//               <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
//             </NavDropdown>

//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>{t("Login")}</Link>
//                 <Link to="/register" style={styles.signup}>{t("Signup")}</Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>{t("Logout")}</button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     marginLeft: "10px",
//   },
//   signup: {
//     background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//   },
//   logout: {
//     background: "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
//   dropdown: {
//     color: "#E9F5DC",
//     fontWeight: "600",
//   },
//   navLeft: {
//     display: "flex",
//     alignItems: "center",
//   },
//   navRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
// };

// export default Snav;










// import React, { useEffect, useState } from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";

// function Snav() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [currentLang, setCurrentLang] = useState(i18n.language || "en");

//   // ✅ Subscribe to language changes
//   useEffect(() => {
//     const handleLangChange = (lng) => setCurrentLang(lng);
//     i18n.on("languageChanged", handleLangChange);

//     const savedLang = localStorage.getItem("lang");
//     if (savedLang && savedLang !== currentLang) {
//       i18n.changeLanguage(savedLang);
//     }

//     return () => i18n.off("languageChanged", handleLangChange);
//   }, [currentLang, i18n]);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("lang", lng);
//     setCurrentLang(lng);
//   };

//   const isAuth = localStorage.getItem("Auth") === "true";
//   const userName = localStorage.getItem("name");

//   const handleAuth = () => {
//     if (isAuth) {
//       localStorage.removeItem("Auth");
//       localStorage.removeItem("id");
//       localStorage.removeItem("name");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <Navbar collapseOnSelect expand="lg" sticky="top" style={styles.navbar} variant="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={styles.brand}>
//           🌱 AgriSense
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto" style={styles.navLeft}>
//             <Link to="/complaints" style={styles.link}>
//               {t("Complaints")}
//             </Link>

//             <Link to="/myplans" style={styles.link}>
//               {t("Planning")}
//             </Link>

//             {isAuth && (
//               <span style={styles.userName}>👩‍🌾 {userName || t("Farmer")}</span>
//             )}
//           </Nav>

//           <Nav className="ms-auto align-items-center" style={styles.navRight}>
//             {/* ✅ Working Language Dropdown */}
//             <NavDropdown
//               title={
//                 currentLang === "en"
//                   ? "English"
//                   : currentLang === "hi"
//                   ? "हिन्दी"
//                   : "ଓଡ଼ିଆ"
//               }
//               align="end"
//               menuVariant="light"
//               style={styles.dropdown}
//             >
//               <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
//             </NavDropdown>

//             {!isAuth ? (
//               <>
//                 <Link to="/login" style={styles.button}>
//                   {t("Login")}
//                 </Link>
//                 <Link to="/register" style={styles.signup}>
//                   {t("Signup")}
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleAuth} style={styles.logout}>
//                 {t("Logout")}
//               </button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// const styles = {
//   navbar: {
//     background: "linear-gradient(90deg, #1B4332, #2D6A4F, #40916C)",
//     padding: "10px 20px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//   },
//   brand: {
//     fontSize: "2em",
//     fontWeight: "800",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     textTransform: "uppercase",
//   },
//   link: {
//     margin: "0 15px",
//     color: "#E9F5DC",
//     textDecoration: "none",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   userName: {
//     color: "#D8F3DC",
//     fontSize: "1.1em",
//     fontWeight: "600",
//     marginLeft: "15px",
//   },
//   button: {
//     backgroundColor: "transparent",
//     border: "2px solid #D8F3DC",
//     borderRadius: "25px",
//     color: "#D8F3DC",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     marginLeft: "10px",
//   },
//   signup: {
//     background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
//     borderRadius: "25px",
//     color: "#1B4332",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//   },
//   logout: {
//     background: "linear-gradient(90deg, #ff6b6b, #e63946)",
//     borderRadius: "25px",
//     color: "#fff",
//     border: "none",
//     padding: "6px 18px",
//     fontSize: "1.05em",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginLeft: "15px",
//     cursor: "pointer",
//   },
//   toggle: {
//     borderColor: "#E9F5DC",
//     backgroundColor: "rgba(255,255,255,0.1)",
//   },
//   dropdown: {
//     color: "#E9F5DC",
//     fontWeight: "600",
//   },
//   navLeft: {
//     display: "flex",
//     alignItems: "center",
//   },
//   navRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
// };

// export default Snav;








import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Snav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  // ✅ Subscribe to language changes
  useEffect(() => {
    const handleLangChange = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", handleLangChange);

    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== currentLang) {
      i18n.changeLanguage(savedLang);
    }

    return () => i18n.off("languageChanged", handleLangChange);
  }, [currentLang, i18n]);

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

  // ✅ New function for admin login
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
          <Nav className="me-auto" style={styles.navLeft}>
            <Link to="/complaints" style={styles.link}>
              {t("Complaints")}
            </Link>

            <Link to="/myplans" style={styles.link}>
              {t("Planning")}
            </Link>

            {isAuth && (
              <span style={styles.userName}>👩‍🌾 {userName || t("Farmer")}</span>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center" style={styles.navRight}>
            {/* ✅ Language Dropdown */}
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
              <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("hi")}>हिन्दी</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("or")}>ଓଡ଼ିଆ</NavDropdown.Item>
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

            {/* ✅ Added “Login as Admin” Button */}
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
    textDecoration: "none",
    textTransform: "uppercase",
  },
  link: {
    margin: "0 15px",
    color: "#E9F5DC",
    textDecoration: "none",
    fontSize: "1.1em",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  userName: {
    color: "#D8F3DC",
    fontSize: "1.1em",
    fontWeight: "600",
    marginLeft: "15px",
  },
  button: {
    backgroundColor: "transparent",
    border: "2px solid #D8F3DC",
    borderRadius: "25px",
    color: "#D8F3DC",
    padding: "6px 18px",
    fontSize: "1.05em",
    fontWeight: "600",
    textTransform: "uppercase",
    marginLeft: "10px",
  },
  signup: {
    background: "linear-gradient(90deg, #95D5B2 0%, #52B788 100%)",
    borderRadius: "25px",
    color: "#1B4332",
    padding: "6px 18px",
    fontSize: "1.05em",
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: "15px",
  },
  logout: {
    background: "linear-gradient(90deg, #ff6b6b, #e63946)",
    borderRadius: "25px",
    color: "#fff",
    border: "none",
    padding: "6px 18px",
    fontSize: "1.05em",
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: "15px",
    cursor: "pointer",
  },
  adminButton: {
    background: "linear-gradient(90deg, #081C15, #1B4332)",
    borderRadius: "25px",
    color: "#E9F5DC",
    border: "2px solid #52B788",
    padding: "6px 20px",
    fontSize: "1.05em",
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  toggle: {
    borderColor: "#E9F5DC",
    backgroundColor: "rgba(255,255,255,0.1)",
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


