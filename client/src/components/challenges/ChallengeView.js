import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserChallenge, fetchMountainList, fetchAreas } from "../../actions";
// import {mountainsByAreaSelector} from '../../selectors'

class ChallengeView extends Component {
  state = { challenge: "" };

  componentDidMount() {    
    const challengeId = this.props.match.params.challengeId,
          challenge = _.find(this.props.challenges, { _id: challengeId });

    if (!challenge) {
      this.props.history.push("/challenges"); //TODO show flash message saying challenge not found
      return;
    }
    this.setState({ challenge });

    //note fetch userChallenges in ChallengeList Component 

    if (!this.findMountainList(challenge._mountainListId)) {
      this.props.fetchMountainList(challenge._mountainListId); 
    }

    if (this.props.areas.length === 0) {
      this.props.fetchAreas(); 
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

  renderTable(mountainList, userChallenge) {
    //todo add selector to show which mountains have been climbed using 
    // const mountainsFlagged = this.flagMountainsClimbed(mountainList._mountains, userChallenge._climbedMountainIds);  
    const mountainsGrouped = this.groupMountainsByArea(mountainList._mountains, this.props.areas);                

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

  // TODO make a selector 
  findUserChallenge(challengeId) {
    return _.find(this.props.userChallenges, item => { 
      return item._challengeId === challengeId; 
    });
  }

  // TODO make a selector 
  findMountainList(mountainListId) {
    return _.find(this.props.mountainLists, item => { 
      return item._id === mountainListId; 
    });
  }
  
  // TODO make a selector 
  groupMountainsByArea(mountains, areas) {
    if (mountains.length === 0) {
      return [];
    }
    return _.compact(areas.map(area => {
        const filteredMountains = _.filter(mountains, {_areaId: area._id});
        return filteredMountains.length !== 0 ? {_id: area._id, name: area.name, mountains: filteredMountains} : null;
    }));
  }

  // TODO make a selector 
  flagMountainsClimbed(mountains, climbedIds) {
    return mountains.map(mountain => {
        // const climbed = _.find(climbedIds, mountain._id);
        const mountainNew = mountain.climbed = true;
        return mountainNew;
    });
  }
  
  render() {
    const userChallenge = this.findUserChallenge(this.state.challenge._id),
          mountainList = this.findMountainList(this.state.challenge._mountainListId);

    if (!mountainList || !this.props.areas) {
      return "The Challenge is not available";
    }
    return (
      <div>        
        { userChallenge ? 'You have joined this challenge' : this.renderButton() }
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
