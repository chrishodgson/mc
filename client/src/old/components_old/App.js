import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import DefaultLayout from "./DefaultLayout";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import PageNotFound from "./PageNotFound";

import ChallengeNewCustomList from "./challenges/new/customList/ChallengeNewCustomList";
import ChallengeNewExistingList from "./challenges/new/existingList/ChallengeNewExistingList";
import ChallengeList from "./challenges/ChallengeList";

import ActivityNew from "./activities/new/ActivityNew";
import ActivityList from "./activities/ActivityList";
import ActivityView from "./activities/ActivityView";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <DefaultLayout exact path="/" component={Landing} />
              <DefaultLayout path="/dashboard" component={Dashboard} />

              <DefaultLayout
                exact
                path="/activities"
                component={ActivityList}
              />
              <DefaultLayout path="/activities/new" component={ActivityNew} />
              <DefaultLayout path="/activities/view/:activityId" component={ActivityView} />

              <DefaultLayout
                exact
                path="/challenges"
                component={ChallengeList}
              />
              <DefaultLayout
                path="/challenges/custom"
                component={ChallengeNewCustomList}
              />
              <DefaultLayout
                path="/challenges/existing"
                component={ChallengeNewExistingList}
              />

              <DefaultLayout component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
