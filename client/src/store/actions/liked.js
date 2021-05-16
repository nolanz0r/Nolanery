import { db } from "../../firebase";

export const LIKED_LOADING = "LIKED_LOADING";
export const GET_LIKED = "GET_LIKED";
export const ADD_LIKED = "ADD_LIKED";
export const RESET_LIKED = "RESET_LIKED";

export const getLikedData = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: LIKED_LOADING, payload: true });

      db.ref("liked/" + id).once("value", (snap) => {
        if (snap.val()) {
          const images = Object.values(snap.val()).map((item) => {
            return db
              .ref("images/" + item.imageUserId)
              .child(item.imageId)
              .once("value")
              .then((image) => {
                return db
                  .ref("users/" + item.imageUserId)
                  .once("value")
                  .then((user) => {
                    return {
                      id: image.key,
                      user: {
                        id: user.key,
                        avatar: user.val().avatar,
                        name: user.val().name,
                        lastName: user.val().lastName,
                      },
                      image: image.val(),
                    };
                  });
              });
          });
          Promise.all(images).then((result) =>
            dispatch({
              type: GET_LIKED,
              payload: result.reverse(),
            })
          );
        } else {
          dispatch({ type: LIKED_LOADING, payload: false });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addLikedAction = () => {
  return { type: ADD_LIKED };
};

export const resetLikedAction = () => {
  return { type: RESET_LIKED };
};
