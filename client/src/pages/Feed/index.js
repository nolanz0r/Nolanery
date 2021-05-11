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
  const { images, loading } = useSelector((state) => state.feedReducer);

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
          images.length % 10 === 0
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
            <h2>No feed here. Follow someone to see their activities</h2>
          </div>
        )}
      </div>
    </PageImage>
  );
};

export default Feed;
