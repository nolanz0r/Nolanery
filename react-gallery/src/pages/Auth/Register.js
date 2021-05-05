import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../components/Button";
import { useForm } from "../../hooks/useForm";
import { registerValidation } from "../../utils/validateRules";
import { registerAction } from "../../store/actions/auth";
import GoogleButton from "../../components/Button/GoogleButton";

import classes from "./Auth.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    dispatch(registerAction(values));
  };

  const { values, handleChange, handleSubmit } = useForm(
    formSubmitHandler,
    registerValidation
  );

  return (
    <div className={`${classes.auth} fade`}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Sign up</h2>

        <div className={classes.name}>
          <input
            className={classes.field}
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            className={classes.field}
            type="text"
            name="lastName"
            placeholder="Last name"
            value={values.lastName}
            onChange={handleChange}
          />
        </div>
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
        <Button>Sign Up</Button>
        <span>Or</span>
        <GoogleButton />
      </form>
      <ToastContainer autoClose={4000} position="bottom-right" />
    </div>
  );
};

export default Register;
