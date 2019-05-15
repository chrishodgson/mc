import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChallenges, fetchUserChallenges } from "../../actions";

class ChallengeList extends Component {
  componentDidMount() {
    this.props.fetchUserChallenges(); // refetch each time incase there are changes ?
  }

  renderChallenges() {    
    return this.props.challenges.reverse().map(challenge => {
      return (
        <li key={challenge._id}>
          <Link to={`/challenges/view/${challenge._id}`}>
            {challenge.name}
          </Link>
        </li>
      );
    });
  }
  render() {
    if (this.props.challenges.length === 0) {
      return "The Challenges are not available";
    }
    return (
      <div>
        <p>Challenge List</p>
        <ul>{this.renderChallenges()}</ul>
      </div>
    );
  }
}

export default connect(
  ({ challenges }) => ({ challenges }),
  { fetchChallenges, fetchUserChallenges}
)(ChallengeList);
