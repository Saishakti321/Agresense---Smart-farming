const express = require("express");


const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const multer = require("multer");
// const { NULL } = require("mysql/lib/protocol/constants/types");
const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors());


const mysql = require("mysql2");
const con = require('./db');
// const cors = require("cors");
// app.use(cors());

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Shiva@1234",
//   database: "shiva-db",
// });
const API_KEY = "64ec4e8adf69cb9be080f0c6d813f56d"; // your key


app.get("/deleteUser", (req, res) => {
    try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
     
      //autentication
      console.log(req.query);
      const { id } = req.query;
      console.log("Id from client");
      console.log(id);
      const sql = `DELETE FROM user_input WHERE id = ${id}`;
  
      con.query(sql, (err, result) => {
        // con.end();
        if (err) throw err;
        res.status(200).json({success:"updated user record"});
        // res.send("it is rumnnig")
        // console.log(`${result.affectedRows} row(s) deleted`);
      });
    } catch (error) {
      console.log("error------", error);
    }
  });


app.post("/fertilizer", async (req, res) => {
  const { temperature, humidity, moisture, soil, crop, nitrogen, potassium, phosphorous } = req.body;

  // Check all required parameters
  if (!temperature || !humidity || !moisture || !soil || !crop || !nitrogen || !potassium || !phosphorous) {
    return res.status(400).json({ error: "Missing arguments" });
  }

  try {
    // 🔗 Call Flask service
    const flaskResponse = await axios.post("http://127.0.0.1:5002/predict_fertilizer", {
      temperature,
      humidity,
      moisture,
      soil,
      crop,
      nitrogen,
      potassium,
      phosphorous,
    });

    // ✅ Return result to frontend
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
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (!data.list) {
      return res.status(500).json({ error: "Invalid data from weather API" });
    }

    // 🗓️ Fix: ensure each of the first 5 days has unique, sequential date
    const baseData = data.list.slice(0, 5).map((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index); // <-- ensures consecutive days
      const formattedDate = date.toISOString().split("T")[0];

      const temp = day.main.temp;
      const rain = day.rain ? day.rain["3h"] || 0 : 0;

      const baseMoisture = 65 - index * 2.5;
      let adjustedMoisture = baseMoisture;

      if (temp > 32) adjustedMoisture -= 5;
      if (rain > 10) adjustedMoisture += 4;

      let recommendation;
      if (adjustedMoisture > 55 && rain > 10) {
        recommendation = "🟢 No Irrigation Needed";
      } else if (adjustedMoisture < 45 && rain < 5 && temp > 32) {
        recommendation = "🔴 Irrigation Required";
      } else {
        recommendation = "🟡 Moderate – Monitor Soil";
      }

      return {
        date: formattedDate,
        temperature: temp,
        rainfall: rain,
        predictedMoisture: adjustedMoisture.toFixed(1),
        recommendation,
      };
    });

    // 🔄 Simulate next 10 days by extending the trend
    const simulated = [];
    for (let i = 5; i < 15; i++) {
      const prev = baseData[baseData.length - 1];
      const date = new Date();
      date.setDate(date.getDate() + i); // <-- fixed to continue date sequence
      simulated.push({
        date: date.toISOString().split("T")[0],
        temperature: (prev.temperature + Math.random() * 4 - 2).toFixed(1),
        rainfall: Math.max(0, (prev.rainfall + Math.random() * 3 - 1).toFixed(1)),
        predictedMoisture: (prev.predictedMoisture - Math.random() * 1.5 + 0.5).toFixed(1),
        recommendation:
          Math.random() > 0.7
            ? "🔴 Irrigation Required"
            : Math.random() > 0.4
            ? "🟡 Moderate – Monitor Soil"
            : "🟢 No Irrigation Needed",
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
      debugger
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
    
      //autentication
  
      const username = req.body.username;
      const password = req.body.password;
      let isAuth = false;
      let role;
  
      console.log(username, password);
      const sql = `SELECT * FROM logins WHERE user_name = '${username}' AND password='${password}';`;
        
     
        con.query(sql, (err, result) => {
          // user1
        //   con.end();
          console.warn(result);
          if (err) throw err;
  
          // console.log("sql--",sql)
          console.warn("here is your result" + JSON.stringify(result));
          
          // if (result.length == 0) {
          //   isAuth = false;
          // } else {
          //   isAuth = true;
          // }
      
          if (result.length == 0) {
            return res.json({ isAuth: false,role:result.role, message: "Authentication failed" });
          
            
          } else {
            return res.json({ isAuth: true, message: "Authentication successful", user: result[0] });
          }
          
  
          // console.warn("data"+result.username[0]+""+result.password[0])
          // alert(result);
          //res.send(result);
          // const result1 = `Received: ${isAuth}`;
          // console.warn(result1);
           
        });
     
    } catch (error) {
      console.log("error------", error);
    }
  });
  


  app.post("/register", (req, res) => {
    // try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
      
      //autentication
  
      const username = req.body.username;
      const password = req.body.password;
      const phone=req.body.phone;
      const role=req.body.role;
      const name=req.body.name;
  
      console.log(role);
      
   
    try {
      // Check if username already exists
      const sql1 = `SELECT * FROM logins WHERE user_name ='${username}';`;
      con.query(sql1, (err, results) => {
        // con.end();
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Server error 3' });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ error: 'Email already exists' });
        }
  
        // Insert new user into the database
       const sql = `INSERT INTO logins (user_name,password,phone,role,name)
       VALUES ('${username}', '${password}','${phone}','${role}','${name}');`;     
        con.query(sql,(err,result) => {
          // if (err) throw err;
          
        //   con.end();
          console.log("sql--", sql);
          console.warn("here is your result" + JSON.stringify(result));
          res.send(result);
          connection.release(); 
          // if (err) {
          //   return res.status(500).json({ error: 'Server error 2' });
          // }
          // res.status(201).json({ message: 'User registered successfully!' });
          // // res.send(result);
        });
      });
    } catch (error) {
      console.log(error);
      //res.status(500).json({ error: 'Server error 1' });
    }
  });




  app.post("/User", (req, res) => {
    try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
      const mysql = require("mysql");
      const cors = require("cors");
      app.use(cors());
      const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Shiva@1234",
        database: "shiva-db",
      });
      //autentication
      // $date = date('m/d/Y h:i:s', time());
      // console.log(date);
  
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      const campus = req.body.campus;
      const typeofdamage = req.body.typeofdamage;
      const typeofplace = req.body.typeofplace;
      const date = req.body.date;
      const id=req.body.id;
      const accepted=req.body.accepted;
      console.log(fname, lname, email, campus, typeofdamage, typeofplace, date,id,accepted);
  
      // console.log(fname);
      const sql = `INSERT INTO User_input (fname, lname, email, typeofplaces, typeofdamage, campus,date,user_id,status,accepted_by)
    VALUES ('${fname}', '${lname}', '${email}', '${typeofplace}', '${typeofdamage}', '${campus}','${date}','${id}','${accepted}',NULL);`;
  
      con.connect((err) => {
        if (err) throw err;
        con.query(sql, (err, result) => {
          // user1
          
          if (err) throw err;
          console.log("sql--", sql);
          console.warn("here is your result" + JSON.stringify(result));
          res.send(result);
          
        });
      });
    } catch (error) {
      console.log("error------", error);
    }
  });
  //get data to administrator
  app.get("/Administrator", (req, res) => {
    
    
      con.query("select * from user_input", (err, result) => {
        // user1
        if (err) throw err;
        //  console.warn("here is your result"+JSON.stringify(result));
        res.send(result);
      });
    });

  


  app.get("/complain",(req,res)=>{

   
    const { id } = req.query;
    console.log(id);
    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
    
    const query = 'SELECT * FROM user_input WHERE user_id = ?';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        // return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
         return res.status(404).send({ error: 'No user found with this ID' });
      }
    // console.log(result);
    res.send(result);
    });
  });
  

  app.get('/status',(req,res)=>{
   
    
    const { id } = req.query;
    console.log(id);
   
    const query = 'UPDATE user_input SET status = 1 WHERE id = ?;';
    con.query(query, [id], (err, result) => {
     
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    //   con.end();
     
    console.log(result);
    res.status(200).json({success:"updated user record"});
    // res.send(result);
    });
  })


  
