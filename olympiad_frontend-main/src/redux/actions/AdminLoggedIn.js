import { ADMIN_LOGGED_IN } from "../types/types";

export const AdminLoginAction = (state) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_LOGGED_IN,
      payload: state,
    });
  };
};
