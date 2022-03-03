import { LOGGED_IN, ADMIN_LOGGED_IN, ONLINE_USERS } from "./types/types";

const initialState = {
  LoggedIn: false,
  adminLOggedIn: false,
  onlineUsers: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      let { LoggedIn } = state;
      LoggedIn = action.payload;
      return { ...state, LoggedIn };
    case ADMIN_LOGGED_IN:
      let { adminLOggedIn } = state;
      adminLOggedIn = action.payload;
      return { ...state, adminLOggedIn };
    case ONLINE_USERS:
      let { onlineUsers } = state;
      onlineUsers = action.payload;

      return { ...state, onlineUsers };
    default:
      return state;
  }
};

export default UserReducer;
