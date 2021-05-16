import { chunk } from "../../utils/chunk";
import { GET_FEED, RESET_FEED, ADD_FEED, FEED_LOADING } from "../actions/feed";

const initialState = {
  images: [],
  currentChunk: 0,
  current: 0,
  loading: null,
  chunks: null,
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
        images: [...state.images, ...chunkedImages[state.currentChunk]],
        chunks: chunkedImages.length,
        current: state.currentChunk + 1,
      };

    case ADD_FEED:
      return {
        ...state,
        currentChunk: state.currentChunk + 1,
      };

    case RESET_FEED:
      return {
        ...state,
        images: [],
        currentChunk: -1,
        chunks: null,
      };

    default:
      return state;
  }
};
