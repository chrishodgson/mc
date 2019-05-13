import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// protected components
import Dashboard from "./Dashboard";
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
        <Route path={`/activities/view/:activityId`} component={ActivityView} />
        <Route path={`/activities/add`} component={ActivityAdd} />

        <Route exact path={`/challenges`} component={ChallengeList} />
        <Route path="/challenges/view/:challengeId" component={ChallengeView} />
      </div>
    );
}

export default connect(
  ({ auth }) => ({ auth })
)(ProtectedRoute);
