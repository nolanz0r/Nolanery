import { db } from "../../firebase";

export const LOADING_FEED = "LOADING_FEED";
export const GET_FEED = "GET_FEED";

export const getFeedData = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: LOADING_FEED, payload: true });

      db.ref("following/" + id).once("value", (snap) => {
        if (snap.val()) {
          const images = Object.values(snap.val()).map((item) => {
            return db
              .ref("images/" + item)
              .once("value")
              .then((image) => {
                return Object.entries(image.val()).map(async ([id, item]) => {
                  return await db
                    .ref("users/" + image.key)
                    .once("value")
                    .then((user) => {
                      return {
                        id,
                        user: {
                          id: user.key,
                          avatar: user.val().avatar,
                          name: user.val().name,
                          lastName: user.val().lastName,
                        },
                        image: item,
                      };
                    });
                });
              });
          });
          
          Promise.all(
            images.map((item) => item.then((a) => Promise.all(a)))
          ).then((result) => {
            dispatch({
              type: GET_FEED,
              payload: result
                .flat()
                .sort(
                  (a, b) =>
                    new Date(a.image.createdAt) - new Date(b.image.createdAt)
                )
                .reverse(),
            });
            dispatch({ type: LOADING_FEED, payload: false });
          });
        } else {
          dispatch({ type: LOADING_FEED, payload: false });
        }
      });
    } catch (e) {}
  };
};
