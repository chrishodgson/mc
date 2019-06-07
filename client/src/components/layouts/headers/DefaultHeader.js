import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DefaultHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
        <Link to="/" className="navbar-brand">Mountain Challenge</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (DefaultHeader);
