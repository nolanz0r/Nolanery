import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

import classes from "./DownloadInput.module.scss";

const DownloadInput = ({ onChange, children }) => {
  return (
    <>
      <input
        type="file"
        id="download"
        accept="image/jpeg, image/jpg, image/png"
        className={classes.downloadInput}
        onChange={onChange}
      />
      <label htmlFor="download" className={classes.downloadLabel}>
        <span>{children}</span>
        <IoCloudDownloadOutline className={classes.icon} />
      </label>
    </>
  );
};

export default DownloadInput;
