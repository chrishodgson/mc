import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class ProtectedHeader extends Component {

  renderAuthLinks() {
    return this.props.auth ? (
      <span className="navbar-text">
        <a href="/api/logout" title={"Logout - " + this.props.auth.name}>Logout</a>
        <Link className="icon-add-activity fa fa-plus-circle ml-3" to="/activities/add"></Link>
      </span>
    ) : null;
  }

  renderNavLinks() {
    return (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/activities" className="nav-link">Activities</Link>
        </li>
        <li className="nav-item">
          <Link to="/challenges" className="nav-link">Challenges</Link>
        </li>
        <li className="nav-item">
          <Link to="/activities/add" className="nav-link">Add Activity</Link>
        </li>
      </ul>
    );
  }

  render() {
    // navbar-light bg-white
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/dashboard" className="navbar-brand">Mountain Challenge</Link>

          <div className="collapse navbar-collapse" id="navbarContent">          
            {this.renderNavLinks()}
            {this.renderAuthLinks()}
          </div>
        </div>      
      </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (withRouter(ProtectedHeader));
