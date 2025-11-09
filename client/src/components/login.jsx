// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import "./logincss/login.css";

// import Form from "react-bootstrap/Form";
// // import soa from "../Soa.png";
// import Snav from "./sidenav";


// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isAuth, setIsAuth] = useState(null);
//   const [message, setMessage] = useState("");
//   const[role,setRole]=useState();
 

//   // const login = () => {
//   //   //fetrch ra post method
//   //   let k = username;
//   //   let k2 = password;
//   //   debugger;
//   //   fetch("http://localhost:1000/login", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       username: username,
//   //       password: password,
//   //     }),
//   //     // body:JSON.stringify(password)
//   //   })
//   //     .then((res) => res.json())
//   //     .then(
//   //       (result) => {
//   //         debugger;
//   //         if (result.length === 0) {
//   //           alert("Invalid Username or Password");
//   //         } else {
//   //           navigate("/User");
//   //         }
//   //         console.log(result);
//   //         debugger;
//   //       },
//   //       (error) => {
//   //         debugger;
//   //         this.setState({
//   //           isLoaded: false,
//   //           error,
//   //         });
//   //       }
//   //     );
//   // };


//   const login = async (event) => {
//     event.preventDefault();
//     setSubmitted(false);
//     setError('');

//     const formData = { username, password };
//     if(username===undefined&& password===undefined){
//       alert("Please Enter UserName &Password Correctly");

//     }else{
//       try {
//         const response = await fetch('http://localhost:1000/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)
//         });
//       //  console.log(response);
//       //   if (response.ok) {
//       //     setSubmitted(true);
//       //     if(response[0].isAuth){
//       //       navigate('/User');
//       //     }
          
//       //     setTimeout(() => setSubmitted(false), 3000);
//       //     setUsername('');
//       //     setPassword('');
//       //   } else {
//       //     const errorData = await response.json();
//       //     setError(errorData.message || 'Something went wrong');
//       //   }
      
//       const data = await response.json();
      
//       const id=data.user.id;
//       const name=data.user.name;
      
    
      
//       setIsAuth(data.isAuth);
//       setMessage(data.message);
//      const role= data.user.role;

//       if (data.isAuth) {
//         localStorage.setItem('name', name);
//       localStorage.setItem('id', id);
      
//         console.log("Login successful", data.user);
       
//         localStorage.setItem('Auth', 'true');
//         if(role==="Building"||role==="Pipeline"||role==="Electrical"){
//           const data = { message: role };
//           // alert(data)
//           navigate('/RoleWork', { state: data });
//         }else{
//           navigate('/User');
//         }
        
        
        
//         // <Snav data={isAuth}/>
//       } else {
//         console.log("Login failed");
//         alert("Wrong Username/Password \n Please try to register first")
//       }
//       } catch (err) {
//         setError('Network error');
//       }
//     }

   
//   };
//   return (

// <div
//   className="container col-sm-8"
//   style={{
//     padding: "20px",
//     marginTop: "100px",
//     fontFamily: "sans-serif",
//     textAlign: "center",
//     justifyContent: "center",
//     background: "linear-gradient(to right, #6a11cb, #2575fc)",
//     borderRadius: "20px",
//     width: "70%",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//   }}
// >
//   <h1 style={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>
//    INCIDENT MANAGEMENT
//   </h1>
//   <Form className="container1">
//     <hr style={{ borderColor: "white" }} />
//     <h2
//       style={{
//         color: "white",
//         textAlign: "center",
//         fontWeight: "bolder",
//         marginBottom: "30px",
//       }}
//     >
//       Log In
//     </h2>
//     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//       <h4
//         style={{
//           textAlign: "center",
//           fontFamily: "serif",
//           color: "white",
//           margin: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         Email address:
//       </h4>
//       <Form.Control
//         type="email"
//         placeholder="Enter email"
//         style={{
//           width: "50%",
//           textAlign: "left",
//           marginLeft: "25%",
//           borderRadius: "100px",
//           height: "50px",
//           padding: "10px 20px",
//           border: "2px solid white",
//           backgroundColor: "#f2f2f2",
//         }}
//         onChange={(event) => setUsername(event.target.value)}
//         value={username}
//         required
//       />

