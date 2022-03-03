import { GET_CHALLENGE } from "../types/types";

export const ChallengeAction = (state) => {
  return (dispatch) => {
    dispatch({
      type: GET_CHALLENGE,
      payload: state,
    });
  };
};
