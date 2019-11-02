import { ajax } from "rxjs/ajax";
import { API_ENDPOINT } from "../../utils/constants";
import { map, catchError } from "rxjs/operators";

const GET_PROFILE = "/user/auth/profile";

export const getProfile = () => {
  return ajax({
    url: API_ENDPOINT + GET_PROFILE,
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("token")
    }
  }).pipe(
    map(response => response.response),
    catchError(response => {
      throw response.response;
    })
  );
};
