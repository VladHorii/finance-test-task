import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloseOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../api/api";
import { tickersActions, tickersSelectors } from "../../redux/tickers";
import css from "./Ticker.module.css";

const Ticker = ({ ticker }) => {
  const dispatch = useDispatch();
  const pausedList = useSelector(tickersSelectors.getPausedList);
  const isOnPause = pausedList.includes(ticker.ticker);

  const difference = (ticker.price - ticker.change).toFixed(2);
  const handleDeleteTicker = (tickerName) => {
    dispatch(tickersActions.removeTicker(tickerName));
  };
  const handlePauseTicker = (tickerName) => {
    isOnPause
      ? dispatch(tickersActions.removeFromPaysedList(tickerName))
      : dispatch(tickersActions.addToPaysedList(tickerName));
  };

  useEffect(() => {
    socket.emit("changePausedList", pausedList);
  }, [pausedList]);

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
      <button
        onClick={() => handleDeleteTicker(ticker.ticker)}
        type="button"
        name="delete"
        className={css.icon}
      >
        <CloseOutlined />
      </button>
      <button
        name="pause"
        className={css.icon}
        onClick={() => handlePauseTicker(ticker.ticker)}
      >
        {isOnPause ? <PlayCircleOutlined /> : <PauseOutlined />}
      </button>
    </li>
  );
};
export default Ticker;
