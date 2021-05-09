import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth";
import { profileReducer } from "./reducers/profile";
import { feedReducer } from "./reducers/feed";

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  feedReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
