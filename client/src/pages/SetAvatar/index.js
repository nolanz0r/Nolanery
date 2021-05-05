import React, { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../components/Avatar";
import DownloadInput from "../../components/DownloadInput";
import Button from "../../components/Button";
import { defaultAvatar, newAvatar } from "../../store/actions/auth";

import classes from "./SetAvatar.module.scss";

const SetAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const defAvatar =
    "https://firebasestorage.googleapis.com/v0/b/react-gallery-9f127.appspot.com/o/defaultAvatar.jpg?alt=media&token=0714c875-0bd4-4ece-86b7-411a000f5f94";

  const downloadImageHandler = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = (e) => {
      setTempAvatar(e.target.result);
    };
    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
  };

  const continueNewAvatarHandler = () => {
    dispatch(newAvatar(user.id, avatar));
  };
  const continueDefaultAvatarHandler = () => {
    dispatch(defaultAvatar(user.id, defAvatar));
  };

  return (
    <div className="container fade">
      <div className={classes.wrapper}>
        <div className={classes.setAvatar}>
          <Avatar
            src={tempAvatar === "" ? defAvatar : tempAvatar}
            width="200px"
            height="200px"
          />
          {tempAvatar === "" ? (
            <DownloadInput onChange={downloadImageHandler}>
              Add new avatar
            </DownloadInput>
          ) : (
            <div className={classes.continue}>
              <DownloadInput onChange={downloadImageHandler}>
                New avatar
              </DownloadInput>
              <Button onClick={continueNewAvatarHandler}>
                Continue
                <IoMdArrowRoundForward className={classes.icon} />
              </Button>
            </div>
          )}

          <span>Or</span>
          <div className={classes.continue}>
            <span>Continue with default avatar</span>
            <Button onClick={continueDefaultAvatarHandler}>
              <IoMdArrowRoundForward />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAvatar;
