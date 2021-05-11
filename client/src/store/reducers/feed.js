import { chunk } from "../../utils/chunk";
import { GET_FEED, RESET_FEED, ADD_FEED, FEED_LOADING } from "../actions/feed";

const initialState = {
  images: [],
  current: 0,
  loading: null,
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_FEED:
      const chunkedImages = chunk(action.payload, 10);

      return {
        ...state,
        images: [...state.images, ...chunkedImages[state.current]],
      };

    case ADD_FEED:
      return {
        ...state,
        current: state.current + 1,
      };

    case RESET_FEED:
      return {
        ...state,
        images: [],
        current: -1,
      };

    default:
      return state;
  }
};
