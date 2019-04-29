import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// protected components
import Dashboard from "./Dashboard";
import ActivityList from "./activities/ActivityList";
import ActivityView from "./activities/ActivityView";

const ProtectedRoute = ({ auth }) => {
  return auth === false ? (
    <Redirect to="/login" />
  ) : (
      <div>
        <Route path={`/dashboard`} component={Dashboard} />

        <Route exact path={`/activities`} component={ActivityList} />
        {/* <Route path={`${path}/activities/new`} component={ActivityNew} /> */}
        <Route path="/activities/view/:activityId" component={ActivityView} />

        {/* <Route exact path={`${path}/challenges`} component={ChallengeList} /> */}
        {/* <Route path={`${path}/challenges/join`} component={ChallengeJoin} /> */}
        {/* <Route path="/activities/view/:challengeId" component={ChallengeView} /> */}
      </div>
    );
}

export default connect(
  ({ auth }) => ({ auth })
)(ProtectedRoute);