//       <h4
//         style={{
//           textAlign: "center",
//           color: "white",
//           margin: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         Password:
//       </h4>
//       <Form.Control
//         type="password"
//         placeholder="Password"
//         style={{
//           width: "50%",
//           textAlign: "left",
//           marginLeft: "25%",
//           borderRadius: "100px",
//           height: "50px",
//           padding: "10px 20px",
//           border: "2px solid white",
//           backgroundColor: "#f2f2f2",
//         }}
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         required
//       />
//       <h5
//         style={{
//           color: "white",
//           margin: "15px",
//           textAlign: "right",
//           marginRight: "190px",
//           marginTop: "20px",
//           cursor: "pointer",
//           textDecoration: "underline",
//         }}
//         onClick={() => {
//           navigate("/forgot");
//         }}
//       >
//         Forgotten Password?
//       </h5>
//     </Form.Group>
//     <Button
//       className="btn"
//       style={{
//         backgroundColor: "#6a11cb",
//         color: "white",
//         borderRadius: "50px",
//         padding: "10px 40px",
//         fontSize: "18px",
//         fontWeight: "bold",
//         border: "none",
//         cursor: "pointer",
//         marginTop: "20px",
//         transition: "background 0.3s ease",
//       }}
//       onClick={login}
//       onMouseOver={(e) => (e.target.style.backgroundColor = "#4a00e0")}
//       onMouseOut={(e) => (e.target.style.backgroundColor = "#6a11cb")}
//     >
//       Login
//     </Button>{" "}
//     <h5
//       style={{
//         color: "white",
//         margin: "15px",
//         padding: "0px",
//         cursor: "pointer",
//         textDecoration: "underline",
//       }}
//       onClick={() => {
//         navigate("/register");
//       }}
//     >
//       Don't have an account?
//     </h5>
//   </Form>
// </div>
//   );
// }

















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import "./logincss/login.css";
// import Form from "react-bootstrap/Form";

// import Snav from "./sidenav";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");
//   const [isAuth, setIsAuth] = useState(null);
//   const [message, setMessage] = useState("");
//   const [role, setRole] = useState();

//   const login = async (event) => {
//     event.preventDefault();
//     setSubmitted(false);
//     setError("");

//     const formData = { username, password };

//     if (username === undefined && password === undefined) {
//       alert("Please enter Username & Password correctly");
//     } else {
//       try {
//         const response = await fetch("http://localhost:1000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         const id = data.user.id;
//         const name = data.user.name;
//         setIsAuth(data.isAuth);
//         setMessage(data.message);
//         const role = data.user.role;

//         if (data.isAuth) {
//           localStorage.setItem("name", name);
//           localStorage.setItem("id", id);
//           localStorage.setItem("Auth", "true");

//           console.log("Login successful", data.user);

//           if (role === "Researcher" || role === "Admin" || role === "Expert") {
//             const data = { message: role };
//             navigate("/RoleDashboard", { state: data });
//           } else {
//             navigate("/Dashboard");
//           }
//         } else {
//           console.log("Login failed");
//           alert("Incorrect Username or Password. Please register first.");
//         }
//       } catch (err) {
//         setError("Network error. Please check your connection.");
//       }
//     }
//   };

