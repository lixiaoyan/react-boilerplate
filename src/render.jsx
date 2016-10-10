import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router";

import App from "./components/app";

function render() {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.query("#app"));
}

render();

if (module.hot) {
  module.hot.accept(render);
}
