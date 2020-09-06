import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  type = "text",
  ...props
}) {

  let inputEl = <input
    type={type}
    className={getFieldCSSClasses(touched[field.name], errors[field.name])}
    {...field}
    {...props}
  />

  if (props.divClasses) {
    inputEl = <div className={props.divClasses}>{inputEl}</div>
  }

  return (
    <>
      {label && <label className={props.labelClasses}>{label}</label>}
      {inputEl}
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
