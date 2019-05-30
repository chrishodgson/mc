import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ActivityMountainSelections from "./ActivityMountainSelections";
import ActivityMountainSearchResults from "./ActivityMountainSearchResults";
import ActivityMountainSearch from "./ActivityMountainSearch";

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

        <ActivityMountainSearchResults />
        <ActivityMountainSelections />
      </div>
    );
  }
}

export default connect(
  ({ mountainSelections }) => ({ mountainSelections })
)(withRouter(ActivityMountains));


