import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./tickers-actions";

const tickers = createReducer([], {
  [actions.refresh]: (_, { payload }) => payload,
  [actions.removeTicker.fulfilled]: (state, { payload }) =>
    state.filter((el) => el.ticker !== payload),
  [actions.addTicker.fulfilled]: (state, { payload }) => [
    ...state,
    {
      ticker: payload,
      exchange: "NASDAQ",
      price: 0.0,
      change: 0.0,
      change_percent: 0.0,
      dividend: 0.0,
      yield: 0.0,
      last_trade_time: "2021-01-01T00:00:01.000Z",
    },
  ],
});

const pausedList = createReducer([], {
  [actions.addToPaysedList]: (state, { payload }) => [...state, payload],
  [actions.removeFromPaysedList]: (state, { payload }) =>
    state.filter((el) => el !== payload),
});

export default combineReducers({
  tickers,
  pausedList,
});
