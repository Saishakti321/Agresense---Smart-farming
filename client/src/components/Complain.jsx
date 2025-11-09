// import { Link, useNavigate,useReducer } from "react-router-dom";

// import React, { useState, useEffect } from "react";
// import Snav from "./sidenav";
// import { Button } from "react-bootstrap";

// // import './logincss/Mycomplain.css'

// function MyComplain() {
//   const [data1, setData1] = useState([]);
//   const [id, setId] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//    const [timeLeft, setTimeLeft] = useState(5);
//    const [message,setMessage]=useState('');
//   const navigate = useNavigate();
  
// //   useEffect(() => {
// //     // async function fetchData() {
// //     //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
// //     //   const jsonData = await response.json();
// //     //   setData(jsonData);
// //     // }
// //     // fetchData();
// //     GetAPICAll();
// //   }, []);

// //   const GetAPICAll =async () => {
// //   const id= localStorage.getItem('id');
// //   alert(id);
// //     //fetrch ra post method
// //     try {
// //         const response = await fetch(`http://localhost:1000/complain?id=${id}`, {
// //           method: 'GET',
// //         });
        
// //         const result = await response.json();
// //         // modifydat(result);
// //         console.log('Response from server:', result);
// //       } catch (error) {
// //         console.error('Error:', error);
// //       }
    
// //   };
// //   debugger;
// //   const modifydat = (data) => {
// //     // let kk = data;
// //     setData1(data);
// //     debugger;
// //   };
// useEffect(() => {
//     const id= localStorage.getItem('id');
//     // alert(id);
//     if(id<=0){
     
//       navigate('/User')
//     }

//     // alert(id);
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:1000/complain?id=${id}`);
//         if (!response.ok) {
          
          
//           // navigate('/User')
//           alert("You have not Given Any complain....")
//           throw new Error('Network response was not ok');
//         }
        
//         const data = await response.json();
//         modifydat(data);
        
//         // console.log(data);
//         setUserData(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//         // alert("error");
//       }
//     };

//     fetchData();
//   }, [message,navigate]);
//   const modifydat = (data) => {
//     // let kk = data;
//     setData1(data);
//     debugger;
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }
  
//  function Update(id) {
//   const data = { message: id };
//   navigate('/Edit', { state: data });
//   }


//   const deleteValue = async (ID) => {
    
//     // alert(ID);

//     try {
     
//       const response = await fetch(`http://localhost:1000/deleteUser?id=${ID}`);
//       debugger;
//       const data = await response.json();
      
//       // console.log(response);
//       if (response.ok) {
//         setMessage(data.success);
//         // window.location.reload();
        
//         // alert("delete successfully");
//         //  navigate('/MyComplain')
       
// setTimeout(() => {
//   // navigate('MyComplain');
//   setMessage('');
 
// },1000);

       

//       }
//       else{
//         throw new Error("Network response was not ok");
//       }
//       // alert("working");

//       // const data = await response.json();
     
//       //   alert(data[0].typeofplaces);

//       //   modifydat(data);

//       // console.log(data);
//       setUserData(data);
//       // setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//       // alert("error");
//     }
//   };
  
//   return (
//     <>
//     <Snav/>
//     <div className="container-xl" style={{ width: "100%", marginTop: "20px" }}>
//     <div className="table-responsive">
//       <div className="table-wrapper" style={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "5px", padding: "20px" }}>
//         <div className="table-title" style={{ marginBottom: "20px", backgroundColor: "#4CAF50", color: "white", padding: "15px 30px", borderRadius: "5px" }}>
//           <div className="row" style={{ width: "100%", margin: "0", padding: "0%" }}>
//             <div className="col-sm-6">
//               <h2 style={{ margin: "0" }}>INCIDENT <b>LIST</b></h2>
//             </div>
//             <div className="col-sm-6 text-right" >
//             <button 
//                     className="btn text-danger text-act"
//                     onClick={()=>{navigate('/User')}}
//                     style={{ border: "none", backgroundColor: "transparent" ,backgroundColor:"white"}}
//                   >
//                   New Complain
//                   </button>
//             </div>
//           </div>
//         </div>

