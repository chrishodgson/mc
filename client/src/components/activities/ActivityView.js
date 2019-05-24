import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import OSMap from "../OSMap";

class ActivityView extends Component {
  state = { userActivity: "", userChallenge: "" }; 

  componentDidMount() {    
    const userActivityId = this.props.match.params.userActivityId,
          userActivity = _.find(this.props.userActivities, { _id: userActivityId });

    if (!userActivity) {
      this.props.history.push("/activities"); // go back to dashboard to load user activities
      return;
    }

    const userChallenge = _.find(this.props.userChallenges, { _id: userActivity._userChallengeId });

    if (!userActivity) {
      this.props.history.push("/dashboard"); // TODO flash message - error page not valid
      return;
    }
    this.setState({ userActivity, userChallenge });
  }

  renderMountains(mountains) {
    return mountains.map(mountain => {
      return (
        <li key={mountain._id}>
          {mountain.name} {mountain.metres}m - {mountain.gridRef}
        </li>
      );
    });
  }

  render() {
    if (!this.state.userActivity ||!this.state.userChallenge) {
      return null;
    }
    return (
      <div>
        <p>Activity Details</p>

        <table className="table condensed">
          <tbody>
          <tr>
              <th>CHallenge Name</th>
              <td>{this.state.userChallenge.name}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{this.state.userActivity.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.state.userActivity.description}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>
                {this.state.userActivity.date
                  ? Moment(this.state.userActivity.date).format("MMMM Do YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <td>
                Mountains: (total {this.state.userActivity._mountains.length}) 
                <ul>{this.renderMountains(this.state.userActivity._mountains)}</ul>
              </td>
            </tr>
          </tbody>
        </table>
        <OSMap mountains={this.state.userActivity._mountains} />
      </div>
    );
  }
}

export default connect(({ userActivities, userChallenges }) => ({ userActivities, userChallenges }))(
  withRouter(ActivityView)
);
