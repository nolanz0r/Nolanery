export const loginValidation = (values) => {
  const errors = {};
  commonValidation(values, errors);
  return errors;
};

export const registerValidation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 2) {
    errors.name = "Name must be 2 or more characters";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  } else if (values.lastName.length < 2) {
    errors.lastName = "Last name must be 2 or more characters";
  }
  commonValidation(values, errors);
  return errors;
};

export const changePasswordValidation = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  if (!values.repeatPassword) {
    errors.password = "Repeat password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  return errors;
};

const commonValidation = (values, errors) => {
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
};
