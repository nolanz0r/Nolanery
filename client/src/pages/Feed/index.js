import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import PageImage from "../../components/PageImage";
import { db } from "../../firebase";

import classes from "./Feed.module.scss";

const Feed = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.ref("following/" + user.id).on("child_added", (snap) => {
      if (snap.val()) {
        db.ref("users/" + snap.val()).once("value", (user) => {
          db.ref("images/" + user.key).on("child_added", (image) => {
            const data = {
              id: image.key,
              user: {
                id: user.key,
                avatar: user.val().avatar,
                name: user.val().name,
                lastName: user.val().lastName,
              },
              image: image.val(),
            };
            setImages((prev) => [...prev, data]);
            setLoading(false);
          });
        });
      }
    });
  }, [user.id]);

  return (
    <>
      {loading ? (
        <div className={classes.emptyTitle}>
          <Loader width="60px" />
        </div>
      ) : (
        <>
          {images.length > 0 ? (
            <PageImage
              images={images
                .sort(
                  (a, b) =>
                    new Date(a.image.createdAt) - new Date(b.image.createdAt)
                )
                .reverse()}
            />
          ) : (
            <h2 className={classes.emptyTitle}>No liked images</h2>
          )}
        </>
      )}
    </>
  );
};

export default Feed;
