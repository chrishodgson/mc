import React, { Component } from "react";
import { connect } from "react-redux";
import { deSelectMountain } from "../../../actions";

class MountainSelections extends Component {
  renderMountainSelections() {
    return this.props.mountainSelections.map(mountain => {
      return (
        <li key={mountain._id} className="list-group-item">
          {mountain.name}
          <a
            name={mountain._id}
            onClick={this.handleClick}
            className="btn btn-link"
          >
            x
            {/* <i class="fas fa-minus-circle"></i> */}
          </a>
        </li>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.props.deSelectMountain(e.target.name);
  };

  render() {
    if (this.props.mountainSelections.length === 0) {
      return null;
    }
    return (
      <div>
        <h5>Selected Mountains</h5> 
        <ul className="list-group list-group-flush">
          {this.renderMountainSelections()}
        </ul>
      </div>
    );
  }
}

export default connect(
  ({ mountainSelections }) => ({ mountainSelections }),
  { deSelectMountain }
)(MountainSelections);
