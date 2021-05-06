import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";
import ToggleLike from "../ToggleLike";

import classes from "./PageImage.module.scss";

const PageImage = ({ images, children }) => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="container fade">
      <div className={classes.pageImage}>
        {images.length !== 0 &&
          images.map((data) => (
            <div key={data.id} className={classes.card}>
              <div className={classes.cardHeader}>
                <Link to={`/profile/${data.user.id}`}>
                  <Avatar src={data.user.avatar} width="50px" height="50px" />
                  <span>{data.user.name}</span>
                  <span>{data.user.lastName}</span>
                </Link>
              </div>
              <div>
                <img
                  src={data.image.imageUrl}
                  className={classes.image}
                  alt={data.user.name}
                />
              </div>
              <div className={classes.cardFooter}>
                <div className={classes.cardLikeCounter}>
                  <ToggleLike
                    data={{
                      id: data.id,
                      visitorId: data.user.id,
                      image: data.image,
                    }}
                    liked={
                      data.image.likes &&
                      Object.values(data.image.likes).includes(user.id)
                    }
                  />
                  {data.image.likes && Object.keys(data.image.likes).length}
                </div>
                <span>{data.image.createdAt}</span>
              </div>
            </div>
          ))}
        {children}
      </div>
    </div>
  );
};

export default PageImage;
