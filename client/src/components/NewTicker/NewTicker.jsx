import { useDispatch, useSelector } from "react-redux";
import { tickersActions, tickersSelectors } from "../../redux/tickers";
import { PlusOutlined } from "@ant-design/icons";
import css from "./NewTicker.module.css";

const NewTicker = ({ newTickersList }) => {
  const dispatch = useDispatch();
  const tickers = useSelector(tickersSelectors.getTickers);
  const activeTickersList = tickers.map((el) => el.ticker);

  const visibilityEl = [];
  newTickersList.forEach((el) => {
    if (!activeTickersList.find((activeEl) => activeEl === el)) {
      visibilityEl.push(el);
    }
  });

  const handleClick = (tickerName) => {
    dispatch(tickersActions.addTicker(tickerName));
  };

  return (
    <>
      {visibilityEl.length > 0 && (
        <>
          <h2>You can add a new ticker from this list</h2>
          <ul className={css.list}>
            {visibilityEl.map((el) => (
              <li key={el} className={css.item} onClick={() => handleClick(el)}>
                <PlusOutlined className={css.icon} />
                {el}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default NewTicker;
