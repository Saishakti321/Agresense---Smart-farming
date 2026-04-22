

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


  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          setLat(latitude);
          setLon(longitude);


          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData);


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


            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Soil pH Level</h4>
              <Form.Control
                type="text"
                value={soil?.properties?.phh2o?.mean || "Loading..."}
                readOnly
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Crop Type</h4>
              <Form.Control
                type="text"
                placeholder="Enter crop name (e.g., Wheat, Rice)"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              />
            </Form.Group>


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
               Get AI Suggestion
            </Button>


            {aiAdvice && (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <h5>🧠 AI Recommendation:</h5>
                <p><b>Advice:</b> {aiAdvice}</p>
                <p><b>Fertilizer:</b> {fertilizer}</p>
                <p><b>Irrigation:</b> {irrigation}</p>
              </div>
            )}


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
