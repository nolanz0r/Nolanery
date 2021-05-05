import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiFillLock } from "react-icons/ai";

import EditPassword from "../../components/EditPassword";
import EditProfile from "../../components/EditProfile";

import classes from "./Edit.module.scss";

const Edit = () => {
  return (
    <div className="container fade">
      <div className={classes.edit}>
        <ul className={classes.tabs}>
          <NavLink
            className={classes.tab}
            to="/edit/profile"
            activeClassName={classes.active}
          >
            <CgProfile />
            Edit profile
          </NavLink>
          <NavLink
            className={classes.tab}
            to="/edit/password"
            activeClassName={classes.active}
          >
            <AiFillLock />
            Change password
          </NavLink>
        </ul>
        <Switch>
          <Route path="/edit/profile" component={EditProfile} />
          <Route path="/edit/password" component={EditPassword} />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    </div>
  );
};

export default Edit;
