// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import "./logincss/login.css";

// import Form from "react-bootstrap/Form";
// // import soa from "../Soa.png";
// import Snav from "./sidenav";


// export default function Forgot() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isAuth, setIsAuth] = useState(null);
//   const [message, setMessage] = useState("");
//   const[newP,setNewP]=useState("");

 



//   const changeP = async (event) => {
//     event.preventDefault();
//     setSubmitted(false);
//     setError('');

//     const formData = { username, password ,newP};
//     if(username===undefined&& password===undefined){
//       alert("Please Enter UserName &Password Correctly");

//     }else{
//       try {
//         const response = await fetch('http://localhost:1000/changePass', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)
//         });
//         if(response.ok){
//             alert("Password Changed Successfully");
//             navigate('/login');
//         }
     
//        const data = await response.json();
//        console.log(data);
      
//       } catch (err) {
//         setError('Network error');
//       }
//     }

   
//   };
//   return (
//     // <div className="outer">
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
//     //       marginTop: "100px ",
//     //       // marginLeft: "450px",
//     //       // marginRight: "450px",
//     //       // height: "400px",
//     //       fontFamily: "sans-serif",
//     //       textAlign: "center",
//     //       justifyContent: "center",
//     //       // backgroundColor: "#87b1f5",
//     //       borderRadius: "20px",
//     //       width: "50%",
//     //     }}
//     //   >
//     //     <h1 style={{color:"white"}}>ITER INCIDENT MANAGEMENT</h1>
//     //     <Form className="container1">
//     //       {/* <img src={soa} alt="" style={{ height: "200px" }} /> */}
//     //       <hr></hr>
//     //       <h1 style={{color:"White",textAlign:"center",fontWeight:"bolder"}}>Reset Your Password</h1>
//     //       <Form.Group
//     //         className="mb-3 conatainer "
//     //         controlId="exampleForm.ControlInput1"
//     //         // style={{ marginTop: "50px" }}
//     //       >
            
//     //         <h4 style={{textAlign:"center",fontFamily:"serif",color:"black",margin:"20px",fontWeight:"bolder"}}>Email address:</h4>
//     //         {/* <Form.Control size="lg" type="email"  placeholder="name@example.com" style={{marginLeft:"5px"}}/> */}
//     //         <Form.Control
//     //           type="email"
//     //           placeholder="Enter email"
//     //           style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px",fontSize:"20px",fontWeight:"bold"}}
//     //           onChange={(event) => setUsername(event.target.value)}
//     //           value={username} required
//     //         />

//     //         <h4 style={{textAlign:"center",color:"black",margin:"20px",fontWeight:"bolder"}}>
//     //          Enter old Password:
//     //         </h4>
//     //         <Form.Control
//     //           type="password"
//     //           placeholder="Old Password"
//     //           style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px",fontSize:"20px",fontWeight:"bold"}}
//     //           value={password}
//     //           onChange={(event) => setPassword(event.target.value)}
//     //           required
//     //         />
//     //         <h4 style={{textAlign:"center",color:"black",margin:"20px",fontWeight:"bolder"}}>
//     //          Enter New Password:
//     //         </h4>
//     //         <Form.Control
//     //           type="password"
//     //           placeholder="New Password"
//     //           style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px",fontSize:"20px",fontWeight:"bold"}}
//     //           value={newP}
//     //           onChange={(event) => setNewP(event.target.value)}
//     //           required
//     //         />
//     //       </Form.Group>
//     //       <Button classname="btn"  onClick={changeP}>
//     //         Change Password
//     //       </Button>{"  "}
//     //       {/* <Button variant="success" onClick={()=>{navigate('/Register')}}>
//     //         Login
//     //       </Button>{"  "} */}
//     //       {/* <h5  style={{color:"white",margin:"15px",padding:"0px"}}  onClick={()=>{navigate('/register')}}></h5> */}
//     //     </Form>
//     //   </div>
//     // </div>
//     // </div>



// <div
//   className="outer"
//   style={{
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <div
//     className="container-fluid"
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100%",
//     }}
//   >
//     <div
//       className="container col-sm-8 col-md-6 col-lg-4"
//       style={{
//         padding: "20px",
//         marginTop: "100px",
//         fontFamily: "sans-serif",
//         textAlign: "center",
//         backgroundColor: "#283c86",
//         borderRadius: "20px",
//         width: "100%",
//         maxWidth: "500px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <h1 style={{ color: "white", marginBottom: "20px" }}>
//         AGRESENCE
//       </h1>
//       <Form className="container1">
//         <hr />
//         <h1
//           style={{
//             color: "white",
//             textAlign: "center",
//             fontWeight: "bolder",
//             marginBottom: "20px",
//           }}
//         >
//           Reset Your Password
//         </h1>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <h4
//             style={{
//               textAlign: "center",
//               fontFamily: "serif",
//               color: "white",
//               margin: "20px",
//               fontWeight: "bolder",
//             }}
//           >
//             Email address:
//           </h4>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             style={{
//               width: "100%",
//               textAlign: "left",
//               borderRadius: "30px",
//               height: "50px",
//               fontSize: "1rem",
//               fontWeight: "bold",
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
//               fontWeight: "bolder",
//             }}
//           >
//             Enter Old Password:
//           </h4>
//           <Form.Control
//             type="password"
//             placeholder="Old Password"
//             style={{
//               width: "100%",
//               textAlign: "left",
//               borderRadius: "30px",
//               height: "50px",
//               fontSize: "1rem",
//               fontWeight: "bold",
//             }}
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//           <h4
//             style={{
//               textAlign: "center",
//               color: "white",
//               margin: "20px",
//               fontWeight: "bolder",
//             }}
//           >
//             Enter New Password:
//           </h4>
//           <Form.Control
//             type="password"
//             placeholder="New Password"
//             style={{
//               width: "100%",
//               textAlign: "left",
//               borderRadius: "30px",
//               height: "50px",
//               fontSize: "1rem",
//               fontWeight: "bold",
//             }}
//             value={newP}
//             onChange={(event) => setNewP(event.target.value)}
//             required
//           />
//         </Form.Group>
//         <Button
//           className="btn"
//           style={{
//             backgroundColor: "#45a247",
//             color: "white",
//             borderRadius: "30px",
//             padding: "10px 20px",
//             fontWeight: "bold",
//             width: "85%",
//             marginTop: "20px",
//             fontSize: "1rem",
//           }}
//           onClick={changeP}
//         >
//           Change Password
//         </Button>
//       </Form>
//     </div>
//   </div>
// </div>


//   )};
   





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
