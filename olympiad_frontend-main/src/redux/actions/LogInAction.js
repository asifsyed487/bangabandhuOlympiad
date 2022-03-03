import { LOGGED_IN } from "../types/types";

export const LoginAction = (state) => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      payload: state,
    });
  };
};
