/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

import createReducer from './reducers';
import epics from './epics';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const epicMiddleware = createEpicMiddleware();

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    /* eslint-enable */
  }

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [routerMiddleware(history), epicMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );

  attachHmrReducer(store, history);

  // Extensions
  store.injectedReducers = {}; // Reducer registry
  store.asyncReducers = {};

  epicMiddleware.run(getHmrEpics());

  return store;
}

const attachHmrReducer = (store, history) => {
  if (process.env.NODE_ENV === "development" && module.hot) {
    /*
     * Hot reload Redux reducers in local dev mode.
     */
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer(history));
    });
  }
};

const getHmrEpics = () => {
  const epic$ = new BehaviorSubject(epics);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./epics', () => {
      const nextRootEpic = require('./epics').default;
      epic$.next(nextRootEpic);
    });
  }
  return (...args) => epic$.pipe(switchMap(epic => epic(...args)));
};
