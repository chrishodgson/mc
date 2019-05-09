import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserChallenge, fetchUserChallenge, fetchAreas } from "../../actions";

class ChallengeView extends Component {
  state = { challenge: "" };

  componentDidMount() {
    const challengeId = this.props.match.params.challengeId,
          challenge = _.find(this.props.challenges, { _id: challengeId });

// console.log(challengeId, 'challengeId');
console.log(this.props.challenges, 'this.props.challenges');          
console.log(this.props.userChallenges, 'this.props.userChallenges');          

    if (!challenge) {
      this.props.history.push("/challenges"); //TODO show flash message saying challenge not found
      return;
    }
    this.setState({ challenge });

    if (!this.findUserChallenge(challengeId)) {
      this.props.fetchUserChallenge(challengeId);
    }

    if (this.props.areas.length === 0) {
      this.props.fetchAreas(); 
    }
  }

  findUserChallenge(challengeId) {
    return _.find(this.props.userChallenges, item => { 
      return item.challenge._id === challengeId; 
    });
  }

  renderMountains(mountains) {
    return mountains.map(item => {
      return <li key={item._id}>{item.name} {item.metres}m - {item.gridRef}</li>;
    });
  }

  renderClimbed(mountainsClimbed) {
    return 'climbed';
    // return <tr>
    //   <td>
    //     {/* Mountains Climbed: (total {mountainsClimbed.length || 0}) */}
    //     {/* <ul>{this.renderMountains(mountainsClimbed)}</ul> */}
    //   </td>
    // </tr>;
  }

  renderButton() {
    return <button
        className="btn btn-secondary"
        onClick={() =>
          this.props.addUserChallenge(
            { challengeId: this.state.challenge._id },
            this.props.history
          )
        }
        >
          Join Challenge
        </button>;
  }

  renderTable(userChallengeData) {
    const challenge = userChallengeData.challenge,
          userChallenge = userChallengeData.userChallenge,
          mountains = (challenge && challenge._mountains) || [],
          mountainsClimbed = (userChallenge && userChallenge._mountainsClimbed) || [];      
    // console.log(this.props.areas);

    return (
      <div>
        <table className="table condensed">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{this.state.challenge.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.state.challenge.description}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.renderClimbed(mountainsClimbed)}</td>
            </tr>
            {/* {userChallenge ? this.renderClimbed(mountainsClimbed) : ''} */}            
            <tr>
              <td>
                All Mountains: (total {mountains.length})
                <ul>{this.renderMountains(mountains)}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );  
  }

  render() {
    const userChallengeData = this.findUserChallenge(this.state.challenge._id);
    
    if (!userChallengeData) {
      return null;
    }
    
    console.log(this.props.areas, 'render');

    return (
      <div>        
        { userChallengeData.userChallenge ? 'You have joined this challenge' : this.renderButton() }
        { this.renderTable(userChallengeData) }  
      </div>
    );
  }
}

export default connect(
  ({ challenges, userChallenges, areas }) => ({ challenges, userChallenges, areas }),
  { addUserChallenge, fetchUserChallenge, fetchAreas }
)(withRouter(ChallengeView));
