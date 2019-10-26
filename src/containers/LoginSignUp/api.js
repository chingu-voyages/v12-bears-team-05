import { ajax } from "rxjs/ajax";
import { API_ENDPOINT } from "../../utils/constants";
import { map, catchError } from "rxjs/operators";

const LOGIN_API = "/user/auth/login";
const REGISTER_API = "/user/auth/register";

export const doLogin = payload => {
  return ajax({
    url: API_ENDPOINT + LOGIN_API,
    method: "POST",
    body: payload
  }).pipe(
    map(response => {
      console.log("response", response);
      return response.response;
    }),
    catchError(response => {
      throw response.response;
    })
  );
};

export const doRegister = payload => {
  return ajax({
    url: API_ENDPOINT + REGISTER_API,
    method: "POST",
    body: payload
  }).pipe(
    map(response => {
      console.log("response", response);
      return response.response;
    }),
    catchError(response => {
      throw response.response;
    })
  );
};
