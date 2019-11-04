import { createAction } from 'redux-actions';
import * as constants from './constants';

export const createRecipeAction = createAction(
  constants.CREATE_RECIPE_ACTION,
  () => ({
    // TODO : Add Payload
  })
);

export const createRecipeSuccessAction = createAction(
  constants.CREATE_RECIPE_SUCCESS_ACTION
);
export const createRecipeFailureAction = createAction(
  constants.CREATE_RECIPE_FAILURE_ACTION
);
