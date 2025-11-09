const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sai@1234",
    database: "agresence_db",
  });
  


con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = con;