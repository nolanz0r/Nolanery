import React from "react";
import { Link } from "react-router-dom";

import Register from "../Auth/Register";

import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.homeWrapper}>
      <div className={classes.home}>
        <div className={classes.wrapper}>
          <div className={`${classes.inner} container`}>
            <div className={classes.content}>
              <h1>Welcome to Nolanery</h1>
              <p>Here you can share images with a lot of interesting people.</p>
              <p>
                <span>Check our </span>
                <Link className={classes.homeLink} to="/trends">
                  Trends
                </Link>
                <span> or Sign up.</span>
              </p>
            </div>
            <div className={classes.register}>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
