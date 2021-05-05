import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../Avatar";
import Button from "../Button";
import Paper from "../Paper";
import {
  changeName,
  defaultAvatar,
  newAvatar,
  setName,
  setLastName,
  changeLastName,
} from "../../store/actions/auth";

import classes from "./EditProfile.module.scss";

const EditProfile = () => {
  const [tempAvatar, setTempAvatar] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const [tempName] = useState(user.name);
  const [tempLastName] = useState(user.lastName);

  const defAvatar =
    "https://firebasestorage.googleapis.com/v0/b/react-gallery-9f127.appspot.com/o/defaultAvatar.jpg?alt=media&token=0714c875-0bd4-4ece-86b7-411a000f5f94";

  const changeNameHandler = (e) => {
    dispatch(setName(e.target.value));
  };

  const changeLastNameHandler = (e) => {
    dispatch(setLastName(e.target.value));
  };

  const downloadImageHandler = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = (e) => {
      setTempAvatar(e.target.result);
    };
    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
  };

  const setDefaultAvatarHandler = () => {
    setTempAvatar(defAvatar);
  };

  const confirmChangesHandler = () => {
    if (avatar) {
      dispatch(newAvatar(user.id, avatar));
    }
    if (tempAvatar === defAvatar) {
      dispatch(defaultAvatar(user.id, defAvatar));
    }
    if (tempName !== user.name) {
      dispatch(changeName(user.id, user.name));
    }
    if (tempLastName !== user.lastName) {
      dispatch(changeLastName(user.id, user.lastName));
    }
  };

  return (
    <Paper>
      <div className={classes.editWrapper}>
        <div className={`${classes.editAvatar} ${classes.field}`}>
          <Avatar
            src={tempAvatar ? tempAvatar : user.avatar}
            width="45px"
            height="45px"
          />
          <label htmlFor="avatar">Change profile avatar</label>
          <input id="avatar" type="file" onChange={downloadImageHandler} />
          <span>|</span>
          <Button
            onClick={setDefaultAvatarHandler}
            disabled={user.avatar === defAvatar}
          >
            Set to default
          </Button>
        </div>
        <div className={`${classes.editName} ${classes.field}`}>
          <label className={classes.fieldName}>Name</label>
          <input type="text" value={user.name} onChange={changeNameHandler} />
        </div>
        <div className={`${classes.editName} ${classes.field}`}>
          <label className={classes.fieldName}>Last name</label>
          <input
            type="text"
            value={user.lastName}
            onChange={changeLastNameHandler}
          />
        </div>
        <Button
          onClick={confirmChangesHandler}
          disabled={
            tempAvatar === null &&
            user.name === tempName &&
            user.lastName === tempLastName
          }
        >
          Confirm changes
        </Button>
      </div>
    </Paper>
  );
};

export default EditProfile;
