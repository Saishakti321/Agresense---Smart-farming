

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const app = express();

app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const con = require("./db");



app.get("/deleteUser", (req, res) => {
  try {
    const { id } = req.query;

    const sql = `DELETE FROM user_input WHERE id = ${id}`;

    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({ success: "updated user record" });
    });
  } catch (error) {
    console.log("error------", error);
  }
});


app.post("/fertilizer", async (req, res) => {
  const {
    temperature,
    humidity,
    moisture,
    soil,
    crop,
    nitrogen,
    potassium,
    phosphorous,
  } = req.body;

  if (
    !temperature ||
    !humidity ||
    !moisture ||
    !soil ||
    !crop ||
    !nitrogen ||
    !potassium ||
    !phosphorous
  ) {
    return res.status(400).json({ error: "Missing arguments" });
  }

  try {
    const flaskResponse = await axios.post(
      "http://127.0.0.1:5002/predict_fertilizer",
      {
        temperature,
        humidity,
        moisture,
        soil,
        crop,
        nitrogen,
        potassium,
        phosphorous,
      }
    );

    res.json(flaskResponse.data);
  } catch (error) {
    console.error("❌ Error communicating with Flask:", error.message);
    res.status(500).json({ error: "Failed to connect to prediction service" });
  }
});


app.get("/forecast", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!data.list) {
      return res.status(500).json({ error: "Invalid data from weather API" });
    }

    const baseData = data.list.slice(0, 5).map((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      const formattedDate = date.toISOString().split("T")[0];

      const temp = day.main.temp;
      const rain = day.rain ? day.rain["3h"] || 0 : 0;

      const baseMoisture = 65 - index * 2.5;
      let adjustedMoisture = baseMoisture;

      if (temp > 32) adjustedMoisture -= 5;
      if (rain > 10) adjustedMoisture += 4;

      let recommendation;

      if (adjustedMoisture > 55 && rain > 10) {
        recommendation =  No Irrigation Needed";
      } else if (adjustedMoisture < 45 && rain < 5 && temp > 32) {
        recommendation = " Irrigation Required";
      } else {
        recommendation = " Moderate – Monitor Soil";
      }

      return {
        date: formattedDate,
        temperature: temp,
        rainfall: rain,
        predictedMoisture: adjustedMoisture.toFixed(1),
        recommendation,
      };
    });

    const simulated = [];

    for (let i = 5; i < 15; i++) {
      const prev = baseData[baseData.length - 1];

      const date = new Date();
      date.setDate(date.getDate() + i);

      simulated.push({
        date: date.toISOString().split("T")[0],
        temperature: (prev.temperature + Math.random() * 4 - 2).toFixed(1),
        rainfall: Math.max(
          0,
          (prev.rainfall + Math.random() * 3 - 1).toFixed(1)
        ),
        predictedMoisture: (
          prev.predictedMoisture -
          Math.random() * 1.5 +
          0.5
        ).toFixed(1),
        recommendation:
          Math.random() > 0.7
            ? " Irrigation Required"
            : Math.random() > 0.4
            ? " Moderate – Monitor Soil"
            : " No Irrigation Needed",
      });
    }

    const fullForecast = [...baseData, ...simulated];

    res.json({
      location: data.city?.name || "Unknown",
      forecastDays: fullForecast.length,
      forecast: fullForecast,
    });
  } catch (err) {
    console.error("Error in /forecast:", err);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});


app.post("/login", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const sql = `SELECT * FROM logins WHERE user_name = '${username}' AND password='${password}'`;

    con.query(sql, (err, result) => {
      if (err) throw err;

      if (result.length == 0) {
        return res.json({
          isAuth: false,
          message: "Authentication failed",
        });
      } else {
        return res.json({
          isAuth: true,
          message: "Authentication successful",
          user: result[0],
        });
      }
    });
  } catch (error) {
    console.log("error------", error);
  }
});


app.post("/register", (req, res) => {
  const { username, password, phone, role, name } = req.body;

  const sql1 = `SELECT * FROM logins WHERE user_name ='${username}'`;

  con.query(sql1, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error 3" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const sql = `INSERT INTO logins (user_name,password,phone,role,name)
      VALUES ('${username}', '${password}','${phone}','${role}','${name}')`;

    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
});


app.post("/User", (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      campus,
      typeofdamage,
      typeofplace,
      date,
      id,
      accepted,
    } = req.body;

    const sql = `INSERT INTO User_input
    (fname,lname,email,typeofplaces,typeofdamage,campus,date,user_id,status,accepted_by)
    VALUES ('${fname}','${lname}','${email}','${typeofplace}','${typeofdamage}','${campus}','${date}','${id}','${accepted}',NULL)`;

    con.query(sql, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log("error------", error);
  }
});


app.get("/Administrator", (req, res) => {
  con.query("select * from user_input", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.listen(1000, function () {
  console.log("server is started on port 1000");
});
