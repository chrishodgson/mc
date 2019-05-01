import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ChallengeView extends Component {
  state = { challenge: "" };

  componentDidMount() {
    const challenge = _.find(this.props.challenges, {
      _id: this.props.match.params.challengeId
    });
    if (!challenge) {
      this.props.history.push("/challenges");
    }
    this.setState({ challenge });
  }

  render() {
    const challenge = this.state.challenge;

    if (!challenge) {
      return 'challenge not found';
    }

    return (
      <div>
        <p>Challenge Details</p>
        <table className="table condensed">
          <tbody>
            <tr>
              <th>Title</th>
              <td>{challenge.title}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{challenge.description}</td>
            </tr>
            <tr>
              <th>Mountain Count</th>
              <td>{challenge.mountainCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(({ challenges }) => ({ challenges }))(
  withRouter(ChallengeView)
);
