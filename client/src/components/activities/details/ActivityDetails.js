import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Field from "../../utils/Field";
import formRows from "./activityDetailsFields";

class ActivityDetails extends Component {

  componentDidMount() {
    if (this.props.userChallenges.length === 0) {
      this.props.history.push("/dashboard"); // TODO flash message - error page not valid
      return;
    }
  }

  getUserChallengeList() {
    let list = _.map(this.props.userChallenges, userChallenge => {
      return { key: userChallenge._id, label: userChallenge.name };
    });
    list.unshift({"key": "", "label": '-- Select a challenge --'});
    return list;
  }

  renderFields() {
    return _.map(formRows, (formRow, index) => {
      const fields = _.map(formRow, ({ label, name, formGroupClass, placeholder, type }) => {
        let options = [];
        if (name === 'challenge') {
          options = this.getUserChallengeList();
        }
        return (
          <ReduxField
            key={name}
            type={type}
            component={Field}
            formGroupClass={formGroupClass}
            placeholder={placeholder}
            label={label}
            name={name}
            options={options}
          />
        );
      });
      return <div key={index} className="form-row">{fields}</div>
    });  
  }

  render() {
    return (
      <div>
        <h4 className="page-heading">Step 1: New Activity</h4>

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
              {this.renderFields()}
              <div className="buttons">
                <Link to="/dashboard" className="btn btn-light border">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-secondary">
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            {/* <div class="card">
              <div class="card-header">
                Title
              </div>
              <div class="card-body">
                <h5 class="card-title">Entering the Date</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const messages = {
    name: "You must provide a title",    
    challenge: "You must select a challenge",
    startDate: "You must select a date",
  }
  const errors = {};
  _.each(formRows, formFields => {
    _.each(formFields, ({ name, required }) => {
      if (required && !values[name]) {
        errors[name] = messages[name] || "You must provide a value";
      }
    });
  });  
  return errors;
}

export default reduxForm({
  validate,
  form: "activityDetails",
  destroyOnUnmount: false
})(
    connect(
        ({ userChallenges }) => ({userChallenges})
    )(withRouter(ActivityDetails))
);
