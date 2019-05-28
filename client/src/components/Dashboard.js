import React, { Component } from "react";
import UserChallengeList from "./challenges/UserChallengeList";
import ActivityList from "./activities/ActivityList";

class Dashboard extends Component {
    render() {
      return (
        <div>
          <div className="row">
            <div className="col-8">
              <ActivityList />
            </div>
            <div className="col-4">
              <UserChallengeList />
            </div>
          </div>
        </div>
      );    
    }
};

export default Dashboard;