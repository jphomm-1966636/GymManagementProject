require('dotenv').config();
const sql = require("mssql");
const express = require('express');
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.json());

// Database configuration
// const { sql, poolPromise } = require("./database"); // ✅ Import only from database.js

// Database Configuration
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

  // get gym details
app.get('/gyms2', async (req, res) => {
    console.log('calling gyms');

    try {
        console.log('calling gyms');
      // Connect to the database
      await sql.connect(dbConfig);
  
      // Query to get all rows from the 'gyms' table
      const result = await sql.query`SELECT * FROM GYMS`;
  
      // Return the result as JSON
      res.json(result.recordset);
    } catch (err) {
      // Handle errors (e.g., database connection issues)
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data from the database');
    } finally {
      // Close the database connection after the request
      sql.close();
    }
  });


// connect to database
// async function connectDB() {
//     try {
//         await sql.connect(dbConfig);
//         console.log('Connected to SQL Server');
//     } catch (err) {
//         console.error('Database connection failed:', err);
//     }
// }
// connectDB();

// Establish a connection to the database
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
  
//   Run the connection function
//   connectToDatabase();

// connect to database
// const poolPromise = new sql.ConnectionPool(dbConfig)
//     .connect()
//     .then(pool => {
//         console.log('Connected to Microsoft SQL Server');
//         return pool;
//     })
//     .catch(err => console.error('Database connection failed:', err));


// // verify db connection
// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to MySQL database.');
//     }
// });

// get gym details
app.get('/gyms/:gymId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { gymId } = req.params;
        const result = await pool.request()
            .input('GymID', sql.Int, gymId)
            .query(`SELECT GymAddress, OpeningTime, ClosingTime FROM GYMS WHERE GymID = @GymID`);
        res.json(result.recordset);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).send(err.message);
    }
});

// get payroll details
app.get('/payroll', async (req, res) => {
    try {
        console.log('payroll');
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                E.EmployeeID, E.RolesID, GJR.RoleTitle, GJR.PayRate, P.HoursWorked,
                (P.HoursWorked * GJR.PayRate) AS TotalPay, P.PTOAccrued, P.PTOLeftover
            FROM PAYROLLS P
            JOIN EMPLOYEES E ON P.EmployeeID = E.EmployeeID
            JOIN GYM_JOB_ROLES GJR ON E.RolesID = GJR.RolesID
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get invoice details
app.get('/invoices', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                P.PersonID, P.PersonName, PP.PhoneNumber, I.InvoiceID, 
                I.MembershipPlans, MP.AssociatedCost AS Amount
            FROM INVOICES I
            JOIN PERSONS P ON I.CustomerID = P.PersonID
            JOIN MEMBERSHIP_PLANS MP ON I.MembershipPlans = MP.TypeOfMembership
            LEFT JOIN PERSONPHONENUMBERS PP ON P.PersonID = PP.PersonID
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get busiest gym hours
app.get('/checkins', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                DATEPART(HOUR, TimeScanIn) AS CheckinHour, COUNT(*) AS TotalCheckins
            FROM SCAN_IN_LOGS
            GROUP BY DATEPART(HOUR, TimeScanIn)
            ORDER BY TotalCheckins DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get employees clock-in/out status
app.get('/shifts', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                S.EmployeeID, S.ShiftDate, S.ScheduledStartTime, S.ClockInTime,
                S.ScheduledEndTime, S.ClockOutTime,
                CASE 
                    WHEN S.ClockInTime > S.ScheduledStartTime THEN 'Late Clock In'
                    WHEN S.ClockOutTime > S.ScheduledEndTime THEN 'Late Clock Out'
                    ELSE 'On Time'
                END AS Status
            FROM SHIFTS S
            WHERE S.ClockInTime > S.ScheduledStartTime 
                OR S.ClockOutTime > S.ScheduledEndTime
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get trainer appointments
app.get('/trainers/appointments', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                E.EmployeeID, P_Trainer.PersonName AS TrainerName, A.PersonID AS CustomerID, 
                P_Customer.PersonName AS CustomerName, A.ApptTime, A.ApptType, A.WorkoutDetails
            FROM EMPLOYEES_CUSTOMER_APPTS A
            JOIN EMPLOYEES E ON A.TrainerID = E.EmployeeID
            JOIN PERSONS P_Trainer ON E.EmployeeID = P_Trainer.PersonID
            JOIN PERSONS P_Customer ON A.PersonID = P_Customer.PersonID
            ORDER BY A.ApptTime
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get available/open classes
app.get('/classes/available', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                C.ClassID, CAST(C.Details AS VARCHAR(MAX)) AS ClassName, 
                C.ClassDate, C.ClassTime, C.Capacity, 
                (C.Capacity - COALESCE(SUM(R.TotalReservations), 0)) AS OpenSlots
            FROM CLASSES C
            LEFT JOIN CLASS_RESERVATIONS R ON C.ClassID = R.ClassID
            GROUP BY C.ClassID, CAST(C.Details AS VARCHAR(MAX)), C.ClassDate, C.ClassTime, C.Capacity
            HAVING (C.Capacity - COALESCE(SUM(R.TotalReservations), 0)) > 0
            ORDER BY C.ClassDate, C.ClassTime
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// update gym check-in count
app.put('/gyms/checkin/:gymId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { gymId } = req.params;
        await pool.request()
            .input('GymID', sql.Int, gymId)
            .query(`UPDATE GYMS SET DailyCheckins = DailyCheckins + 1 WHERE GymID = @GymID`);
        res.json({ message: 'Check-in updated successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start server
const PORT = process.env.DB_PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
