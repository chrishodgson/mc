import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserChallenge, fetchUserChallenge } from "../../actions";

class ChallengeView extends Component {
  state = { challenge: "", userChallenge: "" };

  componentDidMount() {
    const challengeId = this.props.match.params.challengeId,
          challenge = _.find(this.props.challenges, { _id: challengeId });

    if (!challenge) {
      this.props.history.push("/challenges"); //show flash message?
      return;
    }

    const userChallenge = _.find(this.props.userChallenges, { _challenge: challengeId });
    if (!userChallenge) {
      this.props.fetchUserChallenge(challengeId);
    }
    this.setState({ challenge });// todo replace with result from fetchUserChallenge
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
    const userChallenge = _.find(this.props.userChallenges, { _challenge: this.state.challenge._id });
    
    console.log(userChallenge, 'userChallenge');

    return (
      <div>
        <p>Challenge Details</p>
        
        <p>{!userChallenge ? 'User challenge not found' : 'User challenge found'}</p>

        <button
          className="btn btn-default"
          onClick={() =>
            this.props.addUserChallenge(
              { challengeId: challenge._id },
              this.props.history
            )
          }
        >
          Join Challenge
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
              {/* <ul>{this.renderMountains(challenge._mountains)}</ul> */}
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
