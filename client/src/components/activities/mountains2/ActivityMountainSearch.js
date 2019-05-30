import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../Field";
import formFields from "./mountainSearchFields";

class ActivityMountainSearch extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, options }) => {
      return (
        <ReduxField
          key={name}
          type={type}
          component={Field}
          label={label}
          name={name}
          options={options}
        />
      );
    });
  }

  render() {  
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderFields()}
        </form>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.activityMountainSearch.values || [],
    mountainSelections: state.mountainSelections
  };
}

function validate(values) {
  const errors = {};

  if (!values["mountain"]) {
    errors["mountain"] = "You must provide a value for the search";
  }
  if (!values["country"]) {
    errors["country"] = "You must select a country";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "activityMountainSearch",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps
  )(ActivityMountainSearch)
);
