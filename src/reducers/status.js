import { fromJS } from "immutable";

import {
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_FAILURE,
} from "../constants/status";

const initialState = fromJS({
  loading: 0,
});

export default (state = initialState, action) => {
  switch (action.status) {
    case STATUS_LOADING:
      return state.update("loading", value => value + 1);

    case STATUS_SUCCESS:
    case STATUS_FAILURE:
      return state.update("loading", value => value - 1);

    default:
      return state;
  }
};
