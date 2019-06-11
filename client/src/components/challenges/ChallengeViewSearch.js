import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import Field from "../utils/Field";
import formFields from "./challengeSearchFields";

class ChallengeViewSearch extends Component {

  renderFields() {
    const fields = _.map(formFields, ({ label, name, formGroupClass, type }) => {
      return (
        <ReduxField
          key={name}
          type={type}
          component={Field}
          formGroupClass={formGroupClass}
          label={label}
          name={name}
        />
      );
    });
    return <div className="form-row">{fields}</div>;
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

export default reduxForm({
  form: "challengeViewSearch",
  destroyOnUnmount: false
}) (ChallengeViewSearch);
