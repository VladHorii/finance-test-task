import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../api/api";

const refresh = createAction("tickers/refresh");
const addToPaysedList = createAction("tickers/pausedList/add");
const removeFromPaysedList = createAction("tickers/pausedList/remove");

const removeTicker = createAsyncThunk(
  "tickers/remove",
  async (credentials, { rejectWithValue }) => {
    try {
      socket.emit("removeTicker", credentials);
      return credentials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const addTicker = createAsyncThunk(
  "tickers/add",
  async (credentials, { rejectWithValue }) => {
    try {
      socket.emit("addTicker", credentials);
      return credentials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const exportFunctions = {
  refresh,
  addToPaysedList,
  removeFromPaysedList,
  removeTicker,
  addTicker,
};

export default exportFunctions;
