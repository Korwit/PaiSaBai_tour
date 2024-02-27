/** @format */
import React, { useEffect, useState, useCallback } from "react";
import validator from "validator";
import classNames from "classnames";
import { InputTag, TextField } from "./partials";

const SimpleInput = ({
  formObj,
  name,
  placeholder,
  onChange,
  onValidationChange,
  pattern,
  errorMessage = "required field",
  required,
  autoFocus,
  type,
  currency = "€",
  readonly,
  validated,
  max,
  ns,
  children,
  decimalSeparator = ".",
  thousandSeparator = "'",
}) => {
  const [isvalid, setisvalid] = useState();
  const [localValue, setlocalValue] = useState("");

  const inputField = React.createRef();

  useEffect(() => {
    let localval = formObj[name] === 0 ? "0" : formObj[name];

    if (type === "percent1") {
      localval = Number(localval) * 100 + "";
    }
    setlocalValue(localval || "");
    const valid = checkIsValid(formObj[name]);
    setisvalid(valid);

    let item = {
      name: name,
      valid: { valid, error: !valid ? errorMessage : null },
    };

    onValidationChange && onValidationChange(item);
  }, [formObj]);

  useEffect(
    () => () => {
      // console.log('unmount');
      let item = {
        name: name,
        valid: null,
      };
      onValidationChange && onValidationChange(item);
    },
    []
  );

  const handleChange = (event) => {
    let { value } = event.target;
    const regex = new RegExp(`(${currency} | ${currency})`, "g");
    const updated = { ...formObj };

    if (
      value &&
      (type === "money" || type === "percent" || type === "number")
    ) {
      value += "";
      value = value.replace(regex, "");
      console.log(value);
      if (thousandSeparator === ".") value = value.replace(/\./g, "");
      if (thousandSeparator === ",") value = value.replace(/,/g, "");
      if (thousandSeparator === "'") value = value.replace(/'/g, "");
      console.log(value, Number(value));

      value = value.replace(/ %/g, "");
      updated[event.target.name] = Number(value) || value;
    } else if (value && type === "percent1") {
      value += "";
      value = value.replace(/ %/g, "");
      updated[event.target.name] = Number(value) / 100;
    } else {
      updated[event.target.name] = value;
    }

    setlocalValue(value);
    const valid = checkIsValid(value);

    onChange(updated);
  };

  const checkIsValid = (value) => {
    const stringvalue = `${value}`;
    let output = false;
    if (
      stringvalue !== "null" &&
      stringvalue !== "" &&
      stringvalue !== "undefined"
    ) {
      let valid = !pattern || validator.matches(stringvalue, pattern, "i");
      if ((type === "money" || type === "number") && max) {
        valid = valid && value <= max;
      }
      output = valid;
    } else output = !required;

    return output;
  };

  const validatedclass = classNames("animatedlabel", {
    "fade-in": localValue,
    "fade-out": !localValue,
    "text-success": validated && isvalid,
    "d-none": validated && !isvalid,
    "text-info": !validated,
  });
  const placeholderclass = classNames("placeholderlabel", {
    "d-none": localValue,
  });
  const errorclass = classNames("animatedlabel text-danger", {
    "d-none": !validated || isvalid,
    "fade-in": !isvalid,
  });

  const wrapperClass = classNames("simpleinput", {
    "with-text": localValue,
    "with-errors": validated && !isvalid,
    readonly: readonly,
  });

  const setFocus = () => {
    if (inputField.current && inputField.current.focus)
      inputField.current.focus();
  };

  return (
    <div className={wrapperClass}>
      <div className="relative">
        <InputTag
          inputRef={inputField}
          type={type}
          value={localValue}
          name={name}
          onChange={handleChange}
          readonly={readonly}
          autoFocus={autoFocus}
          currency={currency}
          decimalSeparator={decimalSeparator}
          thousandSeparator={thousandSeparator}
        />

        <TextField
          children={children}
          className={placeholderclass}
          text={placeholder}
          onClick={setFocus}
          ns={ns}
        />
        <TextField
          children={children}
          className={validatedclass}
          text={placeholder}
          ns={ns}
        />
        <TextField
          children={children}
          className={errorclass}
          text={errorMessage}
          ns={ns}
        />
      </div>
    </div>
  );
};

SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
