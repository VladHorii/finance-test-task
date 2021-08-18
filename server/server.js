"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let fetchInterval = 5000;
const PORT = process.env.PORT || 4000;

let pausedList = [];
let prevResponse = [];
let timer = null;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = [];
  tickers.forEach((ticker) => {
    if (pausedList.includes(ticker)) {
      const prevTickerInfo = prevResponse.find((el) => el.ticker === ticker);
      return quotes.push(prevTickerInfo);
    }
    quotes.push({
      ticker,
      exchange: "NASDAQ",
      price: randomValue(100, 300, 2),
      change: randomValue(0, 200, 2),
      change_percent: randomValue(0, 1, 2),
      dividend: randomValue(0, 1, 2),
      yield: randomValue(0, 2, 2),
      last_trade_time: utcDate(),
    });
  });

  socket.emit("ticker", quotes);
  prevResponse = quotes;
}

function resetInterval(timerRef) {
  clearInterval(timerRef);
  timer = null;
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  if (timer) {
    resetInterval(timer);
  }
  timer = setInterval(function () {
    getQuotes(socket);
  }, fetchInterval);

  socket.on("disconnect", function () {
    resetInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/allAvailableTickers", function (req, res) {
  res.json({
    tickers: [
      "AAPL", // Apple
      "GOOGL", // Alphabet
      "MSFT", // Microsoft
      "AMZN", // Amazon
      "FB", // Facebook
      "TSLA", // Tesla
    ],
  });
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });
  socket.on("changePausedList", (tickersList) => {
    pausedList = tickersList;
  });
  socket.on("removeTicker", (tickerName) => {
    const idx = tickers.indexOf(tickerName);
    tickers.splice(idx, 1);
  });
  socket.on("addTicker", (tickerName) => {
    tickers.push(tickerName);
  });
  socket.on("fetchInterval", (time) => {
    fetchInterval = time;
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
