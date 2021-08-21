import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewTicker from "./NewTicker";
import { store as newTickerStore } from "./NewTickerStore";
import axios from "axios";

const renderWithRedux = (component, { store = newTickerStore } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

jest.mock("axios");
const hits = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA"];

describe("NewTicker testing", () => {
  it("Check adding a ticker from the list of available ones", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { tickers: [...hits] } })
    );
    const { findByText } = renderWithRedux(<NewTicker />);

    expect(axios.get).toHaveBeenCalledTimes(1);

    const tickerAAPL = await findByText(/AAPL/i);
    expect(tickerAAPL).toBeInTheDocument();
    userEvent.click(tickerAAPL);
    expect(await findByText(/AAPL/i)).not.toBeInTheDocument();
  });
});
