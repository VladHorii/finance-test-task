import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { tickersActions, tickersSelectors } from "./redux/tickers";
import "./App.css";
import TickersList from "./components/TickersList";
import { socket } from "./api/api";
import NewTicker from "./components/NewTicker";
import ChangeInterval from "./components/ChangeInterval";

function App() {
  const tickers = useSelector(tickersSelectors.getTickers);
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

  return (
    <>
      <div className="App">
        <NewTicker />

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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          error: {
            style: {
              background: "#DC143C",
              color: "#F0F8FF",
            },
          },
          success: {
            style: {
              background: "#7FFF00",
              color: "#212121",
            },
          },
        }}
      />
    </>
  );
}

export default App;
