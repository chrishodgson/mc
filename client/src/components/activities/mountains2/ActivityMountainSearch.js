import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas, selectMountain } from "../../../actions";

class ActivityMountainSearch extends Component {
  render() {  
    return (
      <div>
        search
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, mountainSelections, areas }) => ({ userChallenges, mountainLists, mountainSelections, areas }),
  { fetchMountainList, fetchAreas, selectMountain }
)(withRouter(ActivityMountainSearch));


