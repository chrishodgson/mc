import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  renderAuth() {
    //TODO separate header for static pages 
    if (this.props.location && this.props.location.pathname === '/login') {
      return null;
    }      

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Link to="/login" className="nav-link">Login</Link>;
      default:
        return <a className="nav-link" href="/api/logout">Logout - {this.props.auth.name}</a>;
    }
  }

  renderNav() {
    //TODO separate header for static pages - check if not an object
    if (this.props.auth !== true) {
      return null;
    }

    return <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/activities" className="nav-link">Activities</Link>
      </li> 
      <li className="nav-item">
        <Link to="/challenges" className="nav-link">Challenges</Link>
      </li> 
    </ul>;
  }

  render() {
    //const home = this.props.auth ? "/";
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
        <Link to="/" className="navbar-brand">Mountain Challenge</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">          
            {this.renderNav()}
          <span className="navbar-text">
            {this.renderAuth()}
          </span>
        </div>
      </nav>
    );
  }
}

export default connect(({ auth, location }) => ({ auth, location })) (withRouter(Header));
