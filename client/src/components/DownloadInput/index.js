import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

import Button from "../Button";

import classes from "./DownloadInput.module.scss";

const DownloadInput = ({ onChange, children }) => {
  return (
    <Button>
      <input
        type="file"
        id="download"
        className={classes.downloadInput}
        onChange={onChange}
      />
      <label htmlFor="download" className={classes.downloadLabel}>
        <span>{children}</span>
        <IoCloudDownloadOutline className={classes.icon} />
      </label>
    </Button>
  );
};

export default DownloadInput;
