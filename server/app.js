
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");
const multer = require("multer");
const axios = require("axios");

const con = require("./db"); 

const app = express();

app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const API_KEY = "64ec4e8adf69cb9be080f0c6d813f56d";


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
    console.error("Error communicating with Flask:", error.message);
    res.status(500).json({ error: "Failed to connect to prediction service" });
  }
});


app.post("/irrigation", async (req, res) => {
  try {
    const { crop, temperature, humidity, rainfall, soil_ph } = req.body;

    const response = await axios.post("http://127.0.0.1:5000/irrigation", {
      crop,
      temperature,
      humidity,
      rainfall,
      soil_ph,
    });

    res.json(response.data);
  } catch (error) {
    console.error("ML Irrigation Service Error:", error.message);
    res.status(500).json({ error: "Failed to get irrigation prediction" });
  }
});


app.get("/", function (req, res) {
  const url = "https://official-joke-api.appspot.com/random_joke";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const data1 = JSON.parse(data);
      const setup1 = data1.setup;
      const setup2 = data1.punchline;

      res.send("JOKE is " + setup1 + ", " + setup2);
    });
  });
});


app.post("/predict", async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    const response = await axios.post("http://127.0.0.1:5000/predict", {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
    });

    console.log("ML Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("ML Service Error:", error.message);
    res
      .status(500)
      .json({ error: "ML service not reachable or invalid response" });
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
    if (err) return res.status(500).json({ error: "Server error 3" });

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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  console.warn(req.file);
  res.send("File uploaded successfully");
});


app.listen(1000, function () {
  console.log("server is started on port 1000");
});
