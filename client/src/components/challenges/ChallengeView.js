import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addUserChallenge, fetchMountainList, fetchAreas } from "../../actions";
import { findUserChallengeSelector, groupMountainsByAreaSelector } from '../../selectors'

class ChallengeView extends Component {
  state = { challenge: "" }; //do we need this ?

  componentDidMount() {    
    const challengeId = this.props.match.params.challengeId,
          challenge = _.find(this.props.challenges, { _id: challengeId });

    if (!challenge) {
      //TODO show flash message saying challenge not found
      this.props.history.push("/challenges"); 
      return;
    }
    this.setState({ challenge });

    if (!_.find(this.props.mountainLists, { _id: challenge._mountainListId })) {
      this.props.fetchMountainList(challenge._mountainListId); 
    }
  }

  renderMountainsByArea(mountainsByArea) {
    if (mountainsByArea.length === 0) {
      return [];
    }
    return mountainsByArea.map(areaItem => {      
      const mountains = areaItem.mountains.map(mountainItem => {
        return <li key={mountainItem._id}>{mountainItem.name} {mountainItem.metres}m - {mountainItem.gridRef}</li>;
      });
      return <li key={areaItem._id}>{areaItem.name}<ul>{mountains}</ul></li>;
    });
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

  renderLink(userChallenge) {
    return <Link to={`/activities/add/${userChallenge._id}`}>Add New Activity</Link>
  }

  renderTable(mountainList, userChallenge) {
    //todo add selector to show which mountains have been climbed using 
    // const mountainsFlagged = this.flagMountainsClimbed(mountainList._mountains, userChallenge._climbedMountainIds);  

    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);            

    return (
      <div>
        <table className="table condensed">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{userChallenge ? userChallenge.name : this.state.challenge.name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{this.state.challenge.description}</td>
          </tr>
          <tr>
            <td>
              Mountains: (total {mountainList._mountains.length})
              <ul>{this.renderMountainsByArea(mountainsGrouped)}</ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );  
  }

  render() {
    const userChallenge = findUserChallengeSelector(this.state.challenge._id),
          mountainList = _.find(this.props.mountainLists, { _id: this.state.challenge._mountainListId });
            
    if (!mountainList || !this.props.areas) {
      return "The Challenge is not available";
    }
    return (
      <div>        
        { userChallenge ? this.renderLink(userChallenge) : this.renderButton() }
        { this.renderTable(mountainList, userChallenge) }  
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return { challenges: state.challenges, userChallenges: state.userChallenges, areas: state.areas };
// }

export default connect(
  ({ challenges, userChallenges, mountainLists, areas }) => ({ challenges, userChallenges, mountainLists, areas }),
  { addUserChallenge, fetchMountainList, fetchAreas }
)(withRouter(ChallengeView));
