import React, { useEffect, useState } from "react";
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

  const [like, setLike] = useState(liked || false);

  const addLikeHandler = () => {
    setLike(true);
    dispatch(addImageLikeAction(id, visitorId, user.id));
  };

  const removeLikeHandler = () => {
    setLike(false);
    dispatch(removeImageLikeAction(id, visitorId, user.id, image));
  };

  return (
    <button className={classes.cardButton}>
      {!like ? (
        <AiOutlineHeart className={classes.cardIcon} onClick={addLikeHandler} />
      ) : (
        <AiFillHeart
          className={classes.cardLikedIcon}
          onClick={removeLikeHandler}
        />
      )}
    </button>
  );
};

export default ToggleLike;
