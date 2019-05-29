import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas, selectMountain } from "../../../actions";

// import { groupMountainsByAreaSelector } from '../../../selectors'
import ActivityMountainSearch from "./ActivityMountainSearch";
import ActivityMountainSelections from "./ActivityMountainSelections";

class ActivityMountains extends Component {
  state = { mountainsError: false }; 

  handleNextStep(e) {
    e.preventDefault();
    const mountainsError = this.props.mountainSelections.length === 0;
    this.setState({ mountainsError });
    if (mountainsError) {
      return;
    }
    this.props.onSubmit();
  }

  renderNextStepError() {
    return this.state.mountainsError ? (
      <p className="text-danger">
        Please select at least one mountain before proceeding.
      </p>
    ) : (
      null
    );
  }

  render() {  
    return (
      <div>
        <ActivityMountainSearch />

        {this.renderNextStepError()}

        <button onClick={this.props.onCancel} className="btn btn-default">
          Back
        </button>
        <button onClick={e => this.handleNextStep(e)} className="btn btn-default">
          Next
        </button>

        <ActivityMountainSelections />
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, mountainSelections, areas }) => ({ userChallenges, mountainLists, mountainSelections, areas }),
  { fetchMountainList, fetchAreas, selectMountain }
)(withRouter(ActivityMountains));


