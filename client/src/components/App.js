import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";


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
              <DefaultLayout path="/login" component={Login} />

              <ProtectedLayout path="/dashboard" component={ProtectedRoute}/>

              <ProtectedLayout exact path="/activities" component={ProtectedRoute} />
              <ProtectedLayout path="/activities/view/:userActivityId" component={ProtectedRoute} />
              <ProtectedLayout path="/activities/add/:userChallengeId" component={ProtectedRoute} />

              <ProtectedLayout exact path="/challenges" component={ProtectedRoute} />
              <ProtectedLayout path="/challenges/view/:userChallengeId" component={ProtectedRoute} />

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
