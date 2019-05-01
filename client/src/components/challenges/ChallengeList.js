import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyChallenges } from "../../actions";

class ChallengeList extends Component {
  componentDidMount() {
    this.props.fetchMyChallenges();
  }

  renderChallenges() {
    return this.props.challenges.reverse().map(challenge => {
      return (
        <li key={challenge._id}>
          <Link to={`/challenges/view/${challenge._id}`}>
            {challenge.title}
          </Link>
        </li>
      );
    });
  }
  render() {
    if (this.props.challenges.length === 0) {
      return "No challenges found";
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
  { fetchMyChallenges }
)(ChallengeList);
