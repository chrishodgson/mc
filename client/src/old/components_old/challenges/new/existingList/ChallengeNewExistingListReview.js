import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { submitChallenge } from "../../../../actions";
import challengeDetailFields from "../../steps/challengeDetails/challengeDetailsFields";

class ChallengeNewExistingListReview extends Component {
  renderChallengeDetails = () =>
    _.map(challengeDetailFields, ({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{this.props.challengeDetails[name]}</div>
        </div>
      );
    });

  renderMountainLists = () =>
    _.map(this.props.mountainLists, ({ _id, name }) => {
      return <div key={_id}>{name}</div>;
    });

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.renderChallengeDetails()}
        <p>Mountain List</p>
        {this.renderMountainLists()}
        <button
          className="grey btn-flat white-text"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          className="grey btn-flat white-text right"
          onClick={() =>
            this.props.submitChallenge(
              this.props.challengeDetails,
              this.props.history
            )
          }
        >
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    challengeDetails: state.form.challengeDetails.values || [],
    mountainLists: state.mountainListSelection || []
  };
}

export default connect(
  mapStateToProps,
  { submitChallenge }
)(withRouter(ChallengeNewExistingListReview));
