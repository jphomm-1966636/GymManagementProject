import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users") // Backend API for users
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>Users</Typography>
      {users.map((user) => (
        <Card key={user.PersonID} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5">{user.PersonName}</Typography>
            <Typography variant="h6">Email: {user.Email}</Typography>
            <Typography variant="h6">Phone: {user.PhoneNumber}</Typography>
            <Typography variant="h6">Membership: {user.TypeOfMembership}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Users;
