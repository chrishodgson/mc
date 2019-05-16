import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { Link } from "react-router-dom";
import Field from "../../Field";
import formFields from "./activityDetailsFields";

class ActivityDetails extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type }) => {
      return (
        <ReduxField
          key={name}
          name={name}
          type={type}
          label={label}
          component={Field}
        />
      );
    });
  }

  // handleNext(e) {
  //   e.preventDefault();
  //   const mountainsError = this.props.mountainSelection.length === 0;
  //   this.setState({ mountainsError });
  //   if (mountainsError) {
  //     return;
  //   }
  //   this.props.onSubmit();
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}
          <Link to="/dashboard" className="btn">
            Back
          </Link>
          {/* <button onClick={e => this.handleNext(e)} className="btn">
            Next
          </button> */}
          <button onClick={this.props.onSubmit} className="btn">
            Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "activityDetails",
  destroyOnUnmount: false
})(ActivityDetails);
