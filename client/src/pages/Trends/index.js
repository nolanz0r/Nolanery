import React, { useEffect, useRef, useState } from "react";

import { db } from "../../firebase";
import Loader from "../../components/Loader";
import { getArrayOfRandomNumbers } from "../../utils/randomNumbersArray";
import PageImage from "../../components/PageImage";
import { observer } from "../../utils/observer";

import classes from "./Trends.module.scss";

const Trends = () => {
  const [images, setImages] = useState([]);
  const loadRef = useRef(null);

  useEffect(() => {
    const getImages = () => {
      db.ref("images").once("value", (snap) => {
        const images = [];
        snap.forEach((image) => {
          image.forEach((img) => {
            images.push({
              userId: image.key,
              id: img.key,
              image: img.val(),
            });
          });
        });
        const random = getArrayOfRandomNumbers(images.length);

        images
          .filter((image, i) => random.includes(i) && image)
          .map((item) => {
            return db.ref("users/" + item.userId).once("value", (user) => {
              const data = {
                id: item.id,
                user: {
                  id: user.key,
                  avatar: user.val().avatar,
                  name: user.val().name,
                  lastName: user.val().lastName,
                },
                image: item.image,
              };
              setImages((prev) => [...prev, data]);
            });
          });
      });
    };

    observer(loadRef, getImages);
  }, [loadRef]);

  return (
    <PageImage images={images.flat()}>
      <div
        ref={loadRef}
        className={
          !images.length ? classes.loaderWrapper : classes.loadMoreLoader
        }
      >
        <Loader width="60px" />
      </div>
    </PageImage>
  );
};

export default Trends;
