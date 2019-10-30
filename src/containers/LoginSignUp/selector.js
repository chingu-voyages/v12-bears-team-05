import { initialState } from "./reducer";
export const selectLoginSignUpDomain = state =>
  state.loginSignUp || initialState;
export const selectIsLoading = state =>
  selectLoginSignUpDomain(state).isLoading;

export const selectLoginError = state =>
  selectLoginSignUpDomain(state).loginError;
export const selectRegisterError = state =>
  selectLoginSignUpDomain(state).registerError;
