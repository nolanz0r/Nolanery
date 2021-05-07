import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export const LOADING_IMAGES = "LOADING_IMAGES";
export const PROGRESS = "PROGRESS";
export const PROFILE_DATA = "PROFILE_DATA";
export const GET_IMAGES = "GET_IMAGES";
export const ADD_IMAGE = "ADD_IMAGE";
export const GET_FOLLOWERS = "GET_FOLLOWERS";
export const GET_FOLLOWING = "GET_FOLLOWING";
export const ADD_FOLLOW = "ADD_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

export const getImagesAction = (id) => {
  return (dispatch) => {
    try {
      db.ref("images/" + id).once("value", (snap) => {
        dispatch({ type: LOADING_IMAGES, payload: true });
        if (snap.val()) {
          dispatch({
            type: GET_IMAGES,
            payload: snap.val(),
          });

          dispatch({ type: LOADING_IMAGES, payload: false });
        } else {
          dispatch({ type: GET_IMAGES, payload: [] });
          dispatch({ type: LOADING_IMAGES, payload: false });
        }
      });
    } catch (e) {}
  };
};

export const addImageAction = (e, id) => {
  return async (dispatch) => {
    const imageName = uuidv4() + "." + e.target.files[0].name.split(".").pop();
    try {
      const uploadTask = storage.ref(id + "/" + imageName);
      uploadTask.put(e.target.files[0]).on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 110;
          dispatch({ type: PROGRESS, payload: progress });
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          e.preventDefault();

          uploadTask.getDownloadURL().then((url) => {
            const date = new Date();
            date.setHours(date.getHours() + 3);

            db.ref("images/" + id)
              .push({
                imageUrl: url,
                imageName: imageName,
                createdAt: date.toISOString(),
              })
              .then(dispatch(getImagesAction(id)));
          });
          e.target.value = "";
          dispatch({ type: PROGRESS, payload: 0 });
          dispatch({ type: LOADING_IMAGES, payload: true });
        }
      );
    } catch (e) {}
  };
};

export const getProfileDataAction = (id) => {
  return (dispatch) => {
    try {
      db.ref("users/" + id).once("value", (snap) => {
        dispatch({
          type: PROFILE_DATA,
          payload: Object.assign({}, snap.val(), { id: snap.key }),
        });
      });
    } catch (e) {}
  };
};

export const addImageLikeAction = (imageId, imageUserId, userId) => {
  return (dispatch) => {
    try {
      db.ref("images/" + imageUserId + "/" + imageId)
        .child("likes")
        .push(userId);

      db.ref("liked/" + userId).push({ imageId, imageUserId });
    } catch (e) {}
  };
};

export const removeImageLikeAction = (imageId, imageUserId, userId, image) => {
  return (dispatch) => {
    try {
      Object.entries(image.likes).map(
        ([a, b]) =>
          b === userId &&
          db
            .ref("images/" + imageUserId + "/" + imageId)
            .child("likes/" + a)
            .remove()
      );

      db.ref("liked/" + userId).once("value", (snap) => {
        snap.forEach(
          (item) =>
            item.val().imageId === imageId &&
            db
              .ref("liked/" + userId)
              .child(item.key)
              .remove()
        );
      });
    } catch (e) {}
  };
};

export const followAction = (id, userId) => {
  return (dispatch) => {
    try {
      db.ref("following/" + userId).push(id);

      db.ref("followers/" + id).push(userId);

      dispatch({ type: ADD_FOLLOW });
    } catch (e) {}
  };
};

export const unFollowAction = (id, userId) => {
  return (dispatch) => {
    try {
      db.ref("following/" + userId).once("value", (snap) => {
        for (let i in snap.val()) {
          snap.val()[i] === id &&
            db
              .ref("following/" + userId)
              .child(i)
              .remove();
        }
      });

      db.ref("followers/" + id).once("value", (snap) => {
        for (let i in snap.val()) {
          snap.val()[i] === userId &&
            db
              .ref("followers/" + id)
              .child(i)
              .remove();
        }
      });

      dispatch({ type: REMOVE_FOLLOW });
    } catch (e) {}
  };
};

export const getFollowing = (id) => {
  return (dispatch) => {
    try {
      db.ref("following/" + id).once("value", (snap) => {
        snap.val()
          ? dispatch({
              type: GET_FOLLOWING,
              payload: Object.keys(snap.val()).length,
            })
          : dispatch({
              type: GET_FOLLOWING,
              payload: 0,
            });
      });
    } catch (e) {}
  };
};

export const getFollowers = (id) => {
  return (dispatch) => {
    try {
      db.ref("followers/" + id).once("value", (snap) => {
        snap.val()
          ? dispatch({
              type: GET_FOLLOWERS,
              payload: Object.keys(snap.val()).length,
            })
          : dispatch({
              type: GET_FOLLOWERS,
              payload: 0,
            });
      });
    } catch (e) {}
  };
};
