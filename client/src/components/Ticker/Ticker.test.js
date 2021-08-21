import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Ticker from "./Ticker";
import { store as tickerStore } from "./TickerStore";

const renderWithRedux = (component, { store = tickerStore } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const ticker = {
  ticker: "GOOGL",
  exchange: "NASDAQ",
  price: 237.08,
  change: 154.38,
  change_percent: 0.1,
  dividend: 0.46,
  yield: 1.18,
  last_trade_time: "2021-04-30T11:53:21.000Z",
};

describe("Redux testing", () => {
  it("Checking for the existence of a component", async () => {
    const { findByText, getByText, getByRole } = renderWithRedux(
      <Ticker ticker={ticker} />
    );

    expect(await findByText(ticker.ticker)).toBeInTheDocument();
    expect(getByText(/Price:/i)).toHaveTextContent(ticker.price);
    expect(getByText(/Today:/i)).toHaveTextContent(
      (ticker.price - ticker.change).toFixed(2)
    );

    const playBtn = getByRole("img", { name: /play-circle/i });
    expect(playBtn).toBeInTheDocument();
  });
  it("Add to pause function test", async () => {
    const { getByRole } = renderWithRedux(<Ticker ticker={ticker} />);

    const playBtn = getByRole("img", { name: /play-circle/i });
    expect(playBtn).toBeInTheDocument();
    userEvent.click(playBtn);
    expect(playBtn).not.toBeInTheDocument();

    const pauseBtn = getByRole("img", { name: /pause/i });
    expect(pauseBtn).toBeInTheDocument();
    userEvent.click(pauseBtn);
    expect(pauseBtn).not.toBeInTheDocument();
  });
});
