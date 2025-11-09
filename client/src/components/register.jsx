// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Button from "react-bootstrap/Button";
// // import "./logincss/login.css";


// // import Form from "react-bootstrap/Form";
// // import soa from "../Soa.png";

// // export default function Register() {
  
// //   const navigate = useNavigate();
// //   const [username, setUsername] = useState();
// //   const [password, setPassword] = useState();
// //   const [submitted, setSubmitted] = useState(false);
// //   const [error, setError] = useState('');
// //   const [phone, setPhone] = useState('')







// // //   const Register=()=> {
// // //     //fetrch ra post method
// // //     debugger
// // //     fetch("http://localhost:1000/register",{
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json'
// // //       },
// // //       body: JSON.stringify({

// // //         "username":username,
// // //         "password":password
// // //   }),
// // //       // body:JSON.stringify(password)
// // //     })
// // //              .then(res => res.json())
// // //              .then(
// // //                 (result) => {
                  
// // //                   debugger
// // //                  if(result.length===0){
// // //                   alert("Invalid Username or Password");
// // //                  }
// // //                  else{
// // //                   navigate('/User');

// // //                  }
// // //                    console.log(result);
// // //                    debugger
// // //                 },
// // //                 (error) => {
// // //                   //  this.setState({
// // //                   //     isLoaded: false,
// // //                   //     error
// // //                   //  });
// // //                   prompt("Galat hai bhai")
// // //                 }
// // //              )
       
// // //  }/



// // // heehe
// // const Register = async (event) => {
// //   event.preventDefault();
// //   setSubmitted(false);
// //   setError('');
// // //hehhe



// //   // if (!username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
// //   //   setError('Please enter a valid email address.');
// //   // } else {
// //   //   setError('');
// //   //   // Proceed with form submission
// //   // }

// //   //hehe
// //   const validateEmail = (username) => {
    
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailRegex.test(username);
// //   };

// //   const formData = { username, password,phone};
  
// //   if(username===undefined&& password===undefined &&phone===undefined){
// //     setError('Invalid Username or Password');
// //     alert("Please Enter UserName &Password Correctly");
// //   }else{

 
// //   try {
// //     if(!validateEmail(username)){
// //       navigate('/register');
// //       setError('Please enter a valid email address.');
// //       alert("Please Enter Email Correctly");
          
  
// //     }
// //     const response = await fetch('http://localhost:1000/register', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify(formData)
// //     });

// //     if (response.ok) {
// //       navigate('/login')
// //       // localStorage.setItem('Auth', 'true');
// //       setSubmitted(true);
// //       setTimeout(() => setSubmitted(false), 3000);
// //       // setUsername('');
// //       // setPassword('');
// //     } else {
// //       const errorData = await response.json();
// //       setError(errorData.message || 'Something went wrong');
// //     }
// //   } catch (err) {
// //     setError('Network error');
// //   }
// // }
// // };
// //   return (


// //     <div className="outer">
// //     <div
// //       className="conatainer-fluid"
// //       style={{
// //         // border: "2px solid black",
// //         // marginTop: "200px ",
// //         // marginLeft: "450px",
// //         // marginRight: "450px",
// //         // height: "400px",
// //         // textAlign:"center",
// //         justifyContent: "center",
// //         // backgroundColor: "black",
// //         display: "flex",
// //         padding: "0px",
// //       }}
// //     >
// //       <div
// //         className="conatainer col-sm-8"
// //         // style={{}}
// //         style={{
// //           // border: "2px solid black",
// //           padding: "0px",
// //           marginTop: "120px ",
// //           // marginLeft: "450px",
// //           // marginRight: "450px",
// //           // height: "400px",
// //           fontFamily: "sans-serif",
// //           textAlign: "center",
// //           justifyContent: "center",
// //           // backgroundColor: "#87b1f5",
// //           borderRadius: "20px",
// //           width: "50%",
// //         }}
// //       >
// //         <h1 style={{color:"white"}}>ITER INCIDENT MANAGEMENT</h1>
// //         <Form className="container1">
// //         <hr></hr>
// //           <h2 style={{color:"#6EACDA",textAlign:"center"}}>Register</h2>
// //           {/* <img src={soa} alt="" style={{ height: "200px" }} /> */}
          
