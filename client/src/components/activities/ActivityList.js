import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserActivities } from "../../actions";
import Moment from "moment";

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchUserActivities(); // will this overwrite previous?
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

  renderUserActivities() {
    return this.props.userActivities.reverse().map(item => {
      return (
        <div key={item._id}>
          <p>
            {item.date ? Moment(item.date).format("MMMM Do YYYY") : ""}
          </p>
          <h5>
            <Link to={`/activities/view/${item._id}`}>{item.name}</Link>
          </h5>
          <p>
            {item.mountainCount} mountains 
            <ul className="list-inline">{this.renderMountains(item._mountains)}</ul>
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <p>My Activities</p>
        
        {this.props.userActivities.length === 0 ? 
          <p>No activities found</p> : 
          this.renderUserActivities()}
      </div>
    );
  }
}

export default connect(
  ({ userActivities }) => ({ userActivities }),
  { fetchUserActivities }
)(ActivityList);
