import _ from "lodash";
import React, { Component } from "react";
import { reset } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import activityDetailFields from "../steps/activityDetails/activityDetailsFields";
import {
  submitActivity,
  clearMountainSearch,
  clearMountainSelection
} from "../../../actions";

class ActivityReview extends Component {
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
    _.map(this.props.mountains, ({ _id, name }) => {
      return <div key={_id}>{name}</div>;
    });

  render() {
    console.log(this.props.activityDetails);
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.renderActivityDetails()}
        <p>Mountains</p>
        {this.renderMountains()}
        <button className="btn" onClick={this.props.onCancel}>
          Back
        </button>
        <button
          className="btn"
          onClick={() => {
            this.props.resetState();
            this.props.dispatch(
              submitActivity(
                this.props.activityDetails,
                this.props.mountains,
                this.props.history
              )
            );
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activityDetails: state.form.activityDetails.values || [],
    mountains: state.mountainSelection || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetState: () => {
      dispatch(reset("activityDetails"));
      dispatch(reset("mountainSearch"));
      dispatch(clearMountainSearch());
      dispatch(clearMountainSelection());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivityReview));