//         <table className="table table-striped table-hover" style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#f2f2f2" }}>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>ID</th>

//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Date</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
//               {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Lname</th> */}
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Campus</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-place</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-damage</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Edit</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>delete</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>

//             </tr>
//           </thead>
//           <tbody>
//             <p>{message}</p>
//             {data1.map((head, index) => (
//               <tr key={index}>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.id}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.date}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.fname } {head.lname}</td>
//                 {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.lname}</td> */}
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.campus}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.email}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofplaces}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofdamage}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                  { head.status===1?(
//                        <td style={{ color: 'red' ,fontSize:"20px"}}>
//                          You can't edit
//                        </td>
//                      ) :(
                  
//                   <Button
//                     className="btn text-warning text-act"
//                     data-toggle="modal"
//                     style={{ border: "none", backgroundColor: "transparent" }}
//                     onClick={()=>{Update(head.id)}}
//                   >
//                     edit
//                   </Button>
//                      )
// }
                 
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                 <button 
//                     className="btn text-danger text-act"
                    
//                     style={{ border: "none", backgroundColor: "transparent" }}
//                     onClick={()=>{deleteValue(head.id)}}
//                   >
//                     delete
//                   </button>
//                   </td>
//                   {
//                     // const status={head.status}
//                      <td>
//                      {/* {head.status === 1 ? (
//                        <td style={{ color: 'green' ,fontSize:"20px"}}>
//                          Completed
//                        </td>
//                      ) : head.status === 2 ? (
//                        <td style={{ color: 'red',fontSize:"20px" }}>
//                         Rejected
//                        </td>
//                      ) : (
//                        <td style={{ color: 'Orange',fontSize:"20px" }}>
//                          Pending
//                        </td>
//                      )} */}
//                      {head.status === 1 ? (
//   <td style={{ color: 'green', fontSize: '20px' }}>
//     Completed
//   </td>
// ) : head.status === 2 ? (
//   <td style={{ color: 'red', fontSize: '20px' }}>
//     Rejected
//   </td>
// ) : head.status === 3 ? (
//   <td style={{ color: 'blue', fontSize: '20px' }}>
//     Accepted by {head.accepted_by}
//   </td>
// ) : (
//   <td style={{ color: 'orange', fontSize: '20px' }}>
//     Not Completed
//   </td>
// )}
//                    </td>
//                    }
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   </>
// );
// }

// export default MyComplain;







// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaLeaf, FaTrashAlt, FaPaperPlane } from "react-icons/fa";

// const API_BASE = "http://localhost:5000"; // Flask backend URL

// export default function MyComplain() {
//   const [complaints, setComplaints] = useState([]);
//   const [form, setForm] = useState({ title: "", message: "" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/complaints`);
//       const data = await res.json();
//       setComplaints(data);
//     } catch (err) {
//       console.error("Error fetching complaints:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title || !form.message) return alert("Please fill all fields");
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/complaints`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       setComplaints([data, ...complaints]);
//       setForm({ title: "", message: "" });
//     } catch (err) {
//       console.error("Error submitting complaint:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this complaint?")) return;
//     try {
//       await fetch(`${API_BASE}/api/complaints/${id}`, { method: "DELETE" });
//       setComplaints(complaints.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Error deleting complaint:", err);
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       {/* Floating leaves animation */}
//       {[...Array(12)].map((_, i) => (
//         <div
//           key={i}
//           style={{
//             ...styles.leaf,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 8}s`,
//             animationDuration: `${6 + Math.random() * 6}s`,
//           }}
//         ></div>
//       ))}

//       {/* Header */}
//       <motion.div
//         style={styles.header}
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <FaLeaf size={60} color="#d8f3dc" />
//         <h1 style={styles.heading}>🌾 Smart Complaints & Feedback Portal</h1>
//         <p style={styles.subtext}>
//           Help us improve AgriSense by sharing your problems or ideas 🌱
//         </p>
//       </motion.div>

//       {/* Form */}
//       <motion.form
//         style={styles.form}
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//       >
//         <input
//           style={styles.input}
//           type="text"
//           placeholder="Enter complaint title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <textarea
//           style={styles.textarea}
//           placeholder="Describe your issue or feedback..."
//           value={form.message}
//           onChange={(e) => setForm({ ...form, message: e.target.value })}
//           required
//         ></textarea>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.9 }}
//           style={styles.button}
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Complaint"} <FaPaperPlane />
//         </motion.button>
//       </motion.form>

//       {/* Complaint List */}
//       <motion.div
//         style={styles.list}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <h2 style={styles.listTitle}>📜 Submitted Complaints</h2>

//         {complaints.length === 0 ? (
//           <p style={styles.noData}>No complaints yet. Submit one above!</p>
//         ) : (
//           complaints.map((c, index) => (
//             <motion.div
//               key={c.id || index}
//               style={styles.card}
//               whileHover={{ scale: 1.02 }}
//             >
//               <div>
//                 <h3 style={styles.cardTitle}>{c.title}</h3>
//                 <p style={styles.cardText}>{c.message}</p>
//                 <small style={styles.date}>
//                   📅 {new Date(c.created_at).toLocaleString()}
//                 </small>
//               </div>
//               <button
//                 style={styles.deleteBtn}
//                 onClick={() => handleDelete(c.id)}
//               >
//                 <FaTrashAlt />
//               </button>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes floatUp {
//           0% { transform: translateY(0) scale(1); opacity: 0.9; }
//           50% { opacity: 1; transform: translateY(-50vh) scale(1.1); }
//           100% { transform: translateY(-100vh) scale(1); opacity: 0; }
//         }
//         @media (max-width: 768px) {
//           h1 { font-size: 1.8rem !important; }
//           input, textarea { font-size: 0.95rem !important; }
//           .glass-box { padding: 20px !important; }
//         }
//       `}
//       </style>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     position: "relative",
//     minHeight: "100vh",
//     padding: "60px 5%",
//     background: "linear-gradient(135deg, #e9f5dc, #cce3c1, #f6fff8)",
//     overflow: "hidden",
//     fontFamily: "Poppins, sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "40px",
//     color: "#1b4332",
//   },
//   heading: {
//     fontWeight: 800,
//     fontSize: "2.5rem",
//     background: "linear-gradient(90deg, #2d6a4f, #52b788)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },
//   subtext: {
//     fontSize: "1.1rem",
//     color: "#3a5a40",
//   },
//   form: {
//     backdropFilter: "blur(10px)",
//     background: "rgba(255, 255, 255, 0.3)",
//     borderRadius: "20px",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
//     padding: "30px",
//     maxWidth: "600px",
//     margin: "0 auto 50px auto",
//   },
//   input: {
//     width: "100%",
//     border: "none",
//     outline: "none",
//     background: "rgba(255,255,255,0.85)",
//     marginBottom: "18px",
//     borderRadius: "10px",
//     padding: "12px 15px",
//     fontSize: "1rem",
//     color: "#1b4332",
//     boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
//   },
//   textarea: {
//     width: "100%",
//     border: "none",
//     outline: "none",
//     background: "rgba(255,255,255,0.85)",
//     marginBottom: "18px",
//     borderRadius: "10px",
//     padding: "12px 15px",
//     height: "120px",
//     resize: "none",
//     fontSize: "1rem",
//     color: "#1b4332",
//   },
//   button: {
//     width: "100%",
//     background: "linear-gradient(90deg, #2d6a4f, #95d5b2)",
//     color: "white",
//     fontSize: "1.1rem",
//     fontWeight: 700,
//     border: "none",
//     borderRadius: "12px",
//     padding: "12px",
//     cursor: "pointer",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "8px",
//     boxShadow: "0 4px 10px rgba(45,106,79,0.3)",
//   },
//   list: {
//     maxWidth: "700px",
//     margin: "auto",
//     textAlign: "center",
//   },
//   listTitle: {
//     color: "#1b4332",
//     marginBottom: "20px",
//   },
//   card: {
//     background: "rgba(255,255,255,0.35)",
//     borderRadius: "16px",
//     padding: "20px",
//     marginBottom: "15px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.4)",
//   },
//   cardTitle: { color: "#1b4332", fontWeight: "700" },
//   cardText: { color: "#3a5a40", margin: "8px 0" },
//   date: { color: "#40916c" },
//   deleteBtn: {
//     background: "transparent",
//     border: "none",
//     color: "#e63946",
//     fontSize: "1.3rem",
//     cursor: "pointer",
//   },
//   noData: {
//     color: "#3a5a40",
//     fontStyle: "italic",
//   },
//   leaf: {
//     position: "absolute",
//     width: "18px",
//     height: "18px",
//     background: "radial-gradient(circle, #95d5b2 40%, #52b788 100%)",
//     borderRadius: "50% 50% 0 0",
//     animation: "floatUp linear infinite",
//     opacity: 0.8,
//   },
// };






import React, { useState, useEffect } from "react";
import axios from "axios";
import "./complaints.css";

export default function FarmerComplaint() {
  const [form, setForm] = useState({
    farmer_name: "",
    phone: "",
    email: "",
    complaint_type: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const complaintOptions = [
    "Website Issue",
    "Wrong Crop Suggestion",
    "Fertilizer Problem",
    "Disease Detection Error",
    "Manual Help Request",
    "Other",
  ];

  // ✅ Correct API Base URL
  const API_BASE = "http://localhost:1000";

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_BASE}/complaints`);
      setComplaints(res.data);
    } catch (err) {
      console.log("🔴 Server not responding");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE}/complaints`, form);

      setForm({
        farmer_name: "",
        phone: "",
        email: "",
        complaint_type: "",
        description: "",
      });

      fetchComplaints();

      document.querySelector(".success-popup").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".success-popup").style.display = "none";
      }, 2500);
    } catch (err) {
      alert("❌ Failed to submit. Backend error!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="complaint-wrapper">
      <div className="success-popup">✅ Complaint Submitted Successfully!</div>

      <div className="glass-card">
        <h2 className="title">🌱 Farmer Support & Complaint Center</h2>
        <p className="subtitle">Your issue matters. We are here to help!</p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <input
            className="input-box"
            placeholder="👨‍🌾 Farmer Name"
            value={form.farmer_name}
            onChange={(e) => setForm({ ...form, farmer_name: e.target.value })}
            required
          />

          <input
            className="input-box"
            placeholder="📞 Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="input-box"
            placeholder="✉ Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="input-box"
            value={form.complaint_type}
            onChange={(e) =>
              setForm({ ...form, complaint_type: e.target.value })
            }
            required
          >
            <option value="">📂 Select Complaint Category</option>
            {complaintOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <textarea
            className="input-box textarea"
            placeholder="📝 Describe your problem clearly..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button className="btn" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : "🚀 Submit Complaint"}
          </button>
        </form>
      </div>

      <div className="list-card">
        <h3 className="list-title">📋 Previous Complaints</h3>
        <div className="list-box">
          {complaints.length === 0 && (
            <p className="no-data">No complaints yet</p>
          )}

          {complaints.map((c) => (
            <div key={c.id} className="list-item">
              <div><b>👤 {c.farmer_name}</b></div>
              <div>📁 {c.complaint_type}</div>
              <div>🟩 Status: {c.status}</div>
              <div className="small">{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
