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

      //   db.ref("feed/" + id).on("value", (item) => {
      //     if (item.val()) {
      //       const feedArray = Object.values(item.val()).map((feedItem) => {
      //         const user = db.ref("users/" + feedItem.userId).once("value");

      //         return db
      //           .ref("images/" + feedItem.userId)
      //           .child(feedItem.imageId)
      //           .once("value")
      //           .then((image) => {
      //             return user.then((user) => {
      //               return {
      //                 id: image.key,
      //                 user: {
      //                   id: user.key,
      //                   avatar: user.val().avatar,
      //                   name: user.val().name,
      //                   lastName: user.val().lastName,
      //                 },
      //                 image: image.val(),
      //               };
      //             });
      //           });
      //       });
      //       Promise.all(feedArray).then((item) => {
      //         dispatch({ type: GET_FEED, payload: item });
      //         dispatch({ type: LOADING_FEED, payload: false });
      //       });
      //     } else {
      //       dispatch({ type: LOADING_FEED, payload: false });
      //     }
      //   });
    } catch (e) {}
  };
};
