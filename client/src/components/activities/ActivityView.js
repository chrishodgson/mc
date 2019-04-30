import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import OSMap from "../OSMap";

class ActivityView extends Component {
  state = { activity: "" };

  componentDidMount() {
    const activity = _.find(this.props.activities, {
      _id: this.props.match.params.activityId
    });
    if (!activity) {
      this.props.history.push("/activities");
    }
    this.setState({ activity });
  }

  render() {
    const activity = this.state.activity;

    if (!activity) {
      return null;
    }

    return (
      <div>
        <p>Activity Details</p>
        <table className="table condensed">
          <tbody>
            <tr>
              <th>Challenge</th>
              <td>TODO - add name from challenge </td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{activity.title}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{activity.description}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>
                {activity.date
                  ? Moment(activity.date).format("MMMM Do YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <th>Mountain Count</th>
              <td>{activity.mountainCount}</td>
            </tr>
          </tbody>
        </table>
        <OSMap mountains={activity._mountains} />
      </div>
    );
  }
}

export default connect(({ activities }) => ({ activities }))(
  withRouter(ActivityView)
);