//   return (
//     <div
//       className="container col-sm-8"
//       style={{
//         padding: "20px",
//         marginTop: "100px",
//         fontFamily: "sans-serif",
//         textAlign: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to right, #1e9600, #fff200, #ff0000)",
//         borderRadius: "20px",
//         width: "70%",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <h1
//         style={{
//           color: "white",
//           fontWeight: "bold",
//           marginBottom: "20px",
//           letterSpacing: "1px",
//         }}
//       >
//         AGRISENSE
//       </h1>
//       <h5
//         style={{
//           color: "white",
//           marginBottom: "40px",
//           fontWeight: "500",
//           fontStyle: "italic",
//         }}
//       >
//         AI-Powered Precision Advisor for Smart Farming 🌾
//       </h5>
//       <Form className="container1">
//         <hr style={{ borderColor: "white" }} />
//         <h2
//           style={{
//             color: "white",
//             textAlign: "center",
//             fontWeight: "bolder",
//             marginBottom: "30px",
//           }}
//         >
//           Farmer Login
//         </h2>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <h4
//             style={{
//               textAlign: "center",
//               fontFamily: "serif",
//               color: "white",
//               margin: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Email address:
//           </h4>
//           <Form.Control
//             type="email"
//             placeholder="Enter your registered email"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid white",
//               backgroundColor: "#f2f2f2",
//             }}
//             onChange={(event) => setUsername(event.target.value)}
//             value={username}
//             required
//           />

//           <h4
//             style={{
//               textAlign: "center",
//               color: "white",
//               margin: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Password:
//           </h4>
//           <Form.Control
//             type="password"
//             placeholder="Enter your password"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid white",
//               backgroundColor: "#f2f2f2",
//             }}
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//           <h5
//             style={{
//               color: "white",
//               margin: "15px",
//               textAlign: "right",
//               marginRight: "190px",
//               marginTop: "20px",
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//             onClick={() => {
//               navigate("/forgot");
//             }}
//           >
//             Forgotten Password?
//           </h5>
//         </Form.Group>

//         <Button
//           className="btn"
//           style={{
//             backgroundColor: "#2E8B57",
//             color: "white",
//             borderRadius: "50px",
//             padding: "10px 40px",
//             fontSize: "18px",
//             fontWeight: "bold",
//             border: "none",
//             cursor: "pointer",
//             marginTop: "20px",
//             transition: "background 0.3s ease",
//           }}
//           onClick={login}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#228B22")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#2E8B57")}
//         >
//           Login
//         </Button>

//         <h5
//           style={{
//             color: "white",
//             margin: "15px",
//             padding: "0px",
//             cursor: "pointer",
//             textDecoration: "underline",
//           }}
//           onClick={() => {
//             navigate("/register");
//           }}
//         >
//           Don’t have an account? Register here
//         </h5>
//       </Form>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "./logincss/login.css";
// import Snav from "./sidenav";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async (event) => {
//     event.preventDefault();
//     setError("");

//     // ✅ Validation
//     if (!username || !password) {
//       setError("⚠️ Please enter both Username and Password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:1000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       // ✅ Handle invalid response or login failure
//       if (!data.isAuth || !data.user) {
//         setError("❌ Incorrect Username or Password. Please try again.");
//         setLoading(false);
//         return;
//       }

//       // ✅ Extract user details
//       const { id, name, role } = data.user;

//       // ✅ Save authentication details
//       localStorage.setItem("name", name);
//       localStorage.setItem("id", id);
//       localStorage.setItem("Auth", "true");

//       console.log("Login successful:", data.user);

//       // ✅ Redirect based on role
//       if (["Researcher", "Admin", "Expert"].includes(role)) {
//         navigate("/RoleDashboard", { state: { message: role } });
//       } else {
//         navigate("/Dashboard");
//       }
//     } catch (err) {
//       setError("🌐 Network error. Please check your internet connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="container col-sm-8"
//       style={{
//         padding: "20px",
//         marginTop: "100px",
//         fontFamily: "Poppins, sans-serif",
//         textAlign: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to right, #000000, #434343)",
//         borderRadius: "20px",
//         width: "70%",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
//         color: "white",
//       }}
//     >
//       <h1
//         style={{
//           fontWeight: "bold",
//           marginBottom: "20px",
//           letterSpacing: "1px",
//         }}
//       >
//         AGRISENSE
//       </h1>
//       <h5
//         style={{
//           marginBottom: "40px",
//           fontWeight: "500",
//           fontStyle: "italic",
//           color: "#e0e0e0",
//         }}
//       >
//         AI-Powered Precision Advisor for Smart Farming 🌾
//       </h5>