// //           <Form.Group
// //             className="mb-3 conatainer "
// //             controlId="exampleForm.ControlInput1"
// //             // style={{ marginTop: "50px" }}
// //           >
// //             <h4 style={{textAlign:"center",fontFamily:"serif",margin:"20px"}}>Phone No.</h4>
// //             {/* <Form.Control size="lg" type="email"  placeholder="name@example.com" style={{marginLeft:"5px"}}/> */}
// //             <Form.Control
// //               type="tel"
// //               placeholder="Enter Phone"
// //               style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
// //               onChange={(event) => setPhone(event.target.value)}
// //               value={phone} required
// //             />
// //             <h4 style={{textAlign:"center",fontFamily:"serif",margin:"20px"}}>Email address:</h4>
// //             {/* <Form.Control size="lg" type="email"  placeholder="name@example.com" style={{marginLeft:"5px"}}/> */}
// //             <Form.Control
// //               type="email"
// //               placeholder="Enter email"
// //               style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
// //               onChange={(event) => setUsername(event.target.value)}
// //               value={username} required
// //             />

// //             <h4 style={{textAlign:"center",color:"black",margin:"20px"}}>
// //               Password:
// //             </h4>
// //             <Form.Control
// //               type="password"
// //               placeholder="password"
// //               style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
// //               value={password}
// //               onChange={(event) => setPassword(event.target.value)}
// //               required
// //             />
// //           </Form.Group>
// //           <Button classname="btn"  onClick={Register}>
// //             Register
// //           </Button>{"  "}
// //           {/* <Button variant="success" onClick={()=>{navigate('/Register')}}>
// //             Login
// //           </Button>{"  "} */}
// //           <h5  style={{color:"white",marginB:"30px"}}  onClick={()=>{navigate('/login')}}>Already have account Click here to login!</h5>
// //         </Form>
// //       </div>
// //     </div>
// //     </div>




//     // <div
//     //   className="conatainer-fluid"
//     //   style={{
//     //     // border: "2px solid black",
//     //     // marginTop: "200px ",
//     //     // marginLeft: "450px",
//     //     // marginRight: "450px",
//     //     // height: "400px",
//     //     // textAlign:"center",
//     //     justifyContent: "center",
//     //     // backgroundColor: "black",
//     //     display: "flex",
//     //     padding: "0px",
//     //   }}
//     // >
//     //   <div
//     //     className="conatainer col-sm-8"
//     //     // style={{}}
//     //     style={{
//     //       // border: "2px solid black",
//     //       padding: "0px",
//     //       marginTop: "120px ",
//     //       // marginLeft: "450px",
//     //       // marginRight: "450px",
//     //       // height: "400px",
//     //       fontFamily: "sans-serif",
//     //       textAlign: "center",
//     //       justifyContent: "center",
//     //       backgroundColor: "#87b1f5",
//     //       borderRadius: "20px",
//     //       width: "50%",
//     //     }}
//     //   >
//     //     <h1>ITER INCIDENT MANAGEMENT</h1>
//     //     <Form>
//     //       <img src={soa} alt="" style={{ height: "200px" }} />
//     //       <hr></hr>
//     //       <Form.Group
//     //         className="mb-3 conatainer "
//     //         controlId="exampleForm.ControlInput1"
//     //         // style={{ marginTop: "50px" }}
//     //       >
//     //         <Form.Label>Email address::</Form.Label>
//     //         {/* <Form.Control size="lg" type="email"  placeholder="name@example.com" style={{marginLeft:"5px"}}/> */}
//     //         <Form.Control
//     //           type="text"
//     //           placeholder="Enter email"
//     //           style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
//     //           onChange={(event) => setUsername(event.target.value)}
//     //           value={username}
//     //         />

//     //         <Form.Label style={{ textEmphasis: "Background" }}>
//     //           Password ::{" "}
//     //         </Form.Label>
//     //         <Form.Control
//     //           type="password"
//     //           placeholder="password"
//     //           style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
//     //           value={password}
//     //           onChange={(event) => setPassword(event.target.value)}
//     //         />
//     //       </Form.Group>
//     //       <Button variant="success" onClick={Register}>
//     //      Register
//     //       </Button>{" "}
//     //     </Form>
//     //   </div>
//     // </div>


