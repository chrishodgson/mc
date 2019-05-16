import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, selectMountain } from "../../../actions";
import { groupMountainsByAreaSelector } from '../../../selectors'

class ActivityMountains extends Component {
  state = { userChallenge: "" }; // why do we need this ?

  componentDidMount() {    
    const userChallengeId = this.props.match.params.userChallengeId,
          userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {      
      this.props.history.push("/challenges");  //TODO show flash message
      return;
    }

    this.setState({ userChallenge });

    if (!_.find(this.props.mountainLists, { _id: userChallenge._mountainListId })) {
      this.props.fetchMountainList(userChallenge._mountainListId); 
    }
  }

  handleClick = e => {
    e.preventDefault();
    const mountainId = e.target.name;
    const mountainList =_.find(this.props.mountainLists, { _id: this.state.userChallenge._mountainListId });
    const mountain = _.find(mountainList._mountains, { _id: mountainId });
    const isAlreadySelected = _.find(this.props.mountainSelections, { _id: mountainId });

    if (mountain && !isAlreadySelected) {
      this.props.selectMountain(mountain);
    }
  }

  isAlreadySelected(mountainId) {
    const found = _.find(this.props.mountainSelections, mountain => {
      return mountain._id === mountainId;
    });
    return found || false;
  }

  renderMountainsByArea(mountainsByArea) {
    if (mountainsByArea.length === 0) {
      return [];
    }

    return mountainsByArea.map(areaItem => {      
      const mountains = areaItem.mountains.map(mountainItem => {
        return <div style={{padding: "5px 10px", background: "#eee"}} key={mountainItem._id}>
            {this.isAlreadySelected(mountainItem._id) ? null : 
              <small><button
              className="btn btn-link"
              name={mountainItem._id}
              onClick={this.handleClick}
            >
              Add
            </button></small>
          }
          {mountainItem.name}
        </div>;
      });
      const styles = {
        display: "inline-grid", 
        gridTemplateColumns: "200px 200px 200px 200px",
        gridGap: "7px",
        marginBottom: "20px"
      };
      return (
        <div key={areaItem._id}>
          <h5>{areaItem.name}</h5>
          <div style={styles}>{mountains}</div>
      </div>);
    });
  }

  render() {  
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
  ({ userChallenges, mountainLists, mountainSelections, areas }) => ({ userChallenges, mountainLists, mountainSelections, areas }),
  { fetchMountainList, selectMountain }
)(withRouter(ActivityMountains));


// handleNext(e) {
//   e.preventDefault();
//   const mountainsError = this.props.mountainSelection.length === 0;
//   this.setState({ mountainsError });
//   if (mountainsError) {
//     return;
//   }
//   this.props.onSubmit();
// }
// {/* <button onClick={e => this.handleNext(e)} className="btn">
//   Next
// </button> */}