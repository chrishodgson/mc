import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field as ReduxField } from "redux-form";
import { connect } from "react-redux";
import Field from "../../Field";
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
    const fields = _.map(formFields, ({ label, name, className, placeholder, type, options }) => {
      if (name === 'area') {
        options = this.getAreaList();
      }
      return (        
        <ReduxField
          key={name}
          type={type}
          component={Field}
          className={className}
          placeholder={placeholder}
          label={label}
          name={name}
          options={options}
        />
      );
    });
    return <div className="form-row">{fields}</div>;
  }
  
  render() {  
    return (
      <div>
        <form className="form-inline" onSubmit={this.props.handleSubmit}>
          {this.renderFields()}
        </form>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.activityMountainSearch ? state.form.activityMountainSearch.values : [],
    mountainSelections: state.mountainSelections,
    areas: state.areas
  };
}

export default reduxForm({
  form: "activityMountainSearch",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps
  )(ActivityMountainSearch)
);
