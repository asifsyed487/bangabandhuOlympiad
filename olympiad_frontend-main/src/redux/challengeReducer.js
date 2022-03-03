import { GET_CHALLENGE, SET_NOTIFICATION } from "./types/types";

const initialState = {
  gameInfo: "",
  noti: 0,
};

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHALLENGE:
      let { gameInfo } = state;
      gameInfo = action.payload;
      return { ...state, gameInfo };
    case SET_NOTIFICATION:
      let { noti } = state;
      noti = action.payload;
      return { ...state, noti };
    default:
      return state;
  }
};

export default challengeReducer;
