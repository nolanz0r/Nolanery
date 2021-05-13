import { chunk } from "../../utils/chunk";
import {
  GET_LIKED,
  RESET_LIKED,
  ADD_LIKED,
  LIKED_LOADING,
} from "../actions/liked";

const initialState = {
  images: [],
  current: 0,
  loading: null,
  chunks: null,
};

export const likedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKED_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_LIKED:
      const chunkedImages = chunk(action.payload, 10);

      return {
        ...state,
        images: [...state.images, ...chunkedImages[state.current]],
        chunks: chunkedImages.length,
      };

    case ADD_LIKED:
      return {
        ...state,
        current: state.current + 1,
      };

    case RESET_LIKED:
      return {
        ...state,
        images: [],
        current: -1,
      };

    default:
      return state;
  }
};
