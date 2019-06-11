import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserChallenge, fetchMountainList, fetchAreas } from "../../actions";
import { groupMountainsByAreaSelector, percentageCompleteSelector } from '../../selectors'

class ChallengeView extends Component {
  state = { userChallenge: "" };

  componentDidMount() {    
    const userChallengeId = this.props.match.params.userChallengeId;

    if (this.props.userChallenges.length === 0) {
      this.props.history.push("/dashboard");  // go back to dashboard to load user challenges
      return;
    }
      
    const userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {
      this.props.history.push("/dashboard");  // TODO flash message - error page not valid
      return;
    }
    this.setState({ userChallenge });
    
    // load areas (if not found)
    if (this.props.areas.length === 0) {
      this.props.fetchAreas(); 
    }  
    // load mountain list (if not found)
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
        const hasClimbed = _.find(this.state.userChallenge._climbed, {_mountainId: mountainItem._id});

        return (
          <li className="list-group-item" key={mountainItem._id}>
            {mountainItem.name} ({mountainItem.metres}m) {hasClimbed ? '** CLIMBED **' : 'NOT '}
          </li>
        );
      });
      return (
        <li key={areaItem._id}>
          {areaItem.name}
          <ul className="list-group list-group-flush">{mountains}</ul>
        </li>
      );
    });
  }

  renderMountainList(mountainList) {
    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);
    console.log(this.state.userChallenge, 'renderMountainList userChallenge');
    return (
      <ul className="list-inline">
        {this.renderMountainsByArea(mountainsGrouped)}
      </ul>
    );
  }

  renderCounts() {
    return (
        <table className="table table-responsive table-borderless">
          <tbody>
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
            <th>% Complete</th>
            <td>{percentageCompleteSelector(this.state.userChallenge)}%</td>
          </tr>

          </tbody>
        </table>
    );
  }

  renderDetails() {
    return (
        <table className="table table-responsive table-borderless">
        <tbody>
          <tr>
            <th>Description</th>
            <td>{this.state.userChallenge.description}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const mountainList = _.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });

    if (!mountainList || !this.props.areas || !this.state.userChallenge) {
      return "Loading details...";
    }

    return (
      <div>
        <h4>{this.state.userChallenge.title}</h4>

        <div className="row">
          <div className="col">
            { this.renderDetails() }
          </div>
          <div className="col">
            { this.renderCounts() }
          </div>
        </div>

        <div className="row">
          <div className="col">
            { this.renderMountainList(mountainList) }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, areas }) => ({ userChallenges, mountainLists, areas }),
  { addUserChallenge, fetchMountainList, fetchAreas }
)(withRouter(ChallengeView));
