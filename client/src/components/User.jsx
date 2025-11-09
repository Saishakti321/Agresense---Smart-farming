// import React, { useState } from "react";
// import {useLocation } from "react-router-dom";
// import './User.css';

// // import { useState } from 'react';
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import * as formik from "formik";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Snav from "./sidenav";
// function User() {
 
//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [campus, setcampus] = useState("");
//   const [typeofplace, settypeofplace] = useState("");

//   const [typeofdamage, settypeofdamage] = useState("");
//   // const[id,setId]=useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [accepted, setAccepted] = useState(0);

  

//   const { Formik } = formik;

//   const schema = yup.object().shape({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     username: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     zip: yup.string().required(),
//     file: yup.mixed().required(),
//     terms: yup.bool().required().oneOf([true], "terms must be accepted"),
//   });
//   // const savedata = () => {
//   //   try {
//   //     debugger;
     
//   //     debugger;
//   //     console.log(fname, lname,email, campus, typeofdamage,typeofplace);
      
//   //   } catch (error) {
//   //     debugger;
//   //     console.log(error);
//   //   }
//   // };


//   //const navigate = useNavigate();
// //   const savedata=()=> {
// //     debugger
// //     alert("button clicked")
// //     //fetrch ra post method
    
// //     const date = new Date();
// //     console.log(date);
      
