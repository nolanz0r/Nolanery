import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import classes from "./ToggleLike.module.scss";

const ToggleLike = ({ liked, addLikeHandler, removeLikeHandler }) => {
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