//   //   <>
//   //   <h3 style={{fontFamily:"monospace",fontWeight:"bold",color:"white",margin:"25px"}}>ITER INCIDENT MANAGEMENT</h3>
//   //   <div className="background">
//   //   <div className="shape"></div>
//   //   <div className="shape"></div>
//   //   <form>
//   //     <h3>Register Here</h3>

//   //     <label htmlFor="username">Username</label>
//   //     <input type="text" placeholder="Email or Phone" id="username"
//   //     onChange={(event) => setUsername(event.target.value)}
//   //     value={username} />

//   //     <label htmlFor="password">Password</label>
//   //     <input type="password" placeholder="Password" id="password" 
//   //      onChange={(event) => setPassword(event.target.value)}
//   //      value={password}
//   //      />

//   //     <button onClick={Register}>Register</button>
//   //     <div className="social">
//   //       <p style={{margin:"10px"}}>click here to Login</p>
//   //       <div className="go" onClick={()=>{navigate('/login')}} style={{margin:"10px"}}><i className="fab fa-google" style={{margin:"10px"}}></i>Log In</div>
//   //       {/* <div className="fb"><i className="fab fa-facebook"></i> Facebook</div> */}
//   //     </div>
//   //   </form>
//   // </div>
//   // </>
// //   );
// // }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "./logincss/login.css";

// export default function Register() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const[role,setRole]=useState("");
//   const[name,setName]=useState("");

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Phone number validation function
//   const validatePhone = (phone) => {
//     const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit phone number
//     return phoneRegex.test(phone);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
    
//     if (!username || !password || !phone) {
//       setError('All fields are required.');
//       return;
//     }

//     if (!validateEmail(username)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError('Please enter a valid phone number (10 digits).');
//       return;
//     }

//     const formData = { username, password, phone ,role,name};

//     try {
//       const response = await fetch('http://localhost:1000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
         
//       if (response.ok) {
//         navigate('/login');
//         setSubmitted(true);
//         setTimeout(() => setSubmitted(false), 3000);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error)
//         setError(errorData.error || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('Network error ');
//     }
//   };

//   return (
//     // <div className="outer">
//     //   <div className="container-fluid" style={{ display: "flex", justifyContent: "center", padding: "0px" }}>
//     //     <div className="container col-sm-8" style={{ padding: "0px", marginTop: "80px", fontFamily: "sans-serif", textAlign: "center", borderRadius: "20px", width: "50%" }}>
//     //       <h1 style={{ color: "white" }}>ITER INCIDENT MANAGEMENT</h1>
//     //       <Form className="container1" onSubmit={handleSubmit}>
//     //         <hr />
//     //         <h2 style={{ color: "#6EACDA", textAlign: "center" }}>Register</h2>
//     //         <Form.Group className="mb-3" controlId="formPhone">
//     //           <h4 style={{ textAlign: "center", fontFamily: "serif", margin: "20px",fontWeight:"bold" }}>Phone No.</h4>
//     //           <Form.Control
//     //             type="tel"
//     //             placeholder="Enter Phone"
//     //             style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px"}}                onChange={(event) => setPhone(event.target.value)}
//     //             value={phone}
//     //             required
//     //           />
//     //         </Form.Group>
//     //         <Form.Group className="mb-3" controlId="formEmail">
//     //           <h4 style={{ color:"black",textAlign: "center", fontFamily: "serif", margin: "20px",fontWeight:"bold" }}>Email address:</h4>
//     //           <Form.Control
//     //             type="email"
//     //             placeholder="Enter email"
//     //             style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px"}}                onChange={(event) => setUsername(event.target.value)}
//     //             value={username}
//     //             required
//     //           />
//     //         </Form.Group>
//     //         <Form.Group className="mb-3" controlId="formPassword">
//     //           <h4 style={{ textAlign: "center", color: "black", margin: "20px" ,fontWeight:"bold"}}>Password:</h4>
//     //           <Form.Control
//     //             type="password"
//     //             placeholder="password"
//     //             style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px"}}                value={password}
//     //             onChange={(event) => setPassword(event.target.value)}
//     //             required
//     //           />
//     //         </Form.Group>
//     //         {error && (
//     //           <div className="error-message" style={{ color: "red", textAlign: "center", margin: "10px" }}>
//     //             {error}
//     //           </div>
//     //         )}
//     //         <Button type="submit" className="btn">
//     //           Register
//     //         </Button>
//     //         <h5 style={{ color: "white", marginTop: "30px" }} onClick={() => navigate('/login')}>
//     //           Already have an account? Click here to login!
//     //         </h5>
//     //       </Form>
//     //     </div>
//     //   </div>
//     // </div>


