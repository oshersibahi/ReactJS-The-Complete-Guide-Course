import { useState } from "react";

import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => {
  const emailAddressformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(emailAddressformat);
};

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: isFirstNameVaild,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: isLastNameValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const firstNameInputClasses = !firstNameHasError
    ? "form-control"
    : "form-control invalid";

  const lastNameInputClasses = !lastNameHasError
    ? "form-control"
    : "form-control invalid";

  const emailInputClasses = !emailHasError
    ? "form-control"
    : "form-control invalid";

  let isFormValid = false;
  if (isFirstNameVaild && isLastNameValid && isEmailValid) {
    isFormValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHandler}
            value={enteredFirstName}
            type="text"
            id="name"
          />
        </div>
        {firstNameHasError && (
          <p className="error-text">Please enter a valid first name.</p>
        )}
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
            value={enteredLastName}
            type="text"
            id="name"
          />
        </div>
        {lastNameHasError && (
          <p className="error-text">Please enter a valid last name.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
          type="text"
          id="name"
        />
      </div>
      {emailHasError && (
        <p className="error-text">Email must not be empty and valid address.</p>
      )}
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
