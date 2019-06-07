import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Home extends Component {
  render() {
    if (this.props.auth && this.props.auth._id) {
      this.props.history.push("/dashboard"); 
      return null;  
    }

    return (
      <div style={{ textAlign: "center" }}>
        <li className="list-inline-item"><Link to="/challenges">Challenges</Link></li>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (withRouter(Home));
