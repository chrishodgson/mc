import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserChallenges } from "../../actions";

class ChallengeSummaryList extends Component {
  componentDidMount() {
    if (this.props.userChallenges.length === 0) {
      this.props.fetchUserChallenges(); 
    }  
  }

  renderUserChallenges() {    
    return this.props.userChallenges.reverse().map(userChallenge => {
      return (
        <p key={userChallenge._id}>
          <Link to={`/challenges/view/${userChallenge._id}`}>
            {userChallenge.name}
          </Link>
          <br/>climbed: {userChallenge.climbedCount}
          <br/>remaining: {userChallenge.remainingCount}
          <br/>total: {userChallenge.mountainCount}
        </p>
      );
    });
  }
  
  render() {
    return (
      <div className="challengeSummaryList">
        {this.props.userChallenges.length === 0 ? "No Challenges setup" : this.renderUserChallenges()}
      </div>
    );
  }
}

export default connect(
  ({ userChallenges }) => ({ userChallenges }),
  { fetchUserChallenges }
  )(ChallengeSummaryList);
