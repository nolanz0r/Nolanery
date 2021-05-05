import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { googleProvider } from "../../firebase";

import { providerRegisterAction } from "../../store/actions/auth";

import classes from "./Button.module.scss";

const GoogleButton = () => {
  const dispatch = useDispatch();

  const googleSignUpHandler = (e) => {
    e.preventDefault();

    dispatch(providerRegisterAction(googleProvider));
  };

  return (
    <button onClick={googleSignUpHandler} className={classes.providerButton}>
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
