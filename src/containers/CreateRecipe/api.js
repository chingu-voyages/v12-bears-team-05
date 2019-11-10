import { ajax } from 'rxjs/ajax';
import { API_ENDPOINT } from '../../utils/constants';
import { map, catchError } from 'rxjs/operators';

const CREATE_RECIPE_API = '/recipe';

export const doCreateRecipe = payload => {
  return ajax({
    url: API_ENDPOINT + CREATE_RECIPE_API,
    method: 'POST',
    headers: {
      'auth-token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: payload
  }).pipe(
    map(response => {
      console.log('response', response);
      return response.response;
    }),
    catchError(response => {
      throw response.response;
    })
  );
};
