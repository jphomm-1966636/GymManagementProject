import React, { useEffect, useState } from "react";

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/membership") // ✅ Correct API route
      .then(response => response.json()) 
      .then(data => setMemberships(data))
      .catch(error => console.error("Error fetching memberships:", error));
  }, []);

  return (
    <div>
      <h2>Membership Plans</h2>
      {memberships.length === 0 ? (
        <p>Loading memberships...</p>
      ) : (
        <ul>
          {memberships.map((m) => (
            <li key={m.MembershipID}>
              {m.TypeOfMembership} - ${m.AssociatedCost}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Memberships;
