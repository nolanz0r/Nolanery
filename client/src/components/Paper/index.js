import React from "react";

import classes from "./Paper.module.scss";

const Paper = ({ children }) => {
  return <div className={classes.paper}>{children}</div>;
};

export default Paper;
