import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Membership() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/memberships")  // Fetch data from backend API
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        Membership Plans
      </Typography>
      {plans.map((plan) => (
        <Card key={plan.MembershipID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{plan.TypeOfMembership}</Typography>
            <Typography variant="h6">${plan.AssociatedCost} per month</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Membership;
