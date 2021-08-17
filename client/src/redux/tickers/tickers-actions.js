import { createAction } from "@reduxjs/toolkit";

const refresh = createAction("tickers/refresh");
const exportFunctions = {
  refresh,
};

export default exportFunctions;
