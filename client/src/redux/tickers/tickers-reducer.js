import { createSlice } from "@reduxjs/toolkit";
import actions from "./tickers-actions";

const initState = {
  tickers: [],
  pausedList: [],
};

export const createCustomSlice = (initialState) => {
  const tickersSlice = createSlice({
    name: "tickers",
    initialState,
    extraReducers: {
      [actions.refresh](state, { payload }) {
        state.tickers = payload;
      },
      [actions.removeTicker.fulfilled](state, { payload }) {
        state.tickers = state.tickers.filter((el) => el.ticker !== payload);

        if (state.pausedList.includes(payload)) {
          state.pausedList = state.pausedList.filter((el) => el !== payload);
        }
      },
      [actions.addTicker.fulfilled](state, { payload }) {
        state.tickers.push({
          ticker: payload,
          exchange: "NASDAQ",
          price: 0.0,
          change: 0.0,
          change_percent: 0.0,
          dividend: 0.0,
          yield: 0.0,
          last_trade_time: "2021-01-01T00:00:01.000Z",
        });
      },
      [actions.addToPaysedList](state, { payload }) {
        state.pausedList.push(payload);
      },
      [actions.removeFromPaysedList](state, { payload }) {
        state.pausedList = state.pausedList.filter((el) => el !== payload);
      },
    },
  });
  return tickersSlice;
};

const tickersSlice = createCustomSlice(initState);

export default tickersSlice.reducer;
