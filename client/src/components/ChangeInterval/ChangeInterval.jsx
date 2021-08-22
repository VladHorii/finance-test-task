import { useState } from "react";
import { Form, InputNumber, Button } from "antd";
import toast from "react-hot-toast";
import "antd/dist/antd.css";
import { socket } from "../../api/api";

const ChangeInterval = () => {
  const [interval, setInterval] = useState(5000);

  const handleSubmitInterval = () => {
    socket.emit("fetchInterval", Number(interval));
    toast.success(`Tickers update time changed to ${interval}ms.`);
  };

  return (
    <>
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={handleSubmitInterval}
        initialValues={{ changeInterval: interval }}
      >
        <Form.Item label="Change update interval" name="changeInterval">
          <InputNumber value={interval} onChange={setInterval} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ChangeInterval;
