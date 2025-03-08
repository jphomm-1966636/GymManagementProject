import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/classes") // Backend API for classes
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Gym Classes</Typography>
      {classes.map((cls) => (
        <Card key={cls.ClassID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{cls.ClassDetails}</Typography>
            <Typography variant="h6">Date: {cls.ClassDate}</Typography>
            <Typography variant="h6">Time: {cls.ClassTime}</Typography>
            <Typography variant="h6">Capacity: {cls.ClassCapacity}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Classes;
