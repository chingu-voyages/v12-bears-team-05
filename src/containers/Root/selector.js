import { initialState } from "../Root/reducer";

export const selectRootDomain = state => state.root || initialState;
export const selectIsLoggedIn = state => selectRootDomain(state).isLoggedIn;

export const selectIsLoading = state => selectRootDomain(state).isLoading;
