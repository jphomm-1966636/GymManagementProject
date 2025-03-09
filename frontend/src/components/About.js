import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Card, CardContent } from "@mui/material";

function About() {
  const [gymId, setGymId] = useState(""); // Store gym ID input
  const [gymData, setGymData] = useState(null); // Store fetched gym details
  const [error, setError] = useState(null);

  // Fetch gym details
  const fetchGymDetails = async () => {
    if (!gymId) return;
    
    try {
      const response = await fetch(`http://localhost:5001/gyms/${gymId}`);
      if (!response.ok) throw new Error("Failed to fetch gym details");

      const data = await response.json();
      setGymData(data[0]); // Assuming response is an array
      setError(null);
    } catch (err) {
      setError(err.message);
      setGymData(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Gym Information
      </Typography>

      {/* Input for Gym ID */}
      <TextField
        label="Enter Gym ID"
        variant="outlined"
        fullWidth
        value={gymId}
        onChange={(e) => setGymId(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Button variant="contained" color="primary" onClick={fetchGymDetails}>
        Get Gym Details
      </Button>

      {/* Display gym details */}
      {error && <Typography color="error">{error}</Typography>}

      {gymData && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6">Gym Address: {gymData.GymAddress}</Typography>
            <Typography variant="h6">Opening Time: {gymData.OpeningTime}</Typography>
            <Typography variant="h6">Closing Time: {gymData.ClosingTime}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default About;
