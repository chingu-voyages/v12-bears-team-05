import { initialState } from './reducer';
export const selectCreateRecipeDomain = state =>
  state.createRecipe || initialState;
export const selectIsLoading = state =>
  selectCreateRecipeDomain(state).isLoading;
export const selectCreateRecipeError = state =>
  selectCreateRecipeDomain(state).error;
