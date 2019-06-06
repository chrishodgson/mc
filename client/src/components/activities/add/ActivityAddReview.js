import _ from "lodash";
import React, { Component } from "react";
import { reset } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import activityDetailFields from "../details/activityDetailsFields";
import { addUserActivity, clearSelectedMountains } from "../../../actions";

class ActivityAddReview extends Component {
  renderActivityDetails = () =>
    _.map(activityDetailFields, ({ label, name }) => {
      const value = this.props.activityDetails[name];
      return (
        <div key={name}>
          <label>{label}</label>
          <div>
            {value instanceof Date
              ? Moment(value).format("MMMM Do YYYY")
              : value}
          </div>
        </div>
      );
    });

  renderMountains = () =>
    _.map(this.props.mountainSelections, ({ _id, name }) => {
      return <div key={_id}>{name}</div>;
    });

  render() {
    const userChallengeId = this.props.match.params.userChallengeId;

    return (
      <div>
        <h4 className="page-heading">Step 3: Confirm your Activity</h4>

        <h5>Activity Details</h5>
        {this.renderActivityDetails()}
        
        <h5>Mountains</h5>
        {this.renderMountains()}

        <div className="buttons">
          <button className="btn" onClick={this.props.onCancel}>
            Back
          </button>
          <button
            className="btn"
            onClick={() => {
              this.props.resetState();
              this.props.dispatch(
                addUserActivity(
                  this.props.activityDetails,
                  this.props.mountainSelections,
                  userChallengeId,
                  this.props.history
                )
              );
            }}
          >
            Save Activity
          </button>
        </div>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activityDetails: state.form.activityDetails.values || [],
    mountainSelections: state.mountainSelections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetState: () => {
      dispatch(reset("activityDetails"));
      dispatch(clearSelectedMountains());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivityAddReview));
