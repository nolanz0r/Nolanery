import React from "react";
import classes from "./Avatar.module.scss";

const Avatar = ({ src, width, height }) => {
  return (
    <img
      className={classes.avatar}
      src={src}
      width={width}
      height={height}
      alt="avatar"
    />
  );
};

export default Avatar;
