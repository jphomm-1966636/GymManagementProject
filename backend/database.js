require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  server: process.env.DB_SERVER?.trim(),
  instanceName: process.env.DB_INSTANCE?.trim(),
  database: process.env.DB_NAME?.trim(),
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default", // Windows Authentication
  },
};

// Create a database connection pool
const poolPromise = "";
//  sql.connect(dbConfig)
//   .then(pool => {
//     console.log("✅ Connected to SQL Server");
//     return pool;
//   })
//   .catch(err => {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1);
//   });

module.exports = { sql, poolPromise, dbConfig }; // ✅ Ensure dbConfig is exported
