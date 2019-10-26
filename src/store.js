/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";

import createReducer from "./reducers";
import epics from "./epics";

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const epicMiddleware = createEpicMiddleware();

  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
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

  if (process.env.NODE_ENV === "development" && module.hot) {
    /*
     * Hot reload Redux reducers in local dev mode.
     */
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });

    /*
     * Hot reload redux-epic in local dev mode.
     */
    module.hot.accept("./epics", () => {
      // eslint-disable-next-line global-require
      const getNewRootEpic = require("./epics").default;
      epicMiddleware.replaceEpic(getNewRootEpic);
    });
  }

  // Extensions
  store.injectedReducers = {}; // Reducer registry
  store.asyncReducers = {};

  epicMiddleware.run(epics);

  return store;
}
