import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth";
import { profileReducer } from "./reducers/profile";
import { likedReducer } from "./reducers/liked";
import { feedReducer } from "./reducers/feed";

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  feedReducer,
  likedReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
