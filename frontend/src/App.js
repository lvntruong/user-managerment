import React from "react";
import { Router as RouterHistory } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./router";
import { createBrowserHistory } from "history";
import store from "./redux/store";

function App() {
  const history = createBrowserHistory();

  return (
    <RouterHistory history={history}>
      <Provider store={store}>
        <Router />
      </Provider>
    </RouterHistory>
  );
}

export default App;