app.get('/status1',(req,res)=>{
   
   
    const { id } = req.query;
    console.log(id);
  
    const query = 'UPDATE user_input SET status = 2 WHERE id = ?;';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    console.log(result);
    res.send(result);
    });
  })
  
  

  
app.get("/edit1",(req,res)=>{

    const { id } = req.query;
    console.log(id);
    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
    
    const query = 'SELECT * FROM user_input WHERE id = ?';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    console.log(result);
    res.send(result);
    });
  });

  
app.post('/changePass', (req, res) => {
  
    
  
    // const userId = req.params.id;
    // console.log(userId);
    const { username,password,newP } = req.body;
    // console.log(typeofplace);
    const query ='UPDATE logins SET password = ? WHERE password = ? AND user_name = ?';
    con.query(query, [newP,password,username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    });
  });
  
  

  app.get("/RoleWise",(req,res)=>{

    
    const { role } = req.query;
    // console.log(role);
    if (!role) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
   
    const query = 'SELECT * FROM user_input WHERE typeofdamage = ?';
    con.query(query, [role], (err, result) => {
    //   con.end();
      if (err) {
        console.error('Error executing query:', err);
        // return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        // return res.status(404).send({ error: 'No user found with this ID' });
      }
    // console.log(result);
    res.send(result);
    });
  });



  app.get('/Accept',(req,res)=>{
   
   
    const { id } = req.query;
    const { id1 } = req.query;
  
    // console.log(id);
    // console.log(id1);
  
  
    
    const query = 'UPDATE user_input  SET accepted_by = ?, status = 3 WHERE id = ?;';
    con.query(query, [id1,id], (err, result) => {
    //   con.end();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
     
    console.log(result);
    res.status(200).json({success:"updated user record"});
    // res.send(result);
    });
    
  })
  

  app.post('/Update', (req, res) => {
  
   
  
    // const userId = req.params.id;
    // console.log(userId);
    const { fname, lname, campus, email, typeofdamage, typeofplace, date,id,id1 } = req.body;
    console.log(typeofplace);
    const query = 'UPDATE user_input SET fname = ?, lname = ?, campus = ?, email = ?, typeofdamage = ?, typeofplaces = ?, date = ?,user_id=? WHERE id = ?';
    con.query(query, [fname, lname, campus, email, typeofdamage, typeofplace, date, id1,id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    });
  });
  
  
  // ==============================
