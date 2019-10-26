import { createAction } from "redux-actions";
import * as constants from "./constants";
export const registerAction = createAction(
  constants.REGISTER_ACTION,
  (name, email, password) => ({
    name,
    email,
    password
  })
);
export const loginAction = createAction(
  constants.LOGIN_ACTION,
  (email, password) => ({
    email,
    password
  })
);
export const loginSuccessAction = createAction(constants.LOGIN_SUCCESS_ACTION);
export const loginFailureAction = createAction(constants.LOGIN_FAILURE_ACTION);
export const registerSuccessAction = createAction(
  constants.REGISTER_SUCCESS_ACTION
);
export const registerFailureAction = createAction(
  constants.REGISTER_FAILURE_ACTION
);
