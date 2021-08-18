import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { tickersActions, tickersSelectors } from "./redux/tickers";
import "./App.css";

import TickersList from "./components/TickersList";

import { socket } from "./api/api";
import NewTicker from "./components/NewTicker";
import ChangeInterval from "./components/ChangeInterval";

function App() {
  const tickers = useSelector(tickersSelectors.getTickers);
  const pausedList = useSelector(tickersSelectors.getPausedList);
  const [availableTickers, setAvailableTickers] = useState([]);
  const isLoading = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("start");

    socket.on("ticker", (response) => {
      if (!isLoading.current) {
        isLoading.current = true;
      }
      dispatch(tickersActions.refresh(response));
    });
  }, [dispatch]);

  useEffect(() => {
    const getTickersList = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/allAvailableTickers"
      );
      setAvailableTickers(data.tickers);
    };
    getTickersList();
  }, []);

  useEffect(() => {
    socket.emit("changePausedList", pausedList);
  }, [pausedList]);

  return (
    <div className="App">
      {availableTickers.length > 0 && (
        <NewTicker newTickersList={availableTickers} />
      )}

      {!isLoading.current && tickers?.length === 0 && (
        <h2>Загружаем список тикеров...</h2>
      )}

      {tickers?.length > 0 && (
        <>
          <h1>Tickers list</h1>
          <TickersList tickers={tickers} />
          <ChangeInterval />
        </>
      )}
    </div>
  );
}

export default App;
