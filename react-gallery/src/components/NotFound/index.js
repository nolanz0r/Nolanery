import React from "react";
import { Link } from "react-router-dom";
import { ImSad } from "react-icons/im";

import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h2 className={classes.title}>
        Page not found <ImSad />
      </h2>
      <p className={classes.text}>
        Go back to home page <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
