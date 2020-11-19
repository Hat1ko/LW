import {
  CLEAR_STORE,
  SAVE_ACCESS_TOKEN,
  SAVE_REFRESH_TOKEN,
  ADD_RESTORE_DATA
} from "./types";

const initialState = {
  accessToken: null,
  refreshToken: null,
  dataRestorePassword: {}
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload
      };
    case SAVE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: payload
      };
    case ADD_RESTORE_DATA:
      return {
        ...state,
        dataRestorePassword: {
          ...state.dataRestorePassword,
          [payload.name]: payload.value
        }
      };
    case CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};
