import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addUserChallenge, fetchChallenges, fetchUserChallenges } from "../../actions";
import { findUserChallengeByChallengeIdSelector } from '../../selectors'

class ChallengeList extends Component {
  componentDidMount() {
    if (this.props.challenges.length === 0) {
      this.props.fetchChallenges();
    }  
    if (this.props.userChallenges.length === 0) {
      this.props.fetchUserChallenges(); // todo reload on add, then refresh only if empty 
    }
  }

  renderButton(challenge) {
    return <button
        className="btn btn-secondary"
        onClick={() =>
          this.props.addUserChallenge(
            { challengeId: challenge._id },
            this.props.history
          )
        }
        >
          Join Challenge
        </button>;
  }

  renderLink(userChallenge) {
    return <Link className="btn btn-light btn-sm btn-nowrap border" to={`/challenges/view/${userChallenge._id}`}>View Details</Link>
  }

  renderChallenges() {  
    return this.props.challenges.reverse().map(challenge => {
      const userChallenge = findUserChallengeByChallengeIdSelector(challenge._id, this.props.userChallenges);

      return (
        <tr key={challenge._id}>
          <td>{challenge.name}</td>
          <td>{challenge.description}</td>
          <td>{challenge.highestInMetres}</td>
          <td>{challenge.lowestInMetres}</td>
          <td>{challenge.mountainCount}</td>
          <td>{userChallenge ? this.renderLink(userChallenge) : this.renderButton(challenge)}</td>
        </tr>
      );
    });
  }
  
  render() {
    if (this.props.challenges.length === 0) {
      return 'No challenges setup'
    }
    return (
      <div>
        <h5>Challenges</h5>
        <table className="table condensed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Highest (m)</th>
              <th>Lowest (m)</th>
              <th>Total Mountains</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.renderChallenges()}
          </tbody>          
        </table>
      </div>
    );
  }
}

export default connect(
  ({ challenges, userChallenges }) => ({ challenges, userChallenges }),
  { addUserChallenge, fetchChallenges, fetchUserChallenges }
)(ChallengeList);
