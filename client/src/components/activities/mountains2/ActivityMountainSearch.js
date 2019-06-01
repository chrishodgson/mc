import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../Field";
import formFields from "./mountainSearchFields";

class ActivityMountainSearch extends Component {

  getAreaList() {
    let list = _.map(this.props.areas, area => {
        return { key: area.name, label: area.name };
    });
    list.unshift({ key: "", label: "" }); 
    return list;
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, options }) => {
      if (name === 'area') {
        options = this.getAreaList();
      }
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
    console.log(this.props, 'ActivityMountainSearch redner');
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderFields()}
          {/* <button className="btn" onClick={this.props.handleSubmit}>
            Search
          </button> */}
        </form>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.activityMountainSearch.values || [],
    mountainSelections: state.mountainSelections,
    areas: state.areas
  };
}

function validate(values) {
  const errors = {};

console.log(values);

  if (!values["mountain"] || !values["area"]) {
    errors["mountain"] = "You must provide a value for the search";
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
