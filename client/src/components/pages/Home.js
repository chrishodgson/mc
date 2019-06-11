import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    if (this.props.auth && this.props.auth._id) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className="row">
        <div className="col">
          <h4>Join our Wainwright walking challenges in the Lakes District.</h4>
        </div>
        <div className="col">
          <a href="/auth/google">Sign up with Google</a>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (Home);
