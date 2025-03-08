import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Home from "./components/Home";
import Membership from "./components/Membership";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/membership">Membership Plans</Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container>
        <Typography variant="h3" align="center" style={{ margin: "20px 0" }}>
          Gym Management System
        </Typography>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
