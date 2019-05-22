import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <li className="list-inline-item"><Link to="/challenges">Challenges</Link></li>
    </div>
  );
};

export default Home;
