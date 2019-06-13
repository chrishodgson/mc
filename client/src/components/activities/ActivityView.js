import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Moment from "moment";
import OSMap from "../utils/OSMap";

class ActivityView extends Component {
  state = { userActivity: "", userChallenge: "" }; 

  componentDidMount() {    
    const userActivityId = this.props.match.params.userActivityId,
          userActivity = _.find(this.props.userActivities, { _id: userActivityId });

    if (!userActivity) {
      this.props.history.push("/dashboard"); // go back to dashboard to load user activities
      return;
    }

    const userChallenge = _.find(this.props.userChallenges, { _id: userActivity._userChallengeId });

    if (!userActivity) {
      this.props.history.push("/dashboard"); // TODO flash message - error page not valid
      return;
    }
    this.setState({ userActivity, userChallenge });
  }

  renderMountainList(mountains) {
    return mountains.map(mountain => {
      return (
        <li className="" key={mountain._id}>
          {mountain.name} {mountain.metres}m - {mountain.gridRef}
        </li>
      );
    });
  }

  renderDetails() {
    return (
      <table className="table table-responsive table-borderless">
        <tbody>
        <tr>
          <th>Date</th>
          <td>
            {this.state.userActivity.startDate ?
                Moment(this.state.userActivity.startDate).format("MMMM Do YYYY") : ""}
          </td>
        </tr>

        <tr>
            <th>Mountains</th>
            <td>
                {this.state.userActivity._mountains.length}
                {this.state.userActivity._mountains.length > 1 ? ' mountains:' : ' mountain:'}
                <ul>{this.renderMountainList(this.state.userActivity._mountains)}</ul>
            </td>
        </tr>

        <tr>
            <th>Challenge</th>
            <td>
                <Link to={'/challenges/view/' + this.state.userActivity._userChallengeId}>{this.state.userChallenge.title}</Link>
            </td>
        </tr>

        <tr>
            <th>Description</th>
            <td>{this.state.userActivity.description}</td>
        </tr>

        </tbody>
      </table>
    );
  }

  render() {
    if (!this.state.userActivity ||!this.state.userChallenge) {
      return null;
    }
    return (
      <div>
        <h4>{this.state.userActivity.title}</h4>

        <div className="row">
          <div className="col">
            { this.renderDetails() }
          </div>
          <div className="col">
            <OSMap mountains={this.state.userActivity._mountains} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ userActivities, userChallenges }) => ({ userActivities, userChallenges }))(
  withRouter(ActivityView)
);
