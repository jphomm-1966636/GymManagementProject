import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

function Classes() {
    const [classes, setClasses] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false); // ✅ Toggles between all classes & available classes

    // ✅ Re-fetch data when `showAvailable` changes
    useEffect(() => {
        const endpoint = showAvailable ? "http://localhost:5000/classes" : "http://localhost:5000/classes/available";
        console.log("Fetching from:", endpoint); // 🔎 Debugging: Check if API switches

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ API Response:", data); // 🔎 Debugging: Ensure data is received
                setClasses(data);
            })
            .catch((err) => console.error("❌ API Error:", err));
    }, [showAvailable]); // ✅ Re-fetches when `showAvailable` changes

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const formatTime = (timeString) => {
      if (!timeString || timeString === "NULL") return "No Time Available"; 
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(hours, minutes, 0);
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };
  

    return (
        <Container>
            <Typography variant="h4" style={{ margin: "20px 0" }}>Gym Classes</Typography>

            {/* ✅ Toggle Button to switch endpoints */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setShowAvailable(!showAvailable)} 
                style={{ marginBottom: "20px" }}>
                {showAvailable ? "Show All Classes" : "Show Available Classes"}
            </Button>

            {classes.length === 0 ? (
                <Typography variant="h6">No classes found.</Typography>
            ) : (
                classes.map((cls) => (
                    <Card key={cls.ClassID} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h5">{cls.ClassName}</Typography>
                            <Typography variant="h6">Date: {formatDate(cls.ClassDate)}</Typography>
                            <Typography variant="h6">Time: {formatTime(cls.ClassTime)}</Typography>
                            <Typography variant="h6">Capacity: {cls.Capacity}</Typography>
                            {showAvailable && <Typography variant="h6">Open Slots: {cls.OpenSlots}</Typography>}
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
}

export default Classes;
