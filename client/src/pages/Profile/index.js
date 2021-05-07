import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import DownloadInput from "../../components/DownloadInput";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import ProgressBar from "../../components/ProgressBar";
import {
  addImageAction,
  getFollowers,
  getFollowing,
  getImagesAction,
  getProfileDataAction,
} from "../../store/actions/profile";
import Modal from "../../components/Modal";
import { db, storage } from "../../firebase";

import classes from "./Profile.module.scss";
import ToggleFollow from "../../components/ToggleFollow";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { progress, currentUser, images, following, followers } = useSelector(
    (state) => state.profileReducer
  );
  const match = useRouteMatch();
  const [current, setCurrent] = useState(null);
  const history = useHistory();

  const addImageHandler = (e) => {
    dispatch(addImageAction(e, match.params.id));
  };

  const openImageModalHandler = (id) => {
    setCurrent(id);
  };

  const closeModalHandler = () => {
    setCurrent(null);
  };

  const prevImageHandler = () => {
    setCurrent(current === 0 ? Object.values(images).length - 1 : current - 1);
  };

  const nextImageHandler = () => {
    setCurrent(current >= Object.values(images).length - 1 ? 0 : current + 1);
  };

  const deleteImageHandler = (id, name) => {
    storage
      .ref(user.id + "/" + name)
      .delete()
      .then(
        db
          .ref("images/" + user.id)
          .child(id)
          .remove()
      )
      .then(
        db.ref("liked/" + user.id).once("value", (snap) => {
          snap.forEach(
            (item) =>
              item.val().imageId === id &&
              db
                .ref("liked/" + user.id)
                .child(item.key)
                .remove()
          );
        })
      );
  };

  useEffect(() => {
    dispatch(getProfileDataAction(match.params.id));
    dispatch(getImagesAction(match.params.id));
    dispatch(getFollowers(match.params.id));
    dispatch(getFollowing(match.params.id));
  }, [match, dispatch]);

  return (
    <div className="container fade">
      {currentUser ? (
        <div className={classes.profile}>
          {currentUser.avatar === "" ? (
            <div className={classes.loaderWrapper}>
              <Loader width="40px" />
            </div>
          ) : (
            <>
              <div className={classes.profileHeader}>
                <IoArrowBack onClick={() => history.goBack()} />
              </div>
              <div className={classes.profileInfo}>
                <Avatar src={currentUser.avatar} width="130px" height="130px" />
                <div>
                  <div className={classes.name}>
                    <h2>
                      {currentUser.name} {currentUser.lastName}
                    </h2>
                    <span>@{match.params.id}</span>
                  </div>
                  <ul className={classes.info}>
                    <li className={classes.infoItem}>
                      Photos:
                      <span>{(images && Object.keys(images).length) || 0}</span>
                    </li>
                    <li className={classes.infoItem}>
                      Followers:
                      <span>{followers}</span>
                    </li>
                    <li className={classes.infoItem}>
                      Following:
                      <span>{following}</span>
                    </li>
                  </ul>
                </div>
                {match.params.id === user.id ? (
                  <>
                    <div className={classes.buttons}>
                      <DownloadInput onChange={addImageHandler}>
                        Add new image to gallery
                      </DownloadInput>
                      <Link to="/edit/profile">
                        <Button>
                          Edit profile
                          <AiOutlineEdit className={classes.icon} />
                        </Button>
                      </Link>
                    </div>
                    <ProgressBar
                      value={progress}
                      width="60%"
                      active={progress === 0 || progress === 100}
                    />
                  </>
                ) : (
                  <ToggleFollow id={match.params.id} />
                )}
              </div>
            </>
          )}

          {progress ? (
            <div className={classes.cards}>
              <Loader width="40px" />
            </div>
          ) : (
            <div className={classes.cards}>
              {images && Object.entries(images).length !== 0 ? (
                Object.entries(images).map(([id, image], i) => (
                  <Card
                    key={id}
                    src={image.imageUrl}
                    deleteImageHandler={() =>
                      deleteImageHandler(id, image.imageName)
                    }
                    onClick={() => openImageModalHandler(i)}
                    data={{
                      id: id,
                      visitorId: match.params.id,
                      image: image,
                    }}
                    liked={
                      image.likes &&
                      Object.values(image.likes).includes(user.id)
                    }
                  />
                ))
              ) : (
                <h2 className={classes.cardsTitle}>No images</h2>
              )}
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
      {current !== null && (
        <Modal onClick={closeModalHandler}>
          <div className={classes.modalImage}>
            <div
              className={`${classes.arrow} ${classes.arrowLeft}`}
              onClick={prevImageHandler}
            >
              <AiOutlineArrowLeft />
            </div>
            <img
              src={Object.values(images)[current].imageUrl}
              alt={Object.values(images)[current].imageUrl}
            />
            <div
              className={`${classes.arrow} ${classes.arrowRight}`}
              onClick={nextImageHandler}
            >
              <AiOutlineArrowRight />
            </div>
          </div>
          <div className={classes.modalFooter}>
            <span>{`${current + 1} / ${Object.values(images).length}`}</span>
            <span>{Object.values(images)[current].createdAt}</span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
