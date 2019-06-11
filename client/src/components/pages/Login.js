import React from "react";

const Login = () => (
  <div className="row">
    <div className="col-4">
      <div className="card text-center">
        <div className="card-header">
          Log In
        </div>
        <div className="card-body">
          {/* <h5 className="card-title">Login with Google</h5> */}
          <a href="/auth/google">Login using Google</a>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
