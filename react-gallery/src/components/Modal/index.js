import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Modal.module.scss";

const Modal = ({ children, onClick }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modalOverlay} onClick={onClick}></div>
      <div className={classes.modalContent}>{children}</div>
      <div className={classes.close}>
        <AiOutlineClose onClick={onClick} />
      </div>
    </div>
  );
};

export default Modal;
