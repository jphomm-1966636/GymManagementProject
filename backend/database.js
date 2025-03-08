require("dotenv").config();
const sql = require("mssql");

// Database Configuration
const dbConfig = {
  server: process.env.DB_SERVER?.trim(),
  database: process.env.DB_DATABASE?.trim(),
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default", // Windows Authentication
  },
};

// Create a database connection pool
const poolPromise = sql.connect(dbConfig)
  .then(pool => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

module.exports = { sql, poolPromise, dbConfig }; // ✅ Ensure dbConfig is exported
