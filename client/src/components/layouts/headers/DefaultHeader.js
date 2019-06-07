import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DefaultHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
        <Link to="/" className="navbar-brand">Mountain Challenge</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (DefaultHeader);
