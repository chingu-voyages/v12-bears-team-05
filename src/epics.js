import { combineEpics } from "redux-observable";
import LoginSignUpEpic from "./containers/LoginSignUp/epic";

export default combineEpics(LoginSignUpEpic);
