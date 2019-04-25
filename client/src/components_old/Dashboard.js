import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <p>
        <Link to="/challenges">List Challenges</Link>
      </p>
      <p>
        <Link to="/challenges/custom">
          New challenge - create your own list
        </Link>
      </p>
      <p>
        <Link to="/challenges/existing">New Challenge - existing list</Link>
      </p>
      <p>
        <Link to="/activities">List Activities</Link>
      </p>
      <p>
        <Link to="/activities/new">New Activity</Link>
      </p>
    </div>
  );
};

export default Dashboard;
