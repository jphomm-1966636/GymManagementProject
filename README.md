# GymManagementProject
🛠 Gym Management Project - TCSS 445
By: Jay Phommakhot & Jennifer Huynh
This project was built for TCSS 445 to demonstrate database management skills.

⚠️ Note: This is not a secure implementation for real-world applications, but it effectively showcases how to interact with a database using SQL Server.

📌 Features
✅ Frontend built with React
✅ Connects directly to Microsoft SQL Server (⚠️ Not recommended for real-world apps)
✅ Demonstrates SQL queries, database connections, and React integration

🛠 Prerequisites
Before running this project, make sure you have installed:

Node.js (npm package manager)
Microsoft SQL Server (SQL Management Studio optional)
VS Code or any text editor
🚀 How to Run This Project

1️⃣ Install Dependencies In Terminal
cd frontend
npm install

2️⃣ Set Up Your Database
Open Microsoft SQL Server Management Studio (SSMS)
Import the provided SQL file:
sql
    USE GymManagement;
Ensure SQL Server is running and listening on port 1433

3️⃣ Set Up Environment Variables
Create a .env file inside /frontend/ and add your database credentials:

*Replace with your credentials*
    REACT_APP_DB_USER=sa
    REACT_APP_DB_PASSWORD=YourPassword
    REACT_APP_DB_SERVER=YourServerName
    REACT_APP_DB_DATABASE=GymManagement
    REACT_APP_DB_PORT=1433

4️⃣ Start the React Frontend
in the terminal use:
    npm start
Then, open your browser and go to:
http://localhost:3000