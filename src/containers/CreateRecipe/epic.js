import { ofType, combineEpics } from 'redux-observable';
import { CREATE_RECIPE_ACTION } from './constants';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { doCreateRecipe } from './api';
import {
  createRecipeFailureAction,
  createRecipeSuccessAction
} from './actions';
import { of } from 'rxjs';

const createRecipeActionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(CREATE_RECIPE_ACTION),
    mergeMap(({ payload }) => {
      console.log('Creating recipe');
      return doCreateRecipe(payload).pipe(
        map(response => createRecipeSuccessAction(response)),
        catchError(error => {
          console.log('error', error);
          return of(createRecipeFailureAction(error));
        })
      );
    })
  );
};

export default combineEpics(createRecipeActionEpic);
