import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserActivities } from "../../actions";
import Moment from "moment";

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchUserActivities(); // todo reload add, then refresh only if empty 
  }
  
  renderMountains(mountains) {
    return mountains.map(mountain => {
      return (
        <li key={mountain._id}>
          {mountain.name} ({mountain.metres}m)
        </li>
      );
    });
  }

  renderUserActivities() {
    return this.props.userActivities.reverse().map(item => {
      return (
        <div className="bg-light" key={item._id}>
          <p>
            {item.startDate ? Moment(item.startDate).format("MMMM Do YYYY") : ""}
          </p>
          <h5>
            <Link to={`/activities/view/${item._id}`}>{item.name}</Link>
          </h5>
          <div>
            {item._mountains.length} mountain(s):
            <ul className="list-inline">{this.renderMountains(item._mountains)}</ul>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.userActivities.length === 0) {
      return 'No activities created';
    }
    return (
      <div className="activityList">   
        {this.renderUserActivities()}
      </div>
    );
  }
}

export default connect(
  ({ userActivities }) => ({ userActivities }),
  { fetchUserActivities }
)(ActivityList);
