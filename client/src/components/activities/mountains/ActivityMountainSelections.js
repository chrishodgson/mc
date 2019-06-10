import React, { Component } from "react";
import { connect } from "react-redux";
import { deSelectMountain } from "../../../actions";

class MountainSelections extends Component {
  renderMountainSelections() {
    return this.props.mountainSelections.map(mountain => {
      const strArray = mountain.name.split("[");
      return (
        <li key={mountain._id} className="list-group-item">
          {strArray[0]}
          <i className="fa fa-times-circle ml-2" 
            name={mountain._id} id={mountain._id} onClick={this.handleClick}></i>
        </li>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.props.deSelectMountain(e.target.id);
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
