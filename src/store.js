import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

import reducers from "./reducers";

const middlewares = [
  thunk,
  (process.env.NODE_ENV === "development") && createLogger(),
].filter(item => item);

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

export default store;

if (module.hot) {
  module.hot.accept("./reducers", () => {
    store.replaceReducer(reducers);
  });
}
