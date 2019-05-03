import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { joinChallenge } from "../../actions";

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

  renderMountains(mountains) {
    //todo order mountains by order field ?
    return mountains.map(item => {
      return (
        <li key={item._mountain}>
          {item.name} {item.metres}m - {item.gridRef}
        </li>
      );
    });
  }

  render() {
    const challenge = this.state.challenge;

    if (!challenge) {
      return 'challenge not found';
    }

    return (
      <div>
        <p>Challenge Details</p>
        <button
          className="btn"
          onClick={() =>
            this.props.joinChallenge(
              { id: challenge._id },
              this.props.history
            )
          }
        >
          Save
        </button>
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
              <td>
                Mountains: (total {challenge.mountainCount})
              <ul>{this.renderMountains(challenge._mountains)}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ challenges }) => ({ challenges }),
  { joinChallenge }
)(withRouter(ChallengeView));
