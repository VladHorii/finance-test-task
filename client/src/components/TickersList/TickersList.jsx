const TickersList = ({ tickers }) => {
  console.log(tickers);
  return (
    <ul>
      {tickers.map((ticker) => (
        <li key={ticker.name}>
          {ticker.ticker} | {ticker.price}
        </li>
      ))}
    </ul>
  );
};
export default TickersList;
