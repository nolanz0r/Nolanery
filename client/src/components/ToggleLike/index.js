import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  addImageLikeAction,
  removeImageLikeAction,
} from "../../store/actions/profile";

import classes from "./ToggleLike.module.scss";

const ToggleLike = ({ data, liked, likeCounter }) => {
  const { id, visitorId, image } = data;
  const { user, loggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  let likes = data.image.likes ? Object.keys(data.image.likes).length : 0;
  const [countOfLikes, setCountOfLikes] = useState(likes);

  const [like, setLike] = useState(liked || false);

  const addLikeHandler = () => {
    if (loggedIn) {
      setLike(true);
      setCountOfLikes(countOfLikes + 1);
      dispatch(addImageLikeAction(id, visitorId, user.id));
    } else {
      history.push("/login");
    }
  };

  const removeLikeHandler = () => {
    if (loggedIn) {
      setLike(false);
      setCountOfLikes(countOfLikes - 1);
      dispatch(removeImageLikeAction(id, visitorId, user.id, image));
    } else {
      history.push("/login");
    }
  };

  return (
    <div className={classes.toggleLike}>
      <button className={classes.cardButton}>
        {!like ? (
          <AiOutlineHeart
            className={classes.cardIcon}
            onClick={addLikeHandler}
          />
        ) : (
          <AiFillHeart
            className={classes.cardLikedIcon}
            onClick={removeLikeHandler}
          />
        )}
      </button>
      {likeCounter && <span>{countOfLikes}</span>}
    </div>
  );
};

export default ToggleLike;
