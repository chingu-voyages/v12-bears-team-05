/*
 *
 * LoginSignUp reducer
 *
 */
import produce from 'immer';
import {
  CREATE_RECIPE_ACTION,
  CREATE_RECIPE_SUCCESS_ACTION,
  CREATE_RECIPE_FAILURE_ACTION
} from './constants';

export const initialState = {
  isLoading: false,
  recipe: null
};
/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_RECIPE_ACTION:
        // draft.recipe
        break;
      case CREATE_RECIPE_SUCCESS_ACTION:
        draft.recipe = action.payload;
        draft.isLoading = false;
        break;
      case CREATE_RECIPE_FAILURE_ACTION:
        draft.isLoading = false;
        draft.error = action.payload;
        break;
    }
  });
