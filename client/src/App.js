import { useState } from "react";
import "./App.css";

import { Manager } from "socket.io-client";
import TickersList from "./components/TickersList";

const manager = new Manager("http://localhost:4000/", {
  reconnectionDelayMax: 10000,
});

const socket = manager.socket("/", {});

function App() {
  const [tickers, setTickers] = useState([]);
  socket.io.on("open", () => {
    socket.emit("start", () => {
      console.log("connected");
    });
    socket.on("ticker", setTickers);
  });
  return <>{tickers.length > 0 && <TickersList tickers={tickers} />}</>;
}

export default App;
