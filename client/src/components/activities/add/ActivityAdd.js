import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Details from "../details/ActivityDetails";
import MountainSelections from "../mountains/MountainSelections";
import Mountains from "../mountains/ActivityMountains";
import Review from "./ActivityAddReview";

class ActivityAdd extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return (
          <Review 
            onCancel={() => this.setState({ step: "mountains" })} 
          />
        );
      //step 2
      case "mountains":
        return (
          <div>
            <MountainSelections />
            <Mountains 
              onSubmit={() => this.setState({ step: "review" })}
              onCancel={() => this.setState({ step: "details" })}
            />
          </div>
        );
      //step 1
      case "details":
      default:
        return (
          <Details
            onSubmit={() => this.setState({ step: "mountains" })}
          />);
    }
  }

  render() {
    return (
      <div>
        <p>Add a new Activity</p>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({ form: "activityDetails" })(ActivityAdd);
