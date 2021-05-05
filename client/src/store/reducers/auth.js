import {
  LOADING,
  LOGGED_IN,
  SET_LAST_NAME,
  SET_NAME,
  USER_DATA,
} from "../actions/auth";

const initialState = {
  loading: true,
  loggedIn: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        user: {
          id: action.id,
          name: action.name,
          lastName: action.lastName,
          email: action.email,
          avatar: action.avatar,
        },
      };
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    case SET_LAST_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          lastName: action.payload,
        },
      };

    default:
      return state;
  }
};