//     <div className="outer">
//   <div
//     className="container-fluid"
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       padding: "0px",
//       background: "linear-gradient(to right, #283c86, #45a247)",
//       minHeight: "100vh",
//       alignItems: "center",
//     }}
//   >
//     <div
//       className="container col-sm-8"
//       style={{
//         padding: "20px",
//         marginTop: "80px",
//         fontFamily: "sans-serif",
//         textAlign: "center",
//         borderRadius: "20px",
//         width: "50%",
//         background: "#fff",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
//       }}
//     >
//       <h1 style={{ color: "#283c86", fontWeight: "bold" }}>
//        INCIDENT MANAGEMENT
//       </h1>
//       <Form className="container1" onSubmit={handleSubmit}>
//         <hr style={{ borderColor: "#283c86" }} />
//         <h2 style={{ color: "#6EACDA", textAlign: "center", marginBottom: "30px" }}>
//           Register
//         </h2>
//         <Form.Group className="mb-3" controlId="formPhone">
//           <h4
//             style={{
//               textAlign: "center",
//               fontFamily: "serif",
//               margin: "20px",
//               fontWeight: "bold",
//               color: "#283c86",
//             }}
//           >
//             Phone No.
//           </h4>
//           <Form.Control
//             type="tel"
//             placeholder="Enter Phone"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #6EACDA",
//               backgroundColor: "#f2f2f2",
//             }}
//             onChange={(event) => setPhone(event.target.value)}
//             value={phone}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formEmail">
//           <h4
//             style={{
//               textAlign: "center",
//               fontFamily: "serif",
//               margin: "20px",
//               fontWeight: "bold",
//               color: "#283c86",
//             }}
//           >
//             Email address:
//           </h4>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #6EACDA",
//               backgroundColor: "#f2f2f2",
//             }}
//             onChange={(event) => setUsername(event.target.value)}
//             value={username}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formPassword">
//           <h4
//             style={{
//               textAlign: "center",
//               color: "#283c86",
//               margin: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Password:
//           </h4>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #6EACDA",
//               backgroundColor: "#f2f2f2",
//             }}
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//         </Form.Group>



//         <Form.Group className="mb-3" controlId="formPassword">
//           <h4
//             style={{
//               textAlign: "center",
//               color: "#283c86",
//               margin: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Role:
//           </h4>
//           <Form.Select
//             // type="password"
//             // placeholder="Password"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
           
//             style={{
//               width: "50%",
//               textAlign: "left",
//               marginLeft: "25%",
//               borderRadius: "100px",
//               height: "50px",
//               padding: "10px 20px",
//               border: "2px solid #6EACDA",
//               backgroundColor: "#f2f2f2",
//             }}
           
//           >
//            {/* <option>Select Damage Type</option>
//             <option value="Pipeline">Pipeline</option>
//             <option value="Electrical">Electrical</option>
//             <option value="Building">Building</option> */}
//            <option value="default" style={{ color: '#888', fontWeight: 'bold', padding: '10px', fontSize: '16px', backgroundColor: '#f7f7f7' }}>
//   User Category
// </option>
// <option value="General" style={{ color: '#000', backgroundColor: '#e0f7fa', padding: '10px', fontSize: '16px' }}>
//   General
// </option>
// <option value="Pipeline" style={{ color: '#000', backgroundColor: '#e0f7fa', padding: '10px', fontSize: '16px' }}>
//   Plumber
// </option>
// <option value="Electrical" style={{ color: '#000', backgroundColor: '#ffecb3', padding: '10px', fontSize: '16px' }}>
//   Electrician
// </option>
// <option value="Building" style={{ color: '#000', backgroundColor: '#ffe0b2', padding: '10px', fontSize: '16px' }}>
//   Building Maintainanace
// </option>
//             </Form.Select>
//         </Form.Group>
//         {role !== "default" && (
//           <Form.Group className="mb-3" controlId="formName">
//             <h4
//               style={{
//                 textAlign: "center",
//                 fontFamily: "serif",
//                 margin: "20px",
//                 fontWeight: "bold",
//                 color: "#283c86",
//               }}
//             >
//               Name:
//             </h4>
//             <Form.Control
//               type="text"
//               placeholder="Enter Name"
//               style={{
//                 width: "50%",
//                 textAlign: "left",
//                 marginLeft: "25%",
//                 borderRadius: "100px",
//                 height: "50px",
//                 padding: "10px 20px",
//                 border: "2px solid #6EACDA",
//                 backgroundColor: "#f2f2f2",
//               }}
//               onChange={(event) => setName(event.target.value)}
//               value={name}
//               required
//             />
//           </Form.Group>
//         )}
        
