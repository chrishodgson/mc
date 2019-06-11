import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserActivities } from "../../actions";
import Moment from "moment";

const maxMountainsToShow = 3;

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchUserActivities(); // todo reload add, then refresh only if empty 
  }
  
  renderMountains(mountains) {
    return mountains.map((mountain, index) => {
      return index > maxMountainsToShow ?  null : (
        <li className="list-inline-item" key={mountain._id}>
          {mountain.name} ({mountain.metres}m)
          {(index + 1) < maxMountainsToShow && (index + 1) < mountains.length ? ', ' : ''}
          {mountains.length > maxMountainsToShow ? '... ' : ''}
        </li>
      );
    });
  }

  renderUserActivities() {
    return this.props.userActivities.reverse().map(item => {
      return (
        <div key={item._id}>
          <p>
            {item.startDate ? Moment(item.startDate).format("MMMM Do YYYY") : ""}
          </p>
          <h5>
            <Link to={`/activities/view/${item._id}`}>{item.title}</Link>
          </h5>
          <div>
            {item._mountains.length} {item._mountains.length > maxMountainsToShow ? 'mountain(s)' : 'mountain'}
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
        <h5>Your Activities</h5>
        {this.renderUserActivities()}
      </div>
    );
  }
}

export default connect(
  ({ userActivities }) => ({ userActivities }),
  { fetchUserActivities }
)(ActivityList);
