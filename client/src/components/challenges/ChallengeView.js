import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import { addUserChallenge, fetchMountainList, fetchAreas } from "../../actions";
import { groupMountainsByAreaSelector, percentageCompleteSelector } from '../../selectors'

import ChallengeViewSearch from "./ChallengeViewSearch";

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
        const hasClimbed = _.find(this.state.userChallenge._climbed, { _mountainId: mountainItem._mountainId });
        const climbedOrNotClimbed = (this.props.challengeViewSearch &&
            this.props.challengeViewSearch.climbedOrNotClimbed) || 'all';

        if ( (climbedOrNotClimbed === 'climbed' && !hasClimbed) || 
             (climbedOrNotClimbed === 'notClimbed' && hasClimbed) ) {
          return null;
        }  

        const strArray = mountainItem.name.split("[");
        return (
          <div key={mountainItem._id} className="grid-item">
            <div className="grid-item-icon">
              <i className="fas fa-mountain ml-2"></i>
            </div>
            <div className="grid-item-text">
              {strArray[0]} ({mountainItem.metres}m)
            </div>
            {/*{hasClimbed ? <i className="fas fa-mountain ml-2"></i> : ''}*/}
          </div>
        );
      });

      return (
        <div key={areaItem._id}>
          <h5>{areaItem.name}</h5>
          <div className="grid-container">
            {mountains}
          </div>
        </div>
      );
    });
  }

  renderMountainList(mountainList) {
    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);

    return (
      <ul className="list-inline">
        {this.renderMountainsByArea(mountainsGrouped)}
      </ul>
    );
  }

  renderCounts() {
    return (
      <div className="card">
        <div className="card-header">Your Progress</div>
        <ul className="list-group list-group-condensed">
          <li className="list-group-item">Climbed: {this.state.userChallenge.climbedCount}</li>
          <li className="list-group-item">Remaining: {this.state.userChallenge.remainingCount}</li>
          <li className="list-group-item">Total: {this.state.userChallenge.mountainCount}</li>
          <li className="list-group-item">Completed: {percentageCompleteSelector(this.state.userChallenge)}%</li>
        </ul>
      </div>
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
        
        <ChallengeViewSearch />

        <div className="row">
          <div className="col-md-8">
            { this.renderMountainList(mountainList) }
          </div>
          <div className="col-md-4">
            { this.renderCounts() }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    challengeViewSearch: state.form.challengeViewSearch ? state.form.challengeViewSearch.values : [],
    userChallenges: state.userChallenges,
    mountainLists: state.mountainLists,
    areas: state.areas
  };
}

export default connect(
  mapStateToProps,
  // ({ userChallenges, mountainLists, areas }) => ({ userChallenges, mountainLists, areas }),
  { addUserChallenge, fetchMountainList, fetchAreas }
)(withRouter(ChallengeView));
