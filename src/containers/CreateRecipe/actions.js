import { createAction } from 'redux-actions';
import * as constants from './constants';

export const createRecipeAction = createAction(
  constants.CREATE_RECIPE_ACTION,
  ({
    name,
    description,
    servings,
    serving_amount,
    prep_time,
    cook_time,
    instructions,
    notes,
    tags,
    images,
    privacy,
    ingredients
  }) => ({
    // TODO : Add Payload
    name,
    description,
    servings,
    serving_amount,
    prep_time,
    cook_time,
    instructions,
    notes,
    tags,
    images,
    privacy,
    ingredients
  })
);

export const createRecipeSuccessAction = createAction(
  constants.CREATE_RECIPE_SUCCESS_ACTION
);
export const createRecipeFailureAction = createAction(
  constants.CREATE_RECIPE_FAILURE_ACTION
);
