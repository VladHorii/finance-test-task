import { useState } from "react";
import { socket } from "../../api/api";

const ChangeInterval = () => {
  const [interval, setInterval] = useState("");

  const handleSubmitInterval = (e) => {
    e.preventDefault();
    socket.emit("fetchInterval", Number(interval));
    setInterval(() => "");
  };

  return (
    <form onSubmit={handleSubmitInterval}>
      <label>
        Change update interval:
        <input
          type="number"
          name="changeInterval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
};
export default ChangeInterval;
