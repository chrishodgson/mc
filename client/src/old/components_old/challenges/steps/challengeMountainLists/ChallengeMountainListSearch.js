import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Field from "../../../Field";
import formFields from "./challengeMountainListSearchFields";
import { searchMountainLists } from "../../../../actions";

class ChallengeMountainListSearch extends Component {
  state = { mountainListError: false };

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
    const mountainListError = this.props.mountainListSelection.length === 0;
    this.setState({ mountainListError });
    if (mountainListError) {
      return;
    }
    this.props.onSubmit();
  }

  handleSearch() {
    this.props.searchMountainLists(this.props.formValues.country);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(() => this.handleSearch())}>
          {this.renderFields()}

          {this.state.mountainListError ? (
            <p className="red-text">
              Please select a mountain list before proceeding.
            </p>
          ) : (
            ""
          )}

          <button type="submit" className="grey btn-flat white-text">
            Search
          </button>

          <Link to="/dashboard" className="grey btn-flat white-text">
            Back
          </Link>
          <button
            onClick={e => this.handleNext(e)}
            className="grey btn-flat white-text right"
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.challengeMountainListSearch.values || [],
    mountainListSelection: state.mountainListSelection
  };
}

function validate(values) {
  const errors = {};

  if (!values["country"]) {
    errors["country"] = "You must select a country";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "challengeMountainListSearch",
  destroyOnUnmount: false,
  initialValues: { country: "UK" }
})(
  connect(
    mapStateToProps,
    { searchMountainLists }
  )(ChallengeMountainListSearch)
);
