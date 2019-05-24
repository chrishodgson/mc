import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserChallengeList from "./challenges/UserChallengeList";
import ActivityList from "./activities/ActivityList";

class Dashboard extends Component {
    render() {
      return (
        <div>
          <p>Dashboard</p>
          <ul className="list-inline">
            <li className="list-inline-item"><Link to="/activities">Activities</Link></li>
            <li className="list-inline-item"><Link to="/challenges">Challenges</Link></li>
          </ul>
          <div className="row">
            <div className="col-8 bg-light">
              <ActivityList />
            </div>
            <div className="col-4 bg-light">
              <UserChallengeList />
            </div>
          </div>
        </div>
      );    
    }
};

export default Dashboard;