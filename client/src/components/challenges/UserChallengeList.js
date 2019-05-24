import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserChallenges } from "../../actions";
import { percentageCompleteSelector } from '../../selectors'

class UserChallengeList extends Component {
  componentDidMount() {
      this.props.fetchUserChallenges(); // todo reload on add, then load only if empty 
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
          <br/>{percentageCompleteSelector(userChallenge)}% complete
        </p>
      );
    });
  }
  
  render() {
    if (this.props.userChallenges.length === 0) {
      return "You have not joined any Challenges yet.";
    }
    return (
      <div className="challengeSummaryList">
        {this.renderUserChallenges()}
      </div>
    );
  }
}

export default connect(
  ({ userChallenges }) => ({ userChallenges }),
  { fetchUserChallenges }
  )(UserChallengeList);
