import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas } from "../../../actions";
import { groupMountainsByAreaSelector } from '../../../selectors'

class ActivityMountains extends Component {
  state = { userChallenge: "" }; //do we need this ?

  componentDidMount() {    
// console.log(this.props.userChallenges, 'this.props.userChallenges - componentDidMount');

    const userChallengeId = this.props.match.params.userChallengeId,
          userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {
      //TODO show flash message saying user challenge not found
      this.props.history.push("/challenges"); 
      return;
    }

    this.setState({ userChallenge });

    if (!_.find(this.props.mountainLists, { _id: userChallenge._mountainListId })) {
    //if (!this.findMountainList(userChallenge._mountainListId)) {
      this.props.fetchMountainList(userChallenge._mountainListId); 
    }
  }

  renderMountainsByArea(mountainsByArea) {
    if (mountainsByArea.length === 0) {
      return [];
    }

    //todo use css grid
    return mountainsByArea.map(areaItem => {      
      const mountains = areaItem.mountains.map(mountainItem => {
        return <div style={{padding: "5px 10px", background: "#eee"}} key={mountainItem._id}>{mountainItem.name}</div>;
      });
      const styles = {
        display: "inline-grid", 
        "grid-template-columns": "200px 200px 200px 200px",
        paddingBottom: "10px",
        "grid-gap": "10px"
    };
      return (
        <div key={areaItem._id}>
          <h5>{areaItem.name}</h5>
          <div style={styles}>{mountains}</div>
      </div>);
    });
  }

  render() {  
    // console.log(this.state.userChallenge, 'state.userChallenge - render');
    // console.log(this.props, 'render - props');

    // const mountainList = this.findMountainList(this.state.userChallenge._mountainListId);
    const mountainList = _.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });

    if (!mountainList || !this.props.areas) {
      return "Details are not available";
    }

    const mountainsGrouped = groupMountainsByAreaSelector(mountainList._mountains, this.props.areas);      

    return (
      <div>
        Mountains: {this.renderMountainsByArea(mountainsGrouped)}
      </div>
    );
  }
}

export default connect(
  ({ userChallenges, mountainLists, areas }) => ({ userChallenges, mountainLists, areas }),
  { fetchMountainList, fetchAreas }
)(withRouter(ActivityMountains));
