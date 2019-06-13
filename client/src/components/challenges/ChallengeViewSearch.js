import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../utils/Field";
import formFields from "./challengeSearchFields";

class ChallengeViewSearch extends Component {

  renderFields() {
    const fields = _.map(formFields, ({ name, label, type, value, formGroupClass }, index) => {
      return (
        <ReduxField
          key={name + index}
          index={index}
          name={name}
          type={type}
          label={label}
          value={value}
          component={Field}
          formGroupClass={formGroupClass}
        />
      );
    });
    return (
      <div className="form-row mb-4">
        <span className="ml-1 mr-3">Filter mountains:</span> 
        {fields}
      </div>
    );
  }

  render() {  
    return (
      <form onSubmit={this.props.handleSubmit}>          
        {this.renderFields()}
      </form>  
    );
  }
}

export default reduxForm({
  form: "challengeViewSearch",
  destroyOnUnmount: false
}) (ChallengeViewSearch);
