import React from "react";

import classes from "./Loader.module.scss";

const Loader = ({ width }) => {
  return (
    <div className={classes.loader} style={{ width: width }}>
      <svg className={classes.circular} viewBox="25 25 50 50">
        <circle
          className={classes.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
