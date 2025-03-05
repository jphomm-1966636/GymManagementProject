import sql from "mssql";

// Database Configuration from .env
const dbConfig = {
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  server: process.env.REACT_APP_DB_SERVER,
  database: process.env.REACT_APP_DB_DATABASE,
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
