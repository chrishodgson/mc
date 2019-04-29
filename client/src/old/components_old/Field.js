import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import React from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";
import momentLocaliser from "react-widgets-moment";
import Moment from "moment";

Moment.locale("en");
momentLocaliser();
simpleNumberLocalizer();

export default props => {
  const {
    input,
    type,
    label,
    index,
    options,
    meta: { error, touched },
    showTime,
    minimumNumber,
    maximumNumber
  } = props;

  const renderNumberPicker = ({ onChange, value }, min, max) => {
    return (
      <NumberPicker
        onChange={onChange}
        min={min || 0}
        max={max || 99999}
        format="00"
        value={!value ? 0 : value}
      />
    );
  };

  //todo default to today
  const renderDateTimePicker = ({ onChange, value }, showTime) => {
    return (
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime || false}
        //defaultValue={new Date(value)}
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
    return (
      <div className="form-group">
        <label>{label}</label>
        {children}
        {renderError()}
      </div>
    );
  };

  const radioLayout = children => {
    return (
      <div className="form-group">
        {index === 0 ? renderError() : ""}
        {children}
        <label className="form-check-label">{label}</label>
        {renderError()}
      </div>
    );
  };

  const renderError = () => {
    //{touched && (error && <span>{error}</span>)}
    return (
      <div className="red-text" style={{ marginBottom: "10px" }}>
        {touched && error}
      </div>
    );
  };

  const renderField = () => {
    switch (type) {
      case "number":
        return renderNumberPicker(input, minimumNumber, maximumNumber);
      case "date":
      case "datetime":
        return renderDateTimePicker(input, showTime);
      case "textarea":
        return defaultLayout(<textarea {...input} className="form-control" />);
      case "select":
        return defaultLayout(
          <select {...input} className="form-control">
            {renderOptions()}
          </select>
        );
      case "radio":
        return radioLayout(
          <input {...input} type="radio" className="form-check-input" />
        );
      case "text":
      default:
        return defaultLayout(
          <input {...input} type="text" className="form-control" />
        );
    }
  };

  return <div>{renderField()}</div>;
};