// Fertilizer & Pesticide Plan APIs
// ==============================

// ✅ Save a New Plan
app.post("/save_plan", async (req, res) => {
  try {
    const {
      user_id,
      city,
      temperature,
      humidity,
      moisture,
      soil,
      crop,
      fertilizer,
      pesticide,
      plan,
    } = req.body;

    if (!user_id || !crop || !soil) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Assuming you have a shared connection object named db or conn
    const sql = `
      INSERT INTO fertilizer_plans 
      (user_id, city, temperature, humidity, moisture, soil, crop, 
      fertilizer_name, fertilizer_amount_kg_per_acre, fertilizer_type, fertilizer_note,
      pesticide_name, pesticide_amount_kg_per_acre, pesticide_type, pesticide_note, plan_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      user_id,
      city || null,
      temperature,
      humidity,
      moisture,
      soil,
      crop,
      fertilizer?.name || null,
      fertilizer?.amount_kg_per_acre || null,
      fertilizer?.type || "Primary",
      fertilizer?.note || "Recommended by ML model",
      pesticide?.name || null,
      pesticide?.amount_kg_per_acre || null,
      pesticide?.type || "Preventive",
      pesticide?.note || "AI generated pest control plan",
      JSON.stringify(plan || []),
    ];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ Error saving plan:", err);
        return res.status(500).json({ error: "Failed to insert plan" });
      }
      res.json({ success: true, message: "Plan saved successfully!" });
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Get all Plans by user
app.get("/plans", (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  const sql = "SELECT * FROM fertilizer_plans WHERE user_id = ? ORDER BY created_at DESC";

  con.query(sql, [user_id], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching plans:", err);
      return res.status(500).json({ error: "Failed to fetch plans" });
    }

    const formattedRows = rows.map((r) => ({
      ...r,
      plan_json: typeof r.plan_json === "string" ? JSON.parse(r.plan_json) : r.plan_json,
    }));

    res.json(formattedRows);
  });
});


// ✅ Delete a Plan by ID
app.delete("/plans/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  const sql = "DELETE FROM fertilizer_plans WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting plan:", err);
      return res.status(500).json({ error: "Failed to delete plan" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json({ success: true, message: "Plan deleted successfully ✅" });
  });
});
  

app.post("/complaints", (req, res) => {
  const { farmer_name, phone, email, complaint_type, description } = req.body;

  if (!farmer_name || !complaint_type || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const complaint_code = "CMP-" + Date.now() + "-" + Math.floor(Math.random() * 9999);

  const sql = `INSERT INTO complaints 
    (complaint_code, farmer_name, phone, email, complaint_type, description)
    VALUES (?, ?, ?, ?, ?, ?)`;

  con.query(sql, [complaint_code, farmer_name, phone, email, complaint_type, description], (err) => {
    if (err) {
      console.error("❌ Insert error:", err);
      return res.status(500).json({ error: "Failed to submit complaint" });
    }

    res.json({
      success: true,
      message: "✅ Complaint submitted successfully",
      complaint_code
    });
  });
});



app.get("/complaints", (req, res) => {
  const sql = "SELECT * FROM complaints ORDER BY created_at DESC";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch complaints" });
    }

    res.json(results);
  });
});




app.post("/complaints/update", (req, res) => {
  const { id, status, admin_notes } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "ID and status required" });
  }

  const sql = `
    UPDATE complaints
    SET status = ?, admin_notes = ?, updated_at = NOW()
    WHERE id = ?
  `;

  con.query(sql, [status, admin_notes || null, id], (err) => {
    if (err) {
      console.error("❌ Update error:", err);
      return res.status(500).json({ error: "Failed to update status" });
    }

    res.json({ success: true, message: "✅ Status updated" });
  });
});
  
  
  
  
app.listen(1000, function () {
    console.log("server is started on post 1000");
  });
  
