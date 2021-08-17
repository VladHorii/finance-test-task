import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./tickers-actions";

const tickers = createReducer([], {
  [actions.refresh]: (_, { payload }) => payload,
});

export default combineReducers({
  tickers,
});
