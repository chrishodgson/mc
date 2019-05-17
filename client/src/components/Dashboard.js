import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChallenges, fetchUserChallenges, fetchAreas } from "../actions";

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
          <p>
            <Link to="/activities">List Activities</Link>
          </p>
          <p>
            <Link to="/challenges">List Challenges</Link>
          </p>
        </div>
      );    
    }
};

export default connect(
  ({ challenges, userChallenges, areas }) => ({ challenges, userChallenges, areas }),
  { fetchChallenges, fetchUserChallenges, fetchAreas }
) (Dashboard);