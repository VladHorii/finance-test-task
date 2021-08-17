import Ticker from "../Ticker/Ticker";
import css from "./TickersList.module.css";

const TickersList = ({ tickers }) => {
  return (
    <ul className={css.list}>
      {tickers.map((ticker) => (
        <Ticker ticker={ticker} key={ticker.ticker} />
      ))}
    </ul>
  );
};
export default TickersList;
