require("dotenv").config();
const sql = require("mssql");

// Database Configuration for SQL Authentication
const dbConfig = {
  server: process.env.DB_SERVER?.trim(),
  database: process.env.DB_DATABASE?.trim(),
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER?.trim(),  // ✅ SQL Authentication Username
  password: process.env.DB_PASSWORD?.trim(),  // ✅ SQL Authentication Password
  options: {
    encrypt: false,  // ⚠ Set to "true" if using Azure
    trustServerCertificate: true,  // ✅ Trust self-signed certificates
  },
};

// Create a database connection pool
const poolPromise = sql.connect(dbConfig)
  .then(pool => {
    console.log("✅ Connected to SQL Server using SQL Authentication");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

module.exports = { sql, poolPromise, dbConfig }; // ✅ Ensure dbConfig is exported
