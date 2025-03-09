import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/classes") // ✅ Updated API endpoint
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Gym Classes</Typography>
      
      <Button variant="contained" component={Link} to="/classes/available" style={{ marginBottom: "15px" }}>
        View Available Classes
      </Button>

      {classes.map((cls) => (
        <Card key={cls.ClassID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{cls.ClassName}</Typography>
            <Typography variant="h6">Date: {cls.ClassDate.split("T")[0]}</Typography>
            <Typography variant="h6">Time: {cls.ClassTime.substring(0, 8)}</Typography>
            <Typography variant="h6">Capacity: {cls.Capacity}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Classes;
