import React, { Component } from "react";
import { connect } from "react-redux";
import { deSelectMountain } from "../../../actions";

class MountainSelections extends Component {
  renderMountainSelections() {
    return this.props.mountainSelections.map(mountain => {
      return (
        <span style={{ paddingRight: "10px" }} key={mountain._id}>
          {mountain.name}
          <button
            name={mountain._id}
            onClick={this.handleClick}
            className="btn btn-light btn-secondary"
          >
            x
          </button>
        </span>
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
        Selected Mountains: <ul>{this.renderMountainSelections()}</ul>
      </div>
    );
  }
}

export default connect(
  ({ mountainSelections }) => ({ mountainSelections }),
  { deSelectMountain }
)(MountainSelections);
