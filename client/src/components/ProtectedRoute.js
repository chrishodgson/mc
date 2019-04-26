import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//protected components
import Dashboard from "./Dashboard";

const ProtectedRoute = ({ match: { path }, auth }) => 
  !auth ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Route exact path={`${path}/dashboard`} component={Dashboard} />
    </div>
  );

function mapStateToProps(state) {

  //console.log(state, 'ProtectedRoute');

  return { state };
}

export default connect(mapStateToProps)(ProtectedRoute);

// export default connect(state => ({auth})) (ProtectedRoute);
// export default ProtectedRoute;