//       <Form
//         className="container1"
//         onSubmit={login}
//         style={{
//           padding: "30px",
//           backgroundColor: "rgba(255,255,255,0.05)",
//           borderRadius: "15px",
//         }}
//       >
//         <hr style={{ borderColor: "white" }} />
//         <h2
//           style={{
//             color: "white",
//             textAlign: "center",
//             fontWeight: "bolder",
//             marginBottom: "30px",
//           }}
//         >
//           Farmer Login
//         </h2>

//         <Form.Group className="mb-3" controlId="loginEmail">
//           <h4
//             style={{
//               textAlign: "center",
//               color: "white",
//               margin: "10px",
//               fontWeight: "bold",
//             }}
//           >
//             Email address:
//           </h4>
//           <Form.Control
//             type="email"
//             placeholder="Enter your registered email"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #fff",
//               backgroundColor: "#f9f9f9",
//               color: "#000",
//             }}
//             onChange={(event) => setUsername(event.target.value)}
//             value={username}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="loginPassword">
//           <h4
//             style={{
//               textAlign: "center",
//               color: "white",
//               margin: "10px",
//               fontWeight: "bold",
//             }}
//           >
//             Password:
//           </h4>
//           <Form.Control
//             type="password"
//             placeholder="Enter your password"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #fff",
//               backgroundColor: "#f9f9f9",
//               color: "#000",
//             }}
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//         </Form.Group>

//         {/* 🔴 Error Message */}
//         {error && (
//           <div
//             style={{
//               backgroundColor: "rgba(255,0,0,0.1)",
//               color: "#ff4d4d",
//               border: "1px solid #ff4d4d",
//               padding: "10px",
//               borderRadius: "10px",
//               width: "60%",
//               margin: "20px auto",
//               fontWeight: "bold",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <h5
//           style={{
//             color: "#e0e0e0",
//             marginTop: "20px",
//             cursor: "pointer",
//             textDecoration: "underline",
//             textAlign: "right",
//             marginRight: "190px",
//           }}
//           onClick={() => navigate("/forgot")}
//         >
//           Forgotten Password?
//         </h5>

//         <Button
//           type="submit"
//           disabled={loading}
//           style={{
//             backgroundColor: loading ? "#555" : "#ffffff",
//             color: loading ? "#ccc" : "#000",
//             borderRadius: "50px",
//             padding: "10px 40px",
//             fontSize: "18px",
//             fontWeight: "bold",
//             border: "none",
//             cursor: loading ? "not-allowed" : "pointer",
//             marginTop: "20px",
//             transition: "0.3s ease",
//           }}
//           onMouseOver={(e) =>
//             !loading && (e.target.style.backgroundColor = "#e0e0e0")
//           }
//           onMouseOut={(e) =>
//             !loading && (e.target.style.backgroundColor = "#ffffff")
//           }
//         >
//           {loading ? "Logging in..." : "Login"}
//         </Button>

//         <h5
//           style={{
//             color: "white",
//             margin: "15px",
//             cursor: "pointer",
//             textDecoration: "underline",
//           }}
//           onClick={() => navigate("/register")}
//         >
//           Don’t have an account? Register here
//         </h5>
//       </Form>
//     </div>
//   );
// }



















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "./logincss/login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async (event) => {
//     event.preventDefault();
//     setError("");

//     if (!username || !password) {
//       setError("⚠️ Please enter both Username and Password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:1000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();

//       if (!data.isAuth || !data.user) {
//         setError("❌ Incorrect Username or Password.");
//         setLoading(false);
//         return;
//       }

//       const { id, name, role } = data.user;
//       localStorage.setItem("name", name);
//       localStorage.setItem("id", id);
//       localStorage.setItem("Auth", "true");

