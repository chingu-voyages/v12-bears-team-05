import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ConnectedRouter } from "connected-react-router";

import "./index.css";
import App from "./containers/Root";
import * as serviceWorker from "./serviceWorker";
import history from "./utils/history";

const store = configureStore({}, history);

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );

render(App);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextApp = require("./containers/Root").default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
