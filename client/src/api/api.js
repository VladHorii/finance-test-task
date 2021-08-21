import { Manager } from "socket.io-client";

export const BASE_URL = "http://localhost:4000/";

const manager = new Manager(BASE_URL, {
  reconnectionDelayMax: 10000,
});
export const socket = manager.socket("/", {});
