import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PageImage from "../../components/PageImage";
import { db } from "../../firebase";

import classes from "./Liked.module.scss";

const Liked = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [images, setImages] = useState([]);

  useEffect(() => {
    db.ref("liked/" + user.id).once("value", (snap) => {
      snap.forEach((item) => {
        db.ref("images/" + item.val().imageUserId)
          .child(item.val().imageId)
          .once("value", (s) => {
            db.ref("users/" + item.val().imageUserId).once("value", (user) => {
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
            });
          });
      });
    });
  }, []);

  return (
    <>
      {images.length > 0 ? (
        <PageImage images={images} />
      ) : (
        <h2 className={classes.emptyTitle}>No liked images</h2>
      )}
    </>
  );
};

export default Liked;
