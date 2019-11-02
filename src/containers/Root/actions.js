import { createAction } from "redux-actions";
import {
  GET_PROFILE_ACTION,
  LOGOUT_ACTION,
  GET_PROFILE_SUCCESS_ACTION
} from "./constants";

export const getProfileAction = createAction(GET_PROFILE_ACTION);

export const getProfileSuccessAction = createAction(GET_PROFILE_SUCCESS_ACTION);

export const logoutAction = createAction(LOGOUT_ACTION);
