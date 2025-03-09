import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

function AvailableClasses() {
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/classes/available") // ✅ Updated API endpoint
      .then((res) => res.json())
      .then((data) => setAvailableClasses(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Available Gym Classes</Typography>
      
      <Button variant="contained" component={Link} to="/classes" style={{ marginBottom: "15px" }}>
        Back to All Classes
      </Button>

      {availableClasses.length === 0 ? (
        <Typography variant="h6">No available classes at the moment.</Typography>
      ) : (
        availableClasses.map((cls) => (
          <Card key={cls.ClassID} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h5">{cls.ClassName}</Typography>
              <Typography variant="h6">Date: {cls.ClassDate.split("T")[0]}</Typography>
              <Typography variant="h6">Time: {cls.ClassTime.substring(0, 8)}</Typography>
              <Typography variant="h6">Capacity: {cls.Capacity}</Typography>
              <Typography variant="h6">Open Slots: {cls.OpenSlots}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default AvailableClasses;
