import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  addImageLikeAction,
  removeImageLikeAction,
} from "../../store/actions/profile";

import classes from "./ToggleLike.module.scss";

const ToggleLike = ({ data, liked }) => {
  const { id, visitorId, image } = data;
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const addLikeHandler = () => {
    dispatch(addImageLikeAction(id, visitorId, user.id));
  };

  const removeLikeHandler = () => {
    dispatch(removeImageLikeAction(id, visitorId, user.id, image));
  };

  return (
    <>
      {!liked ? (
        <button className={classes.cardButton} onClick={addLikeHandler}>
          <AiOutlineHeart className={classes.cardIcon} />
        </button>
      ) : (
        <button className={classes.cardButton} onClick={removeLikeHandler}>
          <AiFillHeart className={classes.cardLikedIcon} />
        </button>
      )}
    </>
  );
};

export default ToggleLike;
