import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas, selectMountain } from "../../../actions";
import { groupMountainsByAreaSelector } from '../../../selectors'

class ActivityMountains extends Component {
  state = { userChallenge: '', mountainsError: false }; 

  componentDidMount() {    
    const userChallengeId = this.props.match.params.userChallengeId,
          userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {      
      this.props.history.push("/dashboard"); // TODO flash message - error page not valid
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

  handleNextStep(e) {
    e.preventDefault();
    const mountainsError = this.props.mountainSelections.length === 0;
    this.setState({ mountainsError });
    if (mountainsError) {
      return;
    }
    this.props.onSubmit();
  }

  handleSelectMountain = e => {
    e.preventDefault();
    const mountainId = e.target.name;
    const mountainList =_.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });
    const mountain = _.find(mountainList._mountains, { _id: mountainId });
    const isAlreadySelected = _.find(this.props.mountainSelections, { _id: mountainId });

    if (mountain && !isAlreadySelected) {
      this.props.selectMountain(mountain);
    }
  }

  isAlreadySelected(mountainId) {
    const found = _.find(this.props.mountainSelections, mountain => {
      return mountain._id === mountainId;
    });
    return found || false;
  }

  renderMountainsByArea(mountainsByArea) {
    if (mountainsByArea.length === 0) {
      return [];
    }

    return mountainsByArea.map(areaItem => {      
      const mountains = areaItem.mountains.map(mountainItem => {
        return <li key={mountainItem._id}>
            {this.isAlreadySelected(mountainItem._id) ? null : 
              <button
              className="btn btn-link"
              name={mountainItem._id}
              onClick={this.handleSelectMountain}
            >
              Add
            </button>
          }
          {mountainItem.name}
        </li>;
      });

      return (
        <div key={areaItem._id}>
          {areaItem.name}:
          <ul className="mountainList">{mountains}</ul>
        </div>
      );
    });
  }

  render() {  
    const mountainList = _.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });

    if (!mountainList || !this.props.areas) {
      return "Loading mountains...";
    }
    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);      

    return (
      <div>
        {this.state.mountainsError ? (
          <p className="red-text">
            Please select at least one mountain before proceeding.
          </p>
        ) : (
          ""
        )}
        <button onClick={this.props.onCancel} className="btn">
          Back
        </button>
        <button onClick={e => this.handleNextStep(e)} className="btn">
          Next
        </button>

        Mountains: {this.renderMountainsByArea(mountainsGrouped)}

        <button onClick={this.props.onCancel} className="btn">
          Back
        </button>
        <button onClick={e => this.handleNextStep(e)} className="btn">
          Next
        </button>
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, mountainSelections, areas }) => ({ userChallenges, mountainLists, mountainSelections, areas }),
  { fetchMountainList, fetchAreas, selectMountain }
)(withRouter(ActivityMountains));


