import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import OSMap from "../OSMap";
import { findUserChallengeByChallengeIdSelector } from '../../selectors'

class ActivityView extends Component {
  state = { userActivity: "" }; //why do we need this ?

  componentDidMount() {
    const userActivity = _.find(this.props.userActivities, {
      _id: this.props.match.params.activityId
    });
    if (!userActivity) {
      this.props.history.push("/activities"); //TODO show flash message
    }
    this.setState({ userActivity });
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
    if (!this.props.userChallenges || !this.state.activity) {
      return "The Activity is not available";
    }

    const userActivity = this.state.activity,
        userChallenge = findUserChallengeByChallengeIdSelector(userActivity._challengeId, this.props.userChallenges);

    return (
      <div>
        <p>Activity Details</p>
        <table className="table condensed">
          <tbody>
            <tr>
              <th>Challenge</th>
              <td>{userChallenge.name}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{userActivity.title}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{userActivity.description}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>
                {userActivity.date
                  ? Moment(userActivity.date).format("MMMM Do YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <td>
                Mountains: (total {userActivity.mountainCount}) 
                <ul>{this.renderMountains(userActivity._mountains)}</ul>
              </td>
            </tr>
          </tbody>
        </table>
        <OSMap mountains={userActivity._mountains} />
      </div>
    );
  }
}

export default connect(({ userActivities, userChallenges }) => ({ userActivities, userChallenges }))(
  withRouter(ActivityView)
);
