import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import PageImage from "../../components/PageImage";
import { getFeedData } from "../../store/actions/feed";

import classes from "./Feed.module.scss";

const Feed = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { loading, images } = useSelector((state) => state.feedReducer);

  useEffect(() => {
    dispatch(getFeedData(user.id));
  }, [user.id, dispatch]);

  return (
    <>
      {loading ? (
        <div className={classes.emptyTitle}>
          <Loader width="60px" />
        </div>
      ) : (
        <>
          {images.length > 0 ? (
            <PageImage images={images} />
          ) : (
            <h2 className={classes.emptyTitle}>No following users</h2>
          )}
        </>
      )}
    </>
  );
};

export default Feed;
