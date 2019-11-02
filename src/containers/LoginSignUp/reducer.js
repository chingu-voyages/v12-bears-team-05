/*
 *
 * LoginSignUp reducer
 *
 */
import produce from "immer";
import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  LOGIN_SUCCESS_ACTION,
  REGISTER_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  REGISTER_FAILURE_ACTION
} from "./constants";

export const initialState = {
  isLoading: false,
  authToken: null
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_ACTION:
      case REGISTER_ACTION:
        draft.isLoading = true;
        break;
      case LOGIN_SUCCESS_ACTION:
      case REGISTER_SUCCESS_ACTION:
        draft.userDetails = action.payload.user;
        draft.isLoading = false;
        break;
      case LOGIN_FAILURE_ACTION:
        draft.isLoading = false;
        draft.loginError = action.payload;
        break;
      case REGISTER_FAILURE_ACTION:
        draft.isLoading = false;
        draft.registerError = action.payload;
        break;
    }
  });