//         {error && (
//           <div
//             className="error-message"
//             style={{
//               color: "red",
//               textAlign: "center",
//               margin: "10px",
//               fontWeight: "bold",
//             }}
//           >
//             {error}
//           </div>
//         )}
//         <Button
//           type="submit"
//           className="btn"
//           style={{
//             backgroundColor: "#283c86",
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
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#45a247")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#283c86")}
//         >
//           Register
//         </Button>
//         <h5
//           style={{
//             color: "#283c86",
//             marginTop: "30px",
//             cursor: "pointer",
//             textDecoration: "underline",
//           }}
//           onClick={() => navigate('/login')}
//         >
//           Already have an account? Click here to login!
//         </h5>
//       </Form>
//     </div>
//   </div>
// </div>

//   );
// }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "./logincss/login.css";

// export default function Register() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [role, setRole] = useState('');
//   const [name, setName] = useState('');

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     if (!username || !password || !phone || !role || !name) {
//       setError('All fields are required.');
//       return;
//     }

//     if (!validateEmail(username)) {
//       setError('Please enter a valid email.');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     const formData = { username, password, phone, role, name };

//     try {
//       const response = await fetch('http://localhost:1000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert("Registration successful! Please log in.");
//         navigate('/login');
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Registration failed");
//         setError(errorData.error);
//       }
//     } catch (err) {
//       setError('Network error');
//     }
//   };

//   return (
//     <div className="outer">
//       <div
//         className="container-fluid"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           padding: "0px",
//           background: "linear-gradient(to right, #1e9600, #fff200, #ff0000)",
//           minHeight: "100vh",
//           alignItems: "center",
//         }}
//       >
//         <div
//           className="container col-sm-8"
//           style={{
//             padding: "20px",
//             marginTop: "80px",
//             fontFamily: "sans-serif",
//             textAlign: "center",
//             borderRadius: "20px",
//             width: "50%",
//             background: "#fff",
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
//           }}
//         >
//           <h1 style={{ color: "#2E8B57", fontWeight: "bold" }}>
//             AgriSense
//           </h1>
//           <h5 style={{ color: "#555", fontStyle: "italic", marginBottom: "30px" }}>
//             AI-Powered Precision Advisor for Smart Farming 🌾
//           </h5>

//           <Form className="container1" onSubmit={handleSubmit}>
//             <hr style={{ borderColor: "#2E8B57" }} />
//             <h2 style={{ color: "#2E8B57", fontWeight: "bold", marginBottom: "30px" }}>
//               Register as a User
//             </h2>

//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Control
//                 type="text"
//                 placeholder="Full Name"
//                 style={inputStyle}
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPhone">
//               <Form.Control
//                 type="tel"
//                 placeholder="Phone Number"
//                 style={inputStyle}
//                 onChange={(e) => setPhone(e.target.value)}
//                 value={phone}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 style={inputStyle}
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPassword">
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 style={inputStyle}
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formRole">
//               <Form.Select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 style={inputStyle}
//               >
//                 <option value="">Select Role</option>
//                 <option value="Farmer">Farmer</option>
//                 <option value="Expert">Agriculture Expert</option>
//                 <option value="Researcher">Researcher</option>
//                 <option value="Admin">Admin</option>
//               </Form.Select>
//             </Form.Group>

//             {error && (
//               <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
//             )}

//             <Button
//               type="submit"
//               style={{
//                 backgroundColor: "#2E8B57",
//                 color: "white",
//                 borderRadius: "50px",
//                 padding: "10px 40px",
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 border: "none",
//                 cursor: "pointer",
//                 marginTop: "20px",
//               }}
//             >
//               Register
//             </Button>

//             <h5
//               style={{
//                 color: "#2E8B57",
//                 marginTop: "30px",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//               onClick={() => navigate("/login")}
//             >
//               Already have an account? Click here to login!
//             </h5>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "50%",
//   textAlign: "left",
//   marginLeft: "25%",
//   borderRadius: "100px",
//   height: "50px",
//   padding: "10px 20px",
//   border: "2px solid #1E5631",
//   backgroundColor: "#f2f2f2",
// };


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import farmingAnimation from "../assets/register.json"; // <- your Lottie file

// export default function Register() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!username || !password || !phone || !role || !name) {
//       setError("All fields are required.");
//       return;
//     }
//     if (!validateEmail(username)) {
//       setError("Please enter a valid email.");
//       return;
//     }
//     if (!validatePhone(phone)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     const formData = { username, password, phone, role, name };

//     try {
//       const response = await fetch("http://localhost:1000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Registration successful! Welcome to AgriSense.");
//         navigate("/login");
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Registration failed.");
//         setError(errorData.error);
//       }
//     } catch (err) {
//       setError("Network error");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}></div>
//       <div style={styles.card}>
//         <Lottie animationData={farmingAnimation} loop={true} style={styles.animation} />
//         <h1 style={styles.heading}>🌾 AgriSense Registration</h1>
//         <p style={styles.tagline}>
//           Empowering Farmers with Smart Agricultural Insights
//         </p>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Full Name (e.g., Ramesh Kumar)"
//             style={styles.input}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             style={styles.input}
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Email Address"
//             style={styles.input}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Create a Password"
//             style={styles.input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <select
//             style={styles.select}
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="">Select Your Role</option>
//             <option value="Farmer">👨‍🌾 Farmer</option>
//             <option value="Agri Expert">🌱 Agriculture Expert</option>
//             <option value="Researcher">🔬 Researcher</option>
//             <option value="Distributor">🚜 Distributor</option>
//           </select>

//           {error && <p style={styles.error}>{error}</p>}

//           <button type="submit" style={styles.button}>
//             Register Now
//           </button>

//           <p style={styles.loginText}>
//             Already a member?{" "}
//             <span style={styles.link} onClick={() => navigate("/login")}>
//               Log in
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
//     opacity: 0.25,
//     zIndex: 0,
//   },
//   card: {
//     position: "relative",
//     zIndex: 2,
//     width: "100%",
//     maxWidth: "600px",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: "20px",
//     padding: "50px 40px",
//     textAlign: "center",
//     boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
//     backdropFilter: "blur(6px)",
//   },
//   animation: {
//     width: "180px",
//     margin: "0 auto 10px",
//   },
//   heading: {
//     color: "#2e7d32",
//     fontSize: "2.2rem",
//     fontWeight: "700",
//     marginBottom: "10px",
//   },
//   tagline: {
//     color: "#4f6f52",
//     fontSize: "1rem",
//     marginBottom: "30px",
//     fontStyle: "italic",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "18px",
//   },
//   input: {
//     border: "1px solid #cfd8dc",
//     borderRadius: "30px",
//     padding: "14px 20px",
//     fontSize: "1rem",
//     backgroundColor: "#f5fbe7",
//     outline: "none",
//   },
//   select: {
//     border: "1px solid #cfd8dc",
//     borderRadius: "30px",
//     padding: "14px 20px",
//     fontSize: "1rem",
//     backgroundColor: "#f5fbe7",
//     outline: "none",
//   },
//   button: {
//     background: "linear-gradient(135deg, #4caf50, #2e7d32)",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     padding: "14px",
//     fontSize: "1.1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.3s ease",
//   },
//   error: {
//     color: "#d32f2f",
//     fontWeight: "500",
//     fontSize: "0.95rem",
//   },
//   loginText: {
//     marginTop: "22px",
//     color: "#333",
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
import farmingAnimation from "../assets/register.json"; // <- your Lottie file

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
