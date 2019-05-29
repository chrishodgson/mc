import React, { Component } from "react";
import ActivityDetails from "../details/ActivityDetails";
// import MountainSelections from "../mountains/MountainSelections";
// import Mountains from "../mountains/ActivityMountains";
import ActivityMountains from "../mountains2/ActivityMountains";
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
      //   return (
      //     <div>
      //       <MountainSelections />
      //       <Mountains 
      //         onSubmit={() => this.setState({ step: "review" })}
      //         onCancel={() => this.setState({ step: "details" })}
      //       />
      //     </div>
      //   );
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
        <p>Add a new Activity</p>
        {this.renderContent()}
      </div>
    );
  }
}

//export default reduxForm({ form: "activityDetails" })(ActivityAdd);
export default ActivityAdd;
