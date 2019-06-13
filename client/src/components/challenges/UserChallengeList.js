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
        <div key={userChallenge._id} className="card">
          {/* <div className="card-header">Challenges</div> */}
          <div className="card-body">
            <h6 class="card-title">
              <Link to={`/challenges/view/${userChallenge._id}`}>
                {userChallenge.title}
              </Link>
            </h6>
            <ul class="list-group list-group-flush list-group-condensed">
              <li class="list-group-item">Climbed: {userChallenge.climbedCount}</li>
              <li class="list-group-item">Remaining: {userChallenge.remainingCount}</li>
              <li class="list-group-item">Total: {userChallenge.mountainCount}</li>
              <li class="list-group-item">Completed: {percentageCompleteSelector(userChallenge)}%</li>
            </ul>
          </div>
        </div>
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
