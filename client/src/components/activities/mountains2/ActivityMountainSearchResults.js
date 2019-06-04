import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas, selectMountain } from "../../../actions";
import { groupMountainsByAreaSelector } from '../../../selectors'

class ActivityMountainSearchResults extends Component {

  state = { userChallenge: '' };

  componentDidMount() {    
    console.log('ActivityMountainSearchResults - componentDidMount');

    const userChallengeId = this.props.match.params.userChallengeId,
          userChallenge = _.find(this.props.userChallenges, { _id: userChallengeId });

    if (!userChallenge) {      
      this.props.history.push("/dashboard"); // TODO flash message - error page not valid
      return;
    }
    this.setState({ userChallenge });

    // load areas (if not found)
    if (this.props.areas.length === 0) {
      this.props.fetchAreas(); 
    }  
    // load mountain list (if not found)
    if (!_.find(this.props.mountainLists, { _id: userChallenge._mountainListId })) {
      this.props.fetchMountainList(userChallenge._mountainListId); 
    }
  }

  handleSelectMountain = e => {
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
        return <li key={mountainItem._id}>
            {this.isAlreadySelected(mountainItem._id) ? null : 
              <button
              className="btn btn-link"
              name={mountainItem._id}
              onClick={this.handleSelectMountain}
            >
              Add
            </button>
          }
          {mountainItem.name}
        </li>;
      });

      return (
        <div key={areaItem._id}>
          {areaItem.name}:
          <ul className="mountainList">{mountains}</ul>
        </div>
      );
    });
  }

  filterMountains(mountains) {
    const areaId = this.props.formValues ? this.props.formValues.area : null,
          mountainSearch = this.props.formValues && this.props.formValues.mountain ? 
          RegExp(this.props.formValues.mountain.toLowerCase() + '*', 'i') : null;

    if (!areaId && !mountainSearch) {
      return [];     
    }  

    return mountains.filter(
      mountain => {
        if (mountainSearch && false === mountainSearch.test(mountain.name)) {
          return false;    
        }
        if (areaId && areaId !== mountain._areaId) {
          return false;    
        }
        return true;
      }
    );
  }

  render() {  
    const mountainList = _.find(this.props.mountainLists, { 
      _id: this.state.userChallenge._mountainListId 
    });

    if (!mountainList || !this.props.areas) {
      return "Loading mountains...";
    }

    const filteredMountains = this.filterMountains(mountainList._mountains);   
    const mountainsGrouped = groupMountainsByAreaSelector(filteredMountains, this.props.areas);       

    return (
      <div>
        Mountains: {this.renderMountainsByArea(mountainsGrouped)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.activityMountainSearch ? state.form.activityMountainSearch.values : [],
    mountainSelections: state.mountainSelections,
    userChallenges: state.userChallenges,
    mountainLists: state.mountainLists,
    areas: state.areas
  };
}

export default connect(
  mapStateToProps,
  { fetchMountainList, fetchAreas, selectMountain }
)(withRouter(ActivityMountainSearchResults));

