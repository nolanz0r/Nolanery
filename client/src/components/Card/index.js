import React, { useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineExpand,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import ToggleLike from "../ToggleLike";

import classes from "./Card.module.scss";

const Card = ({
  src,
  alt,
  onClick,
  deleteImageHandler,
  addLikeHandler,
  removeLikeHandler,
  liked,
}) => {
  const [loaded, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const imageRef = useRef(null);
  const { user } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.profileReducer);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <div className={classes.card}>
      <div className={classes.cardOverlay}>
        <ToggleLike
          liked={liked}
          addLikeHandler={addLikeHandler}
          removeLikeHandler={removeLikeHandler}
        />
        {currentUser.id === user.id && (
          <button className={classes.cardButton} onClick={openModalHandler}>
            <AiOutlineDelete className={classes.cardIcon} />
          </button>
        )}
        <button
          className={classes.cardButton}
          onClick={() => onClick(imageRef)}
        >
          <AiOutlineExpand className={classes.cardIconExpand} />
        </button>
      </div>
      <img
        className={loaded ? classes.image : classes.noImage}
        src={src}
        alt={alt}
        ref={imageRef}
        onLoad={() => setLoader(true)}
      />
      {openModal && (
        <Modal onClick={() => setOpenModal(false)}>
          <div className={classes.modal}>
            <AiOutlineClose />
            <h2>Are you sure?</h2>
            <p>This action cannot be undone.</p>
          </div>
          <div className={classes.modalButtons}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button onClick={deleteImageHandler} danger>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Card;
