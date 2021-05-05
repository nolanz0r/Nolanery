import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../components/Button";
import GoogleButton from "../../components/Button/GoogleButton";
import { useForm } from "../../hooks/useForm";
import { loginAction } from "../../store/actions/auth";
import { loginValidation } from "../../utils/validateRules";

import classes from "./Auth.module.scss";

const Login = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    dispatch(loginAction(values));
  };

  const { values, handleChange, handleSubmit } = useForm(
    formSubmitHandler,
    loginValidation
  );

  return (
    <div className={`${classes.auth} fade`}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Sign in</h2>
        <input
          className={classes.field}
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          className={classes.field}
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <Button>Sign in</Button>
        <span>Or</span>
        <GoogleButton />
      </form>
      <ToastContainer autoClose={4000} position="bottom-right" />
    </div>
  );
};

export default Login;
