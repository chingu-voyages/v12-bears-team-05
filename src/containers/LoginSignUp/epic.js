import { ofType, combineEpics } from "redux-observable";
import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  LOGIN_SUCCESS_ACTION,
  REGISTER_SUCCESS_ACTION
} from "./constants";
import { map, catchError, mergeMap } from "rxjs/operators";
import { doLogin, doRegister } from "./api";
import {
  loginSuccessAction,
  loginFailureAction,
  registerSuccessAction,
  registerFailureAction
} from "./actions";
import { push } from "connected-react-router";
import { of } from "rxjs";

const loginEpics = (action$, state$) => {
  return action$.pipe(
    ofType(LOGIN_ACTION),
    mergeMap(({ payload }) => {
      console.log("doing login");
      return doLogin(payload).pipe(
        map(response => loginSuccessAction(response)),
        catchError(error => {
          console.log("error", error);
          return of(loginFailureAction(error));
        })
      );
    })
  );
};

const registerEpics = (action$, state$) => {
  return action$.pipe(
    ofType(REGISTER_ACTION),
    mergeMap(({ payload }) =>
      doRegister(payload).pipe(
        map(response => registerSuccessAction(response)),
        catchError(error => of(registerFailureAction(error)))
      )
    )
  );
};

const loginRegisterSuccessEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGIN_SUCCESS_ACTION, REGISTER_SUCCESS_ACTION),
    map(({ payload }) => {
      console.log("payload", payload);
      localStorage.setItem("token", payload.token);
      return push("/");
    })
    // catchError(error => registerFailureAction(error))
  );
};
export default combineEpics(
  loginEpics,
  registerEpics,
  loginRegisterSuccessEpic
);
