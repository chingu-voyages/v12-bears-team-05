import { ofType, combineEpics } from "redux-observable";
import { GET_PROFILE_ACTION, LOGOUT_ACTION } from "./constants";

import { map, catchError, mergeMap, retry, take } from "rxjs/operators";
import { getProfile } from "./api";
import { getProfileSuccessAction } from "./actions";
import { push } from "connected-react-router";
import { of } from "rxjs";

const getProfileEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_PROFILE_ACTION),
    mergeMap(({ payload }) => {
      console.log("doing getProfile");
      return getProfile().pipe(
        map(response => getProfileSuccessAction(response)),
        catchError(error => {
          push("/login");
          return of();
        })
      );
    })
  );
};

const logoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGOUT_ACTION),
    mergeMap(() => {
      console.log("doing logout");
      localStorage.setItem("token", "");
      // window.location.reload();
      return of();
    })
  );
};

export default combineEpics(getProfileEpic, logoutEpic);
