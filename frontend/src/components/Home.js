import React from "react";
import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        Welcome to the Gym Management System
      </Typography>
      <Typography variant="body1">
        Manage memberships, invoices, trainers, classes, and more!
      </Typography>
    </Container>
  );
}

export default Home;
