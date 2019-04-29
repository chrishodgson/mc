import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../../Field";
import formFields from "./challengeMountainListSearchFields";
import { searchMountainLists } from "../../../../actions";

class ChallengeMountainListSearch extends Component {
  componentDidMount() {
    if (this.props.mountainListSearch.length === 0) {
      this.handleSearch();
    }
  }

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

  handleSearch() {
    this.props.searchMountainLists(this.props.formValues.country);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(() => this.handleSearch())}>
          {this.renderFields()}

          <button type="submit" className="grey btn-flat white-text">
            Search
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mountainListSearch: state.mountainListSearch,
    formValues: state.form.challengeMountainListSearch.values || []
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
