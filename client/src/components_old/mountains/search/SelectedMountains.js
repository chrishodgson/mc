import React, { Component } from "react";
import { connect } from "react-redux";
import { deSelectMountain } from "../../../actions";

class SelectedMountains extends Component {
  renderSelectedMountains() {
    return this.props.mountainSelection.map(mountain => {
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
    if (this.props.mountainSelection.length === 0) {
      return null;
    }
    return (
      <div>
        Selected Mountains: <ul>{this.renderSelectedMountains()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ mountainSelection }) {
  return { mountainSelection };
}

export default connect(
  mapStateToProps,
  { deSelectMountain }
)(SelectedMountains);
