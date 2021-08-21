import { configureStore } from "@reduxjs/toolkit";
import { createCustomSlice } from "../../redux/tickers/tickers-reducer";

const initState = {
  pausedList: ["GOOGL"],
  tickers: [
    {
      ticker: "GOOGL",
      exchange: "NASDAQ",
      price: 237.08,
      change: 154.38,
      change_percent: 0.1,
      dividend: 0.46,
      yield: 1.18,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
    {
      ticker: "MSFT",
      exchange: "NASDAQ",
      price: 261.46,
      change: 161.45,
      change_percent: 0.41,
      dividend: 0.18,
      yield: 0.98,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
  ],
};

export const store = configureStore({
  reducer: {
    tickers: createCustomSlice(initState).reducer,
  },
});
