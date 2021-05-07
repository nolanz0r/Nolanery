import {
  PROGRESS,
  PROFILE_DATA,
  GET_IMAGES,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  ADD_FOLLOW,
  REMOVE_FOLLOW,
  ADD_IMAGE,
  LOADING_IMAGES,
} from "../actions/profile";

const initialState = {
  loading: true,
  progress: 0,
  images: [],
  currentUser: {},
  following: 0,
  followers: 0,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_IMAGES:
      return {
        ...state,
        loading: action.payload,
      };
    case PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };

    case GET_IMAGES:
      const reversed = Object.entries(action.payload).reverse();

      return {
        ...state,
        images: Object.fromEntries(reversed),
      };

    case ADD_IMAGE:
      return {
        ...state,
        images: state.images.push(action.payload),
      };

    case PROFILE_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };

    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };

    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };

    case ADD_FOLLOW:
      return {
        ...state,
        followers: state.followers + 1,
      };

    case REMOVE_FOLLOW:
      return {
        ...state,
        followers: state.followers - 1,
      };

    default:
      return state;
  }
};
