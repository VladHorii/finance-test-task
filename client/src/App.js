// import { useState } from "react";
import { tickersActions, tickersSelectors } from "./redux/tickers";
import "./App.css";

import { Manager } from "socket.io-client";
import TickersList from "./components/TickersList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const manager = new Manager("http://localhost:4000/", {
  reconnectionDelayMax: 10000,
});

const socket = manager.socket("/", {});

function App() {
  const tickers = useSelector(tickersSelectors.getTickers);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("start");

    socket.on("ticker", (response) => {
      dispatch(tickersActions.refresh(response));
    });
  }, [dispatch]);

  return (
    <>
      <h1>Tickers list</h1>
      {tickers.length > 0 && <TickersList tickers={tickers} />}
    </>
  );
}

export default App;
