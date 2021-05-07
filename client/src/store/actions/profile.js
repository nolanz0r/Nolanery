import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export const PROGRESS = "PROGRESS";
export const PROFILE_DATA = "PROFILE_DATA";
export const GET_IMAGES = "GET_IMAGES";

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
            db.ref("images/" + id).push({
              imageUrl: url,
              imageName: imageName,
              createdAt: new Date().toISOString(),
            });
          });
          e.target.value = "";
          setTimeout(() => {
            dispatch({ type: PROGRESS, payload: 0 });
          }, 550);
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

export const getImagesAction = (id) => {
  return (dispatch) => {
    try {
      db.ref("images/" + id).on("value", (snap) => {
        if (snap.val()) {
          dispatch({
            type: GET_IMAGES,
            payload: snap.val(),
          });
        } else {
          dispatch({ type: GET_IMAGES, payload: [] });
        }
      });
    } catch (e) {}
  };
};

export const followAction = (id, userId) => {
  return (dispatch) => {
    try {
      db.ref("following/" + userId).push(id);

      db.ref("followers/" + id).push(userId);
    } catch (e) {}
  };
};

export const unFollowAction = (id, userId) => {
  return (dispatch) => {
    try {
      db.ref("following/" + userId).once("child_added", (snap) => {
        db.ref("following/" + userId)
          .child(snap.key)
          .remove();
      });

      db.ref("followers/" + id).once("child_added", (snap) => {
        db.ref("followers/" + id)
          .child(snap.key)
          .remove();
      });
    } catch (e) {}
  };
};
