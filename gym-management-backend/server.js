require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// SQL Server Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Set to true if using Azure
        trustServerCertificate: true
    }
};

// Connect to Database
sql.connect(dbConfig)
    .then(() => console.log("✅ Connected to SQL Server"))
    .catch(err => console.error("❌ Database connection failed:", err));

app.get('/', (req, res) => {
    res.send('Gym Management API is running 🚀');
});

// Start the server
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
