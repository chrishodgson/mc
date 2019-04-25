import React, { Component } from "react";
import Details from "../../steps/challengeDetails/ChallengeDetails";
import MountainListSearch from "../../steps/challengeMountainLists/ChallengeMountainListSearch";
import MountainListSearchResults from "../../steps/challengeMountainLists/ChallengeMountainListSearchResults";
import SelectedMountainLists from "../../steps/challengeMountainLists/ChallengeSelectedMountainLists";
import Review from "./ChallengeNewExistingListReview";

class ChallengeNewExistingList extends Component {
  state = { step: "" };

  renderContent() {
    switch (this.state.step) {
      //step 3
      case "review":
        return <Review onCancel={() => this.setState({ step: "details" })} />;
      //step 2
      case "details":
        return (
          <Details
            onSubmit={() => this.setState({ step: "review" })}
            onCancel={() => this.setState({ step: "mountains" })}
          />
        );
      //step 1
      case "mountains":
      default:
        return (
          <div>
            <SelectedMountainLists />
            <MountainListSearch
              onSubmit={() => this.setState({ step: "details" })}
            />
            <MountainListSearchResults />
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <p>New Challenge - choose an existing Mountain List</p>
        {this.renderContent()}
      </div>
    );
  }
}

export default ChallengeNewExistingList;
