import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChallenges } from "../../actions";

class ChallengeList extends Component {
  componentDidMount() {
    this.props.fetchChallenges();
  }

  renderChallenges() {
    return this.props.challenges.reverse().map(challenge => {
      return <div key={challenge._id}>{challenge.title}</div>;
    });
  }
  render() {
    if (this.props.challenges.length === 0) {
      return 'No challenges found';
    }

    return <div>Challenges {this.renderChallenges()}</div>;
  }
}

export default connect(
  ({ challenges }) => ({ challenges }),
  { fetchChallenges }
)(ChallengeList);
