require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    // authentication: {
    //   type: "ntlm",  // Enables Windows Authentication
    // },
  };
  

// Connect to SQL Server
// sql.connect(dbConfig)
//   .then(() => console.log("✅ Connected to SQL Server"))
//   .catch(err => console.error("❌ Database connection failed:", err));

async function connectDB() {
  try {
      await sql.connect(dbconfig);
      console.log("✅ Database connected successfully");
  } catch (err) {
      console.error("❌ Database connection failed:", err);
  }
}

connectDB();

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));