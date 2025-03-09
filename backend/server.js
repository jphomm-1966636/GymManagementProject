require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require("./database"); // ✅ Import only from database.js

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Verify Database Connection on Startup
poolPromise.then(() => {
    console.log("✅ Successfully connected to SQL Server!");
}).catch(err => {
    console.error("❌ Database connection failed:", err);
});

// ✅ Get Gym Details
app.get('/gyms/:gymId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const { gymId } = req.params;
        const result = await pool.request()
            .input('GymID', sql.Int, gymId)
            .query(`SELECT GymAddress, OpeningTime, ClosingTime FROM GYMS WHERE GymID = @GymID`);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ Database query failed:', err);
        res.status(500).send(err.message);
    }
});

// ✅ Get Payroll Details
app.get('/payroll', async (req, res) => {
    try {
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

// ✅ Get Invoice Details
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

// ✅ Get Busiest Gym Hours
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

// ✅ Get Employees Clock-In/Out Status
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

// ✅ Get Available/Open Classes
app.get('/classes', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                ClassID, 
                Details AS ClassName, 
                ClassDate, 
                ClassTime, 
                Capacity
            FROM CLASSES
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error("Database query failed:", err);
        res.status(500).send(err.message);
    }
});


// ✅ Update Gym Check-In Count
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

// ✅ Start Server
const PORT = process.env.PORT || 5001;  // ✅ Changed DB_PORT to PORT for Express server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
