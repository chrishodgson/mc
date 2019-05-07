import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserChallenge, fetchUserChallenge } from "../../actions";

class ChallengeView extends Component {
  state = { challenge: "" };

  componentDidMount() {
    const challengeId = this.props.match.params.challengeId,
          challenge = _.find(this.props.challenges, { _id: challengeId });

    if (!challenge) {
      this.props.history.push("/challenges"); //show flash message?
      return;
    }

    if (!this.findUserChallenge(challengeId)) {
      this.props.fetchUserChallenge(challengeId);
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

  findUserChallenge(challengeId) {
    return _.find(this.props.userChallenges, item => { 
      return item.challenge._id === challengeId; 
    });
  }

  render() {
    const challengeId = this.state.challenge._id;
    const userChallengeData = this.findUserChallenge(challengeId);

    if (!userChallengeData) {
      return null;
    }

    return (
      <div>
        <p>Challenge Details</p>
        
        { userChallengeData.userChallenge ? 'You have joined this challenge.' : 
        <button
          className="btn btn-secondary"
          onClick={() =>
            this.props.addUserChallenge(
              { challengeId },
              this.props.history
            )
          }
        >
          Join Challenge
        </button> }

        <table className="table condensed">
          <tbody>
            <tr>
              <th>Title</th>
              <td>{userChallengeData.challenge.title}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{userChallengeData.challenge.description}</td>
            </tr>
            <tr>
              <td>
                Climbed: (total {userChallengeData.userChallenge && userChallengeData.userChallenge.climbedCount})
                <ul>{userChallengeData.userChallenge && userChallengeData.userChallenge._mountainsClimbed ? 
                  this.renderMountains(userChallengeData.userChallenge._mountainsClimbed) : ''}
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                All: (total {userChallengeData.challenge._mountains.length})
                <ul>{this.renderMountains(userChallengeData.challenge._mountains)}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ challenges, userChallenges }) => ({ challenges, userChallenges }),
  { addUserChallenge, fetchUserChallenge }
)(withRouter(ChallengeView));
