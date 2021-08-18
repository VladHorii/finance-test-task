import { socket } from "../../api/api";

const ChangeInterval = () => {
  const handleSubmitInterval = (e) => {
    e.preventDefault();
    const interval = Number(e.target.changeInterval.value);
    socket.emit("fetchInterval", interval);
    e.target.changeInterval.value = null;
  };

  return (
    <form onSubmit={handleSubmitInterval}>
      <label>
        Change update interval:
        <input type="number" name="changeInterval" />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
};
export default ChangeInterval;
