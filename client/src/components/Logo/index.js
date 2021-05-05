import React from "react";
import { NavLink } from "react-router-dom";
import { IoLogoXing } from "react-icons/io5";

import classes from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <NavLink className={classes.link} to="/">
        <IoLogoXing className={classes.icon} />
        Nolanery
      </NavLink>
    </div>
  );
};

export default Logo;
