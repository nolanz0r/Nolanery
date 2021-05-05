import {
  PROGRESS,
  PROFILE_DATA,
  GET_IMAGES,
} from "../actions/profile";

const initialState = {
  progress: 0,
  images: [],
  currentUser: {},
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case PROFILE_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
