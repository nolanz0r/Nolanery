import { history } from "../../index";
import { auth, db, storage } from "../../firebase";
import { toast } from "react-toastify";

export const LOADING = "LOADING";
export const LOGGED_IN = "LOGGED_IN";
export const USER_DATA = "USER_DATA";
export const SET_NAME = "SET_NAME";
export const SET_LAST_NAME = "SET_LAST_NAME";

export const loginAction = (values) => {
  const { email, password } = values;
  return async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then((user) => {
        db.ref("users/" + user.user.uid).on("value", (snap) => {
          snap.val().avatar ? history.push("/") : history.push("/avatar");
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerAction = (values) => {
  const { name, lastName, email, password } = values;
  return async (dispatch) => {
    const formatName = (name) => {
      let lowerName = name.toLowerCase();
      return (
        lowerName.slice(0, 1).toUpperCase() + lowerName.slice(1, name.length)
      );
    };
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          db.ref("users/" + user.user.uid).set({
            name: formatName(name),
            lastName: formatName(lastName),
            email,
          });
        });
      history.push("/avatar");
    } catch (e) {}
  };
};

export const providerRegisterAction = (provider) => {
  return async (dispatch) => {
    try {
      await auth.signInWithPopup(provider).then((user) => {
        const [name, lastName] = user.user.displayName.split(" ");
        db.ref("users/" + user.user.uid).on(
          "value",
          (snap) =>
            !snap.exists() &&
            db.ref("users/" + user.user.uid).set({
              avatar: user.user.photoURL,
              name,
              lastName,
              email: user.user.email,
            })
        );
      });

      history.push("/avatar");
    } catch (error) {}
  };
};

export const userAuthAction = () => {
  return async (dispatch) => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.ref("users/" + user.uid).on("value", (snapshot) => {
            if (snapshot.val()) {
              dispatch({
                type: USER_DATA,
                id: user.uid,
                name: snapshot.val().name,
                lastName: snapshot.val().lastName,
                email: snapshot.val().email,
                avatar: snapshot.val().avatar,
              });
            }
            if (snapshot.val().avatar === undefined) {
              dispatch({ type: LOGGED_IN, payload: false });
              history.push("/avatar");
            } else {
              dispatch({ type: LOGGED_IN, payload: true });
            }
            dispatch({ type: LOADING, payload: false });
          });
        } else {
          dispatch({ type: LOGGED_IN, payload: false });
          dispatch({ type: LOADING, payload: false });
        }
      });
    } catch (e) {}
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    try {
      auth
        .signOut()
        .then(
          dispatch({
            type: USER_DATA,
            name: "",
            email: "",
          })
        )
        .then(dispatch({ type: LOGGED_IN, payload: false }))
        .then(history.push("/login"));
    } catch (e) {}
  };
};

export const changePasswordAction = (values) => {
  return async (dispatch) => {
    const { password, repeatPassword } = values;

    try {
      if (password === repeatPassword) {
        await auth.currentUser.updatePassword(password).then(
          () => {
            return toast.success("Password updated");
          },
          (error) => {
            return toast.error("Something goes wrong. Try later");
          }
        );
      } else {
        return toast.error("Passwords not the same");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const defaultAvatar = (id, avatar) => {
  return async (dispatch) => {
    try {
      await db.ref("users/" + id).update({ avatar });
      history.push("/");
    } catch (e) {}
  };
};

export const newAvatar = (id, avatarFile) => {
  return async (dispatch) => {
    try {
      const avatar = storage.ref(id + "/" + avatarFile.name);

      avatar.put(avatarFile).on("state_changed", async () => {
        await avatar.getDownloadURL().then((url) => {
          db.ref("users/" + id).update({ avatar: url });
        });
        history.push("/");
      });
    } catch (e) {}
  };
};

export const setName = (name) => {
  return { type: SET_NAME, payload: name };
};

export const setLastName = (lastName) => {
  return { type: SET_LAST_NAME, payload: lastName };
};

export const changeName = (id, name) => {
  return async (dispatch) => {
    try {
      await db.ref("users/" + id).update({ name });
      history.push("/");
    } catch (e) {}
  };
};

export const changeLastName = (id, lastName) => {
  return async (dispatch) => {
    try {
      await db.ref("users/" + id).update({ lastName });
      history.push("/");
    } catch (e) {}
  };
};
