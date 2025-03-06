import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h2">Welcome to Our Gym!</Typography>
      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Get in shape with the best trainers and equipment!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/membership">
        View Membership Plans
      </Button>
    </Container>
  );
}

export default Home;
