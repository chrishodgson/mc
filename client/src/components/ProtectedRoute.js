import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// protected components
import Dashboard from "./pages/Dashboard";
import ChallengeList from "./challenges/ChallengeList";
import ChallengeView from "./challenges/ChallengeView";
import ActivityList from "./activities/ActivityList";
import ActivityView from "./activities/ActivityView";
import ActivityAdd from "./activities/add/ActivityAdd";

const ProtectedRoute = ({ auth }) => {
  return auth === false ? (
    <Redirect to="/login" />
  ) : (
      <div>
        <Route path={`/dashboard`} component={Dashboard} />

        <Route exact path={`/activities`} component={ActivityList} />
        <Route path={`/activities/view/:userActivityId`} component={ActivityView} />
        <Route path={`/activities/add/:userChallengeId`} component={ActivityAdd} />

        <Route exact path={`/challenges`} component={ChallengeList} />
        <Route path="/challenges/view/:userChallengeId" component={ChallengeView} />
      </div>
    );
}

export default connect(
  ({ auth }) => ({ auth })
)(ProtectedRoute);
