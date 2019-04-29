import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChallenges } from "../../actions";

class ChallengeList extends Component {
  componentDidMount(props) {
    this.props.fetchChallenges();
  }

  renderChallenges() {
    return this.props.challenges.reverse().map(challenge => {
      return <div key={challenge._id}>{challenge.title}</div>;
    });
  }
  render() {
    return <div>Challenges {this.renderChallenges()}</div>;
  }
}

function mapStateToProps({ challenges }) {
  return { challenges };
}

export default connect(
  mapStateToProps,
  { fetchChallenges }
)(ChallengeList);
