import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../utils/Field";
import formFields from "./mountainSearchFields";

class ActivityMountainSearch extends Component {

  getAreaList() {
    let list = _.map(this.props.areas, area => {
        return { key: area._id, label: area.name };
    });
    list.unshift({ key: "", label: "" }); 
    return list;
  }

  renderFields() {
    const fields = _.map(formFields, ({ name, label, type, formGroupClass, placeholder }) => {
      let options = [];
      if (name === 'area') {
        options = this.getAreaList();
      }
      return (        
        <ReduxField
          key={name}
          name={name}
          type={type}
          label={label}
          component={Field}
          formGroupClass={formGroupClass}
          placeholder={placeholder}
          options={options}
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
  form: "activityMountainSearch",
  destroyOnUnmount: false
})(
  connect( ({ areas }) => ({ areas }) )(ActivityMountainSearch)
);
