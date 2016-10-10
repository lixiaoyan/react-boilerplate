import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router";

import App from "./components/app";

function render() {
  ReactDOM.render((
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>
  ), document.query("#app"));
}

render();

if (module.hot) {
  module.hot.accept(render);
}
