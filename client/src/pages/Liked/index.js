import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

import PageImage from "../../components/PageImage";
import {
  addLikedAction,
  getLikedData,
  resetLikedAction,
} from "../../store/actions/liked";
import { observer } from "../../utils/observer";

import classes from "./Liked.module.scss";

const Liked = () => {
  const loadRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { images, loading, chunks, current } = useSelector(
    (state) => state.likedReducer
  );

  useEffect(() => {
    dispatch(resetLikedAction());
  }, [dispatch]);

  useEffect(() => {
    observer(loadRef, () => {
      dispatch(addLikedAction(user.id));
      dispatch(getLikedData(user.id));
    });
  }, [loadRef, dispatch, user]);

  return (
    <PageImage images={images}>
      <div
        ref={loadRef}
        className={
          chunks !== current
            ? !images.length
              ? classes.emptyTitle
              : classes.loadMoreLoader
            : classes.hideLoader
        }
      >
        {loading ? (
          <Loader width="60px" />
        ) : (
          <div className={classes.loadMoreLoader}>
            <h2>No liked images</h2>
          </div>
        )}
      </div>
    </PageImage>
  );
};

export default Liked;