//       if (["Researcher", "Admin", "Expert"].includes(role))
//         navigate("/RoleDashboard", { state: { message: role } });
//       else navigate("/Dashboard");
//     } catch (err) {
//       setError("🌐 Network error. Please check your internet connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #000000, #1a1a1a)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "Poppins, sans-serif",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "500px",
//           background: "rgba(255,255,255,0.04)",
//           border: "1px solid rgba(255,255,255,0.2)",
//           borderRadius: "20px",
//           padding: "40px 30px",
//           boxShadow: "0 0 20px rgba(255,255,255,0.1)",
//           backdropFilter: "blur(10px)",
//           color: "#fff",
//           animation: "fadeIn 0.8s ease-in-out",
//         }}
//       >
//         <h1
//           style={{
//             fontWeight: "700",
//             textAlign: "center",
//             fontSize: "2rem",
//             letterSpacing: "2px",
//             color: "#fff",
//             textShadow: "0 0 8px rgba(255,255,255,0.4)",
//           }}
//         >
//           AGRISENSE
//         </h1>
//         <p
//           style={{
//             textAlign: "center",
//             color: "#ccc",
//             marginBottom: "30px",
//             fontStyle: "italic",
//           }}
//         >
//           AI-Powered Precision Advisor for Smart Farming 🌾
//         </p>

//         <Form onSubmit={login}>
//           <Form.Group className="mb-4">
//             <Form.Label style={{ fontWeight: "600", color: "#eee" }}>
//               Email Address
//             </Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               style={{
//                 borderRadius: "30px",
//                 backgroundColor: "#111",
//                 color: "#fff",
//                 border: "1px solid #444",
//                 padding: "12px 20px",
//                 boxShadow: "0 0 5px rgba(255,255,255,0.1)",
//               }}
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label style={{ fontWeight: "600", color: "#eee" }}>
//               Password
//             </Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 borderRadius: "30px",
//                 backgroundColor: "#111",
//                 color: "#fff",
//                 border: "1px solid #444",
//                 padding: "12px 20px",
//                 boxShadow: "0 0 5px rgba(255,255,255,0.1)",
//               }}
//             />
//           </Form.Group>

//           {error && (
//             <div
//               style={{
//                 backgroundColor: "rgba(255,0,0,0.1)",
//                 color: "#ff4d4d",
//                 border: "1px solid #ff4d4d",
//                 padding: "10px",
//                 borderRadius: "10px",
//                 textAlign: "center",
//                 fontWeight: "600",
//                 marginBottom: "15px",
//               }}
//             >
//               {error}
//             </div>
//           )}

//           <p
//             style={{
//               textAlign: "right",
//               color: "#bbb",
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//             onClick={() => navigate("/forgot")}
//           >
//             Forgotten Password?
//           </p>

//           <Button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               borderRadius: "30px",
//               padding: "12px 0",
//               fontWeight: "600",
//               fontSize: "1.1rem",
//               background:
//                 loading === true
//                   ? "linear-gradient(to right, #444, #222)"
//                   : "linear-gradient(to right, #ffffff, #ccc)",
//               color: loading ? "#888" : "#000",
//               border: "none",
//               transition: "all 0.3s ease",
//             }}
//             onMouseOver={(e) =>
//               !loading && (e.target.style.background = "#e0e0e0")
//             }
//             onMouseOut={(e) =>
//               !loading &&
//               (e.target.style.background =
//                 "linear-gradient(to right, #ffffff, #ccc)")
//             }
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>

