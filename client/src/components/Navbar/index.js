import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../store/actions/auth";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { AiFillFire, AiFillHeart, AiFillStar } from "react-icons/ai";

import Avatar from "../Avatar";
import Logo from "../Logo";

import classes from "./Navbar.module.scss";

const Navbar = () => {
  const menuRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const { user, loggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const showMenuHandler = () => {
    setToggle(!toggle);
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={classes.wrapper}>
      <div className={`${classes.navbar} container`}>
        <Logo />
        <nav>
          <ul className={classes.list}>
            {loggedIn ? (
              <>
                <li className={classes.listItem}>
                  <NavLink
                    className={classes.listLink}
                    activeClassName={classes.active}
                    to="/feed"
                  >
                    <AiFillStar />
                    Feed
                  </NavLink>
                </li>
                <li className={classes.listItem}>
                  <NavLink
                    className={classes.listLink}
                    activeClassName={classes.active}
                    to="/liked"
                  >
                    <AiFillHeart />
                    Liked
                  </NavLink>
                </li>
                <li className={classes.listItem}>
                  <NavLink
                    className={classes.listLink}
                    activeClassName={classes.active}
                    to="/trends"
                  >
                    <AiFillFire />
                    Trends
                  </NavLink>
                </li>
                <li
                  className={classes.listItemButton}
                  onClick={showMenuHandler}
                  ref={menuRef}
                >
                  <Avatar src={user.avatar} width="35px" height="35px" />
                  <ul
                    className={`${classes.avatarMenu} ${
                      toggle ? classes.active : ""
                    }`}
                  >
                    <li className={classes.avatarMenuItem}>
                      <NavLink
                        className={classes.avatarMenuLink}
                        to={`/profile/${user.id}`}
                      >
                        <CgProfile />
                        Profile
                      </NavLink>
                    </li>
                    <li
                      className={classes.avatarMenuItem}
                      onClick={logoutHandler}
                    >
                      <NavLink className={classes.avatarMenuLink} to="/login">
                        <HiOutlineLogout />
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className={classes.listItem}>
                  <NavLink
                    className={classes.listLink}
                    activeClassName={classes.active}
                    to="/login"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className={classes.listItem}>
                  <NavLink
                    className={classes.listLink}
                    activeClassName={classes.active}
                    to="/register"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
