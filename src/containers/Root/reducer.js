/*
 *
 * Root reducer
 *
 */
import produce from "immer";
import {
  GET_PROFILE_SUCCESS_ACTION,
  GET_PROFILE_ACTION,
  GET_PROFILE_FAILURE_ACTION,
  LOGOUT_ACTION
} from "./constants";
import {
  REGISTER_SUCCESS_ACTION,
  LOGIN_SUCCESS_ACTION
} from "../LoginSignUp/constants";

export const initialState = {
  isLoggedIn: false,
  userDetails: null,
  isLoading: false
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_ACTION:
        draft.isLoading = true;
        break;
      case GET_PROFILE_SUCCESS_ACTION:
        draft.isLoggedIn = true;
        draft.isLoading = false;
        draft.userDetails = action.payload.user;
        break;
      case GET_PROFILE_FAILURE_ACTION:
        draft.isLoading = false;
        break;
      case REGISTER_SUCCESS_ACTION:
      case LOGIN_SUCCESS_ACTION:
        draft.isLoggedIn = true;
        draft.userDetails = action.payload.user;
        break;
      case LOGOUT_ACTION:
        draft.isLoading = false;
        draft.isLoggedIn = false;
    }
  });
