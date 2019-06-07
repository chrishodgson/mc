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

  render() {
    return (
      <div>
        <h4 className="page-heading">Step 1: New Activity</h4>

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
    );
  }
}

function validate(values) {
  const errors = {};

  // _.each(formFields, ({ name, required }) => {
  //   // if (required && !values[name]) {
  //   //   errors[name] = "You must provide a value";
  //   // }
  //   if (!values["name"]) {
  //     errors["name"] = "You must provide a value for the name";
  //   }
  //   if (!values["description"]) {
  //     errors["description"] = "You must provide a value for the description";
  //   }
  //   if (!values["startDate"]) {
  //     errors["startDate"] = "You must select a date";
  //   }
  // });
  return errors;
}

export default reduxForm({
  validate,
  form: "activityDetails",
  destroyOnUnmount: false
})(ActivityDetails);
