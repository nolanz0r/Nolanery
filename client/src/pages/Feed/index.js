import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import PageImage from "../../components/PageImage";
import {
  addFeedAction,
  getFeedData,
  resetFeedAction,
} from "../../store/actions/feed";
import { observer } from "../../utils/observer";

import classes from "./Feed.module.scss";

const Feed = () => {
  const loadRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { images, loading, chunks } = useSelector((state) => state.feedReducer);

  useEffect(() => {
    dispatch(resetFeedAction());
  }, [dispatch]);

  useEffect(() => {
    observer(loadRef, () => {
      dispatch(addFeedAction(user.id));
      dispatch(getFeedData(user.id));
    });
  }, [loadRef, dispatch, user]);

  return (
    <PageImage images={images}>
      <div
        ref={loadRef}
        className={
          chunks !== images.length / 10
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
            <h2>Follow someone to see their activities</h2>
          </div>
        )}
      </div>
    </PageImage>
  );
};

export default Feed;
