import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChallenges, fetchUserChallenges, fetchAreas } from "../actions";
import ChallengeSummaryList from "./challenges/ChallengeSummaryList";
import ActivityList from "./activities/ActivityList";

class Dashboard extends Component {
    componentDidMount() {      
      if (this.props.challenges.length === 0) {
        this.props.fetchChallenges();
      }  
      if (this.props.userChallenges.length === 0) {
        this.props.fetchUserChallenges(); 
      }
      if (this.props.areas.length === 0) {
        this.props.fetchAreas(); //we dont need this here but lets get them anyway as this should be the entry point after login
      }  
    }

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
              <ChallengeSummaryList />
            </div>
          </div>
        </div>
      );    
    }
};

export default connect(
  ({ challenges, userChallenges, areas }) => ({ challenges, userChallenges, areas }),
  { fetchChallenges, fetchUserChallenges, fetchAreas }
) (Dashboard);