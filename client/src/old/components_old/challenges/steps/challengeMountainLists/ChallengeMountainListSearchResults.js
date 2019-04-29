import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMountainList } from "../../../../actions";

class ChallengeMountainListSearchResults extends Component {
  renderMountainLists() {
    return this.props.mountainListSearch.map(mountainList => {
      return (
        <tr key={mountainList._id}>
          <td>
            {this.isAlreadySelected(mountainList._id) ? (
              ""
            ) : (
              <button
                className="btn-flat grey white-text"
                name={mountainList._id}
                onClick={this.handleClick}
              >
                Add
              </button>
            )}
          </td>
          <td>{mountainList.name}</td>
          <td>{mountainList.mountainCount}</td>
          <td>{mountainList.highestMountain}</td>
        </tr>
      );
    });
  }

  handleClick = e => {
    e.preventDefault();
    const mountainListId = e.target.name;
    const mountainList = this.getMountainList(mountainListId);

    if (mountainList && !this.isAlreadySelected(mountainListId)) {
      this.props.selectMountainList(mountainList);
    }
  };

  getMountainList(mountainListId) {
    return _.find(this.props.mountainListSearch, mountainList => {
      return mountainList._id === mountainListId;
    });
  }

  isAlreadySelected(mountainListId) {
    const found = _.find(this.props.mountainListSelection, mountainList => {
      return mountainList._id === mountainListId;
    });
    return found || false;
  }

  render() {
    if (this.props.mountainListSearch.length === 0) {
      return null;
    }

    return (
      <table style={{ paddingTop: "20px" }}>
        <caption>Search Results:</caption>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Count</th>
            <th>Highest</th>
          </tr>
        </thead>
        <tbody>{this.renderMountainLists()}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ mountainListSearch, mountainListSelection }) {
  return { mountainListSearch, mountainListSelection };
}

export default connect(
  mapStateToProps,
  { selectMountainList }
)(ChallengeMountainListSearchResults);
