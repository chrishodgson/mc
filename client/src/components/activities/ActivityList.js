import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../../actions";
import Moment from "moment";

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchActivities();
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

  renderActivities() {
    return this.props.activities.reverse().map(item => {
      return (
        <tr key={item._id}>
          <td>
            <Link to={`/activities/view/${item._id}`}>{item.title}</Link>
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
    if (this.props.activities.length === 0) {
      return "Activities are not available";
    }

    return (
      <div>
        <p>Activity List</p>
        <table className="table condensed">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Mountains</th>
            </tr>
          </thead>
          <tbody>{this.renderActivities()}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ activities }) => ({ activities }),
  { fetchActivities }
)(ActivityList);
