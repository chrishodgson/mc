import _ from "lodash";
import React, { Component } from "react";
import { reset } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import activityDetailsFields from "../details/activityDetailsFields";
import { addUserActivity, clearSelectedMountains } from "../../../actions";

class ActivityAddReview extends Component {

    getFieldList = () => {
        const list = [];
        _.each(activityDetailsFields, formRow => {
            _.each(formRow, item => {
                list.push(item)
            });
        });
        return list;
    };

  renderActivityDetails = () =>
    _.map(this.getFieldList(), ({ label, name }) => {
      if (name === 'userChallengeId') {
          return null;
      }
      const value = this.props.activityDetails[name];
      return (
        <tr key={name}>
          <th>{label}</th>
          <td>
            {value instanceof Date
              ? Moment(value).format("MMMM Do YYYY")
              : value}
          </td>
        </tr>
      );
    });

  renderMountains = () =>
    _.map(this.props.mountainSelections, ({ _id, name }) => {
      return <li className="list-group-item" key={_id}>{name}</li>;
    });

  render() {
    return (
      <div>
        <h4 className="page-heading">Step 3: Confirm your Activity</h4>

          <div className="row">
              <div className="col">
                  <h5>Activity Details</h5>
                  <table className="table table-condensed">
                    {this.renderActivityDetails()}
                  </table>
              </div>
              <div className="col">
                  <h5>Mountains</h5>
                  <ul className="list-group list-group-flush">
                    {this.renderMountains()}
                  </ul>
              </div>
          </div>

        <div className="buttons">
          <button className="btn btn-light border" onClick={this.props.onCancel}>
            Back
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.props.resetState();
              this.props.dispatch(
                addUserActivity(
                  this.props.activityDetails,
                  this.props.mountainSelections,
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