//           <p
//             style={{
//               marginTop: "20px",
//               textAlign: "center",
//               color: "#ccc",
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//             onClick={() => navigate("/register")}
//           >
//             Don’t have an account? Register here
//           </p>
//         </Form>
//       </div>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import farmerAnimation from "../assets/farmer.json"; // 🌾 Lottie animation

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async (event) => {
//     event.preventDefault();
//     setError("");

//     if (!username || !password) {
//       setError("⚠️ Please enter both Email and Password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:1000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!data.isAuth || !data.user) {
//         setError("❌ Incorrect Email or Password.");
//         setLoading(false);
//         return;
//       }

//       const { id, name, role } = data.user;
//       localStorage.setItem("name", name);
//       localStorage.setItem("id", id);
//       localStorage.setItem("Auth", "true");

//       if (["Researcher", "Admin", "Expert"].includes(role))
//         navigate("/RoleDashboard", { state: { message: role } });
//       else navigate("/Dashboard");
//     } catch (err) {
//       setError("🌐 Network error. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}></div>

//       <div style={styles.card}>
//         <Lottie animationData={farmerAnimation} loop={true} style={styles.animation} />
//         <h1 style={styles.heading}>🌿 Welcome Back to AgriSense</h1>
//         <p style={styles.tagline}>
//           Empowering farmers with smart agricultural insights
//         </p>

//         <form onSubmit={login} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             style={styles.input}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Enter your password"
//             style={styles.input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p style={styles.error}>{error}</p>}

//           <p onClick={() => navigate("/forgot")} style={styles.forgotLink}>
//             Forgot Password?
//           </p>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               ...styles.button,
//               background: loading
//                 ? "linear-gradient(90deg, #a5d6a7, #81c784)"
//                 : "linear-gradient(135deg, #4caf50, #2e7d32)",
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p style={styles.registerText}>
//             Don’t have an account?{" "}
//             <span style={styles.link} onClick={() => navigate("/register")}>
//               Register here
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     width: "100%",
//     background:
//       "linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 35%, #95d5b2 70%, #fefae0 100%)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//     fontFamily: "'Poppins', sans-serif",
//     padding: "20px",
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1920&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     opacity: 0.4,
//     zIndex: 0,
//   },
//   card: {
//     position: "relative",
//     zIndex: 2,
//     width: "100%",
//     maxWidth: "560px",
//     background: "rgba(255, 255, 255, 0.15)", // more transparent
//     borderRadius: "25px",
//     padding: "65px 45px",
//     textAlign: "center",
//     boxShadow: "0 12px 45px rgba(0, 0, 0, 0.25)",
//     backdropFilter: "blur(18px)", // stronger blur for glass
//     border: "1px solid rgba(255, 255, 255, 0.35)",
//   },
//   animation: {
//     width: "210px",
//     margin: "0 auto 20px",
//   },
//   heading: {
//     color: "#1b5e20",
//     fontSize: "2.4rem",
//     fontWeight: "700",
//     marginBottom: "12px",
//   },
//   tagline: {
//     color: "#2e7d32",
//     fontSize: "1.05rem",
//     marginBottom: "35px",
//     fontStyle: "italic",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "22px",
//   },
//   input: {
//     border: "1px solid rgba(255,255,255,0.4)",
//     borderRadius: "30px",
//     padding: "15px 22px",
//     fontSize: "1rem",
//     backgroundColor: "rgba(255, 255, 255, 0.6)", // increased transparency
//     outline: "none",
//     transition: "0.3s",
//   },
//   forgotLink: {
//     color: "#33691e",
//     textAlign: "right",
//     textDecoration: "underline",
//     cursor: "pointer",
//     fontSize: "0.9rem",
//   },
//   button: {
//     border: "none",
//     borderRadius: "35px",
//     padding: "16px",
//     fontSize: "1.15rem",
//     fontWeight: "600",
//     color: "#fff",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     boxShadow: "0 0 18px rgba(76, 175, 80, 0.3)",
//   },
//   error: {
//     color: "#d32f2f",
//     fontWeight: "500",
//     fontSize: "0.95rem",
//   },
//   registerText: {
//     marginTop: "22px",
//     color: "#1b5e20",
//     fontSize: "0.95rem",
//   },
//   link: {
//     color: "#2e7d32",
//     fontWeight: "600",
//     cursor: "pointer",
//     textDecoration: "underline",
//   },
// };




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
