require('dotenv').config();
const express = require('express');
const sql = require('mssql');

// Create an instance of the Express app
const app = express();
app.use(express.json());

// Define the port your server will listen on
const PORT = parseInt(process.env.DB_PORT);

// SQL Server configuration
const dbConfig = {
    server: process.env.DB_SERVER?.trim(),
    instanceName: process.env.DB_INSTANCE?.trim(),
    database: process.env.DB_NAME?.trim(),
    port: PORT,
    user: process.env.DB_USER?.trim(),
    password: process.env.DB_PASSWORD?.trim(),
  options: {
    encrypt: false,               // Set to true if using SSL encryption
    trustServerCertificate: true // Trust the server certificate (useful for local development)
  }
};

// Middleware to parse JSON bodies in requests
app.use(express.json());

console.log(dbConfig);

async function connectToDatabase() {
    try {
      console.log('Connecting to SQL Server...');
      
      // Connect to the database using the configuration
      await sql.connect(dbConfig);
      console.log('Connected to SQL Server successfully!');

    const result = await sql.query(`SELECT * FROM GYMS`);
    console.log(result.recordset);
      
    } catch (err) {
      console.error('Error connecting to SQL Server:', err);
    } finally {
      // Close the connection after query
      sql.close();
    }
  }
//   connectToDatabase();

// API endpoint to fetch all rows from the 'gyms' table
app.get('/gyms', async (req, res) => {
    console.log('try gyms');
  try {
    // Connect to the database
    await sql.connect(dbConfig);

    // Query to get all rows from the 'gyms' table
    const result = await sql.query(`SELECT * FROM GYMS`);

    // Check if we got any results
    if (result.recordset.length === 0) {
      console.log('No gyms found in the database');
      return res.status(404).send('No gyms found in the database');
    }

    // Return the result as JSON
    res.json(result.recordset);
  } catch (err) {
    // Log and respond with the error
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data from the database');
  } finally {
    // Close the database connection after the request
    sql.close();
  }
});

// Start the server
app.listen(dbConfig.port, () => {
  console.log(`Server is running on http://localhost:${dbConfig.port}`);
});
