NOTE: We encountered significant challenges when trying to establish a connection to the database server. Both of us spent several days troubleshooting on our own, 
experimenting with different configurations and settings before finally making some progress. The process was not straightforward, as the instructions for setting 
up the connection did not work universally — we each had to take different approaches to get it running.

Due to these persistent issues, we had to continue working on both the frontend and backend without being able to fully test how they interacted with the database. 
This meant developing parts of the application based on assumptions rather than direct validation. Despite these setbacks, we dedicated a significant amount of time 
and effort to overcoming the barriers, ensuring that we made as much progress as possible within the given timeframe. While we were eventually able to establish a 
connection, the complexity of the process limited the extent to which we could integrate and refine our work.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

- Node.js (npm package manager)
- Microsoft SQL Server (SQL Management Studio optional)
- VS Code or any text editor


🚀 How to Run This Project
1️⃣ Install Dependencies In Terminal

    - cd frontend
    - npm init
    - npm install

2️⃣ Set Up Your Database
    Open Microsoft SQL Server Management Studio (SSMS)
    Import the provided SQL file:
    sql
        USE GymManagement;
    Ensure SQL Server is running and listening on port 1433

    Alternatively, you may (need to) do this:
    1. Install SQL Server Extension
        - Open VS Code.
        - Go to Extensions (Ctrl + Shift + X).
        - Search for "SQL Server (mssql)" and install it.
    2. Connect to SQL Server
        - Open VS Code and press Ctrl + Shift + P to open the Command Palette.
        - Type "MS SQL: Connect" and select it.
        - Enter the server name (e.g., localhost for local or your remote SQL Server address).
            Choose authentication type (SQL Login or Windows).
            Enter your username and password if needed.
            Select the database you want to use.
    Note: when you install the extension, it may give you additional steps to set up the database. Follow those steps.
   
3️⃣ Set Up Environment Variables
    Create a .env file inside /backend/ and add your database credentials:
    
    *Replace with your credentials*
        REACT_APP_DB_USER=sa
        REACT_APP_DB_PASSWORD=YourPassword
        REACT_APP_DB_SERVER=YourServerName
        REACT_APP_DB_DATABASE=GymManagement
        REACT_APP_DB_PORT=1433

4️⃣ Start the React Frontend & Backend

    In the terminal, use (/frontend/):
        - npm start
    Then, open your browser and go to:
        - http://localhost:3000

    For the backend, in the terminal, use (/backend/):
        - nodemon server.js
