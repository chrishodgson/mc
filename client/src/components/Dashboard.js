import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <p>
        <Link to="/activities">List Activities</Link>
      </p>
      <p>
        <Link to="/challenges">List Challenges</Link>
      </p>
    </div>
  );
};

export default Dashboard;
