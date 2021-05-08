import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

import PageImage from "../../components/PageImage";
import { db } from "../../firebase";

import classes from "./Liked.module.scss";

const Liked = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.ref("liked/" + user.id).once("value", (snap) => {
      if (snap.val()) {
        snap.forEach((item) => {
          db.ref("images/" + item.val().imageUserId)
            .child(item.val().imageId)
            .once("value", (s) => {
              db.ref("users/" + item.val().imageUserId).on("value", (user) => {
                const data = {
                  id: item.val().imageId,
                  user: {
                    id: user.key,
                    avatar: user.val().avatar,
                    name: user.val().name,
                    lastName: user.val().lastName,
                  },
                  image: s.val(),
                };
                setImages((prev) => [data, ...prev]);
                setLoading(false);
              });
            });
        });
      } else {
        setLoading(false);
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
            <PageImage images={images} />
          ) : (
            <h2 className={classes.emptyTitle}>No liked images</h2>
          )}
        </>
      )}
    </>
  );
};

export default Liked;
