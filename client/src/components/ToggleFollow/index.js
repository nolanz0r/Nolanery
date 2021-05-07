import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { followAction, unFollowAction } from "../../store/actions/profile";

import Button from "../Button";

import classes from "./ToggleFollow.module.scss";

const ToggleFollow = ({ id }) => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [follow, setFollow] = useState(false);

  const followHandler = () => {
    setFollow(true);
    dispatch(followAction(id, user.id));
  };

  const unFollowHandler = () => {
    setFollow(false);
    dispatch(unFollowAction(id, user.id));
  };

  useEffect(() => {
    db.ref("following/" + user.id).on("value", (snap) => {
      snap.val() && setFollow(Object.values(snap.val()).includes(id));
    });
  });

  return (
    <div className={classes.buttons}>
      {!follow ? (
        <Button onClick={followHandler}>Follow</Button>
      ) : (
        <Button danger onClick={unFollowHandler}>
          Unfollow
        </Button>
      )}
    </div>
  );
};

export default ToggleFollow;
