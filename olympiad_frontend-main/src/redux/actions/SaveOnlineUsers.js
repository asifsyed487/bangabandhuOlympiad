import { ONLINE_USERS } from "../types/types";

export const SaveOnlineUsers = (state) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_USERS,
      payload: state,
    });
  };
};
