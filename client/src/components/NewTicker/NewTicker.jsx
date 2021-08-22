import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

import { tickersActions, tickersSelectors } from "../../redux/tickers";
import css from "./NewTicker.module.css";
import { BASE_URL } from "../../api/api";

axios.defaults.baseURL = BASE_URL;

const NewTicker = () => {
  const [availableTickers, setAvailableTickers] = useState([]);

  useEffect(() => {
    const getTickersList = async () => {
      const { data } = await axios.get("/allAvailableTickers");
      setAvailableTickers(data.tickers);
    };
    getTickersList();
  }, []);

  const dispatch = useDispatch();
  const tickers = useSelector(tickersSelectors.getTickers);
  const activeTickersList = tickers.map((el) => el.ticker);

  const visibilityEl = [];
  availableTickers.forEach((el) => {
    if (!activeTickersList.find((activeEl) => activeEl === el)) {
      visibilityEl.push(el);
    }
  });

  const handleClick = (tickerName) => {
    dispatch(tickersActions.addTicker(tickerName));
    toast.success("You have successfully added a new ticker");
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
