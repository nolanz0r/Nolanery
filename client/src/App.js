import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userAuthAction } from "./store/actions/auth";

import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader";
import SetAvatar from "./pages/SetAvatar";
import Edit from "./pages/Edit";

import classes from "./static/styles/App.module.scss";
import Liked from "./pages/Liked";
import Feed from "./pages/Feed";

function App() {
  const dispatch = useDispatch();
  const { loading, loggedIn, user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(userAuthAction());
  }, [dispatch]);

  return (
    <div className={classes.app}>
      {loading ? (
        <div className={classes.loaderWrapper}>
          <Loader width="60px" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="main">
            {!loggedIn ? (
              <Switch>
                {typeof user.avatar === "undefined" && user.name ? (
                  <Route path="/avatar" component={SetAvatar} />
                ) : (
                  <Redirect from="/avatar" to="/login" />
                )}
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile/:id" component={Profile} />
                <Route exact path="/trends" component={Trends} />
                <Route exact path="/" component={Home} />
                <Redirect to="/login" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/profile/:id" component={Profile} />
                <Route path="/edit" component={Edit} />
                <Route path="/notfound" component={NotFound} />
                <Route exact path="/trends" component={Trends} />
                <Route path="/liked" component={Liked} />
                <Route path="/feed" component={Feed} />
                <Redirect from="/avatar" to="/" />
                <Redirect from="/" to="/trends" />
                <Redirect to="/notfound" />
              </Switch>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
