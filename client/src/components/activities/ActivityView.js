import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import OSMap from "../OSMap";

class ActivityView extends Component {
  state = { userActivity: "", userChallenge: "" }; //why do we need this ?

  componentDidMount() {
    
    const userActivityId = this.props.match.params.userActivityId,
          userActivity = _.find(this.props.userActivities, {_id: userActivityId});

console.log(this.props.userChallenges, userActivityId);

    // const userChallenge = userActivity && _.find(this.props.userChallenges, { _id: userActivity._userChallengeId });

    if (!userActivity) {
    //if (!userActivity || !userChallenge) {
      this.props.history.push("/activities"); //TODO show flash message
    }
    //this.setState({ userActivity, userChallenge });
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
    if (!this.state.userActivity) {
    // if (!this.state.userChallenge || !this.state.activity) {
      return "The Activity is not available";
    }

    const userActivity = this.state.userActivity;
          // userChallenge = this.state.userChallenge;

    return (
      <div>
        <p>Activity Details</p>

        {/* For Challenge {userChallenge.name} */}

        <table className="table condensed">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{userActivity.name}</td>
            </tr>
            <tr>
              <th>Description</th>
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
