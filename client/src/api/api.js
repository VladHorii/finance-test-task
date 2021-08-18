import { Manager } from "socket.io-client";

const manager = new Manager("http://localhost:4000/", {
  reconnectionDelayMax: 10000,
});
export const socket = manager.socket("/", {});
