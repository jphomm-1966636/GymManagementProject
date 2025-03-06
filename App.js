import React, { useEffect, useState } from "react";
import { getMembershipPlans } from "./database";

function App() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getMembershipPlans().then((data) => setPlans(data));
  }, []);

  return (
    <div>
      <h1>Gym Membership Plans</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan.MembershipID}>
            {plan.TypeOfMembership} - ${plan.AssociatedCost}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
