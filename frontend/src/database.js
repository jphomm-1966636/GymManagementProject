import sql from "mssql";

console.log("🔍 Debugging Environment Variables:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);


// Database Configuration from .env
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,  // ✅ This is now correctly set
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),  // ✅ Ensure port is an integer
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Function to Query SQL Server
export async function getMembershipPlans() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query("SELECT * FROM MEMBERSHIP_PLANS");
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("SQL Error:", err);
  }
}
