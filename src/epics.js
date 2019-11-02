import { combineEpics } from "redux-observable";
import LoginSignUpEpic from "./containers/LoginSignUp/epic";
import RootEpic from "./containers/Root/epic";
export default combineEpics(LoginSignUpEpic, RootEpic);
