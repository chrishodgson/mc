import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addUserChallenge, fetchMountainList, fetchAreas } from "../../actions";
import { groupMountainsByAreaSelector } from '../../selectors'

class ChallengeView extends Component {
  state = { userChallenge: "" };

  componentDidMount() {    
    if (this.props.userChallenges.length === 0) {
      this.props.history.push("/challenges");  
      return;
    }
      
    const userChallengeId = this.props.match.params.userChallengeId,
          userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {
      this.props.history.push("/challenges");  // TODO show flash message
      return;
    }

    this.setState({ userChallenge });
    
    if (!_.find(this.props.mountainLists, { _id: userChallenge._mountainListId })) {
      this.props.fetchMountainList(userChallenge._mountainListId); 
    }
  }

  renderMountainsByArea(mountainsByArea) {
    if (mountainsByArea.length === 0) {
      return [];
    }
    return mountainsByArea.map(areaItem => {      
      const mountains = areaItem.mountains.map(mountainItem => {
        return <li key={mountainItem._id}>{mountainItem.name} ({mountainItem.metres}m)</li>;
      });
      return <li key={areaItem._id}>{areaItem.name}<ul>{mountains}</ul></li>;
    });
  }

  renderTable(mountainList) {
    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);return (
      <div>
        <table className="table condensed">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.state.userChallenge.name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{this.state.userChallenge.description}</td>
          </tr>
          <tr>
            <th>Climbed</th>
            <td>{this.state.userChallenge.climbedCount}</td>
          </tr>
          <tr>
            <th>Remaining</th>
            <td>{this.state.userChallenge.remainingCount}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{this.state.userChallenge.mountainCount}</td>
          </tr>
          <tr>
            <td><ul>{this.renderMountainsByArea(mountainsGrouped)}</ul></td>
          </tr>
          </tbody>
        </table>
      </div>
    );  
  }

  render() {
    const mountainList = _.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });
            
    if (!mountainList || !this.props.areas || !this.state.userChallenge) {
      return "The Challenge is not available";
    }
    return (
      <div>        
        <Link to={`/activities/add/${this.state.userChallenge._id}`}>Add New Activity</Link>
        { this.renderTable(mountainList) }  
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, areas }) => ({ userChallenges, mountainLists, areas }),
  { addUserChallenge, fetchMountainList, fetchAreas }
)(withRouter(ChallengeView));
