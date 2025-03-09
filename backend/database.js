require("dotenv").config();
const sql = require("mssql");

// Database configuration for SQL authentication
const dbConfig = {
  server: process.env.DB_SERVER?.trim(),
  database: process.env.DB_DATABASE?.trim(),
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER?.trim(),  // SQL authentication username
  password: process.env.DB_PASSWORD?.trim(),  // SQL authentication password
  options: {
    encrypt: false, 
    trustServerCertificate: true,  // trust self-signed certificates
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

module.exports = { sql, poolPromise, dbConfig }; // ensure dbConfig is exported
