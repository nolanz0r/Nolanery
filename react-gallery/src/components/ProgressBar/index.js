import React from "react";
import classes from "./ProgressBar.module.scss";

const ProgressBar = ({ value, width, active }) => {
  return (
    <progress
      className={`${classes.progress} ${active ? classes.active : ""}`}
      max="100"
      value={value}
      style={{ width: width }}
    />
  );
};
export default ProgressBar;
