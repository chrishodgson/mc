import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    if (this.props.auth && this.props.auth._id) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div style={{ textAlign: "center" }}>
        Sign up with Google
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (Home);
