import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProtectedHeader extends Component {
  renderNavLinks() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/activities" className="nav-link">Activities</Link>
        </li>
        <li className="nav-item">
          <Link to="/challenges" className="nav-link">Challenges</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
        <Link to="/dashboard" className="navbar-brand">Mountain Challenge</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">          
          {this.renderNavLinks()}
          <span className="navbar-text">
            <a className="nav-link" href="/api/logout">Logout - {this.props.auth.name}</a>
          </span>
        </div>
      </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (ProtectedHeader);
