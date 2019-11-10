import { combineEpics } from 'redux-observable';
import LoginSignUpEpic from './containers/LoginSignUp/epic';
import CreateRecipeEpic from './containers/CreateRecipe/epic';
import RootEpic from './containers/Root/epic';
export default combineEpics(LoginSignUpEpic, RootEpic, CreateRecipeEpic);
