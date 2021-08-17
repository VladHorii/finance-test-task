import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import css from "./Ticker.module.css";

const Ticker = ({ ticker }) => {
  const difference = (ticker.price - ticker.change).toFixed(2);

  return (
    <li key={ticker.name} className={css.item}>
      <div className={css.tickerContainer}>
        <p className={css.tickerValue}>{ticker.ticker}</p>
      </div>
      <p className={css.tickerContainer}>Price: {ticker.price}$</p>
      <p className={css.tickerContainer}>Today: {difference}$</p>
      <div className={`${css.tickerContainer} ${css.tickerChanged}`}>
        <p
          className={css.tickerValue}
          style={{
            backgroundColor: difference > 0 ? "#137333" : "#c5221f",
          }}
        >
          {difference > 0 ? (
            <ArrowUpOutlined style={{ color: "#FFFFFF" }} />
          ) : (
            <ArrowDownOutlined style={{ color: "#FFFFFF" }} />
          )}
          {Number(ticker.change_percent).toFixed(2)}
        </p>
      </div>
      {/* <p>change: {ticker.change}</p>
      <p>change_percent: {ticker.change_percent}</p>
      <p>dividend: {ticker.dividend}</p>
      <p>yield: {ticker.yield}</p>
      <p>last_trade_time: {ticker.last_trade_time}</p> */}
    </li>
  );
};
export default Ticker;
