import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { db } from "../../firebase";
import { followAction, unFollowAction } from "../../store/actions/profile";

import Button from "../Button";

import classes from "./ToggleFollow.module.scss";

const ToggleFollow = ({ id }) => {
  const { user, loggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [follow, setFollow] = useState(false);

  const followHandler = () => {
    if (loggedIn) {
      setFollow(true);
      dispatch(followAction(id, user.id));
    } else {
      history.push("/login");
    }
  };

  const unFollowHandler = () => {
    if (loggedIn) {
      setFollow(false);
      dispatch(unFollowAction(id, user.id));
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    db.ref("following/" + user.id).once("value", (snap) => {
      if (snap.val()) {
        setFollow(Object.values(snap.val()).includes(id));
      }
    });
  }, [user.id, id]);

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
