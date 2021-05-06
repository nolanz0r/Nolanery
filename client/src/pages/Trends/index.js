import React, { useEffect, useRef, useState } from "react";

import { db } from "../../firebase";
import Loader from "../../components/Loader";
import { getArrayOfRandomNumbers } from "../../utils/randomNumbersArray";

import classes from "./Trends.module.scss";
import PageImage from "../../components/PageImage";

const Trends = () => {
  const [images, setImages] = useState([]);
  const loadRef = useRef(null);

  // const getUsers = () => {
  //   fetch(
  //     "https://api.unsplash.com/photos/random/?count=30&client_id=JI-6PbuY2rD5CKt5VTCLiKdVkiNWUpIp_AnGkId8uE8"
  //   )
  //     .then((data) => data.json())
  //     .then((json) => {
  //       json.map((image) =>
  //         fetch(
  //           `https://api.unsplash.com/users/${image.user.username}/photos?client_id=JI-6PbuY2rD5CKt5VTCLiKdVkiNWUpIp_AnGkId8uE8`
  //         )
  //           .then((data) => data.json())
  //           .then((json) => {
  //             db.ref("users")
  //               .push({
  //                 avatar: json[0].user.profile_image.large,
  //                 email: "",
  //                 name: json[0].user.first_name,
  //                 lastName: json[0].user.last_name,
  //               })
  //               .then((snap) => {
  //                 json.map((image) =>
  //                   db.ref("images/" + snap.key).push({
  //                     imageUrl: image.urls.regular,
  //                     createdAt: image.created_at,
  //                   })
  //                 );
  //               });
  //           })
  //       );
  //     });
  // };

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
            return db.ref("users/" + item.userId).on("value", (user) => {
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

    // getUsers();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getImages();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }
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
