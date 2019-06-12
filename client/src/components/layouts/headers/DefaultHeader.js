import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class DefaultHeader extends Component {

  isLogin = () => {
    return this.props.history.location.pathname === '/login';
  }

  renderLoginLink = () => {
    return this.isLogin() ? null :
      <li className="nav-item">
        <Link to="/login" className="nav-link border rounded pl-3 pr-3 pt-1 pt-1">Login</Link>
      </li>;
  }
  
  renderSignupLink = () => {
    return this.isLogin() ? 
      <li className="nav-item">
        <Link to="/" className="nav-link border rounded pl-3 pr-3 pt-1 pt-1">Sign up</Link>
      </li> : null;
  }

  render() {
    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/" className="navbar-brand">Mountain Challenge</Link>

            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {this.renderLoginLink()}
                {this.renderSignupLink()}
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default connect(({ auth }) => ({ auth })) (withRouter(DefaultHeader));
