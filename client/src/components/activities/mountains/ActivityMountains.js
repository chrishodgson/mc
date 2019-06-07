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
    if (this.validateMountainSelection()) {
      this.props.onSubmit();
    }
  }

  validateMountainSelection() {
    const mountainsError = this.props.mountainSelections.length === 0;
    if (this.state.mountainsError !== mountainsError) {
      this.setState({ mountainsError });
    }
    return mountainsError ? false : true;
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
    if (this.state.mountainsError) {
      this.validateMountainSelection();
    }
     
    return (
      <div>
        <h4 className="page-heading">Step 2: Select Mountains Climbed</h4>

        <div className="card">
          <div className="card-body">
            <ActivityMountainSearch />
            <div className="form-row">
              <div className="col">
                {this.renderNextStepError()}
              </div>
            </div>
          </div>
        </div>        
        
        <div className="buttons">
          <button onClick={this.props.onCancel} type="button" className="btn btn-light border">Back</button>
          <button onClick={e => this.handleNextStep(e)} type="button" className="btn btn-secondary">Next Step</button>
        </div>

        <div className="form-row">
          <div className="col-8">
            <ActivityMountainSearchResults />
          </div>
          <div className="col-4">
            <ActivityMountainSelections />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ mountainSelections }) => ({ mountainSelections })
)(withRouter(ActivityMountains));


