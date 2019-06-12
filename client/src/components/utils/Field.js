import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import React from "react";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocaliser from "react-widgets-moment";
import Moment from "moment";

Moment.locale("en");
momentLocaliser();

export default props => {
  const {
    input,
    key,
    index,
    name,
    type,
    label,
    placeholder,
    formGroupClass,
    options,
    meta: { error, touched },
    showTime
  } = props;

  //todo default to today
  const renderDateTimePicker = ({ onChange, value }, showTime) => {
    return (
        <DateTimePicker
          onChange={onChange}
          format="DD MMM YYYY"
          time={showTime || false}
          defaultValue={new Date()}
          value={!value ? null : new Date(value)}
        />
    );
  };

  const renderOptions = () => {
    return _.map(options, ({ key, label }) => {
      return (
        <option key={key} value={key}>
          {label}
        </option>
      );
    });
  };

  const defaultLayout = children => {
    const className = formGroupClass ? 'form-group ' + formGroupClass : 'form-group';
    return (
      <div className={className}>
        <label htmlFor={key}>{label}</label>
        {children}
        {renderError()}
      </div>
    );
  };

  const radioLayout = children => {
    const className = formGroupClass ? 'form-check ' + formGroupClass : 'form-check';
    return (
      <div className={className}>
        {index === 0 ? renderError() : ""}
        {children}
        <label htmlFor={key} className="form-check-label">{label}</label>
      </div>
    );
  };

  const renderError = () => {
    return touched && (error && <div className="text-danger">{error}</div>);
  };

  const renderField = () => {
    switch (type) {
      case "date":
        return defaultLayout(
          renderDateTimePicker(input, showTime)
        );
      case "radio":
        return radioLayout(
          <input {...input} name={name} type="radio" className="form-check-input" id={key} />
        );
      case "textarea":
        return defaultLayout(
          <textarea {...input} className="form-control" placeholder={placeholder || ''} />
        );
      case "select":
        return defaultLayout(
          <select {...input} className="form-control">{renderOptions()}</select>
        );
      case "text":
      default:
        return defaultLayout(
          <input {...input} type="text" className="form-control" id={key} placeholder={placeholder || ''} />
        );
    }
  };

  return renderField();
};
