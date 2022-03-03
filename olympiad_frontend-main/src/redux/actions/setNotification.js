import { SET_NOTIFICATION } from "../types/types";

export const setNotificationAction = (state) => {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: state,
    });
  };
};
