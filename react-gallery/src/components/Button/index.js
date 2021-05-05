import React from "react";

import classes from "./Button.module.scss";

const Button = ({ children, danger, ...rest }) => {
  return (
    <button
      className={`${classes.button} ${danger ? classes.danger : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
