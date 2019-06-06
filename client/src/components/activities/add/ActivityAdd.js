import React, { Component } from "react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityMountains from "../mountains/ActivityMountains";
import ActivityAddReview from "./ActivityAddReview";

class ActivityAdd extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return (
          <ActivityAddReview 
            onCancel={() => this.setState({ step: "mountains" })} 
          />
        );
      //step 2
      case "mountains":
        return (
            <ActivityMountains 
              onSubmit={() => this.setState({ step: "review" })}
              onCancel={() => this.setState({ step: "details" })}
            />
        );
      //step 1
      case "details":
      default:
        return (
          <ActivityDetails
            onSubmit={() => this.setState({ step: "mountains" })}
          />);
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default ActivityAdd;
