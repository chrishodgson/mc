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
        
        <div className="form-row">
          <div className="col">
            <button onClick={this.props.onCancel} type="button" className="btn btn-light">Back</button>
            <button onClick={e => this.handleNextStep(e)} type="button" className="btn btn-light">Next Step</button>
          </div>
        </div>

        <hr class="style1"/>

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


