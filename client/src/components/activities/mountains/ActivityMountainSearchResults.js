import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMountainList, fetchAreas, selectMountain } from "../../../actions";
import { groupMountainsByAreaSelector } from '../../../selectors'

/**
 * TODO split me up please
 */
class ActivityMountainSearchResults extends Component {

  state = { userChallenge: '' };

  componentDidMount() {    
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
    const mountainList = _.find(this.props.mountainLists, {_id: this.state.userChallenge._mountainListId});
    const mountain = _.find(mountainList._mountains, {_id: mountainId});
    const isAlreadySelected = _.find(this.props.mountainSelections, {_id: mountainId});

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
        return this.isAlreadySelected(mountainItem._id) ? null : 
          <div key={mountainItem._id} className="grid-item">
            <div className="grid-item-control">
              <button
                className="btn btn-link"
                name={mountainItem._id}
                onClick={this.handleSelectMountain}
              >
                Add
              </button>
            </div>
            <div className="grid-item-text">
              {mountainItem.name}
            </div>
          </div>
      });

      return (
        <div key={areaItem._id}>
          <h5>{areaItem.name}</h5>
          <div className="grid-container">
            {mountains}
          </div>  
        </div>
      );
    });
  }

  getAreaSearch() {
    return this.props.formValues ? this.props.formValues.area : null;
  }

  getMountainSearch() {
    return this.props.formValues && this.props.formValues.mountain ? 
      RegExp(this.props.formValues.mountain.toLowerCase() + '*', 'i') : null;
  }

  filterMountains(mountains) {
    const areaSearch = this.getAreaSearch(),
          mountainSearch = this.getMountainSearch();

    if (!areaSearch && !mountainSearch) {
      return [];     
    }  

    return mountains.filter(
      mountain => {
        if (mountainSearch && false === mountainSearch.test(mountain.name)) {
          return false;    
        }
        if (areaSearch && areaSearch !== mountain._areaId) {
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

    const showSearchResults = this.getMountainSearch() || this.getAreaSearch();
    const filteredMountains = this.filterMountains(mountainList._mountains);   
    const mountainsGrouped = groupMountainsByAreaSelector(filteredMountains, this.props.areas);       

    return !showSearchResults ? null :
      <div>
        <p>Search Results: </p>
        {this.renderMountainsByArea(mountainsGrouped)}
      </div>;
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

