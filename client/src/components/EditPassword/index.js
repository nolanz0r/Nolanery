import React from "react";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "../../store/actions/auth";
import { ToastContainer } from "react-toastify";

import Button from "../Button";
import Paper from "../Paper";
import { changePasswordValidation } from "../../utils/validateRules";

import classes from "./EditPassword.module.scss";
import { useForm } from "../../hooks/useForm";

const EditPassword = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    dispatch(changePasswordAction(values));
  };

  const { values, handleChange, handleSubmit } = useForm(
    formSubmitHandler,
    changePasswordValidation
  );

  return (
    <>
      <Paper>
        <form className={classes.editWrapper} onSubmit={handleSubmit}>
          <div className={classes.field}>
            <label>New password</label>
            <input
              name="password"
              type="password"
              value={values.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className={classes.field}>
            <label>Repeat new password</label>
            <input
              name="repeatPassword"
              type="password"
              value={values.repeatPassword || ""}
              onChange={handleChange}
            />
          </div>
          <Button>Confirm changes</Button>
        </form>
      </Paper>
      <ToastContainer autoClose={4000} position="bottom-right" />
    </>
  );
};

export default EditPassword;
