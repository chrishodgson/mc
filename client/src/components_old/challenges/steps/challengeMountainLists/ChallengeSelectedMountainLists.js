import React, { Component } from "react";
import { connect } from "react-redux";
import { deSelectMountainList } from "../../../../actions";

class ChallengeSelectedMountainLists extends Component {
  renderSelectedMountainLists() {
    return this.props.mountainListSelection.map(mountainList => {
      return (
        <span style={{ paddingRight: "10px" }} key={mountainList._id}>
          {mountainList.name}
          <button
            style={{ marginLeft: "5px", marginRight: "5px" }}
            name={mountainList._id}
            onClick={this.handleClick}
          >
            x
          </button>
        </span>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.props.deSelectMountainList(e.target.name);
  };

  render() {
    if (this.props.mountainListSelection.length === 0) {
      return null;
    }
    return (
      <div>
        Selected Mountain Lists: <ul>{this.renderSelectedMountainLists()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ mountainListSelection }) {
  return { mountainListSelection };
}

export default connect(
  mapStateToProps,
  { deSelectMountainList }
)(ChallengeSelectedMountainLists);
