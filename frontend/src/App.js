import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Home from "./components/Home";
import Membership from "./components/Memberships";
import Classes from "./components/Classes";
import Invoices from "./components/Invoices";
import Trainers from "./components/Trainers";
import Users from "./components/Users";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/membership">Membership</Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button color="inherit" component={Link} to="/invoices">Invoices</Button>
          <Button color="inherit" component={Link} to="/classes">Classes</Button>
          <Button color="inherit" component={Link} to="/trainers">Trainers</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h3" align="center" style={{ margin: "20px 0" }}>
          Gym Management System
        </Typography>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/users" element={<Users />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/trainers" element={<Trainers />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
