const getTickers = (state) => state.tickers.tickers;
const getPausedList = (state) => state.tickers.pausedList;

const exports = {
  getTickers,
  getPausedList,
};
export default exports;
