import React, { useEffect, useState } from "react";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/trainers")
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(error => console.error("Error fetching trainers:", error));
  }, []);

  return (
    <div>
      <h2>Trainers</h2>
      {trainers.length === 0 ? (
        <p>Loading trainers...</p>
      ) : (
        <ul>
          {trainers.map((t) => (
            <li key={t.EmployeeID}>
              <strong>{t.PersonName}</strong> - {t.RoleTitle}
              <br />
              Specialties: {t.Specialties || "None"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trainers;
