import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/trainers") // Backend API for trainers
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Trainers</Typography>
      {trainers.map((trainer) => (
        <Card key={trainer.EmployeeID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{trainer.Position}</Typography>
            <Typography variant="h6">Hire Date: {trainer.HireDate}</Typography>
            <Typography variant="h6">Specialties: {trainer.Specialties}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Trainers;
