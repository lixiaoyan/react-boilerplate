import React, { PureComponent } from "react";
import { Match } from "react-router";

import Home from "./home";

class App extends PureComponent {
  render() {
    return (
      <div className="ui-app">
        <Match exactly pattern="/" component={Home} />
      </div>
    );
  }
}

export default App;
