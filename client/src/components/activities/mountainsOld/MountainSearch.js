import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Field from "../../Field";
import formFields from "./mountainSearchFields";
import { searchMountains } from "../../../actions";

class MountainSearch extends Component {
  state = { mountainsError: false };

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

  handleNext(e) {
    e.preventDefault();
    const mountainsError = this.props.mountainSelection.length === 0;
    this.setState({ mountainsError });
    if (mountainsError) {
      return;
    }
    this.props.onSubmit();
  }

  handleSearch() {
    this.props.searchMountains(
      this.props.formValues.mountain,
      this.props.formValues.country
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(() => this.handleSearch())}>
          {this.renderFields()}

          {this.state.mountainsError ? (
            <p className="red-text">
              Please select at least one mountain before proceeding.
            </p>
          ) : (
            ""
          )}

          <button type="submit" className="btn">
            Search
          </button>
          <Link to="/dashboard" className="btn">
            Back
          </Link>
          <button onClick={e => this.handleNext(e)} className="btn">
            Next
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.mountainSearch.values || [],
    mountainSelection: state.mountainSelection
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
  form: "mountainSearch",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { searchMountains }
  )(MountainSearch)
);
