import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
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

              <DefaultLayout exact path="/activities" component={ProtectedRoute} />
              <DefaultLayout path="/activities/view/:userActivityId" component={ProtectedRoute} />
              <DefaultLayout path="/activities/add/:userChallengeId" component={ProtectedRoute} />

              <DefaultLayout exact path="/challenges" component={ProtectedRoute} />
              <DefaultLayout path="/challenges/view/:userChallengeId" component={ProtectedRoute} />

              <DefaultLayout path="/login" component={Login} />
              <DefaultLayout path="/dashboard" component={ProtectedRoute}/>

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
