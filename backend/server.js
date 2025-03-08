require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database Configuration
const dbConfig = {
  server: process.env.DB_SERVER?.trim(),  // ✅ Ensure it's a string
  database: process.env.DB_DATABASE?.trim(),
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",  // ✅ Correct for Windows Authentication
  },
};

  
console.log("🔍 Debugging Environment Variables:");
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_DOMAIN:", process.env.DB_DOMAIN);


// Connect to SQL Server
sql.connect(dbConfig)
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch(err => console.error("❌ Database connection failed:", err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
