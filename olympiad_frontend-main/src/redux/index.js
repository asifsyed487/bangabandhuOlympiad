import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import challengeReducer from "./challengeReducer";

export default combineReducers({
  UserReducer: UserReducer,
  challengeReducer: challengeReducer,
});