// //     debugger
// //     fetch("http://localhost:1000/User",{
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({

// //         "fname":fname,
// //         "lname":lname,
// //         "campus":campus,
// //         "email" : email,
// //         "typeofdamage":typeofdamage,
// //         "typeofplace":typeofplace,
// //         "date":date

// //   }),
// //       // body:JSON.stringify(password)
      
// //     })
// //              .then(res => res.json())
// //              .then(
// //                 (result) => {
// //                   if(result!==0){
// //                     navigate('/success');

// //                   }
// //                   debugger
// //                 //  if(result.length===0){
// //                 //   alert("Invalid Username or Password");
// //                 //  }
// //                 //  else{
// //                 //   // navigate('/User');

// //                 //  }
// //                    console.log(result);
// //                    debugger
// //                 },
// //                 (error) => {
// //                  console.log('Error:', error);
// //                 }
// //              )
       
// //  }
// const navigate = useNavigate();
// const validateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// // const saveData = async () => {
// //   debugger;
// //   // alert("button clicked");

// //   const date = new Date();
// //   console.log(date);

// //   try {
// //     const response = await fetch("http://localhost:1000/User", {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({
// //         "fname": fname,
// //         "lname": lname,
// //         "campus": campus,
// //         "email": email,
// //         "typeofdamage": typeofdamage,
// //         "typeofplace": typeofplace,
// //         "date": date
// //       })
// //     });

// //     const result = await response.json();

// //     if (result !== 0) {
// //       navigate('/success');
// //     }

// //     console.log(result);
// //     debugger;

// //   } catch (error) {
// //     console.log('Error:', error);
// //   }
// // }
 
// const saveData = async (event) => {
//   if (!validateEmail(email)) {
//     setError('Please enter a valid email address.');
//     alert("Please put the correct Email");
//     return;
//   }

//   const id=localStorage.getItem('id');
//   const date = new Date();
//   event.preventDefault();
//   setSubmitted(false);
//   setError('');
//   // setAccepted(0);
//   //alert(accepted)

//   const formData = { fname,lname,campus,email,typeofdamage,typeofplace,date,id,accepted};
//   // if(fname===undefined&&lname===undefined&&campus===undefined&&email===undefined&&typeofdamage===undefined&&typeofplace===undefined&&date===undefined&&id===undefined){
//   //   alert("Filled all the attribute");
//   //   }/
//   if (!fname || !lname || !campus || !email || !typeofdamage || !typeofplace || !date || !id) {
//     alert("Please fill all the fields.");
//     return;
// }
//   try {
//     const response = await fetch('http://localhost:1000/User', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     if (response.ok) {
//       navigate('/success')
//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 3000);
//       setfname('');
//       setlname('');
//       setcampus('');
//      setemail('');
//      settypeofdamage('');
//      settypeofplace('');


//     } else {
//       const errorData = await response.json();
//       setError(errorData.message || 'Something went wrong');
//     }
//   } catch (err) {
//     setError('Network error');
//   }
// };


//   return (
//   // <>
//   //   <Snav/>
//   //   <div className="outer">   
//   //   <h2 style={{fontFamily:"serif",color:"#6EACDA",padding:"0px"}}>MAKE A COMPLAIN HERE</h2>
//   //    <div
//   //     className="container container1"
//   //     style={{ border: "1px solid Black", marginTop: "80px" ,maxWidth:"600px",boxShadow:"10px",height:"auto"}}
//   //   >
      
//   //     <Formik
//   //       validationSchema={schema}
//   //       onSubmit={console.log}
//   //       initialValues={{
//   //         firstName: "",
//   //         lastName: "",
//   //         username: "",
//   //         city: "",
//   //         state: "",
//   //         zip: "",
//   //         file: null,
//   //         terms: false,
//   //       }}
//   //     >
//   //       {({ handleChange, values, touched, errors }) => (
//   //         <Form noValidate >
//   //           <Row className="mb-3">
//   //             <Form.Group
//   //               as={Col}
//   //               md="6"
//   //               controlId="validationFormik101"
//   //               className="position-relative"
//   //             >
//   //               <h4>First name</h4>
//   //               <Form.Control
//   //               className="formcontrol"
//   //                 type="text"
//   //                 name="firstName"
//   //                 value={fname}
//   //                 onChange={(event) => setfname(event.target.value)}
//   //                 isValid={touched.firstName && !errors.firstName}
//   //               />
//   //               <Form.Control.Feedback tooltip>
//   //                 Looks good!
//   //               </Form.Control.Feedback>
//   //             </Form.Group>
//   //             <Form.Group
//   //               as={Col}
//   //               md="6"
//   //               controlId="validationFormik102"
//   //               className="position-relative"
//   //             >
//   //               <h4>Last name</h4>
//   //               <Form.Control
//   //               className="formcontrol"
//   //                 type="text"
//   //                 name="lastName"
//   //                 value={lname}
//   //                 onChange={(e) => setlname(e.target.value)}
//   //                 isValid={touched.lastName && !errors.lastName}
//   //               />
                

//   //               <Form.Control.Feedback tooltip>
//   //                 Looks good!
//   //               </Form.Control.Feedback>
//   //             </Form.Group>
//   //             <Form.Group as={Col} md="12" controlId="validationFormikUsername2">
//   //               <h4>Username</h4>
//   //               <InputGroup >
//   //                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//   //                 <Form.Control
//   //                 className="formcontrol"
//   //                   type="text"
//   //                   placeholder="Username"
//   //                   aria-describedby="inputGroupPrepend"
//   //                   name="username"
//   //                   value={email}
//   //                   onChange={(e) => setemail(e.target.value)}
                   
//   //                 />
//   //                 <Form.Control.Feedback type="invalid" tooltip>
//   //                   {errors.username}
//   //                 </Form.Control.Feedback>
//   //               </InputGroup>
//   //             </Form.Group>
//   //           </Row>
//   //           <Row className="mb-3">
//   //             <Form.Group
              
//   //               as={Col}
//   //               md="6"
//   //               controlId="validationFormik103"
//   //               className="position-relative "
//   //             >
//   //               <h4>Campus</h4>
//   //               <Form.Select onChange={(e) => setcampus(e.target.value)} value={campus} aria-label="Default select example"
//   //               className="formcontrol">
//   //                 console.log({campus});
//   //     <option>Select Campus</option>
//   //     <option value="One">One</option>
//   //     <option value="Two">Two</option>
//   //     <option value="Three">Three</option>
//   //   </Form.Select>
//   //             </Form.Group>
//   //             <Form.Group
//   //               as={Col}
//   //               md="6"
//   //               controlId="validationFormik104"
//   //               className="position-relative"
//   //             >
//   //               <h4>Type Of Place</h4>
//   //               <Form.Select aria-label="Default select example" onChange={(e) => settypeofplace(e.target.value)} value={typeofplace}
//   //                 className="formcontrol">
//   //     <option>Select Place</option>
//   //     <option value="Hostel">Hostel</option>
//   //     <option value="Class Room">Class Room</option>
//   //     <option value="Campus">Campus</option>
//   //   </Form.Select>
//   //               <Form.Control.Feedback type="invalid" tooltip>
//   //                 {errors.state}
//   //               </Form.Control.Feedback>
//   //             </Form.Group>
//   //             <Form.Group
//   //               as={Col}
//   //               md="6"
//   //               controlId="validationFormik105"
//   //               className="position-relative"
//   //             >
//   //               <h4>Type Of Damage</h4>
//   //               <Form.Select aria-label="Default select example" onChange={(e) => settypeofdamage(e.target.value)} value={typeofdamage}
//   //                 className="formcontrol">
//   //     <option>Select Damage Type</option>
//   //     <option value="Pipeline">Pipeline</option>
//   //     <option value="Electrical">Electrical</option>
//   //     <option value="Building">Buildings</option>
//   //   </Form.Select>

//   //               <Form.Control.Feedback type="invalid" tooltip>
//   //                 {errors.zip}
//   //               </Form.Control.Feedback>
//   //             </Form.Group>
//   //             <Form.Group 
//   //              as={Col}
//   //              md="6"
//   //              controlId="validationFormik105"
//   //             //  className="position-relative"
//   //             className="position-relative mb-6">
//   //             <h4>File</h4>
//   //             <Form.Control
//   //               type="file"
//   //               required
//   //               name="file"
//   //               onChange={handleChange}
//   //               isInvalid={!!errors.file}
//   //             />
//   //             <Form.Control.Feedback type="invalid" tooltip>
//   //               {errors.file}
//   //             </Form.Control.Feedback>
//   //           </Form.Group>
//   //           </Row>
           
//   //           <Form.Group className="position-relative mb-3">
//   //             <Form.Check
//   //             style={{fontSize:"20px",color:"white"}}
//   //               required
//   //               name="terms"
//   //               label="Agree to terms and conditions"
//   //               onChange={handleChange}
//   //               isInvalid={!!errors.terms}
//   //               feedback={errors.terms}
//   //               feedbackType="invalid"
//   //               id="validationFormik106"
//   //               feedbackTooltip
//   //             />
//   //           </Form.Group>
//   //           <Button type="submit" style={{margin:"20px"}} onClick={saveData}>Submit form</Button>
//   //         </Form>
//   //       )}
//   //     </Formik>
//   //   </div>
//   //   </div>
//   //   </>


// <>
//   <Snav />
//   <div
//     className="outer"
//     style={{
//       padding: "20px",
//       backgroundColor: "#f4f4f4",
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column",
//     }}
//   >
//     <h2
//       style={{
//         fontFamily: "serif",
//         color: "#283c86",
//         fontWeight: "bold",
//         marginBottom: "20px",
//         textAlign: "center",
//         fontSize: "2rem",
//       }}
//     >
//       Make a Complaint Here
//     </h2>
//     <div
//       className="container"
//       style={{
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         padding: "20px",
//         backgroundColor: "#ffffff",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         width: "100%",
//         maxWidth: "600px",
//         margin: "0 auto",
//       }}
//     >
//       <Formik
//         validationSchema={schema}
//         onSubmit={console.log}
//         initialValues={{
//           firstName: "",
//           lastName: "",
//           username: "",
//           city: "",
//           state: "",
//           zip: "",
//           file: null,
//           terms: false,
//         }}
//       >
//         {({ handleChange, values, touched, errors }) => (
//           <Form noValidate>
//             <Row className="mb-3">
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik101"
//                 className="position-relative"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>First Name</h4>
//                 <Form.Control
//                   className="formcontrol"
//                   type="text"
//                   name="firstName"
//                   placeholder="Enter your first name"
//                   value={fname}
//                   onChange={(event) => setfname(event.target.value)}
//                   isValid={touched.firstName && !errors.firstName}
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 />
//                 <Form.Control.Feedback tooltip>
//                   Looks good!
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik102"
//                 className="position-relative"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Last Name</h4>
//                 <Form.Control
//                   className="formcontrol"
//                   type="text"
//                   name="lastName"
//                   placeholder="Enter your last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                   isValid={touched.lastName && !errors.lastName}
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 />
//                 <Form.Control.Feedback tooltip>
//                   Looks good!
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group as={Col} xs={12} controlId="validationFormikUsername2">
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Username</h4>
//                 <InputGroup>
//                   <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                   <Form.Control
//                     className="formcontrol"
//                     type="text"
//                     placeholder="Enter your username"
//                     aria-describedby="inputGroupPrepend"
//                     name="username"
//                     value={email}
//                     onChange={(e) => setemail(e.target.value)}
//                     style={{
//                       borderRadius: "8px",
//                       padding: "10px",
//                       borderColor: "#ccc",
//                       fontSize: "1rem",
//                     }}
//                   />
//                   <Form.Control.Feedback type="invalid" tooltip>
//                     {errors.username}
//                   </Form.Control.Feedback>
//                 </InputGroup>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik103"
//                 className="position-relative"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Campus</h4>
//                 <Form.Select
//                   onChange={(e) => setcampus(e.target.value)}
//                   value={campus}
//                   aria-label="Select Campus"
//                   className="formcontrol"
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 >
//                   <option>Select Campus</option>
//                   <option value="One">One</option>
//                   <option value="Two">Two</option>
//                   <option value="Three">Three</option>
//                 </Form.Select>
//               </Form.Group>
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik104"
//                 className="position-relative"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Type Of Place</h4>
//                 <Form.Select
//                   aria-label="Select Place"
//                   onChange={(e) => settypeofplace(e.target.value)}
//                   value={typeofplace}
//                   className="formcontrol"
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 >
//                   <option>Select Place</option>
//                   <option value="Hostel">Hostel</option>
//                   <option value="Class Room">Class Room</option>
//                   <option value="Campus">Campus</option>
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid" tooltip>
//                   {errors.state}
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik105"
//                 className="position-relative"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Type Of Damage</h4>
//                 <Form.Select
//                   aria-label="Select Damage Type"
//                   onChange={(e) => settypeofdamage(e.target.value)}
//                   value={typeofdamage}
//                   className="formcontrol"
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 >
//                   <option>Select Damage Type</option>
//                   <option value="Pipeline">Pipeline</option>
//                   <option value="Electrical">Electrical</option>
//                   <option value="Building">Building</option>
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid" tooltip>
//                   {errors.zip}
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group
//                 as={Col}
//                 xs={12}
//                 md={6}
//                 controlId="validationFormik106"
//                 className="position-relative mb-6"
//               >
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Upload File</h4>
//                 <Form.Control
//                   type="file"
//                   required
//                   name="file"
//                   onChange={handleChange}
//                   isInvalid={!!errors.file}
//                   style={{
//                     borderRadius: "8px",
//                     padding: "10px",
//                     borderColor: "#ccc",
//                     fontSize: "1rem",
//                   }}
//                 />
//                 <Form.Control.Feedback type="invalid" tooltip>
//                   {errors.file}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Row>
//             <Form.Group className="position-relative mb-3">
//               <Form.Check
//                 style={{ fontSize: "16px", color: "#283c86", fontWeight: "bold" }}
//                 required
//                 name="terms"
//                 label="Agree to terms and conditions"
//                 onChange={handleChange}
//                 isInvalid={!!errors.terms}
//                 feedback={errors.terms}
//                 feedbackType="invalid"
//                 id="validationFormik106"
//                 feedbackTooltip
//               />
//             </Form.Group>
//             <Button
//               type="submit"
//               style={{
//                 backgroundColor: "#283c86",
//                 color: "#ffffff",
//                 borderRadius: "8px",
//                 padding: "10px 20px",
//                 fontWeight: "bold",
//                 border: "none",
//                 cursor: "pointer",
//                 width: "100%",
//                 transition: "background-color 0.3s ease",
//                 fontSize: "1rem",
//                 width:"85%"
                
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#45a247")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#283c86")}
//               onClick={saveData}
//             >
//               Submit Form
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   </div>
// </>


  
//   );
// }

// export default User;



























// import React, { useEffect, useState } from "react";
// import Snav from "./sidenav";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// export default function User() {
//   const [lat, setLat] = useState(null);
//   const [lon, setLon] = useState(null);
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Form fields
//   const [crop, setCrop] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [fertilizer, setFertilizer] = useState("");

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           try {
//             // 🌦 Weather API
//             const weatherRes = await fetch(
//               `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=99e83ddfa0fb31d1ff8e0ddd9283d510
// &units=metric`
//             );
//             const weatherData = await weatherRes.json();

//             // 🌱 Soil API
//             const soilRes = await fetch(
//               `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&depth=0-5cm`
//             );
//             const soilData = await soilRes.json();

//             // 🧠 Prepare for AI
//             const inputData = {
//               latitude,
//               longitude,
//               temperature: weatherData.main?.temp || 0,
//               humidity: weatherData.main?.humidity || 0,
//               rainfall: weatherData.rain ? weatherData.rain["1h"] || 0 : 0,
//               soil_ph: soilData?.properties?.phh2o?.mean || 6.5,
//             };

//             const aiRes = await fetch("http://localhost:1000/predict", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(inputData),
//             });

//             const aiData = await aiRes.json();
//             setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//             setIrrigation(aiData.irrigation || "Not available");
//             setFertilizer(aiData.fertilizer || "Not available");
//             setWeather(weatherData);
//             setSoil(soilData);
//           } catch (err) {
//             setError("Failed to fetch API data automatically.");
//           } finally {
//             setLoading(false);
//           }
//         },
//         (error) => {
//           setError("Location access denied. Please enable location.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Geolocation not supported in your browser.");
//       setLoading(false);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Data submitted successfully!");
//   };

//   return (
//     <div className="outer" style={{ padding: "30px", background: "#f4f4f4" }}>
//       <Snav />
//       <div
//         className="container"
//         style={{
//           maxWidth: "700px",
//           background: "#fff",
//           borderRadius: "10px",
//           padding: "25px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ color: "#283c86", textAlign: "center" }}>
//           🌾 AgriSense Smart Farming Form
//         </h2>

//         {loading && <p>Detecting location & fetching live data...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && !error && (
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Latitude</Form.Label>
//                   <Form.Control type="text" value={lat?.toFixed(4)} readOnly />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Longitude</Form.Label>
//                   <Form.Control type="text" value={lon?.toFixed(4)} readOnly />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Temperature (°C)</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={weather.main?.temp || ""}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Humidity (%)</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={weather.main?.humidity || ""}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Soil pH</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={soil?.properties?.phh2o?.mean?.toFixed(2) || 6.5}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Rainfall (mm)</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={weather.rain ? weather.rain["1h"] || 0 : 0}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Crop Type</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your crop (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>AI Recommendation</Form.Label>
//               <Form.Control as="textarea" rows={3} value={aiAdvice} readOnly />
//             </Form.Group>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Irrigation Suggestion</Form.Label>
//                   <Form.Control type="text" value={irrigation} readOnly />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Fertilizer Suggestion</Form.Label>
//                   <Form.Control type="text" value={fertilizer} readOnly />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button
//               type="submit"
//               style={{
//                 backgroundColor: "#283c86",
//                 border: "none",
//                 width: "100%",
//                 marginTop: "15px",
//                 fontWeight: "bold",
//               }}
//             >
//               Submit Data
//             </Button>
//           </Form>
//         )}
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// import "./User.css";
// import Snav from "./sidenav";

// function User() {
//   const navigate = useNavigate();

//   // Form data
//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Automatically fetch location, weather, and soil data
//   useEffect(() => {
//     const fetchLocationData = async () => {
//       try {
//         // Get user's location automatically
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const lat = pos.coords.latitude;
//           const lon = pos.coords.longitude;
//           setLat(lat);
//           setLon(lon);

//           // 🌦️ Weather API
//           const weatherRes = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather(weatherData.current_weather);

//           // 🌱 Soil API
//           const soilRes = await fetch(
//             `https://rest.soilgrids.org/query?lon=${lon}&lat=${lat}`
//           );
//           const soilData = await soilRes.json();
//           setSoil(soilData);
//         });
//       } catch (err) {
//         console.error("Error fetching location or API data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };

//     fetchLocationData();
//   }, []);

//   // 🧠 Fetch AI prediction on button click
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         latitude: lat,
//         longitude: lon,
//         temperature: weather?.temperature || 0,
//         humidity: weather?.humidity || 0,
//         rainfall: weather?.rain || 0,
//         soil_ph: soil?.properties?.phh2o?.mean || 6.5,
//         crop,
//       };

//       const aiRes = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#f4f4f4",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "serif",
//             color: "#283c86",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "20px",
//             backgroundColor: "#ffffff",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             maxWidth: "650px",
//             margin: "0 auto",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   First Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   Last Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Email Address
//               </h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   Latitude
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   value={lat}
//                   readOnly
//                   style={{ backgroundColor: "#e9ecef" }}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   Longitude
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   value={lon}
//                   readOnly
//                   style={{ backgroundColor: "#e9ecef" }}
//                 />
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Current Temperature (°C)
//               </h4>
//               <Form.Control
//                 type="text"
//                 value={weather?.temperature || "Loading..."}
//                 readOnly
//                 style={{ backgroundColor: "#e9ecef" }}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Soil pH Level
//               </h4>
//               <Form.Control
//                 type="text"
//                 value={soil?.properties?.phh2o?.mean || "Loading..."}
//                 readOnly
//                 style={{ backgroundColor: "#e9ecef" }}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Crop Type
//               </h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#45a247",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "bold",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {aiAdvice && (
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <h5>AI Recommendation:</h5>
//                 <p>
//                   <b>Advice:</b> {aiAdvice}
//                 </p>
//                 <p>
//                   <b>Fertilizer:</b> {fertilizer}
//                 </p>
//                 <p>
//                   <b>Irrigation:</b> {irrigation}
//                 </p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "bold",
//                 backgroundColor: "#283c86",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default User;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import "./User.css";
import Snav from "./sidenav";

function User() {
  const navigate = useNavigate();

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [crop, setCrop] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState({ main: {}, weather: [] });
  const [soil, setSoil] = useState({});
  const [aiAdvice, setAiAdvice] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [error, setError] = useState("");

  // ✅ Auto-fetch location, weather, and soil data
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          setLat(latitude);
          setLon(longitude);

          // 🌦️ Fetch weather data
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData);

          // 🌱 Fetch soil data
          const soilRes = await fetch(
            `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
          );
          const soilData = await soilRes.json();
          setSoil(soilData);
        });
      } catch (err) {
        console.error("Error fetching location or environmental data:", err);
        setError("Failed to fetch location or environmental data.");
      }
    };

    fetchLocationData();
  }, []);

  // 🧠 AI Suggestion
  const getAISuggestion = async () => {
    try {
      const inputData = {
        latitude: lat,
        longitude: lon,
        temperature: weather?.main?.temp || 0,
        humidity: weather?.main?.humidity || 0,
        rainfall: weather?.rain?.["1h"] || 0,
        soil_ph: soil?.properties?.phh2o?.mean || 6.5,
        crop,
      };

      const aiRes = await fetch("http://localhost:1000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const aiData = await aiRes.json();
      setAiAdvice(aiData.recommendation || "AI could not provide advice.");
      setIrrigation(aiData.irrigation || "Not available");
      setFertilizer(aiData.fertilizer || "Not available");
    } catch (err) {
      console.error("AI Fetch Error:", err);
      alert("Error fetching AI suggestion");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your data has been saved successfully!");
    navigate("/success");
  };

  return (
    <>
      <Snav />
      <div
        className="outer"
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontFamily: "serif",
            color: "#283c86",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          AgriSense Smart Farming Assistant
        </h2>

        <div
          className="container"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          <Form onSubmit={handleSubmit}>
            {/* ✅ Personal Info */}
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6}>
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>First Name</h4>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Last Name</h4>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                />
              </Form.Group>
            </Row>

            {/* ✅ Email */}
            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Email Address</h4>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* ✅ Location */}
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6}>
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Latitude</h4>
                <Form.Control
                  type="text"
                  value={lat || "Loading..."}
                  readOnly
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Longitude</h4>
                <Form.Control
                  type="text"
                  value={lon || "Loading..."}
                  readOnly
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </Form.Group>
            </Row>

            {/* ✅ Weather */}
            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Temperature (°C)</h4>
              <Form.Control
                type="text"
                value={weather?.main?.temp || "Loading..."}
                readOnly
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Humidity (%)</h4>
              <Form.Control
                type="text"
                value={weather?.main?.humidity || "Loading..."}
                readOnly
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>

            {/* ✅ Soil */}
            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Soil pH Level</h4>
              <Form.Control
                type="text"
                value={soil?.properties?.phh2o?.mean || "Loading..."}
                readOnly
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>

            {/* ✅ Crop Input */}
            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Crop Type</h4>
              <Form.Control
                type="text"
                placeholder="Enter crop name (e.g., Wheat, Rice)"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              />
            </Form.Group>

            {/* ✅ AI Button */}
            <Button
              type="button"
              style={{
                backgroundColor: "#45a247",
                border: "none",
                marginTop: "20px",
                width: "100%",
                fontWeight: "bold",
              }}
              onClick={getAISuggestion}
            >
              🌾 Get AI Suggestion
            </Button>

            {/* ✅ AI Output */}
            {aiAdvice && (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <h5>🧠 AI Recommendation:</h5>
                <p><b>Advice:</b> {aiAdvice}</p>
                <p><b>Fertilizer:</b> {fertilizer}</p>
                <p><b>Irrigation:</b> {irrigation}</p>
              </div>
            )}

            {/* ✅ Submit */}
            <Button
              type="submit"
              variant="primary"
              style={{
                marginTop: "30px",
                width: "100%",
                fontWeight: "bold",
                backgroundColor: "#283c86",
                border: "none",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default User;
