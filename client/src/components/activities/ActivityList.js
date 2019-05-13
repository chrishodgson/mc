import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserActivities } from "../../actions";
import Moment from "moment";

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchUserActivities();
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
        <tr key={item._id}>
          <td>
            <Link to={`/activities/view/${item._id}`}>{item.name}</Link>
          </td>
          <td>{item.description}</td>
          <td>{item.date ? Moment(item.date).format("MMMM Do YYYY") : ""}</td>
          <td>
            Mountains: (total {item.mountainCount}) 
            <ul>{this.renderMountains(item._mountains)}</ul>
          </td>
        </tr>
      );
    });
  }

  render() {
    // if (this.props.userActivities.length === 0) {
    //   return "Activities are not available";
    // }

    return (
      <div>
        <p>Activity List</p>
        
        <Link to={`/activities/add`}>Add Activity</Link>

        {this.props.userActivities.length === 0 ? <p>No existing activities</p> : 
        <table className="table condensed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Mountains</th>
            </tr>
          </thead>
          <tbody>{this.renderUserActivities()}</tbody>
        </table>
        }
      </div>
    );
  }
}

export default connect(
  ({ userActivities }) => ({ userActivities }),
  { fetchUserActivities }
)(ActivityList);
