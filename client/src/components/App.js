import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import DefaultLayout from "./DefaultLayout";
import Home from "./Home";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

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
              <DefaultLayout exact path="/" component={Home} />
              <DefaultLayout exact path="/login" component={Login} />              
              <DefaultLayout path="/dashboard" component={ProtectedRoute} />

              <DefaultLayout exact path="/activities" component={ProtectedRoute} />
              <DefaultLayout path="/activities/view/:userActivityId" component={ProtectedRoute} />
              <DefaultLayout path="/activities/add/:userChallengeId" component={ProtectedRoute} />

              <DefaultLayout exact path="/challenges" component={ProtectedRoute} />
              <DefaultLayout path="/challenges/view/:challengeId" component={ProtectedRoute} />

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
