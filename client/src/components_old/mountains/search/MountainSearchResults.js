import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMountain } from "../../../actions";

class MountainSearchResults extends Component {
  renderMountains() {
    if (this.props.mountainSearch.length === 0) {
      return "No results found";
    }
    return this.props.mountainSearch.map(mountain => {
      return (
        <tr key={mountain._id}>
          <td>
            {this.isAlreadySelected(mountain._id) ? (
              ""
            ) : (
              <button
                className="btn btn-link"
                name={mountain._id}
                onClick={this.handleClick}
              >
                Add
              </button>
            )}
          </td>
          <td>{mountain.name}</td>
          <td>{mountain.metres}m</td>
        </tr>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    const mountainId = e.target.name;
    const mountain = this.getMountain(mountainId);

    if (mountain && !this.isAlreadySelected(mountainId)) {
      this.props.selectMountain(mountain);
    }
  };

  getMountain(mountainId) {
    return _.find(this.props.mountainSearch, mountain => {
      return mountain._id === mountainId;
    });
  }

  isAlreadySelected(mountainId) {
    const found = _.find(this.props.mountainSelection, mountain => {
      return mountain._id === mountainId;
    });
    return found || false;
  }

  render() {
    if (this.props.mountainSearch.length === 0) {
      return null;
    }

    return (
      <div>
        <br />
        <hr />
        <p>Search Results:</p>
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>{this.renderMountains()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ mountainSearch, mountainSelection }) {
  return { mountainSearch, mountainSelection };
}

export default connect(
  mapStateToProps,
  { selectMountain }
)(MountainSearchResults);
