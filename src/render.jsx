import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";

import store from "./store";

import App from "./components/app";

function render() {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>
  ), document.query("#app"));
}

render();

if (module.hot) {
  module.hot.accept(render);
}
