import { LOADING_FEED, GET_FEED } from "../actions/feed";

const initialState = {
  loading: true,
  images: [],
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FEED:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_FEED:
      return {
        ...state,
        images: [...action.payload],
      };

    default:
      return state;
  }
};
