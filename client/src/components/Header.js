import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item">
            <a className="nav-link" href="/auth/google">
              Login with Google
            </a>
          </li>
        );
      default:
        return [
          <li key="1" className="nav-item">
            <a className="nav-link" href="/api/logout">
              Logout - {this.props.auth.name}
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Mountain Challenge</Link>

        {this.props.auth ?
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/activities">Activities</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/challenges">Challenges</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li> */}
        </ul>
        : ''}
       
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (Header);
